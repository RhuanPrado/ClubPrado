import React from 'react';
import { Container } from 'react-bootstrap';

import BarraNav from '../components/BarraNav'
import Pontuar from '../components/Pontuar';

function Main() {
  return (
  <>
    <BarraNav/>
    <Container>
      <Pontuar/>
    </Container>
  </>

  );
}

export default Main;
