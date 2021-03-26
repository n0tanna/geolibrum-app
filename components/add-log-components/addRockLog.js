import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import GeolibrumLogo from "../../assets/Photos/Illustrated/geolibrum-logo.png";
import styles from "../../styles/add-rock-log-styles.js";
import TypeWriter from "react-native-typewriter";

const AddRockScreen = (props) => {
  const { navigation } = props;
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
          <Text style={styles.areaTitle}>Log Type</Text>
        </View>
      </View>
    </View>
  );
};

export default AddRockScreen;
