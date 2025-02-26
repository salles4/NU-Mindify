import { Text, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { use, useContext, useState } from 'react'
import Animated, { FlipInXUp, FlipOutXDown } from 'react-native-reanimated'
import styles from '../../styles/styles'
import Input from '../../components/Input'
import { LockKeyhole, Mail, UserCircle2 } from 'lucide-react-native'
import AccountContext from '../../contexts/AccountContext'
import useAccount from '../../contexts/useAccount'

const Register = ({set}) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { createAccount } = useAccount();
  const onSubmit = () => {
    if(username.trim() === ""){
      ToastAndroid.show("Username Field is required.", ToastAndroid.SHORT)
      return;
    }
    
    if(email.trim() === ""){
      ToastAndroid.show("Email Field is required.", ToastAndroid.SHORT)
      return;
    }
    
    if (password.trim() === "") {
      ToastAndroid.show("Password Field is required.", ToastAndroid.SHORT);
      return;
    }
    
    if(password.trim() !== confirmPassword.trim()){
      ToastAndroid.show("Passwords does not match", ToastAndroid.SHORT)
      return;
    }
    
    createAccount({
      username, email, password
    })
  }

  return (
    <>
        <Animated.View
          entering={FlipInXUp}
          exiting={FlipOutXDown}
          style={[styles.entryBackground]}
        >
          <Text style={styles.entryTitle}>Register</Text>
          <Text style={styles.entryBody}>
            Join NUMindify and start boosting your knowledge today
          </Text>
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
          <TouchableOpacity
            onPress={onSubmit}
            style={styles.buttonOpacity}
          >
            <Animated.View style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </Animated.View>
          </TouchableOpacity>
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