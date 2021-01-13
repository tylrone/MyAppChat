import * as React from 'react';
import {View, Text, StyleSheet, TextInput, ToastAndroid, Image, TouchableOpacity} from 'react-native';
import { Button } from "react-native-paper";
import AsyncStorage  from '@react-native-community/async-storage';
import Urls from '../Const/Urls.js';


const url_login = '/login';

class LoginScr extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:"",
        }

    }
    storeData = async (key,value) => {
        try {
          await AsyncStorage.setItem(key, value)
        } catch (e) {
          console.log(e);
        }
    }

    onClickSignup = () => {
        this.props.navigation.navigate('SignupScr');
    }

    onClickLogin = async () => {
        fetch(Urls.Domain + url_login,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                user:{
                    username: this.state.username,
                    password: this.state.password
                }
            }),
        }).then((response) => response.json())
            .then((json) => {
                const statuscode = json.status;
                if(statuscode === 400){
                    ToastAndroid.show("không tồn tại !", ToastAndroid.SHORT);
                    return;
                }
                const dt = json.data;
                const tk = json.token;
                this.storeData('Token',tk);

                this.props.navigation.navigate('HomeScr', {username: this.state.username, data: dt, token:tk});
                
            })
        this.setState({username:"", password:""})
    }
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Image style={styles.img_logo} source={require('../images/avt2.png')}/>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Tài khoản" 
                        value={this.state.username}
                        onChangeText={account => this.setState({username : account})} 
                    />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Mật khẩu" 
                        secureTextEntry={true} 
                        value={this.state.password}
                        onChangeText={pass => this.setState({password : pass})} 
                    />
                    <TouchableOpacity>
                        <View style={styles.textRegister}>
                            <Text style={{textAlign: 'right'}}>
                                Quên mật khẩu
                            </Text>
                        </View>
                    </TouchableOpacity>    
                    <View>
                        <Button  
                            mode="contained" 
                            style={{borderRadius:40, marginTop:20}} 
                            color="purple"
                            onPress={ () => this.onClickLogin()}
                        >Đăng nhập</Button>
                    </View>
                </View>
                <TouchableOpacity onPress={this.onClickSignup}>
                    <View style={styles.textRegister}>
                        <Text>
                            Đăng ký
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    
}

export default LoginScr;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        position: 'relative',
    },
    textInput: {
        backgroundColor: '#ddd',
        width: 260,
        height: 50,
        marginBottom: 20,
        paddingLeft:10,
        fontSize: 20,
        borderRadius: 10,
      },
      textRegister: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10,
    },
    img_logo: {
        width: 220,
        height: 110,
        marginTop: 100,
        marginBottom: 70,
        marginLeft:20,
        justifyContent: 'center',
    },
    
});