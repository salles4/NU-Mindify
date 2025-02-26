import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import Animated, { BounceIn, BounceOut, FadeIn, FadeOut, ZoomOut } from 'react-native-reanimated'
import { modalStyles } from '../../styles/modalStyles'
import answerBanner from '../../assets/rationale/answerBanner.png'
import answerBody from '../../assets/rationale/answerBody.png'
import answerContinue from '../../assets/rationale/answerContinue.png'
import ModalContext from '../../contexts/ModalContext'

export default function RationaleModal ({modal}) {
  
  return (
    <Animated.View
      style={modalStyles.modalBackground}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <Animated.View
        style={modalStyles.card}
        entering={BounceIn.duration(500)}
        exiting={ZoomOut.duration(300)}
      >
        <Animated.Image
          source={answerBanner}
          style={[
            modalStyles.imageStyle,
            {
              top: -50,
              zIndex: 2,
            },
          ]}
        />
        <Text style={[modalStyles.imageStyle,{
          top:-20,
          zIndex:2,
          textAlign:'center',
          fontWeight: 900,
          fontSize:24,
          color:'white'
        }]}>
          {modal.title.toUpperCase()}
        </Text>
        {/* <Animated.Image source={answerBody} style={modalStyles.imageStyle} /> */}
        <View
          style={{
            borderRadius: 24,
            borderColor: "#2D3A72",
            borderWidth: 8,
            backgroundColor: "#2D3A72",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#35408E",
              padding: 24,
              paddingTop:0,
              borderRadius: 24,
              borderColor: "#FDD116",
              borderWidth: 8,
            }}
          >
            <Text
              style={[
                modalStyles.subtitle,
                {
                  color: modal.isCorrect ? "green" : "red",
                  backgroundColor: "#F9EBDE",
                  borderColor: "#1C4384",
                  borderWidth: 4,
                  width: 220,
                  padding: 20,
                  borderRadius: 8,
                },
              ]}
            >
              {modal.isCorrect ? "CORRECT" : "WRONG"}
            </Text>
            <Text style={[modalStyles.subtitle, { marginTop: 12 }]}>
              {modal.subtitle}
            </Text>
            <Text style={modalStyles.bodyText}>{modal.body}</Text>
            <Animated.View
              style={modalStyles.btnContainer}
              entering={BounceIn}
              exiting={BounceOut}
            >
              <TouchableOpacity onPress={() => modal.primaryFn()}>
                <Image source={answerContinue} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}