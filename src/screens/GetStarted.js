import React from "react";
import { SafeAreaView, View, ImageBackground, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

const GetStarted = (props) => {
  const renderSpace = () => {
    return <View style={styles.space}></View>;
  };

  const renderButton = () => {
    return (
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{"Get Started"}</Text>
      </TouchableOpacity>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.bodyContainer}>
        <Image
          source={ require("/home/suubi7/MUSDAA/MUSDAA-Springs-of-Joy/assets/Logo-Components-5.png" )}
          resizeMode={"stretch"}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>{"Welcome"}</Text>
        <Text style={styles.descriptionText}>{"We are His Hands"}</Text>
        {renderButton()}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={ require('/home/suubi7/MUSDAA/MUSDAA-Springs-of-Joy/assets/FingerPrint.jpg')}
        resizeMode={'stretch'}
        style={styles.background}
      >
        {renderSpace()}
        {renderBody()}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
	position: "relative",
	width: "100%",
  },
  background: {
    flex: 1,
	resizeMode: "cover",
	justifyContent: "center",
	width: "100%",
	height: "100%",
  },
  space: {
    height: 450,
  },
  buttonContainer: {
    height: 65,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#53B175",
    borderRadius: 20,
    margin: 16,
  },
  buttonText: {
    color: "#FFF9FF",
    fontSize: 18,
    fontWeight: "bold",
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
	width: 200,
    height: 120,
	marginTop: -100,
  },
  welcomeText: {
    color: "#ffffff",
    fontSize: 50,
    fontWeight: "bold",
    margin: 20,
  },
  descriptionText: {
    color: "#FCFCFC",
    fontSize: 15,
    marginBottom: 20,
  },
});

export default GetStarted;
