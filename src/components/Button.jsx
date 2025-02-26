import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles/styles'

const Button = ({onPress, text, style={}}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { flex: 1 }, style]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button