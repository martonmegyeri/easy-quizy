import React, { useRef, useEffect } from 'react';
import { View, Image, Text, Animated, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import usePrevious from '../../util/usePrevious';
import colors from '../../style/colors';
import coin from '../../assets/images/coin.png';

const Round = ({ round, coinAmount }) => {
  const prevRound = usePrevious(round);
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (prevRound) fadeInOut();
  }, [round]);

  const fadeInOut = () => {
    Animated.sequence([
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
      ]),
      Animated.delay(1000),
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
    ]).start();
  };

  return (
    <View style={styles.roundWrap}>
      <Text style={styles.round}>
        {`${round}. kérdés`}
      </Text>
      <Animated.View
        style={[styles.coinWrap, {
          opacity: animatedOpacity,
          transform: [{ scale: animatedScale }]
        }]}
      >
        <Text style={styles.coinText}>+{coinAmount}</Text>
        <Image style={styles.coinImage} source={coin} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  roundWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  coinWrap: {
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
  round: {
    textAlign: 'center',
    fontFamily: 'LuckiestGuy',
    fontSize: 18,
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
});

Round.propTypes = {
  round: PropTypes.number.isRequired,
  coinAmount: PropTypes.number.isRequired
};

export default Round;
