import React from 'react';

const WarnErrorMessage = ({ tryFn }) => {
  return (
    <div>
      <h3>Failed to fetch</h3>
      <button onClick={tryFn}>Try again</button>
    </div>
  );
};

export default WarnErrorMessage;
