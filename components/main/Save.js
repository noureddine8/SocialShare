import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import firebase from "firebase";
import { TextInput } from "react-native-gesture-handler";
require("firebase/firestore");
require("firebase/firebase-storage");

function Save({ route, navigation }) {
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
          navigation.navigate("Feed");
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
      setIsLoading(true);
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
  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0a66c2" />
      <Text>Please wait for few moments...</Text>
    </View>
  ) : (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 8 }}>
        <Image source={{ uri: route.params.image }} style={{ flex: 1 }} />
      </View>
      <View
        style={{
          flex: 1.5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#EEA47FFF",
          marginTop: 5,
          borderRadius: 10,
        }}
      >
        <TextInput
          placeholder="Enter Caption..."
          onChangeText={(caption) => setCaption(caption)}
        />
      </View>
      <View
        style={{ flex: 0.7, justifyContent: "flex-end", marginVertical: 4 }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#0a66c2",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            borderRadius: 10,
          }}
          onPress={savePhoto}
        >
          <Text style={{ color: "#fff", fontSize: 22 }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Save;
