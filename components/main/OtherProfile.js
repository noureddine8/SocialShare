import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import firebase from "firebase";
import { ActivityIndicator } from "react-native";

function Profile({ route }) {
  const [name, setName] = useState(null);
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    if (route.params.id) {
      firebase
        .firestore()
        .collection("users")
        .doc(route.params.id)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setName(snapshot.data().name);
          } else {
            console.log("User not available, Please sign in");
          }
        });

      firebase
        .firestore()
        .collection("posts")
        .doc(route.params?.id)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setPosts(posts);
        });
    }
  }, [route.params]);

  return !posts || !name ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0a66c2" />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 0.3,
              justifyContent: "space-between",
              flexDirection: "row",
              margin: 5,
            }}
          >
            <Icon
              name="face"
              onPress={() => console.log("hello")}
              size={28}
              color="#0a66c2"
            />
            <Icon
              style={{
                margin: 10,
              }}
              name="settings"
              onPress={() => console.log("hello")}
              size={28}
              color="#0a66c2"
            />
          </View>
          <Text style={styles.text}>{name}</Text>
          <View
            style={{
              flew: 1,
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 20,
                backgroundColor: "#0a66c2",
                justifyContent: "center",
                alignItems: "center",
                height: "34%",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#EEF" }}>
                Follow
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1 / 10,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            marginStart: 20,
            color: "#0a66c2",
          }}
        >
          Posts
        </Text>
      </View>
      <View style={styles.posts}>
        {posts.length === 0 ? (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              alignSelf: "center",
              marginTop: 50,
            }}
          >
            No posts to show
          </Text>
        ) : (
          <FlatList
            data={posts}
            horizontal={false}
            numColumns={3}
            renderItem={({ item }) => {
              return (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.url }} style={styles.image} />
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9ebfc",
  },
  userInfo: {
    flex: 4 / 10,
  },
  posts: {
    flex: 5 / 10,
  },
  text: {
    flex: 0.5,
    margin: 20,
    color: "black",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 20,
  },
  image: { flex: 1, aspectRatio: 1 / 1 },
  imageContainer: { margin: 1, flex: 1 / 3 },
});

export default Profile;
