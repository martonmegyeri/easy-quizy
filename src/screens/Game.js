import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import { themes } from '../style/colors';
import withTheme from '../hoc/withTheme';
import getDate from '../util/getDate';
import Question from './game/Question';
import Answers from './game/Answers';
import Helps from './game/Helps';
import Round from './game/Round';
import EndModal from './game/EndModal';
import { loadQuestions } from '../store/questions/actions';
import { setScore } from '../store/highscores/actions';
import { setCoin } from '../store/shop/actions';
import JSONquestions from '../assets/data/questions.json';

const Game = ({ questions, orientation, loadQuestionsAction, setCoinAction, setScoreAction, theme, navigation }) => {
  const EASY_COIN_AMOUNT = 2;
  const MEDIUM_COIN_AMOUNT = 5;
  const HARD_COIN_AMOUNT = 10;
  const [question, setQuestion] = useState({});
  const [round, setRound] = useState(1);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [coinAmount, setCoinAmount] = useState(EASY_COIN_AMOUNT);
  const [difficulty, setDifficulty] = useState('easy');
  const [reveal, setReveal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [questionsFirstlyLoaded, setQuestionsFirstlyLoaded] = useState(false);
  const [bomb, setBomb] = useState(0);
  const [check, setCheck] = useState(0);
  const [skip, setSkip] = useState(0);
  const [questionFadedIn, setQuestionFadedIn] = useState(false);

  const questionOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Object.keys(questions).length === 0) {
      loadQuestionsAction(JSONquestions);
      setQuestionsFirstlyLoaded(true);
    } else {
      newQuestion();
    }
  }, []);

  useEffect(() => {
    if (difficulty === 'medium') setCoinAmount(MEDIUM_COIN_AMOUNT);
    else if (difficulty === 'hard') setCoinAmount(HARD_COIN_AMOUNT);
  }, [round]);

  useEffect(() => {
    if (questionsFirstlyLoaded) {
      newQuestion();
      setQuestionsFirstlyLoaded(false);
    }

    if (!questionFadedIn) fadeInQuestion().start();
  });

  const fadeInQuestion = () => {
    return Animated.timing(questionOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    });
  };

  const fadeOutQuestion = () => {
    return Animated.timing(questionOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    });
  };

  const newQuestion = () => {
    setQuestion(() => {
      let diff = difficulty;
      if (round === 5) diff = 'medium';
      if (round === 10) diff = 'hard';

      const roundQuestions = questions[diff];
      const n = Math.round(Math.random() * (roundQuestions.length - 1));

      setDifficulty(diff);
      return roundQuestions[n];
    });
  };

  const answerTouchHandler = (answer) => {
    setQuestionFadedIn(true);

    // Answer is correct
    if (answer === question.correct_answer) {
      setReveal(true);

      if (bomb === 1) setBomb(2);
      if (check === 1) setCheck(2);
      if (skip === 1) setSkip(2);

      setTimeout(() => {
        setRound(round + 1);
        setCoinAction(coinAmount);
        setEarnedCoins(earnedCoins + coinAmount);
      }, 1000);

      setTimeout(() => {
        setReveal(false);
        newQuestion();
      }, 1700);
    } else { // Answer is not correct
      setReveal(true);
      setBomb(2);
      setCheck(2);
      setSkip(2);

      setTimeout(() => {
        setGameOver(true);
      }, 2000);

      const date = getDate();

      if (round > 1) {
        setScoreAction({ score: round - 1, date });
      }
    }
  };

  const bombPress = () => {
    setQuestionFadedIn(true);
    setBomb(1);
  };

  const checkPress = () => {
    setQuestionFadedIn(true);
    setCheck(1);
  };

  const skipPress = () => {
    setQuestionFadedIn(true);
    setSkip(1);
    fadeOutQuestion().start(() => {
      newQuestion();
      fadeInQuestion().start();
    });
  };

  const restart = () => {
    navigation.replace('Game');
  };

  return (
    <LinearGradient colors={[themes[theme].primary, themes[theme].primaryLight]} style={styles.container}>
      <Animated.View style={[styles.questionContainer, { opacity: questionOpacity }]}>
        <Question
          title={question.question}
          round={round}
          orientation={orientation}
        />
        <Answers
          reveal={reveal}
          half={bomb === 1}
          round={round}
          showCorrect={check === 1}
          question={question}
          onAnswerTouch={answerTouchHandler}
          orientation={orientation}
        />
      </Animated.View>
      <Round
        round={round}
        coinAmount={coinAmount}
      />
      <Helps
        bomb={bomb === 0}
        check={check === 0}
        skip={skip === 0}
        onBombPress={bombPress}
        onCheckPress={checkPress}
        onSkipPress={skipPress}
      />
      <EndModal
        visible={gameOver}
        answeredQuestions={round - 1}
        earnedCoins={earnedCoins}
        restartPress={restart}
        navigation={navigation}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  questionContainer: {
    flex: 1
  }
});

Game.propTypes = {
  questions: PropTypes.objectOf(PropTypes.array).isRequired,
  orientation: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  loadQuestionsAction: PropTypes.func.isRequired,
  setCoinAction: PropTypes.func.isRequired,
  setScoreAction: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  questions: state.questions,
  orientation: state.layout.orientation
});

const mapDispatchToProps = {
  loadQuestionsAction: loadQuestions,
  setScoreAction: setScore,
  setCoinAction: setCoin
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Game));
