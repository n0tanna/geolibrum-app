import React, { useState } from "react";
import { View, Image, TextInput, Text } from "react-native";
import { Dropdown } from "react-native-material-dropdown-v2";
import GeolibrumLogo from "../../assets/Photos/Illustrated/geolibrum-logo.png";
import styles from "../../styles/add-fossil-log-styles.js";
import TypeWriter from "react-native-typewriter";

const AddFossilScreen = (props) => {
  const { navigation } = props;

  let data = [{value:"Fossil"}, {value:"Rock"}, {value:"Mineral"}]
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
          <Text style={styles.areaTitle}>Add Fossil</Text>
          <Text>Type</Text>
          <Dropdown label='Choose Species' data={data}/>
          <Text>Date</Text>
          <Text>Location</Text>
          <Text>Weight</Text>
          <Text>Colour(s)</Text>
          <TextInput></TextInput>
        </View>
      </View>
    </View>
  );
};

export default AddFossilScreen;
