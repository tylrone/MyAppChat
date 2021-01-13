import * as React from 'react';
import {View, Button, Image, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Urls from '../../Const/Urls';

export default class ListUsersChatVertical extends React.Component{
    constructor(props) {
        super(props);
        this.callback = this.props.onClick
        this.callbackLongClick = this.props.onLongClick
        this.state = {
            data : this.props.data,
        }
    }

    pt = () => {
        let pt = ""
        formatTime(this.props.data.timechatlast, function (result) {
            pt = result;
        })
        return pt
    }
    onClickView = () => {
        this.callback(this.props.data)
    }

    onLongClickView = () => {
         this.callbackLongClick(this.props.data)
        
    }
    

    render(){
        //console.log(this.state.data)
        return(
            <TouchableOpacity delayLongPress={1000} onPress={this.onClickView} onLongPress={this.onLongClickView}>
                <View style={styles.container}>
                    <View style={styles.container_img}>
                        <Image style={styles.img_represent} source={{uri: Urls.Domain+ '/' + this.props.data.avt}} />
                    </View>
                    <View style={styles.container_content}>
                        <View style={styles.title_top}>
                            <Text numberOfLines={1} style={styles.tv_title}>{this.props.data.yourname}</Text>
                        </View>
                        <View style={styles.title_bottom}>
                            <Text numberOfLines={1} style={styles.tv_content}>{this.props.data.content}</Text>
                            <Text numberOfLines={1} style={styles.tv_time}>{this.pt()}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

function formatTime(milisecond, callback) {
    let d = new Date(milisecond);
    let day = d.getDate();
    day = formatNumber(day)

    let month = d.getMonth()+1;
    month = formatNumber(month)

    let year = d.getFullYear();

    let hours = d.getHours();
    hours = formatNumber(hours)

    let min = d.getMinutes();
    min = formatNumber(min)

    let time = hours + ":" + min;
    let pt = time + ' ' + day + '/' + month + '/' + year;
    callback(pt);
}

function formatNumber(value) {
    let v = "";
    v = value < 10 ? '0' + value : value;
    return v;
}


const styles = StyleSheet.create({
    container: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
    },
    container_img: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img_represent: {
        height: 50,
        width: 50,
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#ddd',
    },
    container_content: {
        flex: 8,
        justifyContent: 'center',
    },
    title_top: {
        marginBottom: 5,

    },
    title_bottom: {
        flexDirection: 'row',
    },
    tv_title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    tv_content: {
        flex: 1,
        color: 'gray',
    },
    tv_time: {
        color: 'gray',
        marginEnd: 10,
    },

})