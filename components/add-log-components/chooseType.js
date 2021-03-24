import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import GeolibrumLogo from "../../assets/Photos/Illustrated/geolibrum-logo.png";
import styles from "../../styles/choose-type-styles.js";
import TypeWriter from "react-native-typewriter";
import FossilLogo from "../../assets/Photos/Illustrated/fossil-logo.png";
import MineralLogo from "../../assets/Photos/Illustrated/mineral-logo.png";
import RockLogo from "../../assets/Photos/Illustrated/rock-logo.png";
import Back from "../../assets/Photos/Illustrated/back-logo.png";

const ChooseTypeScreen = (props) => {
  const { navigation } = props;
  const [type, setType] = useState();

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
          <TouchableOpacity>
            <Image style={styles.logImage} source={FossilLogo} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.logImage} source={MineralLogo} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.logImage} source={RockLogo} />
          </TouchableOpacity>
          <View style={styles.back}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Logs");
              }}
            >
              <Image style={styles.imageArrow} source={Back} />
            </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  );
};

export default ChooseTypeScreen;
