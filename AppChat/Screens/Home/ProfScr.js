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
            yourNameSearch: '',
        }

        BackHandler.addEventListener('hardwareBackPress', function () {
            console.log("onback press")

        })
        
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.group_title}>
                    <View style={styles.groud_user_search}>
                    <Icon 
                                name='chevron-left'
                                style={styles.icon_back}
                                onPress={() => {
                                        this.props.navigation.navigate('HomeScr',{username: this.state.username, data: this.props.route.params.data, token:this.props.route.params.token});
                                    }
                                }
                            />
                        <Image style={styles.img_user} source={{uri: Urls.Domain+ '/' + this.state.dataUser.avt}} />
                        <Text style={styles.tl}>{this.props.route.params.data.yourName}</Text>
                    </View>
                   
                </View>
                <View style={{paddingLeft:10,paddingRight:10, paddingTop:10}}>
                    <View >
                        <Text style={{fontSize:20,}}>Họ và tên: {this.props.route.params.data.yourName}</Text>
                    </View>
                    <View>
                        <Button  
                            mode="contained" 
                            style={{borderRadius:40, marginTop:20}} 
                            color="purple"
                            onPress={ () => this.props.navigation.navigate('UpdateProf', {data: this.props.route.params.data, token: this.props.route.params.token})}
                        >Sửa thông tin</Button>
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
        height: 40,
        width: 40,
        borderRadius: 30,
        backgroundColor: '#000',
        marginTop:10,
        marginLeft:30
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

})