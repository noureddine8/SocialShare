import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import firebase from "firebase";

function Register(props) {
  const initialState = { name: "", email: "", password: "", confirm: "" };
  const [state, setState] = useState(initialState);
  const handleTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleRegister = () => {
    const { email, password, name, confirm } = state;
    if (confirm === password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({ name, email });
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <ScrollView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          height: 200,
        }}
      >
        <Text style={{ color: "#0a66c2", fontSize: 38, fontWeight: "bold" }}>
          Create an account
        </Text>
      </View>
      <View>
        <Input
          label="Full name"
          name="name"
          onChange={handleTextChange}
          onChangeText={(name) => setState({ ...state, name })}
          labelStyle={{ color: "#0a66c2" }}
        />
        <Input
          label="E-mail"
          name="email"
          onChange={handleTextChange}
          onChangeText={(email) => setState({ ...state, email })}
          labelStyle={{ color: "#0a66c2" }}
        />
        <Input
          label="Password"
          name="password"
          onChange={handleTextChange}
          onChangeText={(password) => setState({ ...state, password })}
          secureTextEntry={true}
          labelStyle={{ color: "#0a66c2" }}
        />
        <Input
          label="Confirm password"
          name="confirm"
          onChangeText={(password) => setState({ ...state, confirm: password })}
          secureTextEntry={true}
          labelStyle={{ color: "#0a66c2" }}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          padding: 10,
          height: 92,
        }}
      >
        <Button
          buttonStyle={{
            backgroundColor: "#0a66c2",
            borderRadius: 20,
            height: 40,
          }}
          title="Sign up"
          onPress={handleRegister}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({});
export default Register;
