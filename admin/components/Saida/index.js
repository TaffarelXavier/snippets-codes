const ReactMarkdown = require('react-markdown');
import Highlight from 'react-highlight';

const Saida = ({ titulo, descricao, codigo }) => {
  return (
    <>
      <h3>Título:</h3>
      <ReactMarkdown source={titulo} escapeHtml={false} />
      <h3>Descrição:</h3>
      <ReactMarkdown source={descricao} escapeHtml={false} />
      {codigo && (
        <>
          <h3>Código:</h3>
          <Highlight innerHTML={false}>{codigo}</Highlight>
        </>
      )}
    </>
  );
};

export default Saida;
