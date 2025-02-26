import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Animated, { BounceIn, BounceOut, FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Login from './Login';
import styles from '../../styles/styles';
import { Gesture, GestureDetector, Pressable } from 'react-native-gesture-handler';
import Register from './Register';
import AppBackground from "../../components/AppBackground";
import MindifyLogo from "../../assets/Logo.png";

export default function GetStarted() {
  const [state, setState] = useState("get started");
  
  return (
    <Animated.View
      entering={FadeIn.duration(1000)}
      exiting={FadeOut}
      style={{ flex: 1 }}
    >
      <AppBackground>
        <View style={{ alignItems: "center",  padding: 24, paddingTop:12, height: '100%' }}>
          <Animated.Image
            entering={BounceIn}
            source={MindifyLogo}
            resizeMode="contain"
            style={{ width: 400, height: 200 }}
          />
          {state === "login" && <Login set={setState} />}
          {state === "get started" && <GetStartedButton set={setState} />}
          {state === "register" && <Register set={setState} />}
        </View>
      </AppBackground>
    </Animated.View>
  );
}

const GetStartedButton = ({set}) => {
  

  return (
    <TouchableOpacity
          style={[
            styles.buttonOpacity,
            { marginTop: "auto" },
          ]}
          onPress={() => {
            set("login");
          }}
        >
          <Animated.View
            style={[styles.button]}
            entering={BounceIn.springify().delay(300)}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </Animated.View>
    </TouchableOpacity>
  );};



