//React 
import React, { useState} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
//ANTD
import { message } from 'antd';
//Styles
import '../../styles/Form.css';
import fondoCuestionario from './fondoCuestionario.jpg'



function Formulario() {
  const history = useHistory();
  const [nombre_festival, setNombre_festival] = useState('');
  const [tipo_musica, setTipo_musica] = useState('Electronica');
  const [duracion, setDuracion] = useState('1');
  const [precio_entrada, setPrecio_entrada] = useState('');
  const [precio_bonos, setPrecio_bonos] = useState('');



  const handleSubmit = async (event) => {
    event.preventDefault();
    //TOKEN
    const token = localStorage.getItem('token');
    const secretKey = 'mysecretkey';
    const decodedToken = jwt_decode(token, secretKey);
    console.log(decodedToken);

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      console.log(headers); // Agrega esta línea para verificar los encabezados

      const response = await axios.post(
        'http://localhost:3001/add_fest',
        {
          nombre_festival,
          tipo_musica,
          duracion,
          precio_entrada,
          precio_bonos
        },
        { headers } // Pasa los encabezados en la configuración de la solicitud
      );

      if (response.status === 201) {
      message.success('Festival creado correctamente');
      }
      setTimeout(() => {
        history.push('/Borderland');
      }, 1000);
      
    } catch (error) {
      console.log(error);
      message.error('Credenciales inválidas. Por favor, verifique su usuario y contraseña.');
    }
  };



  const style = {

    html: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100%',
      backgroundImage: `url(${fondoCuestionario})`,
      margin: '0',
      padding: '0'
    },




  };
  return (



    <html style={style.html}>
      <body>
        <div className="container" id="advanced-search-form">
          <h2>Crea tu festival</h2>          
          <form onSubmit={handleSubmit}>
            <ul>
              <li className="form-group">
                <label for="nombre_festival">Nombre del festival</label>
                <input type="text" className="form-control" placeholder="Nombre del festival" name="nombre_festival" value={nombre_festival}
                  onChange={(event) => setNombre_festival(event.target.value)} />
              </li>

              <li className="form-group">
                <label for="tipo_musica">Tipo de musica</label>
                <select name="tipo_musica" id="tipo_musica" value={tipo_musica} onChange={(event) => setTipo_musica(event.target.value)}>
                  <option value="Electro">Electrónica</option>
                  <option value="Latina">Latina</option>
                  <option value="Pop">Pop</option>
                </select>
              </li>
              <li className="form-group">
                <label for="duracion">Elije la duración de tu festival</label>
                <select name="duracion" id="duracion" value={duracion} onChange={(event) => setDuracion(event.target.value)}>
                  <option value="1">1 día</option>
                  <option value="2">2 días</option>
                  <option value="3">3 días</option>
                </select>
              </li>
              <li className="form-group">
                <label for="precio_entrada">Precio de la entrada</label>
                <input type="text" className="form-control" placeholder="Precio" name="precio_entrada" value={precio_entrada}
                  onChange={(event) => setPrecio_entrada(event.target.value)} />
              </li>
              <li className="form-group">
                <label for="precio_bonos">Precio bono 10 copas</label>
                <input type="text" className="form-control" placeholder="Precio copas" name="precio_bonos" value={precio_bonos}
                  onChange={(event) => setPrecio_bonos(event.target.value)} />
              </li>
            </ul>
            <div className="clearfix"></div>

            <button type='submit' className="btn btn-info btn-lg btn-responsive" id="search"> <span className="glyphicon glyphicon-search"></span> Search</button>


          </form>

        </div>
      </body>
    </html>

  )
}

export default Formulario;
