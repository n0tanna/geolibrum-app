import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./components/home";
import LogScreen from "./components/logs";

import ChooseTypeScreen from "./components/add-log-components/chooseType";
import AddRockScreen from "./components/add-log-components/addRockLog";
import AddFossilScreen from "./components/add-log-components/addFossilLog";
import AddMineralScreen from "./components/add-log-components/addMineralLog";

import LoginScreen from "./components/sign-in-components/loginAccount";
import RegisterScreen from "./components/sign-in-components/registerAccount";

import { useFonts } from "@use-expo/font";

import AppLoading from "expo-app-loading";

const customFonts = {
  Philosopher: require("./assets/fonts/Philosopher/Philosopher-Regular.ttf"),
  NotoSans: require("./assets/fonts/NotoSans/NotoSans-Regular.ttf")
};

const App = () => {
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
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Logs"
          children={(props) => (
            <LogScreen
              {...props}
            />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChooseType"
          children={(props) => (
            <ChooseTypeScreen
              {...props}
            />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddRock"
          children={(props) => (
            <AddRockScreen
              {...props}
            />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddMineral"
          children={(props) => (
            <AddMineralScreen
              {...props}
            />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddFossil"
          children={(props) => (
            <AddFossilScreen
              {...props}
            />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          children={(props) => (
            <LoginScreen
              {...props}
            />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          children={(props) => (
            <RegisterScreen
              {...props}
            />
          )}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
