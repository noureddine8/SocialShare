import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "react-native-elements";
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
    <View style={styles.container}>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <Text h2>Creer votre compte</Text>
      </View>
      <View style={{ flex: 7, justifyContent: "flex-end" }}>
        <Input
          label="Nom et Prénom"
          name="name"
          onChange={handleTextChange}
          onChangeText={(name) => setState({ ...state, name })}
        />
        <Input
          label="E-mail"
          name="email"
          onChange={handleTextChange}
          onChangeText={(email) => setState({ ...state, email })}
        />
        <Input
          label="Mot de passe"
          name="password"
          onChange={handleTextChange}
          onChangeText={(password) => setState({ ...state, password })}
          secureTextEntry={true}
        />
        <Input
          label="Mot de passe"
          name="confirm"
          onChangeText={(password) => setState({ ...state, confirm: password })}
          secureTextEntry={true}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
        <Button type="solid" title="S'inscrire" onPress={handleRegister} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { backgroundColor: "#f5faf6", flex: 1, justifyContent: "center" },
});
export default Register;
