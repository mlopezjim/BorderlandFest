import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
const Logo = () => {
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
        //ALMACENAMOS LOS DATOS EN EL STATE
        setNombreFestival(userFestivals[0].nombre_festival);

      } catch (error) {
        console.error(error);
      }
    };

    fetchFestivals();
  }, []);

  return (
        <h1>{nombreFestival}</h1>
  );
};

export default Logo;
