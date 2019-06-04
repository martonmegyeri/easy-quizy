import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';

import Button from './Button';
import colors from '../style/colors';

const Modal = ({ visible, title, children, buttons, visibleZIndex }) => {
  const [zIndex, setZIndex] = useState(-1);
  const [disabled, setDisabled] = useState(false);
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedTranslateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (visible && !disabled) {
      setZIndex(visibleZIndex);
      animateIn();
    } else if (!disabled) {
      setDisabled(true);
      animateOut();
    }
  });

  const animateIn = () => {
    Animated.stagger(100, [
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true
      }),
      Animated.spring(animatedTranslateY, {
        toValue: 0,
        bounciness: 0,
        speed: 20,
        useNativeDriver: true
      })
    ]).start();
  };

  const animateOut = () => {
    Animated.parallel([
      Animated.timing(animatedTranslateY, {
        toValue: 50,
        duration: 250,
        useNativeDriver: true
      }),
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      })
    ]).start(() => {
      setZIndex(-1);
      setDisabled(false);
    });
  };

  const renderButtons = () => {
    return buttons.map((item, key) => (
      <Button
        key={key}
        title={item.title}
        icon={item.icon}
        marginTop={item.marginTop}
        marginBottom={item.marginBottom}
        marginLeft={item.marginLeft}
        marginRight={item.marginRight}
        fill={item.fill}
        color={item.color}
        onPress={item.onPress}
      />
    ));
  };

  return (
    <Animated.View
      style={[styles.modalBackground, {
        opacity: animatedOpacity,
        zIndex
      }]}
    >
      <Animated.View
        style={[styles.modalContainer, {
          opacity: animatedOpacity,
          transform: [{ translateY: animatedTranslateY }]
        }]}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          {children}
        </View>
        <View style={styles.buttonsContainer}>
          {renderButtons()}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContainer: {
    width: '95%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  modalContent: {
    padding: 5,
    marginBottom: 10
  },
  modalTitle: {
    fontFamily: 'LuckiestGuy',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 15
  }
});

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  visibleZIndex: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    fill: PropTypes.bool,
    minWidth: PropTypes.number,
    color: PropTypes.string
  }))
};

Modal.defaultProps = {
  visibleZIndex: 1,
  buttons: []
};

export default Modal;
