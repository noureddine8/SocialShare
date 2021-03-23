import React from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";

function Profile(props) {
  const user = useSelector((state) => state.user);
  console.log("From profile : ", user.posts);
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.text}>{user.currentUser.name}</Text>
      </View>
      <View style={styles.posts}>
        <FlatList
          data={user.posts}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 35 },
  userInfo: {
    flex: 2 / 5,
  },
  posts: {
    flex: 3 / 5,
  },
  text: {
    marginStart: 20,
    marginTop: 50,
    color: "black",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 20,
  },
  image: { flex: 1, aspectRatio: 1 / 1 },
  imageContainer: { margin: 1, flex: 1 / 3 },
});

export default Profile;
