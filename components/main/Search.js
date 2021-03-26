import React, { useState } from "react";
import {
  TextInput,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
require("firebase/firestore");

function Search({ navigation }) {
  const [users, setUsers] = useState([]);
  const fetchUsers = (search) => {
    firebase
      .firestore()
      .collection("users")
      .where("name", "==", search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
      });
    console.log(users);
  };
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d9ebfc",
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          width: "90%",
          margin: 5,
          height: "10%",
          borderRadius: 22,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          onChangeText={fetchUsers}
          placeholder="Search for other users..."
        />
      </View>
      <View style={{ width: "100%", flex: 1, padding: 20 }}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={users}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: "#0a66c2",
                padding: 20,
                borderRadius: 20,
                alignItems: "center",
                margin: 4,
              }}
              onPress={() => {
                if (item.id === firebase.auth().currentUser.uid) {
                  navigation.navigate("Profile");
                } else {
                  navigation.navigate("OtherProfile", { id: item.id });
                }
              }}
            >
              <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

export default Search;
