import * as React from 'react';
import ToastAndroid from 'react';
import {View, Text, StyleSheet, TextInput, ImageBackground, TouchableOpacity, Image} from 'react-native';
import { Button } from "react-native-paper";
import Urls from '../Const/Urls.js';


export default class SignupScr extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            username: "",
            password: "",
            clickSignUp: false,

        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Image style={styles.img_logo} source={require('../images/avt2.png')}/>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Họ và tên" 
                        value={this.setState.text}
                        onChangeText={text => this.setState({fullname : text})} 
                    />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Tài khoản" 
                        value={this.setState.text}
                        onChangeText={text => this.setState({username : text})} 
                    />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Mật khẩu" 
                        secureTextEntry={true} 
                        value={this.setState.text}
                        onChangeText={text => this.setState({password : text})} 
                    />
                    <View>
                        <Button  
                            mode="contained" 
                            style={{borderRadius:40,marginTop:20}} 
                            color="purple"
                            onPress={ () => this.onClickSignup()}
                        >Đăng ký</Button>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('LoginScr')}}>
                    <View style={styles.textRegister}>
                        <Text>
                            Ấn vào đây nếu bạn đã có tài khoản
                        </Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        );
    }

    onClickSignup = () =>{
        if (this.state.clickSignUp === true) {
            return
        }
        if (this.state.fullname === "") {
            ToastAndroid.show('Họ và tên không được để rỗng!')
            return
        }
        if (this.state.username === "") {
            ToastAndroid.show('Tài khoản không được để rỗng!')
            return;
        }
        if (this.state.password === "") {
            ToastAndroid.show('Mật khẩu không được để rỗng!')
            return;
        }
        if (this.checkTextInvalid(this.state.fullname)) {
            ToastAndroid.show("Họ và tên không hợp lệ!", ToastAndroid.SHORT)
            return;
        }
        if (this.checkTextInvalid(this.state.username)) {
            ToastAndroid.show("Tài khoản không hợp lệ!", ToastAndroid.SHORT)
            return;
        }
        if (this.checkTextInvalid(this.state.password)) {
            ToastAndroid.show("Mật khẩu không hợp lệ!", ToastAndroid.SHORT)
            return;
        }

        this.setState({clickSignUp: true});

        fetch(Urls.Domain + Urls.SIGN_UP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                yourname: this.state.fullname,
                avt: null
            })
        }).then(res => {
            const statuscode = res.status;
            this.setState({clickSignUp: false})
            if (statuscode === 400) {
                ToastAndroid.show("Tài khoản đã tồn tại! ", ToastAndroid.SHORT)
                return;
            }
            ToastAndroid.show("Đăng ký thành công! ", ToastAndroid.SHORT)
            this.props.navigation.pop();

        })
    }

    checkTextInvalid(str) {
        const keys = '~!@#$%^&*()_+=?><|:;[]{}`.,+-*/';
        for (let keyElement of keys) {
            if (str.indexOf(keyElement) > -1) {
                return true
            }
        }
        return false

    }
}

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
        marginTop: 30,
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