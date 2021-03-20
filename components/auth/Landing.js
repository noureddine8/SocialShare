import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

function Landing({ navigation }) {
  const handleRegister = () => {
    navigation.navigate("Register");
  };
  const handleLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <Button title="S'inscrire" onPress={handleRegister} />
      <Button title="s'identifier" onPress={handleLogin} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
});

export default Landing;
