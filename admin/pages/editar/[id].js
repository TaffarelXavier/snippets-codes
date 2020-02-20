import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import fetch from 'isomorphic-unfetch';
import _escapeHtml from '../../src/scapeHtml';
import Alerta from '../../components/Alert';
import Saida from '../../components/Saida';
import ToastDemo from '../../components/ToastDemo';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
// const ReactMarkdown = require('react-markdown');

const App = ({ note, ADDRESS_SERVE_ADONIS, info }) => {
  const [note_id, setNoteId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [description, setDescription] = useState('');
  const [btnSaveDisable, setBtnSaveDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    var name = async params => {
      if (note) {
        let { note_id, note_title, note_code, note_description } = note;
        setNoteId(note_id);
        setTitulo(note_title);
        setCodigo(note_code);
        setDescription(note_description);
        setLoading(true);
      }
    };

    name();
  }, []);

  //Caso não tenha dados:

  const disableButton = enable => {
    setBtnSaveDisable(enable);
  };

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
      disableButton(true);
      setShowToast(true);
    });
  };

  return (
    <Container>
      <ToastDemo show={showToast}/>
      {!loading ? (
        <Row style={{marginTop:60}}>
            <Col lg={3} sm={2} md={3}></Col>
            <Col lg={6} sm={8} md={6}><Alerta /></Col>
            <Col lg={3} sm={2} md={3}></Col>
          </Row>
      ) : (
        <>
          <Row style={{ marginTop: 20 }}>
            <Col>
              <h1>Editar nota</h1>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={6} md={6} sm={6}>
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
              <Button
                onClick={handlerSave}
                variant="primary"
                disabled={btnSaveDisable}
              >
                Salvar
              </Button>
            </Col>
            <Col xs={6} md={6} sm={6}>
              <Saida titulo={titulo} descricao={description} codigo={codigo} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

let ADDRESS_SERVE_ADONIS = serverRuntimeConfig.adonis_address;

App.getInitialProps = async function(context) {
  try {
    const { id } = context.query;

    const res = await fetch(`${ADDRESS_SERVE_ADONIS}/notes/${id}/edit`);

    let note = await res.text();

    if (note.length > 0) {
      note = JSON.parse(note);

      return { ADDRESS_SERVE_ADONIS, note, info: 'success' };
    }

    return { ADDRESS_SERVE_ADONIS, info: 'not_found' };
  } catch (error) {
    return error;
  }
};

export default App;
