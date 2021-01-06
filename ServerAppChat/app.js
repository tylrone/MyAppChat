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




const url = "mongodb://localhost:27017/appchat"
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    myDb = db.db('appchat')
    handle(myDb).startDb();
    console.log('connecting');
    
    //conect to socket io
    io.on('connection', socket => {


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
        //only chat with one person
        socket.on('chat_user', data => {
            let userOne = data.username;
            let userTwo = data.username_client;
            let ct = data.content;
            let time = data.time;
            checkAlready(myDb.collection('Messages'), userOne, userTwo, function (result) {
                let isAlready = result.isalready;
                if (isAlready) {
                    id = result.idchat;
                    const myQuery = {
                        idMessage: id,
                    }

                    const update = {
                        $push: {'chatTotal': {idMessage: id, usenameChat: userOne, content: ct, timeChat: time}}
                        // $set: {'chatTotal': []}
                    }

                    myDb.collection('Messages').updateOne(myQuery, update, function (err, result) {
                        if (err) {
                            throw err
                        } else {
                            const obj = {
                                idMessage: id,
                                usernameChat: userOne,
                                content: ct,
                                timeChat: time,
                            }
                            socket.to(id).emit('re_user', obj)
                            socket.to(userTwo).emit(userTwo, obj)

                            const objMyself = {
                                idMessage: id,
                                usernameChat: userTwo,
                                content: ct,
                                timeChat: time,
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
                console.log("delete message complete!")
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
                console.log('Tài khoản: '+ result.userName + " đã đăng nhập")
                
                obj = {
                    status: 200,
                    data: result,
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
        let user = new User(req.body.username, req.body.password, req.body.yourname, req.body.avt);
        let query = {
            userName: req.body.username
        }
        myDb.collection('Users').findOne(query, (err, result) => {
            if (result == null) {
                myDb.collection('Users').insert(user, (err, result) => {
                    res.status(200).send();
                })
            } else {
                res.status(400).send();
            }
        })
    })

    //lay tat ca user dang online
    app.post('/getalluser', (req, res) => {
        myDb.collection('Users').find({userName: {$nin: [req.body.username]}}).toArray(function (err, result) {
            res.send(JSON.stringify(result));
        })
    })
})

server.listen(port, () => {
    console.log("server running on port: " + port)
})

app.get('/', (req, res) => {
    res.send("hello world!");
})

