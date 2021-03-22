import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Dimensions, StatusBar, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import firebaseConfig from '../Firebase/firebase'

const Login = ({navigation}) => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    // function check login auth
    const _loign = async (email, password) => {
        await firebaseConfig.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        navigation.replace('Main');
        ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT);
      });
    }

    return(
        <View style = {styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="purple"
                barStyle={'light-content'}
                hidden={false} />
            <Text style = {styles.text_Login}>LOGIN</Text>
            <View style = {styles.container_formlogin}>
                <View style = {styles.view_Input}>
                    <Image source={require('../Image/user.png')} />
                    <TextInput style = {styles.textInput_formLogin} 
                        placeholder = "User name"
                        onChangeText = {(text) => setEmail(text)}
                        value = {email}
                    />
                </View>
                
                <View style = {styles.view_Input}>
                    <Image source={require('../Image/password.png')} />
                    <TextInput style = {styles.textInput_formLogin} 
                        placeholder = "Password"
                        onChangeText = {(text) => setPassword(text)} 
                        value = {password}
                        secureTextEntry = {true}
                        />
                </View>
                <TouchableOpacity style = {styles.buttonLogin} onPress={() => _loign(email, password)}>
                    <Text style = {styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                
            </View>
            <View style = {{flexDirection: 'row'}}>
                <Text>Don't have an account ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style = {{fontWeight: 'bold', marginLeft: 5}}>Sign up</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
    
}



export default Login;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    container_formlogin:{
        backgroundColor: 'white',
        width: 300,
        height: 250,
        alignItems: 'center'
    },
    text_Login: {
        color: 'purple',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 100,
        marginTop: 100
    },
    textInput_formLogin: {
        width: 300,
        height: 50,
        padding: 10,
        color: 'black'
    },
    view_Input: {
        borderRadius: 25,
        borderWidth:1,
        borderColor: 'purple',
        marginTop: 20,
        flexDirection: 'row',
        width: 300,
        height: 50,
        alignItems: 'center',
    },
    buttonLogin: {
        marginTop: 20,
        borderRadius: 25,
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'purple'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});
