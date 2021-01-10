import * as React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, ProgressBarAndroid, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Urls from '../../Const/Urls';
import SearchUser from '../Chat/SearchUser'
import OnlineUsers from '../Chat/OnlineUsers.js';
import ListChat from '../Chat/ListChat';
import AsyncStorage  from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class HomeScr extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.route.params.data.userName,
            dataUser: this.props.route.params.data,
            yourNameSearch: '',
        }
        let timeMili = Date.now();
        let dt = new Date(timeMili);
        
    }
    componentDidMount(){
        this.getData();
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
    checkSocket = () => {
    }

    handlerChangeInputText = (text) => {
        this.setState({yourNameSearch: text})

    }

    onClickItemUserOnline = (obj) => {
        this.props.navigation.navigate('GUIchat', {
            usernameOne: this.state.username,
            usernameTwo: obj.userName,
            yournameTwo: obj.yourName
        });
    }

    onCLickItemChatList = (obj) => {
        this.props.navigation.navigate('GUIchat', {
            usernameOne: this.state.username,
            usernameTwo: obj.nameclient,
            yournameTwo: obj.yourname
        })
    }
    
    handleLongPress = ()=>{
        console.log("onlongpress");
        Alert.alert(
            'Xóa',
            // boby
            'Bạn có chắc muốn xóa',
            [
                {text: 'OK', onPress: () => console.log('ok')},
                {
                    text: 'CANCEL',
                    onPress: () => console.log('Không xóa')
                },
            ],
            {cancelable: false}
        )
    }
    
    render(){
        return(
            <View style={styles.container}>
               <View style={styles.group_title}>
                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
                       <Image style={styles.img_user} source={{uri: Urls.Domain+ '/' + this.state.dataUser.avt}} />
                       <Text style={styles.tl}>{this.state.dataUser.yourName}</Text>
                   </View>
                   <TouchableOpacity delayLongPress={3000} onLongPress={this.handleLongPress}>
                    <Icon name='pencil' style={styles.img_newChat}/>
                   </TouchableOpacity>
               </View>
               <SearchUser username={this.state.username} onChange={this.handlerChangeInputText}></SearchUser>
               <OnlineUsers username={this.state.username} onClick={this.onClickItemUserOnline}/>
               <ListChat 
                    username={this.state.username} 
                    yourNameSearch={this.state.yourNameSearch}
                    onClick={this.onCLickItemChatList}
                />
               
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        // alignItems:'center',
        paddingTop:35,
        //paddingLeft:10,
    },
    group_title: {
        // marginTop: Expo.Constants.statusBarHeight,
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        //marginStart: 20,
        //marginEnd: 20,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:"#ddd"
    },
    img_user: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#000',
    },
    img_newChat: {
        height: 40,
        width: 40,
        backgroundColor: '#fff',
        borderRadius: 50,
        shadowColor: '#ddd',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        elevation: 9,
        lineHeight: 40,
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
    },
    tl: {
        marginStart: 10,
        fontSize: 20,
        fontWeight: 'bold',
    }

})