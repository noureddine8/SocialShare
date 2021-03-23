import React from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import { Button } from "react-native-elements";

function Landing({ navigation }) {
  const handleRegister = () => {
    navigation.navigate("Register");
  };
  const handleLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../images/background.jpg")}
      >
        <View
          style={{ flex: 6, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.text}>Social</Text>
        </View>
        <View style={{ flex: 4, justifyContent: "space-evenly" }}>
          <Button title="S'inscrire" onPress={handleRegister} />
          <Button title="S'identifier" onPress={handleLogin} />
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: { fontSize: 50, fontFamily: "monospace", fontWeight: "bold" },
});

export default Landing;
