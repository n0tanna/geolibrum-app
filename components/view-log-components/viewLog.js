import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
  Picker,
  TextInput,
  Alert,
} from "react-native";

import styles from "../../styles/view-log-styles.js";
import GeolibrumLogo from "../../assets/Photos/Illustrated/geolibrum-logo.png";
import Back from "../../assets/Photos/Illustrated/back-logo.png";
import Edit from "../../assets/Photos/Illustrated/edit-logo.png";
import Delete from "../../assets/Photos/Illustrated/trash-logo.png";
import CalendarLogo from "../../assets/Photos/Illustrated/calendar-logo.png";
import CameraLogo from "../../assets/Photos/Illustrated/camera-logo.png";
import DocumentLogo from "../../assets/Photos/Illustrated/document-logo.png";
import PhotoLogo from "../../assets/Photos/Illustrated/photo-logo.png";

import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import TypeWriter from "react-native-typewriter";

const ViewLogScreen = (props) => {
  const { navigation, currentLog } = props;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [colourList, setColourList] = useState([]);
  const [imagesList, setImageList] = useState([]);
  const [certList, setCertList] = useState([]);
  const [hasFile, setHasFile] = useState(false);
  const [colour, setColour] = useState("");
  const [imagesModalVisible, setImagesModalVisible] = useState(false);

  const [newLog, setNewLog] = useState({
    id: currentLog.id,
    category: currentLog.category,
    type: currentLog.type,
    date: currentLog.date,
    city: currentLog.city,
    region: currentLog.region,
    country: currentLog.country,
    upperTime: currentLog.upperTime,
    lowerTime: currentLog.lowerTime,
    weight: currentLog.weight,
    qrlink: currentLog.qrlink,
    images: currentLog.images,
    certificate: currentLog.certificate,
    colours: currentLog.colours,
  });

  let speciesData = [{ value: "Gank" }, { value: "Cros" }, { value: "Idk" }];

  const handleImageModal = () => {
    setImagesModalVisible(!imagesModalVisible);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageList([...imagesList, { uri: result.uri }]);
      await setHasFile(true);
    }
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageList([...imagesList, { uri: result.uri }]);
      await setHasFile(true);
    }
  };

  const pickedDocument = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setCertList([...certList, { uri: result.uri }]);
      await setHasFile(true);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let year = moment(date).format("YYYY");
    let month = moment(date).format("MM");
    let day = moment(date).format("DD");

    newLog.date = year + "-" + month + "-" + day;
    hideDatePicker();
  };

  const handleSpecies = (e) => {
    newLog.type = e;
  };

  const handleColour = (e) => {
    setColour(e);
  };

  const handleCountry = (e) => {
    newLog.country = e;
  };

  const handleRegion = (e) => {
    newLog.region = e;
  };

  const handleCity = (e) => {
    newLog.city = e;
  };

  const handleTimeLower = (e) => {
    newLog.lowerTime = e;
  };

  const handleTimeUpper = (e) => {
    newLog.upperTime = e;
  };

  const handleWeight = (e) => {
    newLog.weight = e;
  };

  const addColourToList = () => {
    setColourList([...colourList, colour]);
    setColour();
  };

  const deleteColours = (holder) => {
    setColourList(colourList.filter((item) => item !== holder));
  };

  const deleteImage = async (holder) => {
    setImageList(imagesList.filter((item) => item !== holder));
    if (certList.length === 0 && imagesList.length === 1) {
      await setHasFile(false);
    }
  };

  const deleteCert = async (holder) => {
    setCertList(certList.filter((item) => item !== holder));
    if (certList.length === 1 && imagesList.length === 0) {
      await setHasFile(false);
    }
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
            <Text style={styles.areaTitle}>Log #{currentLog.id}</Text>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
              <View style={styles.camera}>
                <TouchableOpacity
                  style={styles.imageBackground}
                  onPress={takeImage}
                >
                  <Image style={styles.imageLogosTop} source={CameraLogo} />
                </TouchableOpacity>
              </View>

              <View style={styles.photo}>
                <TouchableOpacity
                  style={styles.imageBackground}
                  onPress={pickImage}
                >
                  <Image style={styles.imageLogosTop} source={PhotoLogo} />
                </TouchableOpacity>
              </View>

              <View style={styles.document}>
                <TouchableOpacity
                  style={styles.imageBackground}
                  onPress={pickedDocument}
                >
                  <Image style={styles.imageLogosTop} source={DocumentLogo} />
                </TouchableOpacity>
              </View>

              <View style={styles.selection}>
                {hasFile && (
                  <TouchableOpacity
                    onPress={handleImageModal}
                    style={styles.buttonLabel}
                  >
                    <Text style={styles.buttonText}>View Images</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.selection}>
                <Text style={styles.speciesLabel}>Species</Text>
                <View style={styles.speciesPicker}>
                  <Picker
                    selectedValue={newLog.type}
                    onValueChange={(value) => handleSpecies(value)}
                    style={styles.dropDown}
                  >
                    {speciesData.map((data) => {
                      return (
                        <Picker.Item
                          label={data.value}
                          value={data.value}
                          key={data.value}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>

              <View style={styles.selection}>
                <Text style={styles.dateLabel}>Date</Text>
                <Text style={styles.date}>{newLog.date}</Text>
                <View style={styles.dateImage}>
                  <TouchableOpacity
                    style={styles.dateBackground}
                    onPress={showDatePicker}
                  >
                    <Image style={styles.imageLogoDate} source={CalendarLogo} />
                  </TouchableOpacity>
                </View>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  dateFormat="YYYY-MM-DD"
                />
              </View>

              <View style={styles.selection}>
                <Text style={styles.countryLabel}>Country</Text>
                <TextInput
                  style={styles.selectionText}
                  placeholder={currentLog.country}
                  onChangeText={(e) => handleCountry(e)}
                ></TextInput>
              </View>

              <View style={styles.selection}>
                <Text style={styles.regionLabel}>Region</Text>
                <TextInput
                  style={styles.selectionText}
                  placeholder={currentLog.region}
                  onChangeText={(e) => handleRegion(e)}
                ></TextInput>
              </View>

              <View style={styles.selection}>
                <Text style={styles.cityLabel}>City</Text>
                <TextInput
                  style={styles.selectionText}
                  placeholder={currentLog.city}
                  onChangeText={(e) => handleCity(e)}
                ></TextInput>
              </View>

              <View style={styles.selection}>
                <Text style={styles.timeLabel}>Time Period Range</Text>
              </View>
              <View style={styles.lowerSelection}>
                <TextInput
                  onChangeText={(e) => handleTimeLower(e)}
                  placeholder={currentLog.lowerTime}
                  keyboardType="numeric"
                ></TextInput>
              </View>
              <Text style={styles.dashText}>-</Text>
              <View style={styles.upperSelection}>
                <TextInput
                  onChangeText={(e) => handleTimeUpper(e)}
                  placeholder={currentLog.upperTime}
                  keyboardType="numeric"
                ></TextInput>
              </View>

              <View style={styles.selection}>
                <Text style={styles.weightLabel}>Weight</Text>
                <TextInput
                  style={styles.selectionText}
                  placeholder={currentLog.weight}
                  keyboardType="numeric"
                  onChangeText={(e) => handleWeight(e)}
                ></TextInput>
              </View>

              <View style={styles.selection}>
                <Text style={styles.colourLabel}>Colour(s)</Text>
                <TextInput
                  style={styles.selectionText}
                  placeholder="colour name"
                  onChangeText={(e) => handleColour(e)}
                />
                <TouchableOpacity
                  onPress={addColourToList}
                  style={styles.plusIcon}
                >
                  <Text style={styles.plusIconText}>+</Text>
                </TouchableOpacity>
              </View>

              {colourList.map((item, index) => (
                <View style={styles.displayColour}>
                  <Text style={styles.textColour}>{item}</Text>
                  <TouchableOpacity
                    onPress={() => deleteColours(item)}
                    style={styles.deleteColour}
                  >
                    <Text style={styles.deleteText}>x</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <View style={styles.add}>
              <TouchableOpacity>
                <Image style={styles.imageArrow} source={Edit} />
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
          </View>
      </View>
    </View>
  );
};

export default ViewLogScreen;
