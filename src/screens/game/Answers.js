import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import usePrevious from '../../util/usePrevious';
import AnswerButton from './answers/AnswerButton';

const Answers = ({
  question,
  reveal,
  orientation,
  half,
  round,
  showCorrect,
  onAnswerTouch
}) => {
  const [ answers, setAnswers ] = useState([]);
  const prevQuestion = usePrevious(question);
  const letters = ['A', 'B', 'C', 'D'];
  const colors = ['yellow', 'red', 'blue', 'green'];

  useEffect(() => {
    mixAnswers();
  }, []);

  useEffect(() => {
    if (prevQuestion !== question) {
      mixAnswers();
    }
  });

  const mixAnswers = () => {
    if (Object.keys(question).length === 0) return;

    const allAnswers = [
      ...question.incorrect_answers,
      question.correct_answer
    ];

    const mixedAnswers = [];

    for (let i = 0; i < question.incorrect_answers.length + 1; i++) {
      const random = Math.floor(Math.random() * allAnswers.length);
      mixedAnswers.push(allAnswers.splice(random, 1)[0]);
    }

    setAnswers(mixedAnswers);
  };

  const renderAnswers = () => {
    let correctIndex = 0;

    if (answers.length > 0) {
      correctIndex = answers.reduce((prev, curr, index) => curr === question.correct_answer ? index : prev + 0, 0);

      return answers.map((answer, i) => {
        let inactive = false;

        if (half) {
          if (correctIndex === 0 || correctIndex === 1) {
            if (i === 2 || i === 3) inactive = true;
          }

          if (correctIndex === 2 || correctIndex === 3) {
            if (i === 0 || i === 1) inactive = true;
          }
        }

        if (showCorrect) {
          if (i !== correctIndex) inactive = true;
        }

        return (
          <AnswerButton
            key={i}
            title={answer}
            letter={letters[i]}
            backgroundColor={colors[i]}
            disabled={reveal}
            inactive={inactive}
            correct={(reveal && answer === question.correct_answer) && true}
            wrong={(reveal && answer !== question.correct_answer) && true}
            onPress={() => onAnswerTouch(answer)}
            marginTop={5}
            marginBottom={5}
            width={orientation === 'portrait' ? '100%' : '48%'}
            round={round}
            delay={i * 10}
          />
        );
      });
    }
  };

  return (
    <View style={styles.container}>
      { renderAnswers() }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20
  }
});

Answers.propTypes = {
  reveal: PropTypes.bool.isRequired,
  half: PropTypes.bool.isRequired,
  round: PropTypes.number.isRequired,
  showCorrect: PropTypes.bool.isRequired,
  question: PropTypes.object.isRequired,
  onAnswerTouch: PropTypes.func.isRequired,
  orientation: PropTypes.string.isRequired
};

export default Answers;
