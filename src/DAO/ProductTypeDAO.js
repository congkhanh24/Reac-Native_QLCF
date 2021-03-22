import firebaseConfig from '../Firebase/firebase';

module.exports.insert = (typeName) => {
    firebaseConfig.database().ref().child('ProductType').push({
        typeName: typeName,
    }).then(() => {
        console.log('insert succses');
    }).catch((error) => {
        console.log('insert fail '+ error);
    });
}
module.exports.update = (key, typeName) => {
    firebaseConfig.database().ref().child('ProductType').child(key).set({
        typeName: typeName,
    }).then(() => {
        console.log('insert succses');
    }).catch((error) => {
        console.log('insert fail '+ error);
    });
}