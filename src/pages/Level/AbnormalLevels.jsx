import { View, Text, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AppBackground from '../../components/AppBackground'
import LevelBackground from '../../assets/maps/1.png'
import styles from '../../styles/styles'
import { useNavigation } from '@react-navigation/native'
import { CircleX } from 'lucide-react-native'
import LevelButton from './LevelButton'
import LevelTitle from '../../assets/level/levelTitle.svg'
import X from '../../assets/generic/x.svg'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'

const AbnormalLevels = () => {
  const nav = useNavigation();
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
        <LevelButton level={"?"} bottom={"70%"} left={"55%"} state={"boss"} />
        <LevelButton level={5} bottom={"55%"} left={"40%"} state={"soon"} />
        <LevelButton level={4} bottom={"45%"} left={"21%"} state={"soon"} />
        <LevelButton level={3} bottom={"30%"} left={"20%"} state={"current"} />
        <LevelButton level={2} bottom={140} left={64} state={"done"} />
        <LevelButton level={1} bottom={32} left={64} state={"done"} />
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
}

export default AbnormalLevels