import { View, TextInput } from 'react-native'
import React from 'react'

const Input = ({placeholder, Icon, onChangeText, value, secure = false, style = {}}) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          width: "90%",
          marginHorizontal: "auto",
          padding: 8,
          borderRadius: 24,
          gap: 12,
          marginBottom: 6,
        },
        style,
      ]}
    >
      <Icon color="black" />
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secure}
        style={{flex:1}}
      ></TextInput>
    </View>
  );
}

export default Input