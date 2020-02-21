﻿import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const ReactMarkdown = require('react-markdown');
import fetch from 'isomorphic-unfetch';
import _escapeHtml from '../src/scapeHtml';
import getConfig from 'next/config';
const {serverRuntimeConfig} = getConfig();

const Saida = ({ descricao, codigo }) => {
	return (
		<>
			<ReactMarkdown source={descricao} escapeHtml={false} />
			<ReactMarkdown source={codigo} escapeHtml={false} />
		</>
	);
};

const App = ({ note }) => {

	const { note_id, note_title, note_code, note_description } = note;
	const [titulo, setTitulo] = useState(note_title);
	const [codigo, setCodigo] = useState(note_code);
	const [description, setDescription] = useState(note_description);

	return (
		<Container>
			<Row style={{ marginTop: 20 }}>
				<Col xs={2} md={2} sm={2}>
				</Col>
				<Col xs={8} md={8} sm={8}>
					<h1>{titulo}</h1><a href={`/editar/${note_id}`}>Editar</a>
          <hr />
				</Col>
					<Col xs={2} md={2} sm={2}>
				</Col>
			</Row>
			<Row>
							<Col xs={2} md={2} sm={2}>
				</Col>
				<Col xs={8} md={8} sm={8}>
					<Saida titulo={titulo} descricao={description} codigo={codigo} />
				</Col>
				<Col xs={2} md={2} sm={2}>
				</Col>
			</Row>
		</Container>
	);
};

App.getInitialProps = async function(context) {
	let ADDRESS_SERVE_ADONIS = serverRuntimeConfig[0].baseURL;

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
