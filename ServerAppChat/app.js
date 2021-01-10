const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const server = require("http").createServer(app);
const port = 8080;
var handle = require("./Handle.js");
const io = require("socket.io").listen(server);
var User = require('./model/Users.js');
var Message = require('./model/Messages.js');
var MessageChatDetail = require('./model/MessagesChatDetail.js');
const MongoClient = require('mongodb').MongoClient;
const {on} = require("process");
const {query} = require("express");
const {ObjectId} = require("mongodb");
var multer = require('multer');
var upload = multer({dest:'Uploads/'});
var cors = require('cors');
const jwt = require('jsonwebtoken');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(cors());

app.use(express.static('Uploads'))
// app.get('/Uploads', (req, res) => {
//     res.send("<img src=avt1.jpg />");
// })

const url = "mongodb://localhost:27017/appchat"
MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    myDb = db.db('appchat')
    handle(myDb).startDb();
    console.log('connecting');



    //conect to socket io
    io.on('connection', (socket) => {


        console.log(`ket noi thanh cong! ${socket.id}`)

        socket.on('disconnect', () =>
            console.log(`Disconnected: ${socket.id}`));
        socket.on('join', (room) => {
            console.log(`Socket ${socket.id} joining ${room}`);
            socket.join(room);
        });


        sendStatus = function (s) {
            socket.emit(s);
        }

        socket.on('chat_user', data => {
            let userOne = data.username;
            let userTwo = data.username_client;
            let ct = data.content;
            let time = data.time;
            checkAlready(myDb.collection('Messages'), userOne, userTwo, function (result) {
                let isAlready = result.isalready;
                if (isAlready) {
                   let id = result.idchat;
                    // const myQuery = {
                    //     idMessage: id,
                    // }

                    const insert = {
                        idMessage: id, 
                        usernameChat: userOne, 
                        content: ct, 
                        timeChat: time
                    }

                    myDb.collection('MessagesChatDetail').insertOne(insert, function (err, result) {
                        if (err) {
                            throw err;
                        } else {
                            const obj = {
                                idMessage: id,
                                usernameChat: userOne,
                                content: ct,
                                timeChat: time,
                                //avt: account.avt
                            }
                            console.log(userOne)
                            console.log(userTwo)
                            console.log(id);

                            socket.to(id).emit('re_user', obj)
                            socket.to(userTwo).emit(userTwo, obj)

                            const objMyself = {
                                idMessage: id,
                                usernameChat: userTwo,
                                content: ct,
                                timeChat: time,
                                //avt: account.avt
                            }
                            socket.to(userOne).emit(userOne, objMyself)
                        }

                    })
                }
                
            })
        })

    })

    app.post('/delete_message', async (req, res) => {
        checkAlready(myDb.collection("Messages"), req.body.userOne, req.body.userTwo, function (result) {
            const query = {
                idMessage: result.idchat,
            }

            myDb.collection("Messages").deleteOne(query, function (err, result) {
                console.log("Xóa hội thoại thành công!")
            })
        })

    })

    app.post('/login', (req, res) => {
        const query = {
            userName: req.body.user.username,
            password: req.body.user.password
        }
        myDb.collection('Users').findOne(query, (err, result) => {
            if (result != null) {
                console.log('Tài khoản: '+ result.userName + " đã đăng nhập");
                var token = jwt.sign({_id : result._id},'secrectkey');
                obj = {
                    status: 200,
                    data: result,
                    token: token
                }
                res.status(200).send(obj);
            } else {
                console.log('Không tìm thấy tài khoản!');
                obj = {
                    status: 400,
                }
                res.status(400).send(obj);
            }

        })

    })

    app.post('/signup', (req, res) => {
        let user = {
            userName: req.body.username,
            password: req.body.password, 
            yourName: req.body.yourname,
            avt: null
        };
        let query = {
            userName: req.body.username
        }
        myDb.collection('Users').findOne(query, (err, result) => {
            if (result == null) {
                myDb.collection('Users').insertOne(user, (err, result) => {
                    res.status(200).send();
                })
            } else {
                res.status(400).send();
            }
        })
    })

    //check chat and result chat history
    app.post('/chat_solo', async  (req, res) => {
        let usernameChat = req.body.username;
        let usernameClientChat = req.body.usernameclient;
        let timeCreated = req.body.time;
        let _avt = await myDb.collection("Users").findOne({userName: usernameClientChat});
        checkAlready(myDb.collection("Messages"), usernameChat, usernameClientChat, function (result) {
            let isalready = result.isalready;
            if (isalready) {
                let _id = result.idchat;
                let query = {
                    idMessage: result.idchat
                }
                myDb.collection("MessagesChatDetail").find(query).toArray( function(err, result){
                    let obj = {
                        avt : _avt.avt,
                        idMessage: _id,
                        result: result
                    }
                    res.status(200).send(JSON.stringify(obj));
                }) 
            } else {
                const query = {
                    idMessage: usernameChat + '||' + usernameClientChat,
                    usenameOne: usernameChat,
                    usenameTwo: usernameClientChat,
                    timeCreate: timeCreated,
                }
                myDb.collection("Messages").insertOne(query, (err, result) => {
                    let obj = {
                        avt : _avt.avt,
                        idMessage: query.idMessage,
                        result: []
                    }
                    res.send(JSON.stringify(obj));
                })

            }
        })

    })

    //tim ten user
    app.post('/search', (req, res) => {
        let tk = req.body.token;
        let query = {
            userName: req.body.userName
        }
        myDb.collection('Users').find(query, (err, result) => {
            if (result != null) {
                res.status(200).send(JSON.stringify(result));
            } else {
                res.status(400).send();
            }
        })
    })

    app.post('/getuserchat', async (req, res) => {
        let username = req.body.username;        
        let data = await myDb.collection("Messages").find({'idMessage': {$regex: username}}).toArray();
        let account;
        let obj = [];
        for (let index = 0; index < data.length; index++) {
            let name = getUserNameClient(data[index].idMessage, username);
            let query = {
                userName: name,
            }
            account = await myDb.collection('Users').findOne(query);
            let yourName = account.yourName;
            const avt = account.avt;
            let query_chat ={
                idMessage: data[index].idMessage,
                 //idMessage: {$regex: data[index].idMessage},

            }
            let data_chat = await myDb.collection("MessagesChatDetail").find(query_chat).sort({timeChat:1}).toArray();
            const chatTotal = data_chat;
            if (chatTotal.length === 0) {
                obj.push({nameclient: name, yourname: yourName, content: data_chat.content, timechatlast: data_chat.timeChat, avt: avt})
            } else {
                objChat = chatTotal[chatTotal.length - 1]
                obj.push({
                    nameclient: name,
                    yourname: yourName,
                    content: objChat.content,
                    timechatlast: objChat.timeChat,
                    avt: avt
                })
            }
        }
        res.send(obj)
    })

    //lay tat ca user ton tai
    app.post('/getalluser', (req, res) => {
        myDb.collection('Users').find({userName: {$nin: [req.body.username]}}).toArray(function (err, result) {
            res.send(JSON.stringify(result));
        })
    })
})

async function checkAlready(messages, userNameOne, usernameTwo, callback) {
    let listUserOne = userNameOne + '||' + usernameTwo;
    let listUserTwo = usernameTwo + '||' + userNameOne;

    let query = {
        idMessage: listUserOne
    }

    let idChatResult = '';
    let checkChat = false;
    let resultObj = await messages.findOne(query)
    if (resultObj != null) {
        checkChat = true;
        idChatResult = listUserOne;
    }

    query = {
        idMessage: listUserTwo
    }
    resultTwo = await messages.findOne(query)
    if (resultTwo != null) {
        checkChat = true;
        idChatResult = listUserTwo;
    }

    if (checkChat) {
        let objectChat = {
            idchat: idChatResult,
            isalready: true
        }
        callback(objectChat);
    } else {
        let objectChat = {
            idchat: listUserOne,
            isalready: false
        }
        callback(objectChat)
    }
}

function getUserNameClient(idMessage, userName) {
    let userClient = '';
    let arrayUsename = idMessage.split('||')
    for (let index = 0; index < arrayUsename.length; index++) {
        if (!(arrayUsename[index] === userName)) {
            userClient = arrayUsename[index]
        }
    }
    return userClient
}

server.listen(port, () => {
    console.log("server running on port: " + port)
})

app.get('/', (req, res) => {
    res.send("hello world!");
})



