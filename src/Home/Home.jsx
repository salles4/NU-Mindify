import { View, ImageBackground, Image, Text, Pressable, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { BookMarkedIcon, BrainCircuitIcon, MessageSquareQuoteIcon, Settings } from "lucide-react-native";
import styles from "../styles/styles";
import CategoryCarousel from "./CategoryCarousel";
import AccountContext from "../contexts/AccountContext";

const Home = () => {
  const {setAccountData} = useContext(AccountContext)
  return (
    <Animated.View entering={FadeIn} style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/bg.png")}
        style={{ flex: 1, justifyContent: "center" }}
        resizeMode="cover"
      >
        <View style={{ flex: 1, paddingBottom: 32 }}>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              padding: 8,
            }}
          >
            <View style={styles.homeRoundedIcon}>
              <Image
                source={require("../assets/favicon.png")}
                style={{ width: 32, height: 32 }}
              />
            </View>
            <Animated.Image
              source={require("../assets/Logo.png")}
              resizeMode="contain"
              style={{ width: 200, height: 100 }}
            />
            <Pressable style={styles.homeRoundedIcon} onPress={()=> {setAccountData({uid:null})}}>
              <Settings size={32} color={"black"} />
            </Pressable>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <CategoryCarousel />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Pressable style={{}}>
              <View style={styles.button}>
                <BookMarkedIcon size={32} color={"black"} />
              </View>
              <Text style={homeStyles.buttonText}>Glossary</Text>
            </Pressable>

            <Pressable style={{}}>
              <View style={[styles.button, { flexDirection: "row" }]}>
                <MessageSquareQuoteIcon size={32} color={"black"} />
              </View>
              <Text style={homeStyles.buttonText}>ChatBot</Text>
            </Pressable>

            <Pressable style={{}}>
              <View style={styles.button}>
                <BrainCircuitIcon size={32} color={"black"} />
              </View>
              <Text style={homeStyles.buttonText}>Mind Map</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

export default Home;

const homeStyles = StyleSheet.create({
  buttonText:{
    ...styles.buttonText,
    color:'white'
  }
})