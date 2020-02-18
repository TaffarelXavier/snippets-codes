import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
const ReactMarkdown = require('react-markdown');
import Form from 'react-bootstrap/Form';
import fetch from 'isomorphic-unfetch';
import _escapeHtml from '../../src/scapeHtml';

const Saida = ({titulo, descricao, codigo}) =>{
  return (<>
  <h3>Título:</h3>
  <ReactMarkdown source={titulo} escapeHtml={false} />
  <h3>Descrição:</h3>
  <ReactMarkdown source={descricao} escapeHtml={false} />
  <h3>Código:</h3>
  <ReactMarkdown source={codigo} escapeHtml={false} /></>)
}

const App = ({ note, ADDRESS_SERVE_ADONIS, info }) => {
  
  const { note_id, note_title, note_code, note_description } = note;
  const [titulo, setTitulo] = useState(note_title);
  const [codigo, setCodigo] = useState(note_code);
  const [description, setDescription] = useState(note_description);
  const [btnSaveDisable, setBtnSaveDisable] = useState(true);

const disableButton = (enable) =>{
  setBtnSaveDisable(enable);
}

  function handlerChangeCodigo(ev) {
    setCodigo(ev.target.value);
    disableButton(false);
  }

  function handlerChangeTitulo(ev) {
    setTitulo(ev.target.value);
    disableButton(false);
  }

  function handlerChangeDescription(ev) {
    setDescription(ev.target.value);
    disableButton(false);
  }

  const handlerSave = () => {

    fetch(`${ADDRESS_SERVE_ADONIS}/notes/${note_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ note_id, titulo, codigo, description })
    }).then(response => {
      console.log(response);
      disableButton(true);
    });
  };

  return (
    <Container>
      <Row style={{ marginTop: 20 }}>
        <Col>
          <h1>Editar nota</h1>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs={6}
          md={6}
          sm={6}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <h3>Título:</h3>
            <Form.Control
              as="input"
              rows="10"
              autoFocus
              onChange={handlerChangeTitulo}
              value={titulo}
            />

            <h3>Descrição:</h3>
            <Form.Control
              as="textarea"
              rows="4"
              onChange={handlerChangeDescription}
              value={description}
            />

            <h3>Código:</h3>
            <Form.Control
              as="textarea"
              rows="10"
              onChange={handlerChangeCodigo}
              value={codigo}
            />
          </Form.Group>
          <hr />
          <Button onClick={handlerSave} variant="primary" disabled={btnSaveDisable}>Salvar</Button>
        </Col>
        <Col
          xs={6}
          md={6}
          sm={6}
        >
          <Saida titulo={titulo} descricao={description} codigo={codigo} />
        </Col>
      </Row>
    </Container>
  );
};

let ADDRESS_SERVE_ADONIS = process.env.adonis_address;

App.getInitialProps = async function(context) {

  const { id } = context.query;

  const res = await fetch(`${ADDRESS_SERVE_ADONIS}/notes/${id}/edit`);

  let note = await res.text();

  if (note.length > 0) {

    note = JSON.parse(note);

    return { ADDRESS_SERVE_ADONIS, note, info: 'success' };

  }

  return { ADDRESS_SERVE_ADONIS, info: 'not_found' };
};

export default App;
