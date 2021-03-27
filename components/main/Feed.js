import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, FlatList } from "react-native";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { Image } from "react-native";
import { Icon } from "react-native-elements";

const FeedPosts = ({ name, url, caption }) => {
  return (
    <View
      style={{
        height: 450,
        borderBottomWidth: 1,
        borderColor: "#0a66c2",
        marginTop: 50,
      }}
    >
      <View
        style={{
          height: 50,
          justifyContent: "center",
          paddingStart: 10,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#444" }}>
          {name}
        </Text>
      </View>
      <View style={{ height: 300 }}>
        <Image
          source={{
            uri: url,
          }}
          style={{ flex: 1 }}
        />
      </View>
      <View
        style={{
          height: 50,
          width: "50%",
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Icon name="heart" type="font-awesome" size={28} color="#0a66c2" />
        <Icon name="comment" type="font-awesome" size={28} color="#0a66c2" />
        <Icon name="share" type="font-awesome" size={28} color="#0a66c2" />
      </View>
      <View style={{ height: 50, padding: 10 }}>
        <Text>{caption}</Text>
      </View>
    </View>
  );
};

function Feed() {
  const [posts, setPosts] = useState(null);
  const following = useSelector((state) => state.user.following);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (following && !loaded) {
      following.map((id) => {
        let name;
        firebase
          .firestore()
          .collection("users")
          .doc(id)
          .get()
          .then((data) => {
            if (data.exists) {
              name = data.data().name;
            }
          });

        firebase
          .firestore()
          .collection("posts")
          .doc(id)
          .collection("userPosts")
          .orderBy("creation", "asc")
          .get()
          .then((snapshot) => {
            snapshot.docs.map((doc) => {
              if (posts === null) {
                setPosts([{ ...doc.data(), name }]);
                setLoaded(true);
              } else {
                setPosts((prev) => [...prev, { ...doc.data(), name }]);
              }
            });
          });
      });
    }
  }, [following]);

  return posts === null ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0a66c2" />
    </View>
  ) : (
    <View style={{ flex: 1, backgroundColor: "#d9ebfc" }}>
      <FlatList
        horizontal={false}
        numColumns={1}
        data={posts}
        renderItem={({ item }) => {
          return (
            <FeedPosts name={item.name} url={item.url} caption={item.caption} />
          );
        }}
      />
    </View>
  );
}

export default Feed;
