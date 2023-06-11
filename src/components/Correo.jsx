import React, { useState } from 'react';
import axios from 'axios';

function Correo() {
  const [email, setEmail] = useState('');

  const handleComprar = async () => {
    try {
      const response = await axios.post('http://localhost:3001/enviar-confirmacion', {
        destinatario: email,
        contenido: '¡Gracias por tu compra! Tu pedido está siendo tramitado.'
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Formulario de Compra</h2>
      <input
        type="email"
        placeholder="Introduce tu dirección de correo electrónico"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button onClick={handleComprar}>Comprar</button>
    </div>
  );
}

export default Correo;
