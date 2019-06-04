import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import withTheme from '../../hoc/withTheme';
import { themes } from '../../style/colors';
import iconBomb from '../../assets/images/icons/bomb.png';
import iconSkip from '../../assets/images/icons/skip.png';
import iconCheck from '../../assets/images/icons/check-circle.png';

const Helps = ({ bomb, check, skip, onBombPress, onCheckPress, onSkipPress, theme }) => (
  <View style={[styles.container, { backgroundColor: themes[theme].accent }]}>
    <TouchableOpacity onPress={onBombPress} disabled={!bomb}>
      <View style={styles.iconContainer}>
        <Image source={iconBomb} style={[styles.icon, { opacity: bomb ? 0.9 : 0.35 }]} />
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={onCheckPress} disabled={!check}>
      <View style={styles.iconContainer}>
        <Image source={iconCheck} style={[styles.icon, { opacity: check ? 0.9 : 0.35 }]} />
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={onSkipPress} disabled={!skip}>
      <View style={styles.iconContainer}>
        <Image source={iconSkip} style={[styles.icon, { opacity: skip ? 0.9 : 0.35 }]} />
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  }
});

Helps.propTypes = {
  bomb: PropTypes.bool.isRequired,
  check: PropTypes.bool.isRequired,
  skip: PropTypes.bool.isRequired,
  onBombPress: PropTypes.func.isRequired,
  onSkipPress: PropTypes.func.isRequired,
  onCheckPress: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
};

export default withTheme(Helps);
