import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { Button, Form, Input, Select, Space, Tooltip, Typography } from 'antd';
const { Option } = Select;



const EditarFestival = () => {
  const token = localStorage.getItem('token');
  // Decodifica el token para obtener los datos
  const decodedToken = jwt_decode(token);
  const [idFestival, setidFestival] = useState('');
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
        setidFestival(userFestivals[0].id_festival);
        console.log(idFestival);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFestivals();
  }, []);
  const onFinish = (values) => {
    axios
      .post(`http://localhost:3001/update_festival/${idFestival}`, values)
      .then((response) => {
        console.log(response.data); // Manejar la respuesta del servidor
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Form
      name="editar-festival-form"
      onFinish={onFinish}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
    >
      {/* Agrega los campos necesarios para editar el festival */}
      <Form.Item
        label="Nombre del Festival"
        name="nombre_festival"
        rules={[
          {
            required: true,
            message: 'Por favor ingresa el nombre del festival',
          },
        ]}
      >
        <Input placeholder="Nombre del festival" />
      </Form.Item>

      <Form.Item
        label="Tipo de Música"
        name="tipo_musica"
        rules={[
          {
            required: true,
            message: 'Por favor selecciona el tipo de música',
          },
        ]}
      >
        <Select placeholder="Selecciona el tipo de música">
          <Option value="rock">Rock</Option>
          <Option value="pop">Pop</Option>
          <Option value="electrónica">Electrónica</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Duración"
        name="duracion"
        rules={[
          {
            required: true,
            message: 'Por favor ingresa la duración',
          },
        ]}
      >
        <Input placeholder="Duración del festival" />
      </Form.Item>

      <Form.Item
        label="Precio de Bonos"
        name="precio_bonos"
        rules={[
          {
            required: true,
            message: 'Por favor ingresa el precio de los bonos',
          },
        ]}
      >
        <Input placeholder="Precio de los bonos" />
      </Form.Item>

      <Form.Item
        label="Precio de Entrada"
        name="precio_entrada"
        rules={[
          {
            required: true,
            message: 'Por favor ingresa el precio de la entrada',
          },
        ]}
      >
        <Input placeholder="Precio de la entrada" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Actualizar Festival
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditarFestival;
