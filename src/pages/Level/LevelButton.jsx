import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native'
import levelyellow from '../../assets/level/levelyellow.png'
import levelred from '../../assets/level/levelred.png'
import levelredPressed from "../../assets/level/levelredPressed.png";
import levelblue from '../../assets/level/levelblue.png'
import levelgray from '../../assets/level/levelgray.png'
import levelgrayPressed from '../../assets/level/levelgrayPressed.png'
import levelbluePressed from "../../assets/level/levelbluePressed.png";
import levelyellowPressed from '../../assets/level/levelyellowPressed.png'
import React, { useContext, useState } from 'react'
import ModalContext from '../../contexts/ModalContext';
import { useNavigation } from '@react-navigation/native';
import Animated, { BounceIn } from 'react-native-reanimated';

const LevelButton = ({bottom, left, level, state, index}) => {
  const [isPressing, setIsPressing] = useState(false)

  const getSource = () => {
    switch (state) {
      case "current":
        return isPressing ? levelyellowPressed : levelyellow;
      case "soon":
        return isPressing ? levelgrayPressed : levelgray;
      case "done":
        return isPressing ? levelbluePressed : levelblue;
      case "boss":
        return isPressing ? levelredPressed : levelred;
      default:
        break;
    }
  }
  const {modal, setModal} = useContext(ModalContext);
  const nav = useNavigation();
  return (
    <Pressable
      style={{
        position: "absolute",
        bottom,
        left,
        justifyContent: "center",
        alignItems: "center",
        width: 48,
        height: 60,
      }}
      onPressIn={() => setIsPressing(true)}
      onPressOut={() => setIsPressing(false)}
      onPress={() => {
        if (state === "soon") return;
        setModal({
          subtitle: `Start Level ${level}?`,
          primaryFn: () => {
            nav.replace("Game", { level, levelIndex: index, category:0 });
            setModal(null);
          },
          secondaryFn: () => {
            setModal(null);
          },
          body: "Start quiz?",
          mode: "LevelSelect",
        });
      }}
    >
      <Animated.View
        entering={BounceIn.delay(200 * index)}
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 48,
          height: 60,
        }}
      >
        <Animated.Image
          source={getSource()}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
        <Text
          style={{
            color: "white",
            fontWeight: 900,
            fontSize: 32,
            transform: [{ translateY: -40 }],
          }}
        >
          {level}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export default LevelButton