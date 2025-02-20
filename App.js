import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountContext from './src/contexts/AccountContext';
import { useState } from 'react';
import GetStarted from './src/Entry/GetStarted';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './src/Home/Home';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [accountData, setAccountData] = useState({uid: null})
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <AccountContext.Provider value={{accountData, setAccountData}}>
          <Stack.Navigator screenOptions={{ headerShown: false}}>
            {!accountData.uid ? 
              (
                <Stack.Screen name='Get Started' component={GetStarted} />
              )
              :
              (
                <Stack.Screen name='Home' component={Home} />
              )
            }
          </Stack.Navigator>
        </AccountContext.Provider>
      </GestureHandlerRootView>
    </NavigationContainer>

  );
}
