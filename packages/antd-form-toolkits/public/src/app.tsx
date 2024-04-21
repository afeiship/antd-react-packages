import React from 'react';
import styled from 'styled-components';
import FormFieldDemo from './components/form-field-demo';
import FormFieldsDemo from './components/form-fields-demo';

const Container = styled.div`
    width: 80%;
    max-width: 800px;
    margin: 30px auto 0;
    border: 1px solid #ccc;
    padding: 20px;
`;

export default () => {
  return (
    <Container>
      <FormFieldDemo />
      <hr />
      <FormFieldsDemo />
    </Container>
  );
};
