import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppBackground from "../../components/AppBackground";
import styles from "../../styles/styles";
import Input from "../../components/Input";
import {
  MessageSquareTextIcon,
  SendHorizonal,
  XCircle,
} from "lucide-react-native";
import { Pressable } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import AccountContext from "../../contexts/AccountContext";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { accountData, setAccountData } = useContext(AccountContext);
  const nav = useNavigation();

  const getData = async () => {
    setMessages(
      accountData.chat.length !== 0 ? accountData.chat : [
        {
          sender: "ai",
          message:
            "Hey there, future psychologist! 👋 I'm your friendly Mindibot! here to help you ace your studies. Ready to mindify your reviews?",
        },
      ]
    );
  };
  const storeData = async (value) => {
    setAccountData({...accountData, chat: value})
  };
  useEffect(() => {
    getData();
  }, []);
  const sendMessage = () => {
    setIsFetching(true);
    fetch("https://get-psych-backend.vercel.app/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: input,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const aiChat = formatAIText(data.response);
        const newMessagesList = [
          ...messages,
          {
            sender: "user",
            message: input,
            time: `${new Date()}`,
          },
          {
            sender: "ai",
            message: aiChat,
            time: `${new Date()}`,
          },
        ];

        storeData(newMessagesList);
        setMessages(newMessagesList);
        setInput("");
        setIsFetching(false);
      });
  };
  const formatAIText = (message) => {
    return message.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)/g, "• ");
  };
  return (
    <AppBackground style={{ padding: 28 }}>
      <View
        style={{
          backgroundColor: "#F9EBDE",
          flex: 1,
          borderRadius: 24,
          padding: 24,
        }}
      >
        <View
          style={[
            styles.entryBackground,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 0,
            },
          ]}
        >
          <Text
            style={[styles.entryBody, { fontSize: 24, fontWeight: "bold" }]}
          >
            Chatbot
          </Text>
          <Pressable onPress={() => nav.goBack()}>
            <XCircle color={"white"} size={32} />
          </Pressable>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                {
                  marginBottom: 12,
                  padding: 12,
                  borderRadius: 12,
                  maxWidth: 500,
                },
                message.sender === "ai"
                  ? {
                      backgroundColor: "#2E5A9F",
                    }
                  : {
                      backgroundColor: "#FFC300",
                      marginStart: "auto",
                    },
              ]}
            >
              <Text
                style={{ color: message.sender === "ai" ? "white" : "black" }}
              >
                {message.message}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Input
            placeholder={"Type a message"}
            Icon={MessageSquareTextIcon}
            onChangeText={(text) => setInput(text)}
            value={input}
            disabled={isFetching}
          >
            <Pressable onPress={sendMessage} disabled={isFetching}>
              <View
                style={[
                  styles.button,
                  isFetching && { backgroundColor: "c4c4c4" },
                ]}
              >
                <SendHorizonal color={"black"} />
              </View>
            </Pressable>
          </Input>
        </View>
      </View>
    </AppBackground>
  );
};

export default Chatbot;
