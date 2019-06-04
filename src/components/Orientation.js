import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { changeOrientation } from '../store/layout/actions';

const Orientation = (props) => {
  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      const dim = Dimensions.get('screen');
      if (dim.width >= dim.height) {
        props.changeOrientation('landscape');
      } else {
        props.changeOrientation('portrait');
      }
    });
  });

  return (
    <>
      {props.children}
    </>
  );
};

export default connect(null, { changeOrientation })(Orientation);
