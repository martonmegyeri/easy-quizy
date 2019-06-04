import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import PropTypes from 'prop-types';

import colors from '../../style/colors';

const Question = ({ title, round, orientation }) => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    fadeOut().start();
  }, [round]);

  useEffect(() => {
    fadeIn().start();
  }, [title]);

  const fadeIn = () => {
    return Animated.sequence([
      Animated.parallel([
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true
        }),
        Animated.spring(animatedScale, {
          toValue: 1,
          useNativeDriver: true
        })
      ])
    ]);
  };

  const fadeOut = () => {
    return Animated.sequence([
      Animated.parallel([
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true
        }),
        Animated.timing(animatedScale, {
          toValue: 0.5,
          useNativeDriver: true
        })
      ])
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={[ styles.containerInner, { height: orientation === 'portrait' ? 150 : 'auto' }]}>
        <Animated.Text
          style={[styles.text, {
            opacity: animatedOpacity,
            transform: [{ scale: animatedScale }]
          }]}
        >
          {title.toUpperCase()}
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 10
  },
  containerInner: {
    justifyContent: 'center',
    backgroundColor: colors.white,
    minWidth: 250,
    borderRadius: 8,
    padding: 20
  },
  text: {
    fontFamily: 'LuckiestGuy',
    fontSize: 20,
    color: colors.grayDarkest,
    textAlign: 'center'
  }
});

Question.propTypes = {
  title: PropTypes.string,
  round: PropTypes.number.isRequired,
  orientation: PropTypes.string.isRequired
};

Question.defaultProps = {
  title: ''
};

export default Question;
