import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Registro = () => {
  const [form] = Form.useForm();
  const [isRegistered, setIsRegistered] = useState(false);
  const [showComponent, setShowComponent] = useState(true);

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:3001/register', values);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setIsRegistered(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isRegistered) {
      setTimeout(() => {
        setShowComponent(false);
      }, 5000);
    }
  }, [isRegistered]);

  return (
    <div>
      {showComponent && (
        <div>
          {isRegistered ? (
            <div>
              ¡Registro exitoso!
            </div>
          ) : (
            <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
              <Form.Item
                name="user"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="username" />
              </Form.Item>
              <Form.Item
                name="contraseña"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item shouldUpdate>
                {() => (
                  <>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={
                        !form.isFieldsTouched(true) ||
                        !!form.getFieldsError().filter(({ errors }) => errors.length).length
                      }
                    >
                      Register
                    </Button>
                  </>
                )}
              </Form.Item>
            </Form>
          )}
        </div>
      )}
    </div>
  );
};

export default Registro;
