import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, Button, StyleSheet, Image, TextInput} from 'react-native';


export default class SearchUser extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.username,
            textInput: '',
        }

        this.callback = this.props.onChange;

    }
    onTextChange = (e) => {
        this.callback(e)
    }
    render(){
        return(
            <View style={styles.container}>
                <TextInput 
                    placeholder='Tìm tên...' 
                    style={styles.textinput}
                    value={this.props.yournameSearch}
                    onChangeText={(e) => this.onTextChange(e)}
                />
                <Icon name='search' style={styles.icon_search}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginStart: 30,
        marginEnd: 30,
        paddingStart: 20,
        paddingEnd: 20,
        borderRadius: 50,
        marginTop: 25,
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        zIndex:-1
    },
    icon_search: {
        flex: 1,
        lineHeight: 40,
        fontSize: 20,
        color: '#000'
    },
    textinput: {
        paddingBottom: 7,
        paddingTop: 7,
        fontSize: 16,
        paddingStart: 5,
        flex: 10,
        backgroundColor:'#EEEEEE'
    }
})