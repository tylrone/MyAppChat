import * as React from 'react';
import {View, Text, StyleSheet, FlatList, BackHandler, ToastAndroid, Image, findNodeHandle} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import io from 'socket.io-client';
import Urls from '../../Const/Urls';
import SingleItemChat from './SingleItemChat';

export default class GUIchat extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            usernameOne: this.props.route.params.usernameOne,
            usernameTwo: this.props.route.params.usernameTwo,
            yournameTwo: this.props.route.params.yournameTwo,
            textInput: '',
            idMessage: '',
            avt:'',
            data: [],
            
        }

        BackHandler.addEventListener('hardwareBackPress', function () {
            console.log("onback press")

        })
    }
    componentDidMount() {
        this.socket = io(Urls.Domain);
        this.getDataFirst();
        this.checkSocket();
       
    }
    
    checkSocket = () => {
        this.socket.on('re_user', msg => {
            this.sendToArray(msg)
        });
    }


    
    sendToArray = (obj) => {
        var {data} = this.state;
        data.push(obj);
        this.setState({data});
    }
    getDataFirst = () => {
        fetch(Urls.Domain + Urls.CHAT_SOLO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.usernameOne,
                usernameclient: this.state.usernameTwo,
                time: Date.now(),
            })
        }).then((response) => response.json())
            .then((json) => {
                this.setState({data: json.result});
                console.log(json.idMessage)
                this.setState({avt: json.avt});
                this.setState({idMessage: json.idMessage});
                this.socket.emit('join', json.idMessage);
            })

    }

    onClickSend=()=>{
        if(this.state.textInput === ""){
            ToastAndroid.show("Chưa nhập tin nhắn !!!", ToastAndroid.SHORT)
            return
        }
        let obj = {
            username: this.state.usernameOne,
            username_client: this.state.usernameTwo,
            content: this.state.textInput,
            time: Date.now()
        }
        const objToArray = {
            idMessage: this.state.idMessage,
            usernameChat: this.state.usernameOne,
            content: this.state.textInput,
            timeChat: Date.now()
        }
       
        this.sendToArray(objToArray);
        this.socket.emit('chat_user', obj);
        this.getDataFirst();
        this.setState({textInput: ""});
    }


    render(){
        // console.log(this.socket)
        return(
            <View style={css.container}>
                <View style={css.groud_user_search}>
                    <Icon 
                        name='chevron-left'
                        style={css.icon_back}
                        onPress={() => {
                                this.props.navigation.pop();
                            }
                        }
                    />
                    <Image style={css.img_user} source={{uri: Urls.Domain+ '/' + this.state.avt}} />
                    <Text style={css.user_chat}>{this.state.yournameTwo}</Text>
                </View>

                <View style={{marginBottom: 60, marginTop: 10, height:600}}>
                    <ScrollView>
                        <FlatList
                            style={css.group_chat}
                            data={this.state.data}
                            ref='flatList'
                            onContentSizeChange={() => this.refs.flatList.scrollToEnd()}
                            renderItem={({item, index}) => {
                                    return <SingleItemChat
                                                username={this.state.usernameOne} 
                                                data={item}
                                                keyExtractor={item.idMessage}
                                            />
                                }
                            }
                        />  
                        {/* {this.state.data.map((e,i) => (
                            <SingleItemChat
                                username={this.state.usernameOne} 
                                data={e}
                                keyExtractor={i}
                            />
                        ))
                            
                        } */}
                    </ScrollView>
                </View>

                <View style={css.group_sendstatus}>
                        <View style={css.sendstatus}>
                            <TextInput
                                style={css.textinputSend}
                                placeholder='Nhập tin nhắn'
                                onChangeText={text => this.setState({textInput : text})} 
                                value={this.state.textInput}
                            />
                        </View>
                        <View style={css.sendbutton}>
                            <Icon name='send' style={css.img_send} onPress={this.onClickSend}/>
                        </View>
                </View>
            </View>
        );
    }
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 45,
        position: 'relative',
    },
    img_user: {
        height: 40,
        width: 40,
        borderRadius: 30,
        backgroundColor: '#000',
        marginTop:10,
        marginLeft:30
    },
    groud_user_search: {
        backgroundColor: '#ddd',
        height: 60,
        justifyContent: 'flex-start',
        elevation: 2,
        flexDirection: 'row',
        textAlign: 'center',
        paddingBottom: 10,
    },
    icon_back: {
        fontSize: 25,
        fontWeight: 'normal',
        lineHeight: 60,
        paddingStart: 20,
    },
    user_chat: {
        lineHeight: 60,
        paddingStart: 15,
        fontSize: 20
    },
    box_user_chat: {
        backgroundColor: 'red',
        paddingTop: 15,
        paddingBottom: 15,
        flex: 1,
    },
    list_input: {
        flex: 7,
        marginStart: 10,
        marginEnd: 75,
    },
    item_input: {
        alignSelf: 'flex-start',
        borderRadius: 20,
        padding: 7,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5,
        color: '#fff',
        fontSize: 17,
    },
    radius: {
        borderRadius: 20,
    },
    group_chat: {
        marginBottom: 60,
    },
    group_sendstatus: {
        height: 60,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
    },
    sendstatus: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        flex: 8,
    },
    textinputSend: {
        backgroundColor: '#ddd',
        height: 50,
        width: '95%',
        paddingStart: 10,
        borderRadius: 50,
    },
    sendbutton: {
        flex: 2,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',

    },
    img_send: {
        fontSize: 30,
    }
})