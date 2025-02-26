import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import styles from '../../styles/styles';
import category1 from '../../assets/categories/1.jpg';
import category2 from '../../assets/categories/2.jpg';
import category3 from '../../assets/categories/3.jpg';
import category4 from '../../assets/categories/4.jpg';
import category5 from '../../assets/categories/5.jpg';
import StartModal from "../../components/StartModal";
import ModalContext from '../../contexts/ModalContext';
import { useNavigation } from '@react-navigation/native';

const data = [
  category1,
  category2,
  category3,
  category4,
  category5
];
const titles = ["Abnormal Psychology", "Developmental Psychology", "Psychological Assessment", "Industrial Psychology", "General Psychology"]
const {width} = Dimensions.get('screen')
const _imageWidth = width * 0.7;
const _imageHeight = _imageWidth * 1.76;
const _spacing = 18


const CategoryCarousel = () => {
  const nav = useNavigation()

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
  });

  const {modal, setModal} = useContext(ModalContext)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  return (
    <>
      <View style={{}}>
        <Animated.FlatList
          data={data}
          horizontal
          renderItem={({ item, index }) => (
            <Photo
              item={item}
              index={index}
              scrollX={scrollX}
              onPress={(index) => {
                setModal({
                  title: "Start",
                  subtitle: titles[index],
                  body: "Start to take the quiz?",
                  primaryFn: () => {
                    nav.navigate("AbnormalLevels");
                    setModal(null);
                  },
                  secondaryFn: () => {
                    setModal(null)
                  }
                })
              }}
            />
          )}
          snapToInterval={_imageWidth + _spacing}
          decelerationRate={"fast"}
          contentContainerStyle={{
            gap: _spacing,
            paddingHorizontal: (width - _imageWidth) / 2,
          }}
          style={{ flexGrow: 0 }}
          onScroll={onScroll}
          scrollEventThrottle={1000 / 60}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default CategoryCarousel


const Photo = ({item, index, scrollX, onPress}) => {
  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [1.5, 1, 1.5]
          ),
        },
        {
          rotate: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [10, 0, -10]
          )}deg`,
        },
      ],
    };
  });
  const imageContainerStyle = useAnimatedStyle(() => ({
    transform:[
      {
        scale: interpolate(
          scrollX.value,
          [index - 1, index, index + 1],
          [0.85, 1, 0.85]
        )
      }
    ]
  }))
  return (
    <TouchableOpacity onPress={() => onPress(index)} activeOpacity={0.9}>
      <Animated.View
        style={[
          {
            width: _imageWidth,
            height: _imageHeight,
            maxHeight: 900,
            overflow: "hidden",
            borderRadius: 16,
          },
          imageContainerStyle,
        ]}
      >
        <Animated.Image source={item} style={[{ flex: 1 }, imageStyle]} />
      </Animated.View>
      <View
        style={[
          styles.entryBackground,
          {
            backgroundColor: "#2C519F",
            marginHorizontal: "auto",
            width: "70%",
          },
        ]}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {titles[index]}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

