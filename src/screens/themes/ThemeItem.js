import React, { useRef, useEffect } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Animated, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import colors from '../../style/colors';
import coin from '../../assets/images/coin.png';
import iconCheck from '../../assets/images/icons/check.png';

const ThemeItem = ({ name, price, coins, bought, active, colorScheme, selectTheme }) => {
  const animatedTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedTranslateY, {
      toValue: 0,
      friction: 3,
      tension: 100
    }).start();
  });

  const handlePressIn = () => {
    Animated.spring(animatedTranslateY, {
      toValue: 5
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedTranslateY, {
      toValue: 0,
      friction: 3,
      tension: 100
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => selectTheme(name)}
    >
      <View style={styles.button}>
        <Animated.View style={{ transform: [{ translateY: animatedTranslateY }] }}>
          <View style={styles.colorsContainer}>
            <View
              style={[styles.color, {
                backgroundColor: colorScheme[0],
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8
              }]}
            />
            <View style={[styles.color, { backgroundColor: colorScheme[1] }]} />
            <View style={[styles.color, { backgroundColor: colorScheme[2] }]} />
            <View
              style={[styles.color, {
                backgroundColor: colorScheme[3],
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8
              }]}
            />
          </View>
          {!active && bought && (
            <Text style={styles.boughtText}>{name === 'def' ? 'Alapértelmezett' : 'Megvásárolva'}</Text>
          )}
          {!active && !bought && (
            <View
              style={styles.coinWrap}
            >
              <Text style={styles.coinText}>{price}</Text>
              <Image style={styles.coinImage} source={coin} />
            </View>
          )}
          {active && (
            <View style={styles.activeImageContainer}>
              <View style={styles.activeImageCircle}>
                <Image source={iconCheck} style={styles.activeImage} />
              </View>
            </View>
          )}
        </Animated.View>
        <View style={styles.buttonShadow} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    width: '90%',
    height: 150,
    marginTop: 20,
    marginBottom: 5
  },
  colorsContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row'
  },
  color: {
    width: '25%',
    height: '100%'
  },
  coinWrap: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
  boughtText: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontFamily: 'LuckiestGuy',
    fontSize: 16,
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  activeImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeImageCircle: {
    backgroundColor: colors.green,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2
  },
  activeImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  buttonShadow: {
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
    height: 15,
    zIndex: -1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: colors.white,
    opacity: 0.35
  }
});

ThemeItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  coins: PropTypes.number.isRequired,
  bought: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  colorScheme: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectTheme: PropTypes.func.isRequired
};

export default ThemeItem;
