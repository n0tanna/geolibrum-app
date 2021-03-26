import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import styles from "../styles/logs-styles.js";
import GeolibrumLogo from "../assets/Photos/Illustrated/geolibrum-logo.png";
import FossilLogo from "../assets/Photos/Illustrated/fossil-logo.png";
import MineralLogo from "../assets/Photos/Illustrated/mineral-logo.png";
import RockLogo from "../assets/Photos/Illustrated/rock-logo.png";
import Back from "../assets/Photos/Illustrated/back-logo.png";
import TypeWriter from "react-native-typewriter";

const LogScreen = (props) => {
  const { navigation } = props;

  const [list, setList] = useState([
    { id: 1, type_id: 1, type_image: "", name: "Fossil" },
    { id: 2, type_id: 0, type_image: "", name: "Mineral" },
    { id: 3, type_id: 2, type_image: "", name: "Rock" },
    { id: 4, type_id: 0, type_image: "", name: "Mineral" },
    { id: 5, type_id: 1, type_image: "", name: "Fossil" },
    { id: 6, type_id: 0, type_image: "", name: "Mineral" },
    { id: 7, type_id: 1, type_image: "", name: "Fossil" },
    { id: 8, type_id: 2, type_image: "", name: "Rock" },
    { id: 9, type_id: 1, type_image: "", name: "Fossil" },
    { id: 10, type_id: 0, type_image: "", name: "Mineral" },
    { id: 11, type_id: 1, type_image: "", name: "Fossil" },
  ]);

  const loadImage = () => {
    list.forEach(function (log) {
      if (log.type_id === 1) {
        log.type_image = FossilLogo;
      } else if (log.type_id === 0) {
        log.type_image = MineralLogo;
      } else if (log.type_id === 2) {
        log.type_image = RockLogo;
      }
    });
  };

  loadImage();

  const Item = ({ item }) => (
    <TouchableOpacity style={styles.log}>
      <Image style={styles.logImages} source={item.type_image} />
      <View style={styles.idArea}>
        <Text style={styles.idText}>{item.id}</Text>
      </View>
      <Text style={styles.nameText}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.header}>
      <View>
        <Image style={styles.image} source={GeolibrumLogo} />
        <TypeWriter style={styles.title} typing={1}>
          Geolibrum
        </TypeWriter>
      </View>
      <View style={styles.body}>
        <SafeAreaView style={styles.listContainer}>
          <Text style={styles.listTitle}>Logs</Text>
          <FlatList
            data={list}
            renderItem={Item}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.add}>
            <TouchableOpacity onPress={() => {
                navigation.navigate("ChooseType");
              }}>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.back}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Image style={styles.imageArrow} source={Back} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default LogScreen;
