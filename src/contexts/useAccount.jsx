import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import AccountContext from "./AccountContext";
import { Text, ToastAndroid, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ModalContext from "./ModalContext";

const useAccount = () => {
  const {setAccountData} = useContext(AccountContext);
  const {modal, setModal} = useContext(ModalContext)
  const nav = useNavigation();
  
  const createAccount = async ({username, email, password}) => {
    const newAccount = {
      id: guidGenerator(),username, email, password, chat:[], progress: [0,0,0,0,0], avatar: 0
    }
    try {
      const accountsStorage = (await AsyncStorage.getItem("accounts")) || "[]";
      const jsonAccounts = JSON.parse(accountsStorage);

      let emailDuplicate = false, usernameDuplicate = false;
      jsonAccounts.map(account => {
        if(username === account.username){
          usernameDuplicate = true
        }else if(email === account.email){
          emailDuplicate = true
        }
      })
      if(usernameDuplicate){
        ToastAndroid.show("Username already exist.", ToastAndroid.SHORT);
        return;
      }else if (emailDuplicate) {
        ToastAndroid.show("Email already registered.", ToastAndroid.SHORT);
        return;
      }
      const newAccountList = [...jsonAccounts, newAccount];
      await AsyncStorage.setItem("accounts", JSON.stringify(newAccountList))
      setAccountData(newAccount)
      setModal({
        subtitle: "Registered",
        body:"Do you want to set up your account?",
        primaryFn:() => {
          nav.replace("Home")
          nav.navigate("Edit Profile")
          setModal(null)
        },
        secondaryFn: () => {
          nav.replace("Home");
          setModal(null)
        },
        mode:"LevelSelect"
      })
      console.log(newAccountList);
      
    } catch (error) {
      console.error(error);
    }

  }
  const login = async ({username, password}) => {
    try {
      const accountsStorage = await AsyncStorage.getItem("accounts");
      const jsonAccounts = JSON.parse(accountsStorage);
      let existing = false;
      jsonAccounts.map((account) => {
        if (username === account.username) {
          existing = true;
          if(password === account.password){
            setAccountData(account);
            nav.replace("Home");
          }else{
            ToastAndroid.show("Wrong Password", ToastAndroid.SHORT);
            return;
          }
        }
      });
      if (!existing) {
        ToastAndroid.show("User does not exist", ToastAndroid.SHORT);
      }
    } catch (error) {
      
    }
  }
  
  const guidGenerator = () => {
      let S4 = function(){
          return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  return { createAccount, updateStorage, login };
}
export default useAccount;

export const printStorage = async () => {
   try {
    const accountsStorage = await AsyncStorage.getItem("accounts");
    console.log(JSON.parse(accountsStorage))
   }catch(error){

   }
}

export const updateStorage = async (data) => {
  try {
    const accountsStorage = await AsyncStorage.getItem("accounts");
    const jsonAccounts = JSON.parse(accountsStorage);
    const newAccountList = jsonAccounts.map((account) => {
      if (data.id === account.id) {
        return data;
      } else {
        return account;
      }
    });

    await AsyncStorage.setItem("accounts", JSON.stringify(newAccountList));
  } catch (error) {
    console.error(error);
  }
};

export const ResetButton = () => {
  const nav = useNavigation();
  const {accountData, setAccountData} = useContext(AccountContext);
  const onClick = () => {
    AsyncStorage.clear();
  };
  return (
    <>
      <TouchableOpacity
        style={{
          position: "absolute",
          padding: 4,
          zIndex: 5,
          opacity: 0.4,
          borderWidth: 2,
          borderColor: "white",
        }}
        onPress={onClick}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 12 }}>
          Reset Accounts
        </Text>
      </TouchableOpacity>
      {accountData && (
        <TouchableOpacity
          style={{
            position: "absolute",
            left: "25%",
            padding: 4,
            zIndex: 5,
            opacity: 0.4,
            borderWidth: 2,
            borderColor: "white",
          }}
          onPress={() =>
            setAccountData({ ...accountData, progress: [0, 0, 0, 0, 0] })
          }
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 12 }}>
            Clear Progress
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};