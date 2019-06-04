import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import usePrevious from '../../../util/usePrevious';
import colors from '../../../style/colors';

const AnswerButton = ({
  title,
  letter,
  backgroundColor,
  disabled,
  inactive,
  marginTop,
  marginBottom,
  correct,
  wrong,
  onPress,
  width,
  round,
  delay,
  dimensions,
  orientation
}) => {
  const translateXValue = (orientation === 'portrait') ? dimensions.width : dimensions.height;

  const prevRound = usePrevious(round);
  const animatedTranslateY = useRef(new Animated.Value(0)).current;
  const animatedTranslateX = useRef(new Animated.Value(translateXValue)).current;

  useEffect(() => {
    if (prevRound) {
      Animated.sequence([
        animateTranslateXOut(),
        Animated.delay(200),
        animateTranslateXReset(),
        animateTranslateXIn()
      ]).start();
    } else {
      animateTranslateXIn().start();
    }
  }, [round]);

  const animateTranslateXIn = () => {
    return Animated.spring(animatedTranslateX, {
      toValue: 0,
      delay,
      useNativeDriver: true
    });
  };

  const animateTranslateXOut = () => {
    return Animated.timing(animatedTranslateX, {
      toValue: translateXValue / -1,
      duration: 500,
      delay: delay * 5,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true
    });
  };

  const animateTranslateXReset = () => {
    return Animated.timing(animatedTranslateX, {
      toValue: translateXValue,
      duration: 0,
      useNativeDriver: true
    });
  };

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

  const handlePress = () => {
    onPress();
  };

  let bgColor = backgroundColor;

  if (correct) bgColor = 'green';
  if (wrong) bgColor = 'red';
  if (inactive) bgColor = 'gray';

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled || inactive}
    >
      <View
        style={[styles.button, {
          width,
          marginLeft: (width && width === '48%') ? '1%' : 0,
          marginRight: (width && width === '48%') ? '1%' : 0,
          marginTop,
          marginBottom: marginBottom + 5
        }]}
      >
        <Animated.View
          style={[styles.buttonInner, {
            transform: [
              { translateY: animatedTranslateY },
              { translateX: animatedTranslateX }
            ],
            backgroundColor: colors[bgColor]
          }]}
        >
          <View
            style={[styles.iconContainer, {
              backgroundColor: colors[`${bgColor}Light`]
            }]}
          >
            <Text style={styles.icon}>
              {letter.substring(0, 1).toUpperCase()}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
          </View>
        </Animated.View>
        <Animated.View
          style={[styles.buttonShadow, {
            backgroundColor: colors[`${bgColor}Dark`],
            transform: [{ translateX: animatedTranslateX }]
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
    paddingHorizontal: 20,
    flex: 1
  },
  buttonText: {
    color: colors.white,
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
    color: 'white',
    fontFamily: 'LuckiestGuy',
    fontSize: 25
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

AnswerButton.propTypes = {
  title: PropTypes.string.isRequired,
  letter: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  inactive: PropTypes.bool,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  correct: PropTypes.bool,
  wrong: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  onPress: PropTypes.func.isRequired,
  round: PropTypes.number.isRequired,
  delay: PropTypes.number,
  dimensions: PropTypes.object.isRequired,
  orientation: PropTypes.string.isRequired
};

AnswerButton.defaultProps = {
  disabled: false,
  inactive: false,
  marginTop: 0,
  marginBottom: 0,
  correct: false,
  wrong: false,
  width: '100%',
  delay: 0
};

const mapStateToProps = (state) => ({
  dimensions: state.layout.dimensions,
  orientation: state.layout.orientation
});

export default connect(mapStateToProps)(AnswerButton);
