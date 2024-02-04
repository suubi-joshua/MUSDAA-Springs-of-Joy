import React from "react";
import { SafeAreaView, View, ImageBackground, Image, Text, TextInput, TouchableOpacity } from "react-native";

const LoginPage = (props) => {
  const renderLogo = () => {
    return (
      <View style={styles.logoContainer}>
        <Image
          source={require("/home/suubi7/Apps/MUSDAA/MUSDAA_Connect/assets/Logo-Components.png")}
          resizeMode={"stretch"}
          style={styles.logo}
        />
      </View>
    );
  };

  const renderEmail = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>{"Email"}</Text>
        <TextInput
          placeholder={"myuser@gmail.com"}
          style={styles.textInput}
        />
        <View style={styles.inputUnderline}></View>
      </View>
    );
  };

  const renderPassword = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>{"Password"}</Text>
        <TextInput
          placeholder={"Enter your password"}
          style={styles.textInput}
        />
        <View style={styles.inputUnderline}></View>
      </View>
    );
  };

  const renderButtonLogin = () => {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{"LOG IN"}</Text>
      </View>
    );
  };

  const renderCanSignup = () => {
    return (
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>{"Don't have an account?"}</Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}>{" Signup"}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={ require('/home/suubi7/Apps/MUSDAA/MUSDAA_Connect/assets/Blurbackground.jpg')}
        resizeMode={'stretch'}
        style={styles.background}
      >
        {renderLogo()}
        <Text style={styles.heading}>{"Login"}</Text>
        {renderEmail()}
        {renderPassword()}
        <View style={styles.signupContainer}>
          <View style={{ flex: 1, alignSelf: "stretch" }}></View>
          <TouchableOpacity>
            <Text style={styles.signupText}>{"Forgot Password?"}</Text>
          </TouchableOpacity>
        </View>
        {renderButtonLogin()}
        {renderCanSignup()}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    width : "100%",
  },
  background: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    margin: 50,
  },
  logo: {
    width: 300,
    height: 200,
    justifyContent: "center",
  },
  heading: {
    color: "#181725",
    fontSize: 26,
    fontWeight: "bold",
  },
  subheading: {
    color: "#7C7C7C",
    fontSize: 16,
    marginVertical: 20,
  },
  inputContainer: {
    marginVertical: 16,
  },
  labelText: {
    color: "#53B175",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textInput: {
    color: "#181725",
    fontSize: 18,
    marginVertical: 12,
    height: 22,
  },
  inputUnderline: {
    height: 1,
    backgroundColor: "#53B175",
  },
  buttonContainer: {
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#53B175",
    borderRadius: 20,
    marginVertical: 20,
  },
  buttonText: {
    color: "#FFF9FF",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#181725",
    fontSize: 14,
  },
  signupLink: {
    color: "#53B175",
    fontSize: 14,
  },
};

export default LoginPage;
