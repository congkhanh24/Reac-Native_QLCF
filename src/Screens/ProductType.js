import React, { useEffect, useState } from 'react';
import firebaseConfig from '../Firebase/firebase';
import ProductTypeDAO from '../DAO/ProductTypeDAO';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Modal, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';  

  const Item = ({ item, onPress, style, onLongPress }) => (
    <View style={styles.view_flatlist}>
        <TouchableOpacity onLongPress = {onLongPress} onPress={onPress} style={[styles.item, style]}>
            <Text style = {styles.item_title}>{item.typeName}</Text>
        </TouchableOpacity>
    </View>
  );
  export const a = () => {
      return 'khanh';
  }
const ProductType = ({navigation}) => {
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [ currentItem, setCurrentItem ] = useState(null);

    const _hideDialog = () => {
		setVisible(false);
	};
	const _showDialog = () => {
		setVisible(true);
	};

    // ham de render ra item trong flatlist
    const renderItem = ({ item }) => {
        const backgroundColor = item.key === selectedId ? "#5C1879" : "#FFFFFF";
        return (
          <Item
            item={item}
            onPress={() => {
                setSelectedId(item.key);
                navigation.navigate('Product', {
                    typeName: item.typeName
                });
            } }
            style={{ backgroundColor }}
            onLongPress = {() => {setCurrentItem(item); setSelectedId(item.key); _showDialog() }}
          />
        );
    };
    
    const getAllProductType = () => {
        firebaseConfig.database().ref().child('ProductType').on('value', snapshot => {
            //console.log('User data: ', snapshot.val());
            
            var items = [];
            snapshot.forEach((child) => {
                let item = {
                    key: child.key,
                    typeName : child.val().typeName,
                    
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
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                extraData={selectedId}
            />
            <TouchableOpacity style = {styles.fab} onPress = {() => {
                console.log('select button');
                _showDialog();
                setCurrentItem(null);
                
            }}>
                <Text style = {{color: 'white', fontSize: 30}}>+</Text>
            </TouchableOpacity>
            <Modal animationType = 'slide' transparent = {true} visible = {visible} >
                <View style={styles.modal_container}>
                    <View style={styles.modal_View}>
                        <ProductTypeInsertUpdate item = {currentItem} _hideDialog = {_hideDialog}  />
                    </View>
                </View>
            </Modal>
        </View>
        
    );
}
export default ProductType;


const ProductTypeInsertUpdate = (props) => {
    const [item] = useState(props.item);
    const [isInsert] = useState(item == null);

    const [key, setKey] = useState('');
    const [typeName, setTypeName] = useState('');


    useEffect(() => {
		if (!isInsert) {
			setTypeName(props.item.typeName);
            setKey(props.item.key);
		}
	}, []);
    return (
        <View>
            <Text style = {styles.dialog_header}>{isInsert ? 'Thêm ' : 'Sửa '}loại sản phẩm</Text>
            <TextInput style = {styles.dialog_inputText} value = {typeName} onChangeText = {text => setTypeName(text)} placeholder = 'Tên loại sản phẩm' />
            
            <View style = {{flexDirection: 'row'}}>
                <TouchableOpacity style = {styles.dialog_button} onPress = {() => {
                    props._hideDialog();
                }}>
                    <Text style = {styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.dialog_button} onPress = {() => {
                    isInsert ? ProductTypeDAO.insert(typeName) : ProductTypeDAO.update(key, typeName);
                    
                    props._hideDialog();
                }}>

                    <Text style = {styles.textStyle}> {isInsert ? 'Add' : 'Update'} </Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
    
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        width: width/1.1,
        height: 70,
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        marginVertical: 5,
        padding: 10,
      },

    view_flatlist: { 
        width: width, 
        height: 80, 
        alignItems: 'center',
    },
    item_title: {
        color: 'black'
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
    modal_container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal_View: {
        backgroundColor: 'white', 
        width: width / 1.2 , 
        height: height / 4,
        alignItems: 'center', 
    },
    dialog_header: {
        fontSize: 30, 
        fontWeight: 'bold', 
        color: 'purple'
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
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});