import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { Icon, Button } from "react-native-elements";
import firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";
import { ActivityIndicator } from "react-native";
import { fetchUserFollowing } from "../../redux/actions/user";
import { USER_FOLLOWING_STATE_CHANGED } from "../../redux/ActionTypes";

function Profile({ route }) {
  const [name, setName] = useState(null);
  const [posts, setPosts] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [followings, setFollowings] = useState(null);
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

      firebase
        .firestore()
        .collection("following")
        .doc(route.params.id)
        .collection("userFollowing")
        .onSnapshot((snapshot) => {
          let following = snapshot.docs.map((fol) => {
            const id = fol.id;
            return id;
          });
          setFollowings(following);
        });

      firebase
        .firestore()
        .collection("followers")
        .doc(route.params.id)
        .collection("userFollowed")
        .onSnapshot((snapshot) => {
          let followers = snapshot.docs.map((fol) => {
            const id = fol.id;
            return id;
          });
          setFollowers(followers);
        });
    }
    if (state.following && state.following.indexOf(route.params.id) > -1) {
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

      firebase
        .firestore()
        .collection("followers")
        .doc(route.params.id)
        .collection("userFollowed")
        .doc(firebase.auth().currentUser.uid)
        .delete();

      setFollowing((prev) => !prev);
      dispatch({ type: USER_FOLLOWING_STATE_CHANGED, id: route.params.id });
    } else {
      firebase
        .firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(route.params.id)
        .set({});
      firebase
        .firestore()
        .collection("followers")
        .doc(route.params.id)
        .collection("userFollowed")
        .doc(firebase.auth().currentUser.uid)
        .set({});

      setFollowing((prev) => !prev);
    }
  };

  const backGround = following ? "#fff" : "#0a66c2";

  return !posts || !name || following == null || !followings || !followers ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0a66c2" />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 0.1,
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
          <View
            style={{
              flex: 0.5,
              alignItems: "center",
              flexDirection: "row",
              padding: 5,
            }}
          >
            <View style={{ flex: 4 / 10 }}>
              <Text style={styles.text}>{name}</Text>
            </View>
            <View
              style={{
                flex: 3 / 10,

                padding: 5,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#0a66c2",
                  borderRadius: 25,
                }}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Followers</Text>
                <Text style={{ color: "white", fontSize: 17 }}>
                  {followers.length}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 3 / 10,

                padding: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: "#0a66c2",
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Following</Text>
                <Text style={{ color: "white", fontSize: 17 }}>
                  {followings.length}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.4,
              justifyContent: "center",
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
    flex: 5 / 10,
  },
  posts: {
    flex: 4 / 10,
  },
  text: {
    color: "black",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 20,
  },
  image: { flex: 1, aspectRatio: 1 / 1 },
  imageContainer: { margin: 1, flex: 1 / 3 },
});

export default Profile;
