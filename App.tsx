
import React, { Component } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./src/screens/HomePage";
import OnBoard from "./src/screens/OnBoard";

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="OnBoard"
            component={OnBoard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{
              //headerBackVisible: false,
              headerTitle: "Antalya",
              headerTitleAlign: "center",
              headerTintColor: "#1C4862",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
