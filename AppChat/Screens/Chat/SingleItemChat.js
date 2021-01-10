import * as React from 'react'
import {Button, View, Image, Text, StyleSheet} from 'react-native';
import Urls from '../../Const/Urls';

export default class SingleItemChat extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // username: this.props.username,
            // directionLeft: (this.props.username === this.props.data.usernameChat),
            // data: this.props.data,
        }
        
    }
    render(){
        //console.log(this.state.data)
        //console.log(this.state.data.length)
        if(this.props.username != this.props.data.usernameChat){
            return(
                <View style={stylesLeft.container}>
                    {/* <Image style={stylesLeft.img} source={{uri: Urls.Domain+ '/' + this.state.thumb[1]}}/> */}
                    <View style={stylesLeft.group_content}>
                        <Text style={stylesLeft.content}>
                            {this.props.data.content}
                        </Text>
                    </View>
                </View>
            )
        }else{
            return(
                <View style={stylesRight.container}>
                    <View style={stylesRight.group_content}>
                        <Text style={stylesRight.content}>{this.props.data.content}</Text>
                    </View>
                    {/* <Image style={stylesRight.img} source={{uri: Urls.Domain+ '/' + this.state.thumb[0]}}/> */}
                </View>
            )
        }
        
        
    }
}


const stylesLeft = StyleSheet.create({
    container: {
        flex: 1,
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
    },
    img: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'black',
    },
    group_content: {
        justifyContent: 'center',
    },
    content: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'gray',
        marginStart: 10,
        marginEnd: 50,
        textAlign: 'left',
        color: 'white',
    }
})

const stylesRight = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    img: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'black',
    },
    group_content: {
        justifyContent: 'center'
    },
    content: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'blue',
        marginStart: 50,
        marginEnd: 10,
        textAlign: 'left',
        color: 'white',
    }
})