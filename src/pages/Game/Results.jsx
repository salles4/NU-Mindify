import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Animated, {
  BounceIn,
  FadeOut,
  FlipInEasyX,
  FlipOutEasyX,
  PinwheelIn,
} from "react-native-reanimated";
import styles from "../../styles/styles";
import Completed from "../../assets/results/completed.png";
import { useNavigation } from "@react-navigation/native";
import Orange from "../../assets/avatar/orangeMan.svg";
import smallStar from "../../assets/results/smallStar.png";
import smallStarEmpty from "../../assets/results/smallStarEmpty.png";
import bigStar from "../../assets/results/bigStar.png";
import bigStarEmpty from "../../assets/results/bigStarEmpty.png";
import Button from "../../components/Button";

const Results = ({ stats }) => {
  const nav = useNavigation();
  return (
    <View style={{ alignItems: "center" }}>
      {/* --Completed-- Banner */}
      <Animated.Image
        source={Completed}
        style={{ position: "absolute", top: -40, width: "100%", zIndex: 2 }}
        entering={FlipInEasyX}
        exiting={FlipOutEasyX}
        resizeMode={"contain"}
      />

      {/* Results */}
      <Animated.View
        style={[
          styles.entryBackground,
          { width: "90%", paddingHorizontal: 8, borderColor: "#caa52c" },
        ]}
        entering={BounceIn}
        exiting={FadeOut}
      >
        {/* Result/Star Container */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1C4384",
            width: "80%",
            padding: 24,
            paddingHorizontal: 12,
            margin: 24,
            marginTop: 55,
            paddingTop: 70,
          }}
        >
          {/* Star Container */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 130,
              width: "100%",
              position: "absolute",
              top: "-15%",
            }}
          >
            <SmallStar style={{ left: 0 }} isActive={true} delay={400} />
            <BigStar isActive={false} />
            <SmallStar style={{ right: "0" }} isActive={true} delay={800} />
          </View>
          {/* Profile */}
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 99,
              justifyContent:'center',
              alignItems:'center',
              borderWidth: 8,
              borderColor: "#FFD41C",
              width: 120,
              height: 120,
            }}
          >
            {/* <Image
              source={range}
              style={{ width: 100, height: 100 }}
              resizeMethod="scale"
              resizeMode="contain"
            /> */}
            <Orange/>
          </View>
          <Text style={{ fontSize: 24, fontWeight: 900, color: "white" }}>
            Francis
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "white",
              textAlign: "center",
              paddingHorizontal: 12,
            }}
          >
            You've scored {stats.correct * 10} points in _ seconds
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <ResultsStats
            stat={stats.correct + stats.wrong}
            label={"Questions"}
          />
          <ResultsStats
            stat={stats.correct}
            label={"Correct"}
            color={"green"}
          />
          <ResultsStats stat={stats.wrong} label={"Wrong"} color={"red"} />
        </View>

        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}
        >
          <Button onPress={() => nav.goBack()} text={"Next Level"} />
          <Button onPress={() => nav.goBack()} text={"Review"} />
        </View>
      </Animated.View>
      {/* <View>
        <Animated.View style={styles.entryBackground}>
          <Text>asd</Text>
        </Animated.View>
      </View> */}
    </View>
  );
};

export default Results;

const ResultsStats = ({ label, stat, color }) => {
  return (
    <View
      style={{
        padding: 8,
        backgroundColor: "#F6EDC6",
        borderRadius: 12,
        borderWidth: 8,
        borderColor: "#FFC300",
        justifyContent: "center",
        alignItems: "center",
        width: "32%",
      }}
    >
      <Text style={{ fontSize: 32, fontWeight: 900, color }}>{stat}</Text>
      <Text style={{}}>{label}</Text>
    </View>
  );
};

const SmallStar = ({style, isActive, delay}) =>{
  return (
    <Animated.Image
      source={isActive ? smallStar : smallStarEmpty}
      style={[
        style,
        {
          height: 80,
          width: 80,
          position: "absolute",
        },
      ]}
      entering={isActive ? PinwheelIn.springify().delay(delay) : undefined}
    />
  );
}

const BigStar = ({ isActive }) => {
  return (
    <Animated.Image
      source={isActive ? bigStar : bigStarEmpty}
      style={{
        height: 128,
        width: 128,
        position: "absolute",
        top: -30,
      }}
      entering={isActive ? PinwheelIn.springify().delay(1000) : undefined}
    />
  );
};