import React from 'react';
import styled from 'styled-components';

const spinSize = '26px';
const spinBorderColor = '#00ff00ff';

const StyledSpin = styled.div`
  display: block;
  box-sizing: border-box;
  margin: 0;
  width: ${spinSize};
  height: ${spinSize};
  border: 4px solid;
  border-color: ${spinBorderColor} ${spinBorderColor} #00000000 #00000000;
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
  width: 40px;
  height: 40px;
  margin: 10px auto;
`;

const Spinner = () => (
  <SpinContainer>
    <StyledSpin />
  </SpinContainer>
);

export default Spinner;
