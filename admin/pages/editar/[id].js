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
import { Formik, useFormik } from 'formik';

const App = ({ note, ADDRESS_SERVE_ADONIS }) => {
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const formik = useFormik({
    initialValues: {
      note_id: 0,
      titulo: '',
      description: '',
      codigo: ''
    },
    onSubmit: (values, { setSubmitting }) => {
      setShowToast(false);
      fetch(`${ADDRESS_SERVE_ADONIS}/notes/${formik.values.note_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values, null, 2)
      }).then(response => {
        setSubmitting(false);
        setShowToast(true);
      });
    }
  });

  useEffect(() => {
    var name = () => {
      setLoading(false);
      setShowToast(false);
      if (note) {
        let { note_id, note_title, note_code, note_description } = note;
        formik.setFieldValue('note_id', note_id);
        formik.setFieldValue('titulo', note_title);
        formik.setFieldValue('description', note_description);
        formik.setFieldValue('codigo', note_code);
        setLoading(true);
      }
    };
    name();
  }, []);

  useEffect(() => {
    if (
      formik.values.note_id &&
      formik.values.titul &&
      formik.values.description &&
      formik.values.codigo
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(false);
    }
  }, [
    formik.values.note_id,
    formik.values.titulo,
    formik.values.description,
    formik.values.codigo
  ]);

  return (
    <Container>
      {loading === false ? (
        <Row style={{ marginTop: 60 }}>
          <Col lg={3} sm={2} md={3}></Col>
          <Col lg={6} sm={8} md={6}>
            <Alerta />
          </Col>
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
              <Formik>
                <form onSubmit={formik.handleSubmit}>
                  <Form.Group>
                    <h3>Título:</h3>
                    <Form.Control
                      name="titulo"
                      as="input"
                      rows="10"
                      autoFocus
                      onChange={formik.handleChange}
                      onBlur={formik.handleChange}
                      value={formik.values.titulo}
                    />
                    <h3>Descrição:</h3>
                    <Form.Control
                      name="description"
                      as="textarea"
                      rows="4"
                      onChange={formik.handleChange}
                      onBlur={formik.handleChange}
                      value={formik.values.description}
                    />
                    <h3>Código:</h3>
                    <Form.Control
                      name="codigo"
                      as="textarea"
                      rows="10"
                      onChange={formik.handleChange}
                      onBlur={formik.handleChange}
                      value={formik.values.codigo}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={disableButton}
                  >
                    Salvar
                  </Button>
                  <a
                    style={{ marginLeft: 20 }}
                    href={`../${formik.values.note_id}`}
                  >
                    Voltar
                  </a>
                </form>
              </Formik>
            </Col>
            <Col xs={6} md={6} sm={6}>
              <Saida
                titulo={formik.values.titulo}
                descricao={formik.values.description}
                codigo={formik.values.codigo}
              />
            </Col>
          </Row>
          <ToastDemo show={showToast} message={'Alterações salvas com sucesso!'} />
        </>
      )}
    </Container>
  );
};

App.getInitialProps = async function(context) {
  try {
    let ADDRESS_SERVE_ADONIS = serverRuntimeConfig[2].baseURL;

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
