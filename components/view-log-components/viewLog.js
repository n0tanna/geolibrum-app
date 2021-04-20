import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  Picker,
  TextInput,
  Modal,
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

  const handleSpecies = (e) => {
    newLog.type = e;
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

  return (
    <View style={styles.header}>
      <View>
        <Image style={styles.image} source={GeolibrumLogo} />
        <TypeWriter style={styles.title} typing={1}>
          Geolibrum
        </TypeWriter>
      </View>

      <ImageModal
        imagesList={newLog.images}
        certList={newLog.certificate}
        handleImageModal={handleImageModal}
        showImageModal={imagesModalVisible}
      />

      <View style={styles.body}>
        <View style={styles.holder}>
          <Text style={styles.areaTitle}>Log #{currentLog.id}</Text>
          <ScrollView  
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.selection}>
              <TouchableOpacity
                onPress={handleImageModal}
                style={styles.buttonLabel}
              >
                <Text style={styles.buttonText}>View Images</Text>
              </TouchableOpacity>
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
                >
                  <Image style={styles.imageLogoDate} source={CalendarLogo} />
                </TouchableOpacity>
              </View>
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

            <Text style={styles.colourLabel}>Colour(s)</Text>

            {newLog.colours && newLog.colours.map((item, index) => (
              <View style={styles.displayColour} key={index}>
                <Text style={styles.textColour}>{item}</Text>
                <TouchableOpacity style={styles.deleteColour}>
                  <Text style={styles.deleteText}>x</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
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

  const ImageModal = (props) => {
    const {
      handleImageModal,
      showImageModal,
      certList,
      imageList,
    } = props;

    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={showImageModal}
        onRequestClose={() => {
          handleImageModal();
        }}
      >
        <View style={styles.imageModal}>
          <ScrollView>
            {imageList && (imageList.length > 0 && (
              <View style={styles.modalTitleArea}>
                <Text style={styles.modalTitle}>Images</Text>
              </View>
            ))}
            {imageList && (imageList.length > 0 &&
              imageList.map((image) => {
                return (
                  <View contentContainerStyle={styles.modalScrollView}>
                    <TouchableOpacity>
                      <Image
                        style={styles.modalImage}
                        source={{ uri: image.uri }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }))}
            {certList && (certList.length > 0 && (
              <View style={styles.modalTitleArea}>
                <Text style={styles.modalTitle}>Certificates</Text>
              </View>
            ))}
            {certList && (certList.length > 0 &&
              certList.map((image) => {
                return (
                  <View>
                    <TouchableOpacity>
                      <Image
                        style={styles.modalImage}
                        source={{ uri: image.uri }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }))}
            <View>
              <TouchableOpacity
                style={styles.modalButtonLabel}
                onPress={handleImageModal}
              >
                <Text style={styles.modalButtonText}>Return</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
};
export default ViewLogScreen;
