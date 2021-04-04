import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Picker,
  TextInput,
  SafeAreaView,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import GeolibrumLogo from "../../assets/Photos/Illustrated/geolibrum-logo.png";
import CalendarLogo from "../../assets/Photos/Illustrated/calendar-logo.png";
import CameraLogo from "../../assets/Photos/Illustrated/camera-logo.png";
import DocumentLogo from "../../assets/Photos/Illustrated/document-logo.png";
import PhotoLogo from "../../assets/Photos/Illustrated/photo-logo.png";
import Back from "../../assets/Photos/Illustrated/back-logo.png";

import styles from "../../styles/add-fossil-log-styles.js";
import TypeWriter from "react-native-typewriter";
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { render } from "react-dom";

const AddFossilScreen = (props) => {
  const { navigation } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [newLog, setNewLog] = useState({
    type: 1,
    species: "",
    date: "",
    city: "",
    region: "",
    country: "",
    upperTime: "",
    lowerTime: "",
    weight: "",
    images: [],
    certificate: [],
    colours: [],
  });

  const [image, setImage] = useState(null);
  const [hasFile, setHasFile] = useState(false);
  const [hasColour, setHasColour] = useState(false);
  const [colour, setColour] = useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
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
      setImage(result.uri);
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
      setImage(result.uri);
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

  const Item = ({ title }) => (
    <View>
      <Text>{title}</Text>
    </View>
  );

  const renderColour = ({ item }) => <Item title={item} />;

  const handleColour = (e) => {
    setColour(e);
  }

  const addColour = async () => {
    newLog.colours.push(colour);
    setColour("");
    await setHasColour(true);
  }

  let speciesData = [{ value: "Gank" }, { value: "Cros" }, { value: "Idk" }];

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
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.camera}>
              <TouchableOpacity style={styles.imageBackground} onPress={takeImage}>
                <Image style={styles.imageLogosTop} source={CameraLogo} />
              </TouchableOpacity>
            </View>

            <View style={styles.photo}>
              <TouchableOpacity style={styles.imageBackground} onPress={pickImage}>
                <Image style={styles.imageLogosTop} source={PhotoLogo} />
              </TouchableOpacity>
            </View>

            <View style={styles.document}>
              <TouchableOpacity style={styles.imageBackground} onPress={pickedDocument}>
                <Image style={styles.imageLogosTop} source={DocumentLogo} />
              </TouchableOpacity>
            </View>

            <View style={styles.selection}>
              {hasFile &&
                <TouchableOpacity style={styles.buttonLabel}>
                  <Text style={styles.buttonText}>View Images</Text>
                </TouchableOpacity>

              }
            </View>

            <View style={styles.selection}>
              <Text style={styles.speciesLabel}>Species</Text>
              <View style={styles.speciesPicker}>
                <Picker style={styles.dropDown}>
                  {speciesData.map((data) => {
                    return <Picker.Item label={data.value} />;
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
              ></TextInput>
            </View>

            <View style={styles.selection}>
              <Text style={styles.regionLabel}>Region</Text>
              <TextInput
                style={styles.selectionText}
                placeholder="region name"
              ></TextInput>
            </View>

            <View style={styles.selection}>
              <Text style={styles.cityLabel}>City</Text>
              <TextInput
                style={styles.selectionText}
                placeholder="city name"
              ></TextInput>
            </View>

            <View style={styles.selection}><Text style={styles.timeLabel}>Time Period Range</Text></View>
            <View style={styles.lowerSelection}>
              <TextInput
                placeholder="0"
                keyboardType="numeric"
              ></TextInput>
            </View>
            <Text style={styles.dashText}>-</Text>
            <View style={styles.upperSelection}>
              <TextInput
                placeholder="0"
                keyboardType="numeric"
              ></TextInput>
            </View>

            <View style={styles.selection}>
              <Text style={styles.weightLabel}>Weight</Text>
              <TextInput style={styles.selectionText} placeholder="0.0" keyboardType="numeric"></TextInput>
            </View>

            <View style={styles.selection}>
              <Text style={styles.colourLabel}>Colour(s)</Text>
              <TextInput style={styles.selectionText} placeholder="colour name" onChangeText={e => handleColour(e)} />
              <TouchableOpacity onPress={addColour} style={styles.plusIcon}><Text style={styles.plusIconText}>+</Text></TouchableOpacity>
            </View>

            {hasColour &&
              newLog.colours.map((item, index) => {
                return (<TouchableOpacity><Text>{item}</Text></TouchableOpacity>);
              })
            }

          </ScrollView>

          <View style={styles.add}>
            <TouchableOpacity>
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

export default AddFossilScreen;
