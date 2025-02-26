import { ImageBackground } from "react-native";
import React from "react";
import MindifyBackground from "../assets/bg.png";
import { SafeAreaView } from "react-native-safe-area-context";


const AppBackground = ({ children, style = {}, source, viewStyle = {}}) => {
  return (
    <ImageBackground
      source={source || MindifyBackground}
      style={[{ flex: 1 }, style]}
      resizeMode="cover"
      resizeMethod="scale"
    >
      <SafeAreaView style={[{flex: 1, width:'100%', }, viewStyle]}>{children}</SafeAreaView>
    </ImageBackground>
  );
};

export default AppBackground;
