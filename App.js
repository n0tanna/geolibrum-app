import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/home";
import LogScreen from "./components/logs";
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
