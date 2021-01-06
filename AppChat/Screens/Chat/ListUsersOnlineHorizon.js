import * as React from 'react';
import {View, Image, Button, StyleSheet, Text} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

export default class ListUsersOnlineHorizon extends React.Component{
    constructor(props) {
        super(props)
        this.callback = this.props.onClick
    }
    onItemClick = () => {
        this.callback(this.props.data)
    }
    render(){
        return(
            <TouchableHighlight onPress={this.onItemClick} underlayColor={'#fff'}>
                <View style={styles.container}>
                    <Image style={styles.img_user}/>
                    <Image style={styles.img_active}/>
                    <Text numberOfLines={1} style={styles.name}>{this.props.data.yourName}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: 80,
        marginStart: 10,
        marginEnd: 10,
        position: 'relative',
        alignItems: 'center',
    },
    img_user: {
        backgroundColor: 'gray',
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    name: {
        width: '100%',
        height: 30,
        fontWeight:'bold',
        textAlign: 'center',
    },
    img_active: {
        height: 10,
        width: 10,
        position: 'absolute',
        bottom: 0,
        borderRadius: 5,
        backgroundColor: ColorConstants.ColorGreen,
    }
})