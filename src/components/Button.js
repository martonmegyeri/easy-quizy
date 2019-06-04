import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Animated } from 'react-native';
import PropTypes from 'prop-types';

import colors, { themes } from '../style/colors';
import withTheme from '../hoc/withTheme';

const Button = ({ title, icon, onPress, marginTop, marginBottom, marginLeft, marginRight, fill, color, minWidth, theme }) => {
  const animatedTranslateY = useRef(new Animated.Value(0)).current;

  let buttonColors = {
    light: themes[theme].accentLight,
    normal: themes[theme].accent,
    dark: themes[theme].accentDark
  };

  if (color === 'red' || color === 'green' || color === 'blue' || color === 'yellow') {
    buttonColors = {
      light: colors[`${color}Light`],
      normal: colors[`${color}`],
      dark: colors[`${color}Dark`]
    };
  }

  const handlePressIn = () => {
    Animated.spring(animatedTranslateY, {
      toValue: 5,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedTranslateY, {
      toValue: 0,
      friction: 3,
      tension: 100,
      useNativeDriver: true
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <View
        style={[styles.button, {
          marginTop,
          marginBottom: marginBottom + 5,
          marginLeft,
          marginRight,
          flexGrow: fill ? 1 : 0
        }]}
      >
        <Animated.View
          style={[styles.buttonInner, {
            backgroundColor: buttonColors.normal,
            transform: [{ translateY: animatedTranslateY }],
            minWidth
          }]}
        >
          {icon && (
            <View
              style={[styles.iconContainer, {
                backgroundColor: buttonColors.light
              }]}
            >
              <Image source={icon} style={styles.icon} />
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
          </View>
        </Animated.View>
        <View
          style={[styles.buttonShadow, {
            backgroundColor: buttonColors.dark
          }]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'relative'
  },
  buttonInner: {
    flexDirection: 'row',
    borderRadius: 8
  },
  textContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'LuckiestGuy'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 50
  },
  icon: {
    width: 20,
    height: 20,
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
    borderBottomRightRadius: 8
  }
});

Button.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  fill: PropTypes.bool,
  color: PropTypes.string,
  minWidth: PropTypes.number,
  theme: PropTypes.string.isRequired
};

Button.defaultProps = {
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  fill: false,
  color: null,
  minWidth: 0
};

export default withTheme(Button);
