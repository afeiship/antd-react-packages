import React, { useState } from 'react';
import styled from 'styled-components';
import { AcRadioGroup } from '../../src/main';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  const [v1, setV1] = useState('a');

  return (
    <Container>
      <AcRadioGroup
        value={v1}
        items={[
          { label: 'a', value: 'a' },
          { label: 'b', value: 'b' },
          { label: 'c', value: 'c' }
        ]}
        onChange={(e) => {
          console.log(e.target.value);
          setV1(e.target.value);
        }}
      />
    </Container>
  );
};
