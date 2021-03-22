import firebaseConfig from '../Firebase/firebase';
module.exports.delete = (key) => {
    firebaseConfig.database().ref().child('Product').child(key).remove()
    .then(() => {
        console.log('delete succes');
    }).catch((error) => {
        console.log('delete fail');
    });
}
const _uploadImage = async (uri) => {
    const path = 'images/' + Math.random().toString(36).substr(2) + '.jpg';

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
module.exports.insert = async (name, price, description, image, typeName) => {
    const remoteUri = await _uploadImage(image);
    firebaseConfig.database().ref().child('Product').push({
        name: name,
        price: price,
        description: description,
        image: remoteUri,
        typeName: typeName
    }).then(() => {
        console.log('insert succses');
    }).catch((error) => {
        console.log('insert fail '+ error);
    });
}

module.exports.update = async (key, name, price, description, image, typeName) => {
    const remoteUri = await _uploadImage(image);
    firebaseConfig.database().ref().child('Product').child(key).set({
        name: name,
        price: price,
        description: description,
        image: remoteUri,
        typeName: typeName
    }).then(() => {
        console.log('Update succses');
    }).catch((error) => {
        console.log('Update fail '+ error);
    });
}
