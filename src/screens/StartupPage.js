import React, { useEffect, useState } from "react";
import {
  View,
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
    <View className="flex-1 flex-col items-center pb-1 mx-auto w-full bg-emerald-400 max-w-lg">
      <View className="flex-1 justify-center items-center mt-16 w-full">
        <Image 
          source={require("../../assets/StartupImage.png")}
          className="w-full rounded-full"
          resizeMode="contain"
          accessibilityLabel="Main Image"
          accessibilityRole="image"
        />
      </View>
      <View className="-mt-12">
        <Text className="text-4xl font-bold leading-11 text-center text-white">
          {typedText}
        </Text>
      </View>
    </View>
  );
}

export default StartupPage;




