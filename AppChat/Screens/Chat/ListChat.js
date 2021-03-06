import * as React from 'react';
import {View, Image, Button, Text, StyleSheet, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ListUsersChatVertical from "./ListUsersChatVertical";
import io  from 'socket.io-client';
import Urls from '../../Const/Urls';
import AsyncStorage  from '@react-native-community/async-storage';

export default class ListChat extends React.Component{
    constructor(props) {
        super(props)
        
        this.state = {
            username: this.props.username,
            yourNameSearch: this.props.yourNameSearch,
            token: this.props.token,
            data: [],
            dataDefault: [],
        }
        this.getData();
        //this.getDataSearch();
        this.callback = this.props.onClick;

        
        
    }
    getDataSearch = () =>{
        // const textSearch = this.props.yourNameSearch;
        // console.log("ok")
        // let dt = this.state.data;
        // let dtSearch = [];
        // if (textSearch.length !== 0) {
        //     for (let index = 0; index < dt.length; index++) {
        //         if (dt[index].yourname.includes(textSearch) || dt[index].nameclient.includes(textSearch)) {
        //             dtSearch.push(dt[index]);
        //             this.setState({dataDefault: dtSearch});
        //         }
        //     }
        // } else {
        //     dtSearch = this.state.dataDefault;
        // }
        //  console.log(this.props.yourNameSearch);
        fetch(Urls.Domain + Urls.Search, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //token: this.state.token
            },
            body: JSON.stringify({
                username_search: this.props.yourNameSearch,
                username: this.props.username
                
            })
        }).then((response) => response.json())
            .then((json) => {
                // if(statuscode === 400){
                //     ToastAndroid.show("không tồn tại !", ToastAndroid.SHORT);
                //     return;
                // }
                this.setState({data: json})
                //this.setState({dataDefault: json})
            })
            
            console.log(this.state.dataDefault)
    }
    getData = async () => {
        try {
            this.setState({
                Token:(await AsyncStorage.getItem('Token')).toString()
              });
          } catch(e) {
            console.log(e);
          }
    }
    componentDidMount() {  
        this.socket = io(Urls.Domain);
        this.checkSocket();
        this.getAllListChat();
        console.log(this.state.yourNameSearch)
    }
    
    getAllListChat = ()=>{
        fetch(Urls.Domain + Urls.GET_LIST_USER_CHAT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: this.state.token
            },
            body: JSON.stringify({
                username: this.state.username,
                
            })
        }).then((response) => response.json())
            .then((json) => {
                this.setState({data: json})
                this.setState({dataDefault: json})
            })
     }
    
    

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const textSearch = this.props.yourNameSearch
        let dt = this.state.data
        let dtSearch = []
        if (textSearch.length != 0) {
            for (let index = 0; index < dt.length; dt++) {
                if (dt[index].yourname.includes(textSearch) || dt[index].nameclient.includes(textSearch)) {
                    dtSearch.push(dt[index])
                }
            }
        } else {
            dtSearch = this.state.dataDefault
        }
        this.setState({data: dtSearch})
    }

    checkSocket = () => {
        
        this.socket.on(this.state.username, msg => {
            this.onUpdateListChat(msg)
        })

        this.socket.emit('join', this.state.username)
    }

    onClickUser = (obj) => {
        this.callback(obj)

    }
    onLongClickUser = (obj) => {
        Alert.alert(
            'Xóa',
            // boby
            'Bạn có chắc muốn xóa',
            [
                {text: 'OK', onPress: () => this.clickRemoveDialog(obj)},
                {
                    text: 'CANCEL',
                    onPress: () => console.log('Không xóa')
                },
            ],
            {cancelable: false}
        )
    }
    clickRemoveDialog(obj) {
        console.log(obj)
        let dt = this.state.data;
        console.log(dt[0])
        let dtResult = []
        for (let index = 0; index < dt.length; index++) {
            if (dt[index].nameclient === obj.nameclient) {
                continue
            }
            dtResult.push(dt[index])
        }

        this.setState({data: dtResult})
        fetch(Urls.Domain + Urls.DELETE_MESSAGE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Token': this.state.Token
            },
            body: JSON.stringify({
                userOne: this.state.username,
                userTwo: obj.nameclient,
            })
        })
    }
    onUpdateListChat(obj) {
        // let dt = this.state.data;
        // if (dt.length === 0) {
        //     let customObj = {
        //         nameclient: obj.usernameChat,
        //         yourname: obj.usernameChat,
        //         content: obj.content,
        //         timechatlast: obj.timeChat,
        //         avt: obj.avt
                
        //     }
        //     dt.push(customObj)
        // } else {
        //     for (let index = 0; index < dt.length; index++) {
        //         let infoChat = dt[index];
        //         if (infoChat.nameclient === obj.usernameChat) {
        //             dt[index].content = obj.content;
        //             dt[index].timechatlast = obj.timeChat;
        //             dt[index].avt = obj.avt
                    
        //             break
        //         }
        //     }
        // }
        // this.setState({data: dt})
        // this.setState({dataDefault: dt})
        this.getAllListChat();
    }
    

    render(){
        console.log(this.props.yourNameSearch);
        if(this.props.yourNameSearch != ""){
            this.getDataSearch();
            return(
                <View style={styles.container}>
                    <ScrollView>
                        {
                            this.state.data.map((e,i)=>(
                                <ListUsersChatVertical 
                                    onLongClick={this.onLongClickUser} 
                                    onClick={this.onClickUser} 
                                    data={e} 
                                    key={i} 
                                />
                            ))
                            
                        }
                    </ScrollView>
                </View>
            );
        }else{
            //this.getAllListChat();
            return(
                <View style={styles.container}>
                    <ScrollView>
                        {
                            this.state.dataDefault.map((e,i)=>(
                                <ListUsersChatVertical 
                                    onLongClick={this.onLongClickUser} 
                                    onClick={this.onClickUser} 
                                    data={e} 
                                    key={i} 
                                />
                            ))
                        }
                    </ScrollView>
                </View>
            );
        }
        
        
        
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },

})