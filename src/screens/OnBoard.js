import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Image } from "react-native";

class OnBoard extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.navigation.navigate("HomePage");
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
