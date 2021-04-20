import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./components/home";
import LogScreen from "./components/logs";

import ChooseTypeScreen from "./components/add-log-components/chooseType";
import AddLogScreen from "./components/add-log-components/addLog";
import ViewLog from "./components/view-log-components/viewLog";

import { useFonts } from "@use-expo/font";

import AppLoading from "expo-app-loading";

const customFonts = {
  Philosopher: require("./assets/fonts/Philosopher/Philosopher-Regular.ttf"),
  NotoSans: require("./assets/fonts/NotoSans/NotoSans-Regular.ttf")
};

const setCurrentLog = (log) => {
  setLog(log);
}

const setTypes = (type) => {
  setType(type);
}

const App = () => {
  [log, setLog] = useState();
  [type, setType] = useState();
  const Stack = createStackNavigator();
  const [isLoaded] = useFonts(customFonts);

  if (!isLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          children={(props) => (
            <HomeScreen
              {...props}
            />
          )}
          options={{ headerShown: false }}

        />
        <Stack.Screen
          name="Logs"
          children={(props) => (
            <LogScreen
              {...props}
              setLog={setCurrentLog}
            />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChooseType"
          children={(props) => (
            <ChooseTypeScreen
              {...props}
              setType={setTypes}
            />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddLog"
          children={(props) => (
            <AddLogScreen
              {...props}
              types={type}
            />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="View"
          children={(props) => (
            <ViewLog
              {...props}
              currentLog={log}
            />
          )}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
