import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TextInput, ImageBackground,
    Platform,
    ScrollView,
    TouchableOpacity, Modal, Alert, RefreshControl} from 'react-native';
import firebaseConfig from '../Firebase/firebase';
import * as ImagePicker from 'expo-image-picker';


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Profile = (navigation) => {
    var user = firebaseConfig.auth().currentUser;
    const [name, setName] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
    const [email, setEmail] = useState(null);
    const [uid, setUid] = useState(null);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => {setRefreshing(false), getProfile()});
    }, []);

    const _hideDialog = () => {
      setModalVisible(false);
    };
    const _showDialog = () => {
      setModalVisible(true);
    };
    
    const getProfile = () => {
        if (user != null) {
            setName(user.displayName);
            setEmail(user.email);
            if(user.photoURL == null){
                setPhotoURL("https://firebasestorage.googleapis.com/v0/b/quanlycafe-8c05e.appspot.com/o/Image%2Fchooseimage.png?alt=media&token=f6c959c7-f27e-43e1-bfe9-b343ac1239d7");
            }else{
                setPhotoURL(user.photoURL);
            }
            
            setUid(user.uid);  // The user's ID, unique to the Firebase project. Do NOT use
                             // this value to authenticate with your backend server, if
                             // you have one. Use User.getToken() instead.
          }
    }
    useEffect(() => {
        getProfile();
        console.log(photoURL);
        //LogBox.ignoreWarnings([ 'Setting a timer', 'Warning:', 'VirtualizedList' ]);
    }, []);

    return(
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        
        <View style={styles.container}>
            <ImageBackground
                style={styles.headerBackgroundImage}
                blurRadius={10}
                //source={{uri: 'https://i.redd.it/zj8bdxwn88f31.png'}}
                source={require('../Image/background.jpg')}
            >
                <View style={styles.headerColumn}>
                    <Image
                        style={styles.userImage}
                        source={{uri: photoURL}}
                    />
                    <Text style={styles.userNameText}>{name}</Text>
                    <View style={styles.userAddressRow}>
                        <View style={styles.userCityRow}>
                            <Text style={styles.userCityText}>Hồ Chí Minh</Text>
                            <Text style = {styles.textContent}>{email}</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress = {() => {_showDialog()}} style={styles.ButtonEdit}>
                          <Image style = {styles.imageIcon} source={require('../Image/edit.png')}  />
                          <Text style = {styles.textButton}>Edit profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>

            <Modal animationType="slide" transparent={true} visible={modalVisible}>
				        <View style = {{flex: 1,margin: 40}}>
                    <EditInfo onRefresh = {onRefresh} _hideDialog = {_hideDialog} />
                </View>
			      </Modal>
        </View>
      </ScrollView>
        
        
    );
}
export default Profile;

const EditInfo = (props) => {
  var user = firebaseConfig.auth().currentUser;
  const [image, setImage] = useState(user.photoURL);
  const [name, setName] = useState(user.displayName);
  

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

  const _uploadImage = async (uri) => {
    const path = 'ImageProfile/' + Math.random().toString(36).substr(2) + '.jpg';

    return new Promise(async (res, rej) => {
        const response = await fetch(uri);
        const file = await response.blob();

        let upload = firebaseConfig.storage().ref(path).put(file);

        upload.on(
            'state_changed',
            (snapshot) => {},
            (err) => {
                rej(err);
            },
            async () => {
                const url = await upload.snapshot.ref.getDownloadURL();
                res(url);
            }
        );
    });
  };

  const updateProfile = async (image) => {
    const remoteUri = await _uploadImage(image);
    user.updateProfile({
        displayName: name,
        photoURL: remoteUri,
      }).then(function() {
        // Update successful.
        console.log('Update Profile successful.');
      }).catch(function(error) {
        // An error happened.
        console.log('Update Profile not successful.')
      });
  }
  return(
    <View style = {styles.modal_container}>
      <View style = {styles.modal_View}>
          <Text>Edit profile</Text>
          <View style = {styles.dialog_image}>
              <TouchableOpacity onPress = {() => pickImage()}>
                <Image style={{ width: 150, height: 150 }} source = {{uri: image} } />
              </TouchableOpacity>
                            
          </View>
          <TextInput style = {styles.dialog_inputText} value = {name} placeholder = 'Nhập tên của bạn' onChangeText = {text => setName(text)} /> 
          <View style = {{flexDirection: 'row'}}>
              <TouchableOpacity style = {styles.dialog_button} onPress = {() => {props._hideDialog()}}>
                  <Text style = {styles.button_text}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style = {styles.dialog_button} onPress = {() => {updateProfile(image); props._hideDialog();}}>
                  <Text style = {styles.button_text}>Edit</Text>
              </TouchableOpacity>
          </View>
      </View>
      
    </View>
  );
}
  

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    dialog_image: {
      alignItems: 'center', 
      height: 150,
      width: 150,
      justifyContent: 'center', 
      borderWidth: 1,
      borderColor: 'purple'
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
    headerBackgroundImage: {
      paddingBottom: 20,
      paddingTop: 45,
      height: height
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
    
    scroll: {
      backgroundColor: 'red',
    },
    userAddressRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    
    userCityText: {
      color: '#A5A5A5',
      fontSize: 15,
      fontWeight: '600',
      textAlign: 'center',
    },
    userImage: {
      borderColor: '#FFF',
      borderRadius: 85,
      borderWidth: 3,
      height: 170,
      marginBottom: 15,
      width: 170,
    },
    userNameText: {
      color: '#FFF',
      fontSize: 22,
      fontWeight: 'bold',
      paddingBottom: 8,
      textAlign: 'center',
    },

    textContent: {
        fontSize: 20,
        marginTop: 10,
        color: '#19070B',
    },
    imageIcon: {
      width: 20,
      height: 20,
    },
    ButtonEdit: {
      width: 120,
      height: 48,
      flexDirection: 'row',
      
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textButton: {
      fontSize: 20
    },
    modal_container: {
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center'
  },
  modal_View: {
      backgroundColor: 'white', 
      width: width / 1.2 , 
      height: height / 2,
      alignItems: 'center', 
  },

  button_text: {
    textAlign: 'center',
    color: 'white'
  }


  })