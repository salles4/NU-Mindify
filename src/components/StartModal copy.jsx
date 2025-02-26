import {
  Text,
  TouchableOpacity,
} from "react-native";
import Animated, {
  BounceIn,
  BounceOut,
  FadeIn,
  FadeOut,
  ZoomOut,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import ModalBg from '../assets/modal/startCard.png'
import YesButton from '../assets/modal/yesBtn.png'
import NoButton from '../assets/modal/noBtn.png'
import { useContext } from "react";
import ModalContext from "../contexts/ModalContext";
import { modalStyles } from '../styles/modalStyles'

export default function Start() {
  const {modal, setModal} = useContext(ModalContext);
  function handlesYes() {
    modal.primaryFn()
  }

  function handlesNo() {
    modal.secondaryFn();
  }

  return (
    // {/* <View style={[Styles.mainCont, { paddingTop: Constants.statusBarHeight }]}> */}
    <>
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
          <Animated.Image source={ModalBg} style={modalStyles.imageStyle} />
          <Text style={modalStyles.subtitle}>{modal.subtitle}</Text>
          <Text style={modalStyles.bodyText}>{modal.body}</Text>
          {modal.mode === "LevelSelect" ? (
            <Animated.View
              style={modalStyles.btnContainer}
              entering={BounceIn}
              exiting={BounceOut}
            >
              <TouchableOpacity onPress={handlesYes}>
                <Animated.Image source={YesButton} />
              </TouchableOpacity>

              <TouchableOpacity onPress={handlesNo}>
                <Animated.Image source={NoButton} />
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Animated.View
              style={[modalStyles.btnContainer, {flexDirection: 'column'}]}
              entering={BounceIn}
              exiting={BounceOut}
            >
              <TouchableOpacity onPress={handlesYes}>
                <Animated.Image source={YesButton} />
              </TouchableOpacity>

              <TouchableOpacity onPress={handlesNo}>
                <Animated.Image source={NoButton} />
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>
      </Animated.View>
    </>
  );
}

