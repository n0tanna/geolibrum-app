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
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <View style={styles.bottomHalf}>
        <Image source={GeolibrumLogo} style={styles.image} />
        <View style={styles.box}>
          <Text style={styles.text}>Geolibrum</Text>
            <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Logs");
              }}
            >
              <Text style={styles.buttonText}>Logs</Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
