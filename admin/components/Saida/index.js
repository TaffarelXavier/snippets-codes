const ReactMarkdown = require('react-markdown');

const Saida = ({ titulo, descricao, codigo }) => {
    return (
      <>
        <h3>Título:</h3>
        <ReactMarkdown source={titulo} escapeHtml={false} />
        <h3>Descrição:</h3>
        <ReactMarkdown source={descricao} escapeHtml={false} />
        <h3>Código:</h3>
        <ReactMarkdown source={codigo} escapeHtml={false} />
      </>
    );
  };
  

export default Saida;
