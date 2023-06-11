import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, message } from 'antd';
import BotonSend from '../Botones/BotonSend';
import Registro from '../Registro';
import fondo from './fondo.jpg';

const Login = ({ isAuthenticated, setAuthenticated }) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [hasFestivals, setHasFestivals] = useState(false); // Variable para controlar si existen festivales
  const history = useHistory();

  useEffect(() => {
    // Vaciar el Local Storage al renderizar el componente
    localStorage.clear();
  }, []);

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:3001/login', values);
      const token = response.data.token;

      // Almacenar el token en el local storage
      localStorage.setItem('token', token);
      const decodedToken = jwt_decode(token);
      const user_id = decodedToken.user_id;

      // Verificar si existen festivales para el usuario
      const festivalsResponse = await axios.get(`http://localhost:3001/user_festivals/${user_id}`);
      const hasFestivals = festivalsResponse.data.has_festivals;

      // Actualizar el estado de hasFestivals
      setHasFestivals(hasFestivals);

      // Redirigir al formulario si existen festivales, de lo contrario a otra página
      console.log(hasFestivals);
      setTimeout(() => {
        if (hasFestivals) {
          history.push('/Borderland');
        } else {
          history.push('/Formulario');
        }
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error('Credenciales inválidas. Por favor, verifique su usuario y contraseña.');
      } else {
        message.error('Ocurrió un error al procesar la solicitud. Por favor, inténtelo nuevamente más tarde.');
      }
    }
  };
  //STYLES
  const styles = {
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    },
    form: {
      minWidth: '250px',
    },
    inputIcon: {
      color: '#1890ff',
    },
    loginFormButton: {
      width: '150px',
    },
    forgotPassword: {
      float: 'right',
    },
    registerLink: {
      marginLeft: '8px',
      color: 'blue',
    },
    body: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100%',
      backgroundImage: `url(${fondo})`,
      margin: '0',
      padding: '0',
    },
  };
  //OCULTAR FORMULARIO
  const showRegisterFormHandler = () => {
    setShowRegisterForm(!showRegisterForm);
  };



  return (
    <body style={styles.body}>
      <div style={styles.formContainer}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={styles.form}
        >
          <Form.Item
            name="user"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined style={styles.inputIcon} />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="contraseña"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined style={styles.inputIcon} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Recuerdame</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <BotonSend type="primary" htmlType="submit" className="login-form-button" style={styles.loginFormButton}>
              Log in
            </BotonSend>
            Si no estás registrado <a href="#" style={styles.registerLink} onClick={showRegisterFormHandler}>hazlo aquí!</a>
          </Form.Item>
        </Form>
        {showRegisterForm && (
          <div>
            <Registro />
          </div>
        )}
      </div>
    </body>
  );
};

export default Login;
