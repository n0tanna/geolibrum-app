import {
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  Text,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import GeolibrumLogo from "../../assets/Photos/Illustrated/geolibrum-logo.png";
import styles from "../../styles/login-styles.js";
import TypeWriter from "react-native-typewriter";
import { db, firestore, auth } from "../../database/databaseConfig";

const LoginScreen = (props) => {
  const { navigation, isLoggedIn } = props;

  [loginEmail, setLoginEmail] = useState("");
  [loginPassword, setLoginPassword] = useState("");

  loginWithFirebase = async () => {
    if (loginEmail.length < 4) {
      Alert.alert("Please enter an email address.");
      return;
    }

    if (loginPassword.length < 4) {
      Alert.alert("Please enter a password.");
      return;
    }

    auth
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .then(function (_firebaseUser) {
        Alert.alert("user logged in!");
        setLoggedIn(true);

        // load data
        //retrieveDataFromFirebase();
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
          Alert.alert("Wrong password.");
        } else {
          Alert.alert(errorMessage);
        }
      });
  };

  return (
    <View style={styles.header}>
      <View>
        <Image style={styles.image} source={GeolibrumLogo} />
        <TypeWriter style={styles.title} typing={1}>
          Geolibrum
        </TypeWriter>
      </View>
      <View style={styles.body}>
        <View style={styles.holder}>
          <Text style={styles.areaTitle}>Sign In</Text>
          <TextInput
            style={styles.selection}
            onChangeText={(value) => setLoginEmail(value)}
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="email"
            keyboardType="email-address"
            placeholder="email"
          />
          <TextInput
            style={styles.selection}
            onChangeText={(value) => setLoginPassword(value)}
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="password"
            keyboardType="visible-password"
            placeholder="password"
          />
          <TouchableOpacity
            style={styles.buttonLabel}
            onPress={() => {
              navigation.navigate("Home");
              loginWithFirebase();
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;