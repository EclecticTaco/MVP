import React, {Component } from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator, Image, TextInput, Keyboard, ScrollView} from 'react-native';

export default class App extends Component  {
    constructor(props) {
        super(props);
        this.state = {
          value: ''
        }
        this.onChangeText = this.onChangeText.bind(this);
    }

    onChangeText = (value) => {
        this.setState({value})
    }
    render() {
        return (
            <ScrollView
            scrollEnabled= {false}
            keyboardShouldPersistTaps= {'handled'}
            >
                <View>
                    <TextInput
                    style = {styles.inputBox}
                    placeholder= 'Enter ISBN-10 or ISBN-13'
                    onChangeText= {this.onChangeText}
                    value= {this.state.value}
                    defaultValue= {this.state.text}
                    keyboardType= {'number-pad'}
                    maxLength= {13}
                    /> 
                </View>

                <View>
                    <Button 
                    onPress={() => {this.props.getBook(this.state.value)}}
                    title="Grab a book!"
                    />
                </View>
            </ScrollView>
        )

    }
}

const styles = StyleSheet.create({
    inputBox: {
        paddingBottom: 15,
        justifyContent: 'center',
        alignItems: 'stretch',
    },

})