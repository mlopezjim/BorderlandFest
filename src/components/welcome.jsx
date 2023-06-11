import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
const Welcome = () => {
  const token = localStorage.getItem('token');
  // Decodifica el token para obtener los datos
  const decodedToken = jwt_decode(token);
  const [nombreFestival, setNombreFestival] = useState('');

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        //peticion a la API
        const userFestivalsResponse = await axios.get(`http://localhost:3001/user_festivals/${decodedToken.user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //CREAMOS UN ARRAY CON LOS DATOS DE LA API
        const userFestivals = userFestivalsResponse.data.festivals;
        console.log(userFestivals[0].nombre_festival);
        console.log(userFestivals[0].tipo_musica);
        console.log(userFestivals);
        //ALMACENAMOS LOS DATOS EN EL STATE
        setNombreFestival(userFestivals[0].nombre_festival);


      } catch (error) {
        console.error(error);
      }
    };

    fetchFestivals();
  }, []);

  return (
    <h2 data-aos="fade-down">Welcome to <span>{nombreFestival}</span></h2>
  );
};

export default Welcome;
