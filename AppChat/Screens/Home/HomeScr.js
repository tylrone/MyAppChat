import * as React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, ProgressBarAndroid, Alert, ListView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Urls from '../../Const/Urls';
import SearchUser from '../Chat/SearchUser'
import OnlineUsers from '../Chat/OnlineUsers.js';
import ListChat from '../Chat/ListChat';
import AsyncStorage  from '@react-native-community/async-storage';
import { DrawerLayoutAndroid, FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';

export default class HomeScr extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.route.params.data.userName,
            token:this.props.route.params.token,
            dataUser: this.props.route.params.data,
            yourNameSearch: '',
            display:'none'
        }
        // let timeMili = Date.now();
        // let dt = new Date(timeMili);
        
    }
    componentDidMount(){
        //this.getData();
    }
    // getData = async () => {
    //     try {
    //         this.setState({
    //             Token:(await AsyncStorage.getItem('Token')).toString()
    //           });
    //       } catch(e) {
    //         console.log(e);
    //       }
    //   }
    checkSocket = () => {
    }

    handlerChangeInputText = (text) => {
        this.setState({yourNameSearch: text})

    }

    onClickItemUserOnline = (obj) => {
        this.props.navigation.navigate('GUIchat', {
            usernameOne: this.state.username,
            token: this.state.token,
            usernameTwo: obj.userName,
            yournameTwo: obj.yourName
        });
    }

    onCLickItemChatList = (obj) => {
        
        this.props.navigation.navigate('GUIchat', {
            usernameOne: this.state.username,
            token: this.state.token,
            usernameTwo: obj.nameclient,
            yournameTwo: obj.yourname,
           
        })
        this.setState({yourNameSearch:''})
    }
    
    handleLongPress = ()=>{
        console.log("onlongpress");
        Alert.alert(
            'Xóa',
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
    
    handleOnClick = () => {
        if(this.state.display == 'none'){
            this.setState({display:'flex'});
        }
        else{
            this.setState({display:'none'});
        }
    }
    
    render(){
        console.log(this.state.yourNameSearch);
        return(
            <View style={styles.container}>
               <View style={styles.group_title}>
                   <TouchableOpacity onPress={this.handleOnClick}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image style={styles.img_user} source={{uri: Urls.Domain+ '/' + this.state.dataUser.avt}} />
                            <Text style={styles.tl}>{this.props.route.params.data.yourName}</Text>
                        </View>
                   </TouchableOpacity>
                   <View  style={{
                        display: this.state.display, 
                        position:'absolute',
                        left:30,
                        top:50,
                        backgroundColor:'#ddd',
                        width:120,
                        borderRadius:10,
                        alignItems:'center',}}
                    >
                        <View style={styles.menu_Item}>
                            <TouchableOpacity
                                style={{width:120,alignItems:'center'}}
                                onPress={() => {this.props.navigation.navigate('ProfScr', {data: this.state.dataUser, token: this.state.token})}}
                            >
                                <Text>Hồ Sơ</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menu_Item}>
                            <TouchableOpacity
                                style={{width:120,alignItems:'center'}}
                                onPress={() => {this.props.navigation.popToTop('LoginScr')}}
                            >
                                <Text>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                   <TouchableOpacity delayLongPress={3000} onLongPress={this.handleLongPress}>
                        <Icon name='pencil' style={styles.img_newChat}/>
                   </TouchableOpacity>
               </View>
               <SearchUser 
                    username={this.state.username} 
                    yourNameSearch={this.state.yourNameSearch}
                    onChange={this.handlerChangeInputText}
                />
               <OnlineUsers 
                    username={this.state.username} 
                    onClick={this.onClickItemUserOnline}
                    token = {this.state.token}
                />
               <ListChat 
                    username={this.state.username} 
                    token = {this.state.token}
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
        paddingTop:35,
        position:'relative'
    },
    menu:{
        position:'absolute',
        left:30,
        top:50,
        backgroundColor:'yellow',
        width:120,
        borderRadius:10,
        alignItems:'center',
    },
    menu_Item:{
        paddingTop:5,
        paddingBottom:5,
        width:120,
        height:40,
        alignItems:'center'
    },
    group_title: {
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
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