import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const withTheme = (WrappedComponent) => {
  const WithThemeComponent = (props) => <WrappedComponent theme={props.theme} {...props} />;

  WithThemeComponent.propTypes = { theme: PropTypes.string.isRequired };

  WithThemeComponent.navigationOptions = {
    header: null
  };

  const mapStateToProps = (state) => ({
    theme: state.layout.theme
  });

  return connect(mapStateToProps)(WithThemeComponent);
};

export default withTheme;
