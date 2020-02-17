import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
const ReactMarkdown = require('react-markdown');
import Form from 'react-bootstrap/Form';

const App = () => {
  const [codigo, setCodigo] = useState('');

  function salvar() {
    alert(codigo);
  }

  function handleChange(ev) {
    setCodigo(ev.target.value);
  }

  return (
    <Container>
      <Row>
        <Col xs={8} md={8}>
          <h2>Como criar um range em javascript</h2>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows="3" autoFocus onChange={handleChange} />
          </Form.Group>
          <hr />
          <Button onClick={salvar}>Salvar</Button>
        </Col>
        <Col xs={2} md={2}>
          <ReactMarkdown source={codigo} />
        </Col>
        <style jsx>
          {`
            .editor {
              background: #ccc;
              border: 1px solid #ccc;
              padding: 10px;
            }
          `}
        </style>
      </Row>
    </Container>
  );
};

export default App;
