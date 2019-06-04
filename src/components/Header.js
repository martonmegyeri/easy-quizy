import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import colors, { themes } from '../style/colors';
import imageBack from '../assets/images/icons/back.png';
import imageCoin from '../assets/images/coin.png';

const Header = ({ title, showCoins, onBackPress, coins, theme }) => (
  <View style={[styles.container, { backgroundColor: themes[theme].accent }]}>
    <View>
      {onBackPress && (
        <TouchableOpacity style={styles.backContainer} onPress={() => onBackPress()}>
          <Image source={imageBack} style={styles.back} />
        </TouchableOpacity>
      )}
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
    {(coins > 0 && showCoins) && (
      <View style={styles.coinWrap}>
        <Text style={styles.coinText}>{coins}</Text>
        <Image source={imageCoin} style={styles.coinImage} />
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    elevation: 20
  },
  backContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  back: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'LuckiestGuy',
    fontSize: 22,
    color: colors.white
  },
  coinWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
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
    marginRight: 10
  }
});

Header.propTypes = {
  title: PropTypes.string,
  showCoins: PropTypes.bool,
  onBackPress: PropTypes.func,
  theme: PropTypes.string.isRequired,
  coins: PropTypes.number.isRequired
};

Header.defaultProps = {
  title: '',
  showCoins: true,
  onBackPress: null
};

const mapStateToProps = (state) => ({
  coins: state.shop.coins,
  theme: state.layout.theme
});

export default connect(mapStateToProps)(Header);
