import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import AppBackground from "../../components/AppBackground";
import styles from "../../styles/styles";
import BlackOrangeGirl from "../../assets/avatar/blackOrangeGirl.svg";
import BlueMan from "../../assets/avatar/blueMan.svg";
import OrangeMan from "../../assets/avatar/orangeMan.svg";
import RedGirl from "../../assets/avatar/redGirl.svg";
import WhiteMan from "../../assets/avatar/whiteMan.svg";
import WhiteOrangeGirl from "../../assets/avatar/whiteOrangeGirl.svg";
import Button from "../../components/Button";
import LevelTitle from "../../assets/level/levelTitle.svg";
import { useNavigation } from "@react-navigation/native";

const avatars = [
  BlackOrangeGirl,
  BlueMan,
  OrangeMan,
  RedGirl,
  WhiteMan,
  WhiteOrangeGirl,
];

const EditProfile = () => {
  const nav = useNavigation();
  const [selectedAvatar, setSelectedAvatar] = useState(-1)
  return (
    <AppBackground>
      <View style={{ flex: 1 }}>
        <View style={[styles.entryBackground, { padding: 8, width: "80%" }]}>
          <Text style={styles.entryTitle}>Edit Profile</Text>
        </View>
      </View>
      <View
        style={{
          borderTopColor:'#FDD116',
          borderTopWidth:6,
          backgroundColor: "#273574",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <View
          style={{ justifyContent: "center", position: "absolute", top: -40 }}
        >
          <LevelTitle style={{ marginHorizontal: "auto" }} />
          <Text
            style={[
              styles.entryTitle,
              { position: "absolute", textAlign: "center", width: "100%" },
            ]}
          >
            AVATAR
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: 24,
            gap: 12,
          }}
        >
          {avatars.map((Avatar, index) => {
            return (
              <AvatarCard
                SVG={Avatar}
                key={index}
                selected={selectedAvatar === index}
                onPress={() => setSelectedAvatar(index)}
              />
            );
          })}
        </View>
        <Button
          style={{ flex: 0, width: "50%" }}
          onPress={() => {nav.goBack()}}
          text={"Save"}
        />
      </View>
    </AppBackground>
  );
};

export default EditProfile;

const AvatarCard = ({ SVG, selected, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: selected ? "#BBBBBB" : "white",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 8,
        borderColor: selected ? "#fff41c" : "#FFD41C",
        width: 100,
        height: 120,
      }}
    >
      <SVG />
    </Pressable>
  );
};
