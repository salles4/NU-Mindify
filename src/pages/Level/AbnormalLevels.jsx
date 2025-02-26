import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import AppBackground from "../../components/AppBackground";
import LevelBackground from "../../assets/maps/1.png";
import styles from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { CircleX } from "lucide-react-native";
import LevelButton from "./LevelButton";
import LevelTitle from "../../assets/level/levelTitle.svg";
import X from "../../assets/generic/x.svg";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import AccountContext from "../../contexts/AccountContext";

const AbnormalLevels = (props) => {
  const { category } = props.route.params;

  const nav = useNavigation();
  const { accountData } = useContext(AccountContext);

  const levelLocations = [
    { level: 1, left: 64, bottom: 32 },
    { level: 2, left: 64, bottom: 140 },
    { level: 3, left: "20%", bottom: "30%" },
    { level: 4, left: "21%", bottom: "45%" },
    { level: 5, left: "40%", bottom: "55%" },
    { level: "?", left: "55%", bottom: "70%" },
  ];
  return (
    <AppBackground source={LevelBackground}>
      <View style={{ justifyContent: "center" }}>
        <LevelTitle style={{ marginHorizontal: "auto" }} />
        <Text
          style={[
            styles.entryTitle,
            { position: "absolute", top: 0, width: "100%", marginTop: 32 },
          ]}
        >
          ABNORMAL PSYCHOLOGY
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        {levelLocations.map(({ level, left, bottom }, index) => (
          <LevelButton
            level={level}
            left={left}
            bottom={bottom}
            key={index}
            category={category}
            index={index}
            state={
              level === "?"
                ? "boss"
                : accountData.progress[0] > index
                ? "done"
                : accountData.progress[0] === index
                ? "current"
                : "soon"
            }
          />
        ))}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <Animated.View
            entering={SlideInDown.delay(200)}
            exiting={SlideOutDown}
            style={[
              {
                marginHorizontal: "auto",
                backgroundColor: "#00000044",
                borderTopStartRadius: 24,
                borderTopEndRadius: 24,
                padding: 12,
                paddingBottom: 24,
                borderWidth: 2,
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                nav.goBack();
              }}
            >
              <X width={42} height={42} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </AppBackground>
  );
};

export default AbnormalLevels;
