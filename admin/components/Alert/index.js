import React, {useState} from 'react';
import {Row, Col, Alert} from 'react-bootstrap';


function AlertDismissibleExample() {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="warning" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh, não! Esta nota não existe.</Alert.Heading>
          <a href={"../"}>Voltar</a>
        </Alert>
      );
    }
  }

export default AlertDismissibleExample;