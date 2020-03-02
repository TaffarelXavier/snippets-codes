import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';

//Componente 1
const ToastTest = props => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'relative',
        minHeight: '200px'
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0
        }}
      >
        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
          <Toast.Header>
            <strong className="mr-auto">Sucesso!</strong>
          </Toast.Header>
          <Toast.Body>{props.message}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

const App = () => {
  const [showToast, setShowToast] = useState(false);
  return (
    <>
      <ToastTest show={showToast} message={'Alterações salvas com sucesso!'} />
      <Button onClick={() => setShowToast(!showToast)}>Abrir</Button>
    </>
  );
};

export default App;
