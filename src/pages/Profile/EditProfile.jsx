import { View, Text, Pressable, ToastAndroid } from "react-native";
import React, { useContext, useState } from "react";
import AppBackground from "../../components/AppBackground";
import styles from "../../styles/styles";
import Button from "../../components/Button";
import LevelTitle from "../../assets/level/levelTitle.svg";
import { useNavigation } from "@react-navigation/native";
import { avatars } from "../../constants";
import AccountContext from "../../contexts/AccountContext";
import Input from "../../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = () => {
  const nav = useNavigation();
  const { accountData, setAccountData } = useContext(AccountContext);
  const [selectedAvatar, setSelectedAvatar] = useState(accountData.avatar);
  const Avatar = avatars[selectedAvatar];
  const [inputName, setInputName] = useState(accountData.username)

  const onSave = async () => {

    try {
      const accountsStorage = (await AsyncStorage.getItem("accounts")) || "[]";
      const jsonAccounts = JSON.parse(accountsStorage);
      
      let usernameDuplicate = false;
      jsonAccounts.map(account => {
        if (accountData.id !== account.id && inputName === account.username) {
          usernameDuplicate = true;
        }
      })
      if(usernameDuplicate){
        ToastAndroid.show("Username already exist.", ToastAndroid.SHORT);
        return;
      }
    } catch (error) {
      console.error(error);
    }

    const newData = { ...accountData, avatar: selectedAvatar, username:inputName };
    setAccountData(newData);
    nav.goBack();
  }

  return (
    <AppBackground>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={[styles.entryBackground, { padding: 8, width: "80%" }]}>
          <Text style={styles.entryTitle}>Edit Profile</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 99,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 8,
              borderColor: "#FFD41C",
              width: 160,
              height: 160,
            }}
          >
            <Avatar width={120} height={120} />
          </View>
          <Input
            text={"Name"}
            style={
              {
                backgroundColor: "#2C519F",
                borderRadius: 24,
                boxShadow: "0px 2px 12px #EDE09480",
                borderWidth: 8,
                borderColor: "#FFD41C",
                width: "70%",
                marginTop: 20,
              }
            }
            inputStyle={styles.entryTitle}
            value={inputName}
            onChangeText={(text) => {setInputName(text)}}
          />
        </View>
      </View>
      {/* Split */}
      <View
        style={{
          borderTopColor: "#FDD116",
          borderTopWidth: 6,
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
          onPress={onSave}
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
