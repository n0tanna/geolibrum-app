import React, { useState } from "react";
import {
  Text,
  TextInput,
  Modal,
  Alert,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import styles from "../styles/home-styles.js";
import GeolibrumLogo from "../assets/Photos/Illustrated/geolibrum-logo.png";
import { db, firestore, auth } from "../database/databaseConfig";

const HomeScreen = (props) => {
  const { navigation, loggedIn} = props;

  signoutWithFirebase = () => {
    auth.signOut().then(function () {
      // if logout was successful
      if (!auth.currentUser) {
        Alert.alert("user was logged out!");
        setLoggedIn(false);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomHalf}>
        <Image source={GeolibrumLogo} style={styles.image} />
        <View style={styles.box}>
          <Text style={styles.text}>Geolibrum</Text>
          {loggedIn && (
            <View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("Register");
                  }}
                >
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {!loggedIn && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Logs");
              }}
            >
              <Text style={styles.buttonText}>Logs</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
