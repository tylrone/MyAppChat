import * as React from 'react';
import {View, Text, StyleSheet, BackHandler, TextInput, ToastAndroid, Image, TouchableOpacity} from 'react-native';
import { Button } from "react-native-paper";
import Urls from '../../Const/Urls.js';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ProfScr extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.route.params.data.userName,
            token:this.props.route.params.token,
            dataUser: this.props.route.params.data,
            password:'',
            myname: this.props.route.params.data.yourName
        }

        BackHandler.addEventListener('hardwareBackPress', function () {
            console.log("onback press")

        })
        
    }
    onClickUpdate = async () => {
        if(this.state.myname != ""){
            fetch(Urls.Domain + Urls.Update_Prof,{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    token: this.props.route.params.token
                },
                body: JSON.stringify({
                    
                    username:this.state.username,
                    myname: this.state.myname,
                    password: this.state.password
                    
                }),
            }).then((response) => response.json())
                .then((json) => {
                    
                    //ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
    
                    this.props.navigation.navigate('ProfScr', {username: this.state.username, data: json, token:this.props.route.params.token});
                    this.setState({dataUser: json, password:""})
                })
        }
        else{
            ToastAndroid.show("không được để trống tên !", ToastAndroid.SHORT);
        }
        
        
    }
    render(){
        console.log(this.state.username)
        return(
            <View style={styles.container}>
                <View style={styles.group_title}>
                    <View style={styles.groud_user_search}>
                    <Icon 
                                name='chevron-left'
                                style={styles.icon_back}
                                onPress={() => {
                                        this.props.navigation.pop();
                                    }
                                }
                            />
                        
                        <Text style={styles.tl}>Sửa Thông Tin</Text>
                    </View>
                   
                </View>
                <View style={{paddingLeft:10,paddingRight:10, paddingTop:10}}>
                    <View style={{alignItems:'center'}}>
                        <Image style={styles.img_user} source={{uri: Urls.Domain+ '/' + this.state.dataUser.avt}} />
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={{fontSize:20,marginTop:10}}>Họ và tên: </Text>
                        <TextInput
                            style={styles.textInput}
                            value={this.state.myname}
                            onChangeText={text => this.setState({myname : text})} 
                        />
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={{fontSize:20}}>Mật khẩu: </Text> 
                        <TextInput
                            style={styles.textInput}
                            placeholder="Nhập nếu đổi"
                            secureTextEntry={true} 
                            value={this.state.password}
                            onChangeText={pass => this.setState({password : pass})} 
                        />
                    </View>
                    <View>
                        <Button  
                            mode="contained" 
                            style={{borderRadius:40, marginTop:20}} 
                            color="purple"
                            onPress={ () => this.onClickUpdate()}
                        >Lưu</Button>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingTop:35,
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
        height: 70,
        width: 70,
        borderRadius: 40,
        backgroundColor: '#000',
        marginTop:10,
    },
    tl: {
        lineHeight: 60,
        paddingStart: 15,
        fontSize: 20
    },
    icon_back: {
        fontSize: 25,
        fontWeight: 'normal',
        lineHeight: 60,
        paddingStart: 20,
    },
    textInput: {
        backgroundColor: '#ddd',
        width: 230,
        height: 30,
        marginBottom: 20,
        paddingLeft:10,
        fontSize: 20,
        borderRadius: 10,
      },

})