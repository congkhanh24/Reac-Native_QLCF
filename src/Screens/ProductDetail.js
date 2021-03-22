import React, {useEffect} from 'react';
import { useState } from 'react';
import firebaseConfig from '../Firebase/firebase';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';

const ProductDetail = ({route}) => {
    const { selectedKey } = route.params;
    const [data, setData] = useState([]);

    const [cart, setCart] = useState();

    console.log('3 detail '+ selectedKey);
    
    const getProduct = () => {
        firebaseConfig.database().ref().child("Product").child(selectedKey).get().then(function(snapshot) {
            if (snapshot.exists()) {
              //console.log(snapshot.val());
              setData(snapshot.val());
            }
            else {
              console.log("No data available");
            }
          }).catch(function(error) {
            console.error(error);
          });
    }

    useEffect(() => {
        getProduct();
        //LogBox.ignoreWarnings([ 'Setting a timer', 'Warning:', 'VirtualizedList' ]);
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.headerBackgroundImage}
                blurRadius={10}
                source={require('../Image/background.jpg')}
            >
                <View style={styles.headerColumn}>
                    <Image
                        style={styles.PictureImage}
                        source={{uri: data.image}}
                    />
                    <Text style={styles.text_title}>{data.name}</Text>
                </View>
            </ImageBackground>
              <View style={styles.content}>
                  <View style={styles.viewContent}>
                      <Text style={styles.text_content}>Giá: {data.price}$</Text>
                      <Text style={styles.text_content}>Mô tả: {data.description}</Text>
                      <Text style={styles.text_content}>Loại sản phẩm: {data.typeName}</Text>
                  </View >
                  <View style={styles.view_button}>
                      <TouchableOpacity style = {styles.button_add}>
                        <Text style={styles.text_content}>Add to cart</Text>
                      </TouchableOpacity>
                  </View>
              </View>
        </View>
    );
}
export default ProductDetail;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    
    headerBackgroundImage: {
      paddingBottom: 20,
      paddingTop: 25,
      height: height,
      flex: 1
    },
    headerContainer: {
        
    },
    headerColumn: {
      backgroundColor: 'transparent',
      ...Platform.select({
        ios: {
          alignItems: 'center',
          elevation: 1,
          marginTop: -1,
        },
        android: {
          alignItems: 'center',
        },
      }),
    },
    content: {
      //backgroundColor: 'green',
      width: width,
      height: height / 2,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    },
    
    text_content: {
      color: 'white',
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      padding: 5
    },
    PictureImage: {
      borderColor: '#FFF',
      borderRadius: 15,
      borderWidth: 3,
      height: 300,
      width: 250,
    },
    text_title: {
      color: '#FFF',
      fontSize: 22,
      fontWeight: 'bold',
      paddingBottom: 8,
      textAlign: 'center',
    },
    button_add: {
        borderColor: 'white',
        borderWidth: 1,
        width: width/1.2,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 20
    },
    view_button: {
        height: 100,
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        //backgroundColor : 'yellow',
        flex: 1
    },
    viewContent: {
        flex: 1,
        width: width,
        //backgroundColor: 'red',
        justifyContent: 'center',
    }
  })