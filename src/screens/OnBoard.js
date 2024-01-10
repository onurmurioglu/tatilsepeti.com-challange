/*
import { SafeAreaView, StyleSheet, Image } from "react-native";
import React from "react";

const OnBoard = ({ navigation }) => {
  const timer = setTimeout(() => {
    navigation.navigate("HomePage");
    clearTimeout(timer);
  }, 2000);

  return (
    <SafeAreaView style={styles.mainView}>
      <Image
        style={styles.backgroundImage}
        source={require("../assets/ttspeti.png")}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

export default OnBoard;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  backgroundImage: {
    width: "80%",
    height: "50%",
  },
});
*/

import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Image } from "react-native";

class OnBoard extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.navigation.navigate("HomePage");
      clearTimeout(this.timer);
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <SafeAreaView style={styles.mainView}>
        <Image
          style={styles.backgroundImage}
          source={require("../assets/ttspeti.png")}
          resizeMode="contain"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  backgroundImage: {
    width: "80%",
    height: "50%",
  },
});

export default OnBoard;
