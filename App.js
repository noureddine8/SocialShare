import React, { useEffect, useState } from "react";
import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Main from "./components/Main";
import Add from "./components/main/Add";
import Save from "./components/main/Save";
import OtherProfile from "./components/main/OtherProfile";
import { ActivityIndicator, View, LogBox } from "react-native";
import firebase from "firebase";
import { firebaseConfig } from "./config/Firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./redux/index";
LogBox.ignoreAllLogs(true);
const store = createStore(reducers, compose(applyMiddleware(thunk)));

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {
  const [state, setState] = useState({ loggedIn: null, loaded: false });
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setState({ loggedIn: false, loaded: true });
      } else {
        setState({ loggedIn: true, loaded: true });
        console.log("hhhhhh" + user);
      }
    });
  }, []);

  const { loaded, loggedIn } = state;
  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#0a66c2",
              },
              headerTitleStyle: {
                fontFamily: "monospace",
                fontWeight: "bold",
                color: "white",
                fontSize: 24,
              },
              headerTitleAlign: "center",
              title: "SOCIAL",
            }}
          >
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Main"
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#0a66c2",
                },
                headerTitleStyle: {
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  color: "white",
                  fontSize: 24,
                },
                headerTitleAlign: "center",
                title: "SOCIAL",
              }}
            >
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen
                name="Add"
                component={Add}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Save" component={Save} />
              <Stack.Screen name="OtherProfile" component={OtherProfile} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    }
  }
}
