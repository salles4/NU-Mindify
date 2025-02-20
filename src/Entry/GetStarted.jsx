import { View, Text, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import Animated, { BounceIn, BounceOut, FadeIn, FadeOut } from 'react-native-reanimated';
import Login from './Login';
import styles from '../styles/styles';
import { BaseButton } from 'react-native-gesture-handler';
import Register from './Register';

export default function GetStarted() {
  const [state, setState] = useState("get started");
  
  return (
    <Animated.View entering={FadeIn.duration(1000)} exiting={FadeOut} style={{flex: 1}}>
      <ImageBackground
        source={require("../assets/bg.png")}
        style={{ flex: 1, justifyContent: "center" }}
        resizeMode="cover"
      >
        <View style={{ alignItems: "center", height: "100%", padding: 24 }}>
          <Animated.Image
            entering={BounceIn}
            source={require("../assets/Logo.png")}
            resizeMode="contain"
            style={{ width: 400, height: 200 }}
          />
          {state === "login" && <Login set={setState} />}
          {state === "get started" && <GetStartedButton set={setState} />}
          {state === "register" && <Register set={setState} />}
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

const GetStartedButton = ({set}) => {
  return (
    <BaseButton
      onPress={() => {
        set("login");
      }}
      style={[styles.buttonOpacity, { marginTop: "auto", marginBottom:32}]}
    >
      <Animated.View style={styles.button} entering={BounceIn.springify().delay(300)} exiting={BounceOut}>
        <Text entering={BounceIn} style={styles.buttonText}>
          Get Started
        </Text>
      </Animated.View>
    </BaseButton>
  );};



