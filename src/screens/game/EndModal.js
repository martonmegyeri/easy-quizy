import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';

import Modal from '../../components/Modal';
import iconHome from '../../assets/images/icons/home.png';
import iconRestart from '../../assets/images/icons/restart.png';
import imageCoin from '../../assets/images/coin.png';
import colors from '../../style/colors';

const EndModal = ({ visible, answeredQuestions, earnedCoins, restartPress, navigation }) => {
  const animatedEarnedCoinsOpacity = useRef(new Animated.Value(0)).current;
  const animatedEarnedCoinsScale = useRef(new Animated.Value(0)).current;
  const animatedAnsweredQuestionsScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    animateEarnedCoins();
  }, []);

  const animateEarnedCoins = () => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(animatedEarnedCoinsOpacity, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true
          }),
          Animated.spring(animatedEarnedCoinsScale, {
            toValue: 1,
            useNativeDriver: true
          }),
          Animated.timing(animatedAnsweredQuestionsScale, {
            toValue: 0.5,
            useNativeDriver: true
          })
        ]),
        Animated.delay(2000),
        Animated.parallel([
          Animated.timing(animatedEarnedCoinsOpacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true
          }),
          Animated.timing(animatedEarnedCoinsScale, {
            toValue: 0.5,
            useNativeDriver: true
          }),
          Animated.spring(animatedAnsweredQuestionsScale, {
            toValue: 1,
            useNativeDriver: true
          })
        ]),
        Animated.delay(2000)
      ])
    ).start();
  };

  let title = '';
  if (answeredQuestions < 1) title = 'Próbáld újra';
  else if (answeredQuestions >= 1 && answeredQuestions < 6) title = 'Nem rossz';
  else title = 'Gratulálok';

  return (
    <Modal
      title={title.toUpperCase()}
      visible={visible}
      buttons={[
        {
          title: 'Menü',
          icon: iconHome,
          marginTop: 5,
          marginLeft: 5,
          marginRight: 5,
          fill: true,
          onPress: () => navigation.navigate('Home')
        },
        {
          title: 'Új játék',
          icon: iconRestart,
          marginTop: 5,
          marginLeft: 5,
          marginRight: 5,
          fill: true,
          onPress: restartPress
        }
      ]}
    >
      <View style={styles.modalDataContainer}>
        <Animated.View
          style={{
            transform: [{ scale: animatedAnsweredQuestionsScale }]
          }}
        >
          <Text style={styles.modalQuestionsText}>MEGVÁLASZOLT KÉRDÉSEK</Text>
          <Text style={styles.modalQuestionsValue}>{answeredQuestions}</Text>
        </Animated.View>
        <Animated.View
          style={[styles.coinWrap, {
            opacity: animatedEarnedCoinsOpacity,
            transform: [{ scale: animatedEarnedCoinsScale }]
          }]}
        >
          <Text style={styles.coinText}>+{earnedCoins}</Text>
          <Image source={imageCoin} style={styles.coinImage} />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalDataContainer: {
    position: 'relative'
  },
  modalQuestionsText: {
    fontFamily: 'LuckiestGuy',
    fontSize: 14,
    textAlign: 'center'
  },
  modalQuestionsValue: {
    fontFamily: 'LuckiestGuy',
    fontSize: 28,
    textAlign: 'center'
  },
  coinWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  coinImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  coinText: {
    fontFamily: 'LuckiestGuy',
    fontSize: 22,
    marginRight: 10
  }
});

EndModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  answeredQuestions: PropTypes.number.isRequired,
  earnedCoins: PropTypes.number.isRequired,
  restartPress: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};

export default EndModal;
