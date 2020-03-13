import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const ReactMarkdown = require('react-markdown');
import fetch from 'isomorphic-unfetch';
import _escapeHtml from '../src/scapeHtml';
import getConfig from 'next/config';
import Highlight from 'react-highlight';

const { serverRuntimeConfig } = getConfig();

const Saida = ({ descricao, codigo }) => {

  return (
    <>
      <div style={{ marginTop: 40 }}></div>

      <ReactMarkdown source={descricao} escapeHtml={false} />

      <div style={{ marginTop: 40 }}></div>
      {codigo && (<Highlight innerHTML={false}>{codigo}</Highlight>)}
    </>
  );
};

const App = ({ note }) => {
  const { note_id, note_title, note_code, note_description } = note;
  const [titulo, setTitulo] = useState(note_title);
  const [codigo, setCodigo] = useState(note_code);
  const [description, setDescription] = useState(note_description);
  const [isLogged, setLogged] = useState(true);

  return (
    <Container>
      <Row style={{ marginTop: 20 }}>
        <Col xs={2} md={2} sm={2}></Col>
        <Col xs={8} md={8} sm={8}>
          <h1>{titulo}</h1>
          {isLogged && <a href={`/editar/${note_id}`}>Editar</a>}
          <hr />
        </Col>
        <Col xs={2} md={2} sm={2}></Col>
      </Row>
      <Row>
        <Col xs={2} md={2} sm={2}></Col>
        <Col xs={8} md={8} sm={8}>
          <Saida titulo={titulo} descricao={description} codigo={codigo} />
        </Col>
        <Col xs={2} md={2} sm={2}></Col>
      </Row>
      <Row style={{ marginTop: 300 }}></Row>
    </Container>
  );
};

App.getInitialProps = async function(context) {
  let ADDRESS_SERVE_ADONIS = serverRuntimeConfig[1].baseURL;
  const { note_id } = context.query;
  const res = await fetch(`${ADDRESS_SERVE_ADONIS}/notes/${note_id}/edit`);
  let note = await res.text();
  if (note.length > 0) {
    note = JSON.parse(note);
    return { ADDRESS_SERVE_ADONIS, note, info: 'success' };
  }
  return { ADDRESS_SERVE_ADONIS, info: 'not_found' };
};

export default App;
