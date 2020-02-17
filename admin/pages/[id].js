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

  const App = ({ note,ADDRESS_SERVE_ADONIS, info}) => {
	
  const { note_id, note_title, note_code, note_description} = note;
  const [titulo, setTitulo] = useState(note_title);
  const [codigo, setCodigo] = useState(note_code);
  const [description, setCescription] = useState(note_description);
  const [inf, setInf] = useState(info);

  function handlerChangeCodigo(ev) {
    setCodigo(ev.target.value);
  }

  function handlerChangeTitulo(ev) {
    setTitulo(ev.target.value);
  }
  
  function handlerChangeDescription(ev) {
    setCescription(ev.target.value);
  }


  const handlerSave = () =>{

      fetch(`${ADDRESS_SERVE_ADONIS}/notes/${note_id}`,{
	method:'PUT',
	headers: {
    	'Content-Type': 'application/json'
  	},
 	body: JSON.stringify({note_id, titulo, codigo, description})
      }).then(response=>{
          console.log(response)
      })
  }

  return (
    <Container>
<Row style={{marginTop:50}}>
	<Col>
		<h1>Editar nota</h1>
	</Col>
</Row>
<hr />
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

	  <h2>Descrição:</h2>
            <Form.Control
              as="textarea"
              rows="4"
              onChange={handlerChangeDescription}
              value={description}
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
        <Col xs={4} md={4} sm={4} style={{borderWidth:0, borderColor:'red', borderStyle:'solid'}}>
          <h2>Saída:</h2>
          <ReactMarkdown source={codigo} 
          escapeHtml={false}
          />
        </Col>
      </Row>
    </Container>
  );
};


let ADDRESS_SERVE_ADONIS = process.env.adonis_address;

App.getInitialProps = async function(context) {
  
   const { id } = context.query;

  const res =  await fetch(`${ADDRESS_SERVE_ADONIS}/notes/${id}/edit`)

  let note = await res.text();  
  
  if(note.length > 0){
    note = JSON.parse(note);
    return {ADDRESS_SERVE_ADONIS, note, 'info':'success'};
  }
   return {ADDRESS_SERVE_ADONIS, 'info':'not_found'};
 

};

export default App;
