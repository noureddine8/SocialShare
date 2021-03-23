import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export default function Add({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, sethasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      sethasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);
  useEffect(() => {
    if (image) {
      console.log("On change : ", image);
      navigation.navigate("Save", { image });
    }
  }, [image]);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          type={type}
          ratio={"16:9"}
        />
      </View>

      <View style={{ flex: 0.1, flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
          onPress={pickImage}
        >
          <Text style={styles.text}> Pick </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={takePicture}
        >
          <Text style={styles.text}> Cheese </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Text style={styles.text}> Flip </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },

  button: {
    alignItems: "center",
    alignSelf: "flex-end",
  },
  text: {
    fontSize: 18,
    color: "black",
  },
});
