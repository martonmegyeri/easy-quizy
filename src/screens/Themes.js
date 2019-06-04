import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../components/Header';
import { themes } from '../style/colors';
import ThemeItem from './themes/ThemeItem';
import Modal from '../components/Modal';
import iconCheck from '../assets/images/icons/check.png';
import iconBack from '../assets/images/icons/back.png';
import { setTheme } from '../store/layout/actions';
import { buyTheme } from '../store/shop/actions';

const Themes = ({ coins, theme, allThemes, setThemeAction, buyThemeAction, navigation }) => {
  const [buyModalVisible, setBuyModalVisible] = useState(false);
  const [notEnoughtCoinModalVisible, setNotEnoughtCoinModalVisible] = useState(false);
  const [selectedThemeName, setSelectedThemeName] = useState('');

  const selectTheme = (themeName) => {
    setSelectedThemeName(themeName);
    const selectedThemeObject = allThemes[themeName];

    if (selectedThemeObject.bought && selectedThemeObject.name !== theme) { // If the theme is bought but it is not the active one
      setThemeAction(themeName);
    } else if (!selectedThemeObject.bought) { // If the theme is not bought
      if (coins >= selectedThemeObject.price) {
        setBuyModalVisible(true);
      } else {
        setNotEnoughtCoinModalVisible(true);
      }
    }
  };

  const renderItems = () => (
    Object.values(allThemes).map((item, key) => {
      const name = Object.keys(allThemes)[key];

      return (
        <ThemeItem
          key={key}
          name={name}
          price={item.price}
          coins={coins}
          bought={item.bought}
          active={name === theme}
          selectTheme={(themeName) => selectTheme(themeName)}
          colorScheme={[
            themes[name].primaryDark,
            themes[name].primary,
            themes[name].primaryLight,
            themes[name].accent
          ]}
        />
      );
    })
  );

  return (
    <LinearGradient colors={[themes[theme].primary, themes[theme].primaryLight]} style={styles.container}>
      <Header
        title="Stílusok"
        onBackPress={navigation.goBack}
      />
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.containerInner}>
          {renderItems()}
        </View>
      </ScrollView>

      <Modal
        title="VÁSÁRLÁS"
        visible={buyModalVisible}
        buttons={[
          {
            title: 'Mégse',
            icon: iconBack,
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            fill: true,
            color: 'red',
            onPress: () => setBuyModalVisible(false)
          },
          {
            title: 'Igen',
            icon: iconCheck,
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            fill: true,
            color: 'green',
            onPress: () => {
              buyThemeAction(selectedThemeName);
              setBuyModalVisible(false);
            }
          }
        ]}
      >
        <Text style={styles.modalText}>Biztosan megvásárolod a stílust?</Text>
      </Modal>

      <Modal
        title="VÁSÁRLÁS"
        visible={notEnoughtCoinModalVisible}
        buttons={[
          {
            title: 'Rendben',
            icon: iconBack,
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            color: 'green',
            onPress: () => setNotEnoughtCoinModalVisible(false)
          }
        ]}
      >
        <Text style={styles.modalText}>Nincs elegendő érméd a vásárláshoz</Text>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerInner: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 25
  },
  modalText: {
    fontFamily: 'LuckiestGuy',
    fontSize: 16,
    textAlign: 'center'
  }
});

Themes.propTypes = {
  coins: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
  allThemes: PropTypes.objectOf(PropTypes.object).isRequired,
  navigation: PropTypes.object.isRequired,
  setThemeAction: PropTypes.func.isRequired,
  buyThemeAction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  coins: state.shop.coins,
  theme: state.layout.theme,
  allThemes: state.shop.themes
});

const mapDispatchToProps = {
  setThemeAction: setTheme,
  buyThemeAction: buyTheme
};

export default connect(mapStateToProps, mapDispatchToProps)(Themes);
