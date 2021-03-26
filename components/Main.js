import React, { useState, useEffect } from "react";
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing,
  fetchUserFollowed,
} from "../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Feed from "./main/Feed";
import Profile from "./main/Profile";
import Search from "./main/Search";
import firebase from "firebase";

const Empty = () => {
  return null;
};

function Main(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchUserPosts());
    dispatch(fetchUserFollowing());
    dispatch(fetchUserFollowed());
  }, []);
  useEffect(() => {
    setCurrentUser(user.currentUser);
  }, [user]);

  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      labeled={false}
      barStyle={{ backgroundColor: "#fff" }}
      activeColor="#0a66c2"
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MainAdd"
        component={Empty}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Add");
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        listeners={() => ({
          tabPress: () => {
            dispatch(fetchUserPosts());
          },
        })}
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Main;
