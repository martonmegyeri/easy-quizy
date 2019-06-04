import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Immersive } from 'react-native-immersive';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './src/store';
import Orientation from './src/components/Orientation';

// Screens
import HomeScreen from './src/screens/Home';
import GameScreen from './src/screens/Game';
import ThemesScreen from './src/screens/Themes';
import HighscoresScreen from './src/screens/Highscores';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Game: {
      screen: GameScreen
    },
    Themes: {
      screen: ThemesScreen
    },
    Highscores: {
      screen: HighscoresScreen
    }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  useEffect(() => {
    StatusBar.setHidden(true, 'fade');

    Immersive.on();
    Immersive.addImmersiveListener(() => Immersive.on());
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Orientation>
          <AppContainer />
        </Orientation>
      </PersistGate>
    </Provider>
  );
};

export default App;
