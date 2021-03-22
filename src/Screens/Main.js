import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import firebaseConfig from '../Firebase/firebase';

const Main = ({navigation}) => {
    const [image, setImage] = useState('https://firebasestorage.googleapis.com/v0/b/quanlycafe-8c05e.appspot.com/o/ImageProfile%2Fuserimage.png?alt=media&token=8884676c-ab3f-4f44-8523-410a589703b9');
    const [name, setName] = useState(null);
    var user = firebaseConfig.auth().currentUser;

    const getInfoUser = () => {
        setImage(user.photoURL);
        setName(user.displayName);
    }

    useEffect(() => {
        getInfoUser();
    }, []);


    return(
        <View style={styles.container}>
            <View style={styles.header_container}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <View style={styles.header}>
                        <Image style = {{width: 80,height: 80, borderRadius: 100}} 
                            source={{uri: image}} />
                        <Text style = {{color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>Hello {name}</Text>
                    </View>
                </TouchableOpacity>
                
                <View style={styles.header_navigation}>
                    <View style={{justifyContent: 'space-around'}}>
                        <TouchableOpacity style={styles.button_navigation} onPress={() => navigation.navigate('ProductType')}>
                            <Image style = {styles.image_navigation} source={require('../Image/categorize.png')}/>
                            <Text>Loại sản phẩm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button_navigation} onPress = {() => {navigation.navigate('Product', {})} }>
                            <Image style = {styles.image_navigation} source={require('../Image/menu1.png')}/>
                            <Text>Menu</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{justifyContent: 'space-around'}}>
                        <TouchableOpacity style={styles.button_navigation}>
                            <Image style = {styles.image_navigation} source={require('../Image/thongke1.png')}/>
                            <Text>Thống kê</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button_navigation}>
                            <Image style = {styles.image_navigation} source={require('../Image/bill.png')}/>
                            <Text>Hóa đơn</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
            <View>
                <ImageBackground 
                    style={styles.headerBackgroundImage}
                    source={require('../Image/toancanh.jpg')}>
                    <Text>AAA</Text>
                </ImageBackground>
                
            </View>
        </View>
    );
}
export default Main;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        
    },
    header_container: {
        width: width,
        height: height / 1.8,
        backgroundColor: 'purple',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: 'red',
        width: width,
        padding: 15
    },
    header_navigation: {
        backgroundColor: 'white',
        width: width / 1.1,
        height: height / 2 / 1.5,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'white',
        flexDirection: 'row',
        
        justifyContent: 'space-around'
    },
    image_navigation : {
        height: 70, 
        width: 70
    },
    button_navigation: {
        alignItems: 'center',
        
    },
    headerBackgroundImage: {
        height: height/2,
        width: width
      },
    
});