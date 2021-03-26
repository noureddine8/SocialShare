import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { Icon, Button } from "react-native-elements";
import firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";
import { ActivityIndicator } from "react-native";
import { fetchUserFollowing } from "../../redux/actions/user";

function Profile({ route }) {
  const [name, setName] = useState(null);
  const [posts, setPosts] = useState(null);
  const [following, setFollowing] = useState(null);

  //redux
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserFollowing());
  }, []);

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
    if (state.following.indexOf(route.params.id) > -1) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [route.params.id, state.following]);

  const handleFollow = () => {
    if (following) {
      firebase
        .firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(route.params.id)
        .delete();
      setFollowing((prev) => !prev);
    } else {
      firebase
        .firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(route.params.id)
        .set({});
      setFollowing((prev) => !prev);
    }
  };

  const backGround = following ? "#fff" : "#0a66c2";

  return !posts || !name || following == null ? (
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
              flex: 1,
              padding: 10,
            }}
          >
            <Button
              type={following ? "outline" : "solid"}
              title={following ? "Following" : "Follow"}
              containerStyle={{
                justifyContent: "center",
                width: "100%",
              }}
              buttonStyle={{ backgroundColor: backGround }}
              onPress={handleFollow}
            />
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
