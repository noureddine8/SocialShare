import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import firebase from "firebase";
import { TextInput } from "react-native-gesture-handler";
require("firebase/firestore");
require("firebase/firebase-storage");

function Save({ route, navigation }) {
  const [caption, setCaption] = useState("");
  const savePhoto = async () => {
    const uri = route.params.image;
    const response = await fetch(uri);
    const blob = await response.blob();

    const savePost = (url) => {
      firebase
        .firestore()
        .collection("posts")
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .add({
          url,
          caption,
          creation: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          navigation.popToTop();
        });
    };

    const task = firebase
      .storage()
      .ref()
      .child(
        `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
      )
      .put(blob);

    const taskProgress = (snapshot) => {
      console.log(`Transferred : ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePost(snapshot);
        console.log(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 8 }}>
        <Image source={{ uri: route.params.image }} style={{ flex: 1 }} />
      </View>
      <View style={{ flex: 1.5 }}>
        <TextInput
          placeholder="Enter Caption..."
          onChangeText={(caption) => setCaption(caption)}
        />
      </View>
      <View style={{ flex: 0.5, justifyContent: "flex-end" }}>
        <Button title="Save" style={{ flex: 2 }} onPress={savePhoto} />
      </View>
    </View>
  );
}

export default Save;
