import React from 'react';
import { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import firebaseConfig from '../Firebase/firebase';


const Register = ({navigation}) => {
    const [email, setEmail]  = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordAgain, setPasswordAgain] = useState(null);

    //function register authencation
    const _register = async (email, password) => {
        if(password === passwordAgain){
            await firebaseConfig.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
            // Signed in 
            //var user = userCredential.user;
            // ...
                console.log('success');
                navigation.navigate('Login');
                ToastAndroid.show('Đăng kí thành công' , ToastAndroid.SHORT);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
                console.log(errorCode + '-' + errorMessage);
            });

        }else{
            ToastAndroid.show('Hai mật khẩu phải trùng nhau' , ToastAndroid.SHORT);
        }
    }


    return(
        <View style = {styles.container}>
            <Text style = {styles.text_Login}>REGISTER</Text>
            <View style = {styles.container_formlogin}>
                <View style = {styles.view_Input}>
                    <Image source={require('../Image/user.png')} />
                    <TextInput style = {styles.textInput_formLogin} 
                        placeholder = "User name"
                        onChangeText = {text => setEmail(text)} 
                        value = {email}/>
                </View>
                
                <View style = {styles.view_Input}>
                    <Image source={require('../Image/password.png')} />
                    <TextInput style = {styles.textInput_formLogin} 
                    placeholder = "Password"
                    onChangeText = {text => setPassword(text)}
                    value = {password}
                    secureTextEntry = {true} />
                </View>
                <View style = {styles.view_Input}>
                    <Image source={require('../Image/password.png')} />
                    <TextInput style = {styles.textInput_formLogin} 
                    placeholder = "Password again"
                    onChangeText = {text => setPasswordAgain(text)}
                    value = {passwordAgain}
                    secureTextEntry = {true} />
                </View>

                {/* <View style = {styles.view_Input}>
                    <Image source={require('../Image/password.png')} />
                    <TextInput style = {styles.textInput_formLogin} placeholder = "Full name"/>
                </View>
                <View style = {styles.view_Input}>
                    <Image source={require('../Image/password.png')} />
                    <TextInput style = {styles.textInput_formLogin} placeholder = "Phone"/>
                </View> */}
                <TouchableOpacity style = {styles.buttonLogin} onPress = {() => _register(email, password)}>
                    <Text style = {styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>

                
                
                <TouchableOpacity style = {{flexDirection: 'row', marginTop: 10}} onPress = {() => navigation.navigate('Login')}>
                    <Text> I have an account</Text>
                    <Text style = {{fontWeight: 'bold', marginLeft: 5}}>Sign in</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
    
}
export default Register;


// //function register authencation
// const _register = async (email, password, {navigation}) => {
//     await firebaseConfig.auth().createUserWithEmailAndPassword(email, password)
//     .then((user) => {
//     // Signed in 
//     //var user = userCredential.user;
//     // ...
//     console.log('success');
//     navigation.navigate('Login');
//     ToastAndroid.show('Đăng kí thành công' , ToastAndroid.SHORT);
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ..
//     console.log(errorCode + '-' + errorMessage);
//   });
// }


const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    container_formlogin:{
        backgroundColor: 'white',
        width: 300,
        height: 450,
        alignItems: 'center'
    },
    text_Login: {
        color: 'purple',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 50,
        marginTop: 100
    },
    textInput_formLogin: {
        width: 300,
        height: 100,
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
