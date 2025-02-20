import { Text } from 'react-native'
import React, { useContext, useState } from 'react'
import Animated, { FlipInXUp, FlipOutXDown, useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated'
import styles from '../styles/styles'
import Input from '../components/Input'
import { LockKeyhole, Mail, UserCircle2 } from 'lucide-react-native'
import { RectButton } from 'react-native-gesture-handler'
import AccountContext from '../contexts/AccountContext'

const Register = ({set}) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {setAccountData} = useContext(AccountContext);


  const keyboard = useAnimatedKeyboard();

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value/2 }],
  }));

  return (
    <>
      <Animated.View entering={FlipInXUp} exiting={FlipOutXDown} style={{width:'100%'}}>
        <Animated.View style={[animatedStyles, styles.entryBackground]}>
          <Text style={styles.entryTitle}>Register</Text>
          <Text style={styles.entryBody}>
            Join NUMindify and start boosting your knowledge today
          </Text>
          <Animated.View></Animated.View>
          <Input
            placeholder={"Username"}
            Icon={UserCircle2}
            onChangeText={(text) => setUsername(text)}
            value={username}
            style={{ marginTop: 24 }}
          />
          <Input
            placeholder={"Email"}
            Icon={Mail}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <Input
            placeholder={"Password"}
            secure={true}
            Icon={LockKeyhole}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <Input
            placeholder={"Confirm Password"}
            secure={true}
            Icon={LockKeyhole}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
          />
          <RectButton
            onPress={() => {
              setAccountData({ username, password });
            }}
            style={styles.buttonOpacity}
          >
            <Animated.View style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </Animated.View>
          </RectButton>
        </Animated.View>
      </Animated.View>
      <Animated.View
        entering={FlipInXUp}
        exiting={FlipOutXDown}
        style={[
          styles.entryBackground,
          { flexDirection: "row", gap: 0, marginTop: "auto" },
        ]}
      >
        <Text style={styles.entryBody}>Already have an account? </Text>
        <Text
          style={[styles.entryBody, { color: "#FFC916", fontWeight: "bold" }]}
          onPress={() => {
            set("login");
          }}
        >
          Log In
        </Text>
      </Animated.View>
    </>
  );
}

export default Register