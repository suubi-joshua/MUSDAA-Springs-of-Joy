import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text
} from "react-native";

function StartupPage() {

  const [typedText, setTypedText] = useState("");
  
  useEffect(() => {
   
    const targetText = "MUSDAA";
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypedText((prevText) => prevText + targetText[index]);
      index++;

      if (index === targetText.length) {
        clearInterval(typingInterval);
      }
    }, 200); 

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require("/home/suubi7/Apps/MUSDAA/MUSDAA_Connect/assets/StartupImage.png")} 
          style={styles.image}
          loading="lazy"
          accessibilityLabel="Main Image"
          accessibilityRole="image"
        />
      </View>
      <View style={styles.title}>
          <Text style={styles.titleText}>{typedText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 2,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    backgroundColor: "#34D399",
    maxWidth: 480
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center", // Center the image vertically
    alignItems: "center", // Center the image horizontally
    marginTop: 64,
    width: "100%",
  },
  image: {
    width: "100%", // Adjust the width as needed
    borderRadius: 100,
    resizeMode: "contain"
  },
  title: {
    marginTop: 14,
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    lineHeight: 44,
    textAlign: "center",
    color: "#FFF"
  }
});

export default StartupPage;




