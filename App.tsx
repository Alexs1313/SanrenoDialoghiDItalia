import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import Sanrenohnscr from './SanrenoSrc/sanrenoscrns/Sanrenohnscr';
import Sarenostrdetscr from './SanrenoSrc/sanrenoscrns/Sarenostrdetscr';
import { SanrenoStoreProvider } from './SanrenoSrc/sanrenostr/sanrenocntxt';
import Sanrenostrscr from './SanrenoSrc/sanrenoscrns/Sanrenostrscr';
import Sanrenosvdscr from './SanrenoSrc/sanrenoscrns/Sanrenosvdscr';
import Sanrenosttscr from './SanrenoSrc/sanrenoscrns/Sanrenosttscr';
import Sanrenoqzscr from './SanrenoSrc/sanrenoscrns/Sanrenoqzscr';
import Sanrenoonbscr from './SanrenoSrc/sanrenoscrns/Sanrenoonbscr';
import Sanrenoldr from './SanrenoSrc/sanrenocmpnts/Sanrenoldr';

const Stack = createStackNavigator();

const App = () => {
  const [startSanrenoLoader, setStartSanrenoLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStartSanrenoLoader(true);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <SanrenoStoreProvider>
        {!startSanrenoLoader ? (
          <Sanrenoldr />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Sanrenoonbscr" component={Sanrenoonbscr} />
            <Stack.Screen name="Sanrenohnscr" component={Sanrenohnscr} />
            <Stack.Screen name="Sanrenostrscr" component={Sanrenostrscr} />
            <Stack.Screen name="Sarenostrdetscr" component={Sarenostrdetscr} />
            <Stack.Screen name="Sanrenosvdscr" component={Sanrenosvdscr} />
            <Stack.Screen name="Sanrenosttscr" component={Sanrenosttscr} />
            <Stack.Screen name="Sanrenoqzscr" component={Sanrenoqzscr} />
          </Stack.Navigator>
        )}
      </SanrenoStoreProvider>
    </NavigationContainer>
  );
};

export default App;
