import React from 'react';
import styled from 'styled-components';

const spinnerSize = '26px';
const StyledSpin = styled.div`
  z-index: 1;
  box-sizing: border-box;
  /* position: absolute; */
  margin: 0;
  display: block;
  width: ${spinnerSize};
  height: ${spinnerSize};
  border: 4px solid;
  border-color: #00ff00ff #00ff00ff #00000000 #00000000;
  border-radius: 50px;
  animation: spin 400ms infinite linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const SpinContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 40px;
  height: 40px;
`;

const Spinner = () => (
  <SpinContainer>
    <StyledSpin />
  </SpinContainer>
);

export default Spinner;
