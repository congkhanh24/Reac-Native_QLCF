import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, LogBox, Button, Modal, modalVisible, TouchableOpacity, setModalVisible, TouchableHighlight, Alert, VirtualizedList, ToastAndroid } from 'react-native';
import Swipeout from 'react-native-swipeout';
import firebaseConfig from '../Firebase/firebase';
import ProductDAO from '../DAO/ProductDAO';
import { FloatingAction } from "react-native-floating-action";
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as ProductType from './ProductType';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

LogBox.ignoreAllLogs();

const Product = ({ route, navigation }) => {
    const { typeName } = route.params;
    console.log(typeName + '111');

    const [data, setData] = useState([]);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ currentItem, setCurrentItem ] = useState(null);
    const [ search, setSearch ] = useState(null);

    const [dataS, setDataS] = useState([]);
    const a = () => {
		return 'aaaaa';
	};

    //dialog
    const _hideDialog = () => {
		setModalVisible(false);
	};
	const _showDialog = () => {
		setModalVisible(true);
	};
    
    // chuyen qua screen ProductDetail khi click vao 1 item trong flatlist de chon them vao cart
    const _onPress = (item) => {
        navigation.navigate('ProductDetail', {
            selectedKey: item.key
        });
        
    }

    // function get all Product
    const getAllProduct = (typeName) => {
        const a = () => {
            firebaseConfig.database().ref().child('Product').orderByChild('typeName').equalTo(typeName == undefined ? '': typeName).on('value', snapshot => {
                console.log('User data: ', snapshot.val());
                
                var items = [];
                snapshot.forEach((child) => {
                    let item = {
                        key: child.key,
                        name : child.val().name,
                        price: child.val().price,
                        description: child.val().description,
                        image: child.val().image,
                        typeName: child.val().typeName
                    };
                    items.push(item);
                    
                    
                    //console.log(child.val().image);
                });
                setData(items);
    
            });
        }
        const b = () => {
            firebaseConfig.database().ref().child('Product').on('value', snapshot => {
                console.log('User data: ', snapshot.val());
                
                var items = [];
                snapshot.forEach((child) => {
                    let item = {
                        key: child.key,
                        name : child.val().name,
                        price: child.val().price,
                        description: child.val().description,
                        image: child.val().image,
                        typeName: child.val().typeName
                    };
                    items.push(item);
                    
                    
                    //console.log(child.val().image);
                });
                setData(items);
    
            });
        }
        typeName == undefined ? b() : a();
        
    }

    const _setCurrent = async (item) => {
		await setCurrentItem(item);
	};

    //function search
    const _search = () => {
        console.log(search);
        console.log('1');
        //setDataS(data);
        //console.log(dataS);

        // ham dung de loc du lieu
        const filterName = data.filter((data) => {
            return data.name.toLowerCase().match(search.toLowerCase()); // .match la ham tim kiem trong chuoi co chua ky tu can tim hay khong
        });
        // if no match and text is empty
        if(!search || search === '') {
            console.log('2');
            getAllProduct(typeName);// khi gia tri state thay doi thi thuwcj hien goi lai ham getAllProduct
            console.log('change state');
            console.log('2');
            }
          // if no name matches to text output
          else if(!Array.isArray(filterName) && !filterName.length) {
            console.log("not name");
            console.log('3');
            
          }
          // if name matches then display
          else if(Array.isArray(filterName)) {// Array.isArray la xem xet ham do co tra ve mang hay khong
            console.log('oke');
            console.log('4');
            console.log(filterName);
            console.log('5');
            setDataS(filterName);// neu ham tren tra ve mang thi gan data bang mang do de show len du lieu
          }
    }
    
    useEffect(() => {
        getAllProduct(typeName);
        //LogBox.ignoreWarnings([ 'Setting a timer', 'Warning:', 'VirtualizedList' ]);
    }, []);


    return(
        <View style={styles.container}>
            <TextInput style = {styles.search} onKeyPress = {_search} onChangeText = {text => setSearch(text)} placeholder = 'Search' />
            <FlatList 
                data = {!search ? data : dataS} 
                renderItem = {({item}) => 
                                <ListItem 
                                    _showDialog = {_showDialog} 
                                    item = {item}
                                     _setCurrent = {_setCurrent} 
                                     _onPress = {_onPress}
                                     />}
                >

            </FlatList>
            <TouchableOpacity style = {styles.fab} onPress = {() => {
                console.log('select button');
                _setCurrent(null)
                _showDialog();
                
                
            }}>
                <Text style = {{color: 'white', fontSize: 30}}>+</Text>
            </TouchableOpacity>
            {/* neu co item duoc chon se mo update */}
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
				<View style = {{flex: 1,
                                margin: 40}}>
                    {currentItem ? (
                        <ProductUpdate item = {currentItem} _hideDialog = {_hideDialog} />
                    ) : (
                        <ProductInsert _hideDialog = {_hideDialog} a = {a} />
                        //<Test />
                    )}
                    
                </View>
			</Modal>
        </View>
        
    );
}

export default Product;

// insert function
const ProductInsert = (props) => {
    const [data, setData] = useState([]); 
    const [image, setImage] = useState('https://firebasestorage.googleapis.com/v0/b/quanlycafe-8c05e.appspot.com/o/Image%2Fchooseimage.png?alt=media&token=f6c959c7-f27e-43e1-bfe9-b343ac1239d7');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [typeName, setTypeName] = useState('Chọn loại sản phẩm');

    
    // console.log(ProductType.a());
    // console.log(props.a());
    // console.log(data);

    const getAllProductType = () => {
        firebaseConfig.database().ref().child('ProductType').on('value', snapshot => {
            //console.log('User data: ', snapshot.val());
            
            var items = [];
            snapshot.forEach((child) => {
                let item = {
                    value: child.val().typeName,
                    label : child.val().typeName,
                    
                };
                items.push(item);
                //console.log(child.val().image);
            });
            setData(items);

        });
    }

    //funciton pickimage
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 5],
        quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
        setImage(result.uri);
        //setChooseImage(!chooseImage);
        }
    };

    useEffect(() => {
        getAllProductType();
        //LogBox.ignoreWarnings([ 'Setting a timer', 'Warning:', 'VirtualizedList' ]);
    }, []);

    return(
        <View style={styles.dialog}>
            <Text style = {styles.dialog_header}>Thêm sản phẩm</Text>
                    <Text style = {{color: 'purple'}}>
                        Hãy điền đầy đủ thông tin
                    </Text>
                    <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                        <View style = {styles.dialog_image}>
                            <TouchableOpacity onPress = {() => pickImage()}>
                            <Image style={{ width: 220, height: 220 }} source = {{uri: image} } />
                            </TouchableOpacity>
                            
                        </View>

                        <View>
                            <TextInput style = {styles.dialog_inputText} placeholder = 'Tên sản phẩm' onChangeText = {text => setName(text)} />
                            <TextInput style = {styles.dialog_inputText} keyboardType = 'numeric' placeholder = 'Giá' onChangeText = {text => setPrice(text)} />
                            <TextInput style = {styles.dialog_inputText}  placeholder = 'Mô tả' onChangeText = {text => setDescription(text)} />
                            
                            <RNPickerSelect
                            placeholder = {{
                                label: 'Chọn loại sản phẩm',
                                value: null,
                                color: '#9EA0A4',
                            }}
                            onValueChange={(value) => {console.log(value); setTypeName(value)}}
                            items={data}
                            value={typeName}
                            style={{
                                ...pickerSelectStyles,
                                iconContainer: {
                                    top: 30,
                                    right: 10
                                },
                              }}
                              useNativeAndroidPickerStyle={false}
                              textInputProps={{ underlineColor: 'yellow' }}
                              Icon={() => {
                                return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                              }}
                        />
                        </View>
                        
                        
                        
                        <View style = {{flexDirection: 'row'}}>
                            <TouchableOpacity style = {styles.dialog_button} onPress = {() => {
                               props._hideDialog();
                            }} >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  
                                style = {styles.dialog_button}
                                onPress = {() => {
                                    props._hideDialog();
                                    ProductDAO.insert(name, price, description, image, typeName);
                                }}
                                >
                                <Text style={styles.textStyle}>Add</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    
                    
        </View>
    );
}

const ProductUpdate = (props) => {
    const [key, setKey] = useState(props.item.key);
    const [name, setName] = useState(props.item.name);
    const [price, setPrice] = useState(props.item.price);
    const [description, setDescription] = useState(props.item.description);
    const [image, setImage] = useState(props.item.image);

    const [typeName, setTypeName] = useState(props.item.typeName);
    const [data, setData] = useState([]);
    
    //console.log(image);
    //funciton pickimage
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 5],
        quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
        setImage(result.uri);
        //setChooseImage(!chooseImage);
        }
    };
    const getAllProductType = () => {
        firebaseConfig.database().ref().child('ProductType').on('value', snapshot => {
            //console.log('User data: ', snapshot.val());
            
            var items = [];
            snapshot.forEach((child) => {
                let item = {
                    value: child.val().typeName,
                    label : child.val().typeName,
                    
                };
                items.push(item);
                //console.log(child.val().image);
            });
            setData(items);

        });
    }
    useEffect(() => {
        getAllProductType();
        //LogBox.ignoreWarnings([ 'Setting a timer', 'Warning:', 'VirtualizedList' ]);
    }, []);

    return(
        <View style={styles.dialog}>
            <Text style = {styles.dialog_header}>Sửa sản phẩm</Text>
                    <Text style = {{color: 'purple'}}>
                        Hãy điền đầy đủ thông tin
                    </Text>
                    <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                        <View style = {styles.dialog.image}>
                            <TouchableOpacity onPress = {() => pickImage()}>
                            <Image style={{ width: 200, height: 250 }} source = {{uri: image} } />
                            </TouchableOpacity>
                            
                        </View>

                        <View>
                            <TextInput style = {styles.dialog_inputText} value={name} onChangeText = {text => setName(text)} />
                            <TextInput style = {styles.dialog_inputText} value={price} keyboardType = 'numeric' placeholder = 'Giá' onChangeText = {text => setPrice(text)} />
                            <TextInput style = {styles.dialog_inputText} value={description}  placeholder = 'Mô tả' onChangeText = {text => setDescription(text)} />
                        </View>

                        <RNPickerSelect
                            onValueChange={(value) => {console.log(value); setTypeName(value)}}
                            items={data}
                            value={typeName}
                            style={{
                                ...pickerSelectStyles,
                                iconContainer: {
                                    top: 30,
                                    right: 10
                                },
                              }}
                              useNativeAndroidPickerStyle={false}
                              textInputProps={{ underlineColor: 'yellow' }}
                              Icon={() => {
                                return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                              }}
                        />

                        <View style = {{flexDirection: 'row'}}>
                            <TouchableOpacity style = {styles.dialog_button} onPress = {() => {
                               props._hideDialog();
                            }} >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  
                                style = {styles.dialog_button}
                                onPress = {() => {
                                    props._hideDialog();
                                    ProductDAO.update(key, name, price, description, image, typeName);
                                }}
                                >
                                <Text style={styles.textStyle}>Update</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    
                    
        </View>
    );

}

// item FlatList function
const ListItem = (props) =>{
    // cau hinh Swipeout
    const swipeoutSetting = {
        autoClose: true,
        onClose: () => {
            console.log('Close swipeout');
            props._setCurrent(null);
        },
        onOpen: () => {
            console.log('Open swipeout');
            props._setCurrent(props.item);
        },
        
        
        right: [
            {
                text: 'Update',
                type: 'primary',
                onPress: () => {
                    console.log('update');
                    props._setCurrent(props.item);
                    props._showDialog();
                },
                backgroundColor: 'blue',
            },
            
            {
                component: (
                    <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                        }}
                    >
                      <Image source={require('../Image/delete.png')} />
                    </View>
                  ),
                
                type: 'delete',
                onPress: () => {
                    Alert.alert(
                        'Delete',
                        'Are you want delete product '+ props.item.name,
                        [
                            {text: 'No', onPress: () => console.log('Cancel delete'), type: 'cancel'},
                            {text: 'Yes', onPress: () => ProductDAO.delete(props.item.key)}
                        ]
                    )
                },
                
            }
        ]
        
    };
    return (
        <Swipeout {...swipeoutSetting}>
            <TouchableOpacity onPress = { () => {console.log('1'+ props.item.key);
                                                props._onPress(props.item);
                                                }}>
                <View style={styles.listContainer}>
                    <Image style = {styles.image_list} source = {{uri: props.item.image}}></Image>
                    <View style = {{width:width}}>
                        <Text style = {{
                            marginLeft: 10,
                            fontSize: 15,

                            }}>
                                Name : {props.item.name}
                        </Text>
                        <Text style = {{
                            marginLeft: 10,
                            fontSize: 15, 
                            marginTop: 10
                            }}>
                                Price : {props.item.price}
                        </Text>
                        <Text style = {{
                            marginLeft: 10,
                            fontSize: 15, 
                            marginTop: 10,
                            width: width / 2
                            }}>
                                Description : {props.item.description}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            
        </Swipeout>
    );
}


const {width, height} = Dimensions.get('window');
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'purple',
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      backgroundColor: 'white',
      width: 250,
      height: 48,
      marginTop: 20
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: 'purple',
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      backgroundColor: 'white',
      width: 250,
      height: 48,
      marginTop: 20
    },
  });
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#dbddde',
    },
    image_list: {
        width: 100,
        height: 150,
    },
    listContainer: {
        flexDirection: 'row',
        margin: width * 3.6 / 187.5,
        padding: width * 3.6 / 187.5,
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 0,
    },
    text:{
        fontSize: 30,
        marginTop: 10,
        color: 'white',
        fontWeight: 'bold'
    },

    
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    dialog_inputText: {
          borderWidth: 1,
          width: 250,
          height: 40,
          marginTop: 20,
          padding: 10,
          fontSize: 15,
          borderColor: 'purple',
          color: 'black'
    },

    dialog_button: {
        borderWidth: 1,
        margin: 10,
        color: 'white',
        borderColor: 'purple',
        fontSize: 20,
        backgroundColor: 'purple',
        justifyContent: "center",
        borderRadius: 3,
        width: 100,
        height: 48
      },
    fab: {
          borderWidth: 1,
          width: 50,
          height: 50,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: 'purple',
          borderColor: 'purple',
          position: 'absolute',
		  bottom: 20,
		  right: 20,
    }, 
    toogle: {
          height: 50, 
          backgroundColor: 'purple', 
          justifyContent: 'center', 
          alignItems: 'center',
    },
    dialog: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center'
    },
    dialog_header: {
        fontSize: 30, 
        fontWeight: 'bold', 
        color: 'purple'
    },
    dialog_image: {
        alignItems: 'center', 
        height: 220,
        width: 220,
        justifyContent: 'center', 
        borderWidth: 1,
        borderColor: 'purple'
    },
    search: {
        height: 45,
        margin: width * 3.6 / 187.5,
        padding: width * 3.6 / 187.5,
        backgroundColor: 'white',
        borderRadius: 15,
        fontSize: 15
    }
})


