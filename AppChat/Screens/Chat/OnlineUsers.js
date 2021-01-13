import * as React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Urls from '../../Const/Urls.js';
import ListUsersOnlineHorizon from './ListUsersOnlineHorizon.js';

export default class OnlineUsers extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            token: this.props.token,
            data: [],
        }
        
        this.callback = this.props.onClick

    }
    componentDidMount() {
        this.getAllUserOnline();
    }

    getAllUserOnline = () => {
        fetch(Urls.Domain + Urls.getAllUser, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: this.state.token
            },
            body: JSON.stringify({
                username: this.state.username,
            })
        }).then((response) => response.json())
            .then((json) => {
                this.setState({data: json})
            })
    }

    callBackItem = (obj) => {
        this.callback(obj)
    }
    
    render(){
        return(
            
            <View style={styles.container}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        this.state.data.map((e, i) => (
                                <ListUsersOnlineHorizon onClick={this.callBackItem} data={e} key={i} />
                            )
                        )
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 80,
        width: '100%',
        marginTop: 15,
        zIndex:-1
    }
})