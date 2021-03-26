import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.user);
  const [name, setname] = useState(null);
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    if (user.currentUser?.name && user.posts) {
      setname(user.currentUser?.name);
      setPosts(user.posts);
    }
  }, [user]);

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
              flex: 0.1,
              justifyContent: "space-between",
              flexDirection: "row",
              margin: 5,
              backgroundColor: "#ff0<< VV",
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
                  {user.followers.length}
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
                  {user.following.length}
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
                Edit Profile
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
