import React, { useState } from "react";
import {
  View,
  Image,
  Picker,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import GeolibrumLogo from "../../assets/Photos/Illustrated/geolibrum-logo.png";
import CalendarLogo from "../../assets/Photos/Illustrated/calendar-logo.png";
import CameraLogo from "../../assets/Photos/Illustrated/camera-logo.png";
import styles from "../../styles/add-fossil-log-styles.js";
import TypeWriter from "react-native-typewriter";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

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
          <Text style={styles.areaTitle}>Add Fossil</Text>
          <TouchableOpacity style={styles.imageBackground}>
            <Image style={styles.imageLogosTop} source={CameraLogo} />
          </TouchableOpacity>

          <View>
            <Text>Species</Text>
            <Picker style={styles.dropDown}>
              {speciesData.map((data) => {
                return <Picker.Item label={data.value} />;
              })}
            </Picker>
          </View>

          <View>
            <Text>Date</Text>
            <Text>{newLog.date}</Text>
            <TouchableOpacity
              style={styles.imageBackground}
              onPress={showDatePicker}
            >
              <Image style={styles.imageLogoDate} source={CalendarLogo} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              dateFormat="YYYY-MM-DD"
            />
          </View>

          <View>
            <Text>City</Text>
            <TextInput></TextInput>
          </View>

          <View>
            <Text>Region</Text>
            <TextInput></TextInput>
          </View>

          <View>
            <Text>Country</Text>
            <TextInput></TextInput>
          </View>

          <View>
            <Text>Time Period Range</Text>
            <TextInput
              placeholder="bottom range"
              keyboardType="numeric"
            ></TextInput>
            <TextInput
              placeholder="top range"
              keyboardType="numeric"
            ></TextInput>
          </View>

          <View>
            <Text>Weight</Text>
            <TextInput placeholder="0.0" keyboardType="numeric"></TextInput>
          </View>

          <View>
            <Text>Colour(s)</Text>
            <TextInput></TextInput>
            <Text>+</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddFossilScreen;
