import React, { useEffect } from 'react';
import { StyleSheet, Image, View, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import logo from '../assets/images/logo.png';
import coin from '../assets/images/coin.png';
import colors, { themes } from '../style/colors';
import Button from '../components/Button';
import iconPlay from '../assets/images/icons/play.png';
import iconTrophy from '../assets/images/icons/trophy.png';
import iconTheme from '../assets/images/icons/paint-roller.png';
import { changeOrientation, setDimensions } from '../store/layout/actions';

const Home = ({
  coins,
  navigation,
  theme,
  orientation,
  changeOrientationAction,
  setDimensionsAction
}) => {
  useEffect(() => {
    changeOrientationAction('portrait');
    setDimensionsAction({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    });
  }, []);

  return (
    <LinearGradient colors={[themes[theme].primary, themes[theme].primaryLight]} style={styles.container}>
      {coins > 0 && (
        <View style={styles.coinWrap}>
          <Text style={styles.coinText}>{coins}</Text>
          <Image source={coin} style={styles.coinImage} />
        </View>
      )}

      <Image source={logo} style={styles.logo} />

      <View style={orientation === 'landscape' && styles.buttonsContainerLandscape}>
        <Button
          title="Játék"
          icon={iconPlay}
          marginTop={5}
          marginBottom={5}
          marginLeft={orientation === 'landscape' ? 5 : 0}
          marginRight={orientation === 'landscape' ? 5 : 0}
          minWidth={orientation === 'landscape' ? 0 : 200}
          onPress={() => navigation.navigate('Game')}
        />
        <Button
          title="Stílusok"
          icon={iconTheme}
          marginTop={5}
          marginBottom={5}
          marginLeft={orientation === 'landscape' ? 5 : 0}
          marginRight={orientation === 'landscape' ? 5 : 0}
          minWidth={orientation === 'landscape' ? 0 : 200}
          onPress={() => navigation.navigate('Themes')}
        />
        <Button
          title="Toplista"
          icon={iconTrophy}
          marginTop={5}
          marginBottom={5}
          marginLeft={orientation === 'landscape' ? 5 : 0}
          marginRight={orientation === 'landscape' ? 5 : 0}
          minWidth={orientation === 'landscape' ? 0 : 200}
          onPress={() => navigation.navigate('Highscores')}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 200,
    height: 200
  },
  coinWrap: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  coinImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  coinText: {
    fontFamily: 'LuckiestGuy',
    fontSize: 18,
    color: colors.white,
    marginRight: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  buttonsContainerLandscape: {
    flexDirection: 'row'
  }
});

Home.propTypes = {
  coins: PropTypes.number.isRequired,
  navigation: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  orientation: PropTypes.string.isRequired,
  changeOrientationAction: PropTypes.func.isRequired,
  setDimensionsAction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  coins: state.shop.coins,
  orientation: state.layout.orientation,
  theme: state.layout.theme
});

const mapDispatchToProps = {
  changeOrientationAction: changeOrientation,
  setDimensionsAction: setDimensions
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
