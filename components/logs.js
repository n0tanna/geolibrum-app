import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";

import styles from "../styles/logs-styles.js";
import GeolibrumLogo from "../assets/Photos/Illustrated/geolibrum-logo.png";
import FossilLogo from "../assets/Photos/Illustrated/fossil-logo.png";
import MineralLogo from "../assets/Photos/Illustrated/mineral-logo.png";
import RockLogo from "../assets/Photos/Illustrated/rock-logo.png";
import Back from "../assets/Photos/Illustrated/back-logo.png"; 
import TypeWriter from "react-native-typewriter";   

const LogScreen = (props) => {    
  const { navigation, setLog } = props;

  let listHolder = [];
  const [list, setList] = useState(listHolder);
 
  const loadImage = () => {
    list.forEach(function (log) {
      if (log.category === 1) {
        log.type_image = FossilLogo;
      } else if (log.category === 0) {
        log.type_image = MineralLogo;
      } else if (log.category === 2) {
        log.type_image = RockLogo;
      }
    }); 
  };

  loadImage();

  const passLog = (log) => {
    setLog(log);
    navigation.navigate("View"); 
  }

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
          <ScrollView>  
            {list.map((item, index) => {  
              return (
                <TouchableOpacity key={index} onPress={() => {passLog(item)}} style={styles.log}>
                  <Image style={styles.logImages} source={item.type_image} /> 
                  <View style={styles.idArea}> 
                    <Text style={styles.idText}>{item.id}</Text>
                  </View>
                  <Text style={styles.nameText}>{item.type}</Text>
                </TouchableOpacity>
              ); 
            })}  
          </ScrollView> 
          <View style={styles.add}>
            <TouchableOpacity
              onPress={() => {  
                navigation.navigate("ChooseType");
              }} 
            >
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
