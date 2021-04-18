import React from 'react';
import PropTypes from 'prop-types';

const WarnErrorMessage = ({ handleTryFn }) => (
  <div>
    <h3>Failed to fetch</h3>
    <button type='button' onClick={handleTryFn}>Try again</button>
  </div>
);

WarnErrorMessage.propTypes = {
  handleTryFn: PropTypes.func.isRequired,
};

export default WarnErrorMessage;
