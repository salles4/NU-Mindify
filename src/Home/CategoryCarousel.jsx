import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import styles from '../styles/styles';

const data = [
  require("../assets/categories/1.jpg"),
  require("../assets/categories/2.jpg"),
  require("../assets/categories/3.jpg"),
  require("../assets/categories/4.jpg"),
  require("../assets/categories/5.jpg"),
];
const titles = ["Abnormal Psychology", "Developmental Psychology", "Psychological Assessment", "Industrial Psychology", "General Psychology"]
const {width} = Dimensions.get('screen')
const _imageWidth = width * 0.7;
const _imageHeight = _imageWidth * 1.76;
const _spacing = 18


const CategoryCarousel = () => {
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing)
  })

  return (
    <>
      <View style={{}}>
        <Animated.FlatList
          data={data}
          horizontal
          renderItem={({ item, index }) => (
            <Photo item={item} index={index} scrollX={scrollX} />
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
}

export default CategoryCarousel


const Photo = ({item, index, scrollX}) => {
  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [1.2, 1, 1.2]
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
  return (
    <View>
      <View
        style={{
          width: _imageWidth,
          height: _imageHeight,
          overflow: "hidden",
          borderRadius: 16,
        }}
      >
        <Animated.Image
          source={item}
          style={[{ flex: 1, objectFit: "cover" }, imageStyle]}
          resizeMethod={"resize"}
        />
      </View>
      <View
        style={[
          styles.entryBackground,
          {
            backgroundColor: "#2C519F",
            marginHorizontal: "auto",
            width: '70%'
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
    </View>
  );
}

