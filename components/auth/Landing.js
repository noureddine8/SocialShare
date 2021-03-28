import React from "react";
import { View, StyleSheet, Text } from "react-native";
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
      <View
        style={{
          flex: 6,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0a66c2",
          borderBottomRightRadius: 85,
          borderBottomStartRadius: 85,
        }}
      >
        <Text style={styles.text}>Social</Text>
        <Text style={styles.secondaryText}>
          Share, Connect and Keep In Touch.
        </Text>
      </View>

      <View
        style={{
          borderTopRightRadius: 85,
          borderTopStartRadius: 85,
          flex: 5,
          justifyContent: "space-evenly",
          backgroundColor: "#0a66c2",
          marginTop: 1,
          paddingHorizontal: 10,
        }}
      >
        <Button
          titleStyle={{ color: "#0a66c2", fontSize: 20, fontWeight: "bold" }}
          buttonStyle={{
            backgroundColor: "white",
            borderRadius: 40,
          }}
          title="SIGN IN"
          onPress={handleLogin}
        />
        <Button
          titleStyle={{ color: "#0a66c2", fontSize: 20, fontWeight: "bold" }}
          buttonStyle={{
            backgroundColor: "white",
            borderRadius: 40,
          }}
          title="SIGN UP"
          onPress={handleRegister}
        />
      </View>
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
  text: {
    fontSize: 100,
    fontWeight: "bold",
    color: "white",
  },
  secondaryText: {
    fontSize: 20,
    color: "#bedbf7",
  },
});

export default Landing;
