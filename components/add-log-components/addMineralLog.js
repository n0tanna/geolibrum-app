import React, { useState } from "react";
import {
  View,
  Image,
  Picker,
  TextInput,
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

import styles from "../../styles/add-mineral-log-styles.js";
import TypeWriter from "react-native-typewriter";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const AddMineralScreen = (props) => {
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
    colours: [],
  });

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
          <Text style={styles.areaTitle}>Add Mineral</Text>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.camera}>
              <TouchableOpacity style={styles.imageBackground}>
                <Image style={styles.imageLogosTop} source={CameraLogo} />
              </TouchableOpacity>
            </View>

            <View style={styles.photo}>
              <TouchableOpacity style={styles.imageBackground}>
                <Image style={styles.imageLogosTop} source={PhotoLogo} />
              </TouchableOpacity>
            </View>

            <View style={styles.document}>
              <TouchableOpacity style={styles.imageBackground}>
                <Image style={styles.imageLogosTop} source={DocumentLogo} />
              </TouchableOpacity>
            </View>

            <View style={styles.selection}>
              <Text style={styles.typeLabel}>Type</Text>
              <View style={styles.typePicker}>
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

            <View style={styles.selection}>
              <Text style={styles.weightLabel}>Weight</Text>
              <TextInput style={styles.selectionText} placeholder="0.0" keyboardType="numeric"></TextInput>
            </View>

            <View style={styles.selection}>
              <Text style={styles.colourLabel}>Colour(s)</Text>
              <TextInput style={styles.selectionText} placeholder="colour name"></TextInput>
              <TouchableOpacity style={styles.plusIcon}><Text style={styles.plusIconText}>+</Text></TouchableOpacity>
            </View>
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

export default AddMineralScreen;