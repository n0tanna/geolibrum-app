import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Picker,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  Alert
} from "react-native";

import GeolibrumLogo from "../../assets/Photos/Illustrated/geolibrum-logo.png";
import CalendarLogo from "../../assets/Photos/Illustrated/calendar-logo.png";
import CameraLogo from "../../assets/Photos/Illustrated/camera-logo.png";
import DocumentLogo from "../../assets/Photos/Illustrated/document-logo.png";
import PhotoLogo from "../../assets/Photos/Illustrated/photo-logo.png";
import Back from "../../assets/Photos/Illustrated/back-logo.png";

import styles from "../../styles/add-rock-log-styles.js";
import TypeWriter from "react-native-typewriter";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

import { db, firestore, auth } from "../../database/databaseConfig";


const AddRockScreen = (props) => {
  const { navigation } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [colourList, setColourList] = useState([]);
  const [imagesList, setImageList] = useState([]);
  const [certList, setCertList] = useState([]);
  const [hasFile, setHasFile] = useState(false);
  const [colour, setColour] = useState("");
  const [imagesModalVisible, setImagesModalVisible] = useState(false);

  useEffect(() => { loadDatabase();});
  let count = 0;

  const loadDatabase = async () => {
    await db.ref("logs/").on("value", (snapshot) => {
      var tasks = [];  
      snapshot.forEach((child) => {
        count++;
      });

      tasks.forEach((holder) => {
        listHolder.push(holder);
      });
    });
    newLog.id = count;
  };

  const [newLog, setNewLog] = useState({
    id: count,
    category: 2, 
    type: "",
    date: "",
    city: "",
    region: "",
    country: "",
    upperTime: "",
    lowerTime: "",
    weight: "",
    qrlink: "",
    images: [],
    certificate: [],
    colours: [],
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const gatherData = () => {
    newLog.colours = colourList;
    newLog.images = imagesList;
    newLog.certificate = certList;
    newLog.qrlink = `https://geolibrum.rocks/${newLog.category}/${newLog.type}/${newLog.id}`

    db.ref("logs/").push(
      {
        id: newLog.id,
        category: newLog.category,
        type: newLog.type,
        date: newLog.date,
        city: newLog.city,
        region: newLog.region,
        country: newLog.country,
        upperTime: newLog.upperTime,
        lowerTime: newLog.lowerTime,
        weight: newLog.weight,
        images: newLog.images,
        qrlink: newLog.qrlink,
        certificate: newLog.certificate,
        colours: newLog.colours,
      }
    );

    Alert.alert("Success!", "Your log has been added!", [
      { text: "OK", onPress: () => navigation.navigate("Home") },
    ]);
  };

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

  const handleType = (e) => {
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

  let speciesData = [{ value: "Gank" }, { value: "Cros" }, { value: "Idk" }];

  return (
    <View style={styles.header}>
      <View>
        <Image style={styles.image} source={GeolibrumLogo} />
        <TypeWriter style={styles.title} typing={1}>
          Geolibrum
        </TypeWriter>
      </View>

      <ImageModal
        imagesList={imagesList}
        certList={certList}
        handleImageModal={handleImageModal}
        showImageModal={imagesModalVisible}
        deleteImage={deleteImage}
        deleteCert={deleteCert}
      />

      <View style={styles.body}>
        <View style={styles.holder}>
          <Text style={styles.areaTitle}>Add Mineral</Text>
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
              <Text style={styles.typeLabel}>Type</Text>
              <View style={styles.typePicker}>
                <Picker
                  selectedValue={newLog.type}
                  onValueChange={(value) => handleType(value)}
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
                placeholder="country name"
                onChangeText={(e) => handleCountry(e)}
              ></TextInput>
            </View>

            <View style={styles.selection}>
              <Text style={styles.regionLabel}>Region</Text>
              <TextInput
                style={styles.selectionText}
                placeholder="region name"
                onChangeText={(e) => handleRegion(e)}
              ></TextInput>
            </View>

            <View style={styles.selection}>
              <Text style={styles.cityLabel}>City</Text>
              <TextInput
                style={styles.selectionText}
                placeholder="city name"
                onChangeText={(e) => handleCity(e)}
              ></TextInput>
            </View>

            <View style={styles.selection}>
              <Text style={styles.weightLabel}>Weight</Text>
              <TextInput
                style={styles.selectionText}
                placeholder="0.0"
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
            <TouchableOpacity onPress={gatherData}>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.back}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChooseType");
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
    imagesList,
    certList,
    handleImageModal,
    showImageModal,
    deleteImage,
    deleteCert,
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
          {imagesList.length > 0 && (
            <View style={styles.modalTitleArea}>
              <Text style={styles.modalTitle}>Images</Text>
            </View>
          )}
          {imagesList.length > 0 &&
            imagesList.map((image) => {
              return (
                <View contentContainerStyle={styles.modalScrollView}>
                  <TouchableOpacity onPress={() => deleteImage(image)}>
                    <Image
                      style={styles.modalImage}
                      source={{ uri: image.uri }}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          {certList.length > 0 && (
            <View style={styles.modalTitleArea}>
              <Text style={styles.modalTitle}>Certificates</Text>
            </View>
          )}
          {certList.length > 0 &&
            certList.map((image) => {
              return (
                <View>
                  <TouchableOpacity onPress={() => deleteCert(image)}>
                    <Image
                      style={styles.modalImage}
                      source={{ uri: image.uri }}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
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

export default AddRockScreen;