import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import firebase from "firebase";

function Login(props) {
  const initialState = { email: "", password: "" };
  const [state, setState] = useState(initialState);
  const handleTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {
    const { email, password } = state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 4, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#0a66c2", fontSize: 38, fontWeight: "bold" }}>
          SIGN IN
        </Text>
      </View>
      <View style={{ flex: 4, justifyContent: "center" }}>
        <Input
          labelStyle={{ color: "#0a66c2" }}
          label="E-mail"
          name="email"
          onChange={handleTextChange}
          onChangeText={(email) => setState({ ...state, email })}
        />
        <Input
          label="Password"
          labelStyle={{ color: "#0a66c2" }}
          name="password"
          onChange={handleTextChange}
          onChangeText={(password) => setState({ ...state, password })}
          secureTextEntry={true}
        />
      </View>
      <View style={{ flex: 2, justifyContent: "flex-start", padding: 10 }}>
        <Button
          buttonStyle={{
            backgroundColor: "#0a66c2",
            borderRadius: 20,
            height: 40,
          }}
          title="Sign in"
          onPress={handleLogin}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { backgroundColor: "#f5faf6", flex: 1, justifyContent: "center" },
});
export default Login;
