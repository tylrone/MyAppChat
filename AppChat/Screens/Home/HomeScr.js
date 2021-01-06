import * as React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, ProgressBarAndroid, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeScr extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.route.params.username,
            dataUser: this.props.route.params.data,
            yourNameSearch: '',
        }
        let timeMili = Date.now();
        let dt = new Date(timeMili);
    }

    checkSocket = () => {
    }

    // onClickItemUserOnline = (obj) => {
    //     this.props.navigation.navigate(ConstantScreen.InterfaceScreen, {
    //         usernameOne: this.state.username,
    //         usernameTwo: obj.userName,
    //         yournameTwo: obj.yourName
    //     });
    // }

    // onCLickItemChatList = (obj) => {
    //     this.props.navigation.navigate(ConstantScreen.InterfaceScreen, {
    //         usernameOne: this.state.username,
    //         usernameTwo: obj.nameclient,
    //         yournameTwo: obj.yourname
    //     })
    // }
    
    render(){
        return(
            <View>
               <View>
                   <View>
                       <Image style={styles.img_user} source={require('../../images/'+ this.state.dataUser.avt)} />
                       <Text>{this.state.dataUser.username}</Text>
                   </View>
                   <Icon></Icon>
               </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    group_title: {
        // marginTop: Expo.Constants.statusBarHeight,
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginStart: 20,
        marginEnd: 20,
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