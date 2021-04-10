import { View, Image, TouchableOpacity, TextInput, Text, Button } from "react-native";
import GeolibrumLogo from "../../assets/Photos/Illustrated/geolibrum-logo.png";
import styles from "../../styles/register-styles.js";
import TypeWriter from "react-native-typewriter";
import React, { useState, useEffect } from "react";
import { db, firestore, auth } from "../../database/databaseConfig";

const RegisterScreen = (props) => {
  const { navigation } = props;
  [registrationEmail, setRegistrationEmail] = useState("");
  [registrationPassword, setRegistrationPassword] = useState("");

  registerWithFirebase = () => {
    if (registrationEmail.length < 4) {
      Alert.alert("Please enter an email address.");
      return;
    }

    if (registrationPassword.length < 4) {
      Alert.alert("Please enter a password.");
      return;
    }

    auth
      .createUserWithEmailAndPassword(registrationEmail, registrationPassword)
      .then(function (_firebaseUser) {
        Alert.alert("user registered!");

        setRegistrationEmail("");
        setRegistrationPassword("");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == "auth/weak-password") {
          Alert.alert("The password is too weak.");
        } else {
          Alert.alert(errorMessage);
        }
        console.log(error);
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
        <Text style={styles.label}>Register with Firebase</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
              keyboardType="email-address"
              placeholder="email"
            />
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="password"
              keyboardType="visible-password"
              placeholder="password"
            />
            <Button style={styles.button} title="Register" />
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;