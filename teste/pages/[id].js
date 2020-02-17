import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
const ReactMarkdown = require('react-markdown');
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';


var escapeHtml = unsafe => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

const App = ({ note }) => {
  const { note_id, note_title, note_code } = note;

  const [codigo, setCodigo] = useState(note_code);
  const [titulo, setTitulo] = useState(note_title);

  function handlerChangeCodigo(ev) {
    setCodigo(ev.target.value);
  }

  function handlerChangeTitulo(ev) {
    setTitulo(ev.target.value);
  }

  const handlerSave = () =>{
      console.log(titulo)
      console.log(escapeHtml(codigo))
      fetch(`http://192.168.129.141:3300/notes/${note_id}/edit`,{
          method:'POST'
      }).then(response=>{
          console.log(response)
      })
  }

  return (
    <Container>
      <Row>
        <Col xs={8} md={8}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <h2>Título:</h2>
            <Form.Control
              as="input"
              rows="10"
              autoFocus
              onChange={handlerChangeTitulo}
              value={titulo}
            />
            <h2>Código:</h2>
            <Form.Control
              as="textarea"
              rows="10"
              onChange={handlerChangeCodigo}
              value={codigo}
            />
          </Form.Group>
          <hr />
          <Button onClick={handlerSave}>Salvar</Button>
        </Col>
        <Col xs={2} md={2}>
          <h2>Saída:</h2>
          <ReactMarkdown source={codigo} 
          escapeHtml={false}
          />
        </Col>
      </Row>
    </Container>
  );
};

App.getInitialProps = async function(context) {
  const { id } = context.query;

  const res = await fetch(`http://192.168.129.141:3300/notes/${id}/edit`);

  const note = await res.json();

  return { note };
};

export default App;
