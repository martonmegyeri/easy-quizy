import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import colors, { themes } from '../style/colors';
import iconPlay from '../assets/images/icons/play.png';
import Button from '../components/Button';
import withTheme from '../hoc/withTheme';

const Highscores = ({ highscores, navigation, theme }) => {
  const topColors = [ colors.gold, colors.silver, colors.bronze ];
  const topColorsDark = [ colors.goldDark, colors.silverDark, colors.bronzeDark ];

  const renderScores = () => highscores.map((item, key) => (
    <View key={key} style={[styles.listItem, { borderBottomWidth: key < highscores.length - 1 ? 1 : 0 }]}>
      <View style={styles.listItemLeft}>
        <View
          style={[styles.listItemTitleContainer, {
            backgroundColor: key <= 2 ? topColors[key] : 'transparent',
            elevation: key <= 2 ? 5 : 0
          }]}
        >
          <Text style={[styles.listItemTitle, { color: (key <= 2) ? topColorsDark[key] : colors.grayDarkest }]}>{key + 1}{ key > 2 && '.' }</Text>
        </View>
        <Text style={styles.listItemScore}>{item.score} kérdés</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.listItemDate}>
          {item.date.year} {item.date.month < 10 ? `0${item.date.month}` : item.date.month}. {item.date.date < 10 ? `0${item.date.date}` : item.date.date}.
        </Text>
        <Text style={styles.listItemDate}>{item.date.hours < 10 ? `0${item.date.hours}` : item.date.hours}:{item.date.min < 10 ? `0${item.date.min}` : item.date.min}</Text>
      </View>
    </View>
  ));

  return (
    <LinearGradient colors={[themes[theme].primary, themes[theme].primaryLight]} style={styles.container}>
      <Header
        title="Toplista"
        onBackPress={navigation.goBack}
        showCoins={false}
      />

      { highscores.length > 0 ? (
        <View style={styles.listContainer}>
          <View style={styles.listContainerInner}>
            <ScrollView style={{ width: '100%' }}>
              {renderScores()}
            </ScrollView>
          </View>
        </View>
      ) : (
        <View style={styles.emptyTextContainer}>
          <Text style={styles.emptyText}>A toplista üres</Text>
          <Button
            title="Játék"
            icon={iconPlay}
            marginTop={20}
            onPress={() => navigation.navigate('Game')}
          />
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  emptyTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontFamily: 'LuckiestGuy',
    fontSize: 22,
    color: colors.white
  },
  listContainer: {
    flex: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 25,
    marginBottom: 25
  },
  listContainerInner: {
    justifyContent: 'center',
    backgroundColor: colors.white,
    minWidth: 250,
    borderRadius: 8
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 18,
    borderBottomColor: colors.grayLight
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemTitleContainer: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItemTitle: {
    fontFamily: 'LuckiestGuy',
    fontSize: 22
  },
  listItemScore: {
    fontFamily: 'LuckiestGuy',
    fontSize: 16,
    marginLeft: 15
  },
  listItemDate: {
    fontFamily: 'LuckiestGuy',
    fontSize: 14
  }
});

Highscores.propTypes = {
  highscores: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigation: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  highscores: state.highscores
});

export default connect(mapStateToProps)(withTheme(Highscores));
