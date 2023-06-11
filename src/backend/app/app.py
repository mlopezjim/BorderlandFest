from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import bcrypt
import jwt
from jwt.exceptions import DecodeError
from functools import wraps
from flask_mail import Mail, Message


app = Flask(__name__)
CORS(app, supports_credentials=True)
# Configuración de MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'festival'
app.config['MAIL_SERVER'] = 'smtp-mail.outlook.com'  # Configura el servidor de correo saliente
app.config['MAIL_PORT'] = 587  # Configura el puerto del servidor de correo saliente
app.config['MAIL_USE_TLS'] = True  # Habilita TLS
app.config['MAIL_USERNAME'] = 'borderlandfest@hotmail.com'  # Tu dirección de correo electrónico
app.config['MAIL_PASSWORD'] = 'Lolathor'

mysql = MySQL(app)
CORS(app)
mail = Mail(app)

# Configuración de la clave secreta para JWT
app.config['SECRET_KEY'] = 'mysecretkey'

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        try:
            # Verificar y decodificar el token
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = data['user']
        except jwt.exceptions.ExpiredSignatureError:
            return jsonify({'error': 'Expired token'}), 401
        except jwt.exceptions.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        # Pasar el usuario actual a la función protegida
        return f(current_user, *args, **kwargs)

    return decorated

@app.route('/login', methods=['POST'])
def login():
    username = request.json['user']
    password = request.json['contraseña']

    # Buscar el usuario en la base de datos
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM users WHERE user = %s', (username,))
    user = cur.fetchone()
    cur.close()

    if user:
        stored_password = user[3]
        user_id = user[0]

        # Verificar la contraseña ingresada
        if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
            # Credenciales válidas, generar y devolver un token JWT
            payload = {'user': username, 'user_id': user_id}
            token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            print(data)

            return jsonify({'token': token})
    else:
        return jsonify({'error': 'User does not exist'}), 401
    

@app.route('/register', methods=['POST'])
def register():
    username = request.json['user']
    password = request.json['contraseña']

    # Verificar si el usuario ya existe en la base de datos
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM users WHERE user = %s', (username,))
    existing_user = cur.fetchone()

    if existing_user:
        return jsonify({'error': 'User already exists'}), 409

    # Crear una hash de la contraseña utilizando bcrypt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Insertar el nuevo usuario en la base de datos
    cur.execute('INSERT INTO users (user, contraseña) VALUES (%s, %s)', (username, hashed_password))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/protected', methods=['GET'])
@token_required
def protected(current_user):
    return jsonify({'message': 'Protected endpoint', 'user': current_user})



@app.route('/add_fest', methods=['POST'])
def add_fest():
    # Obtener el token del encabezado de autorización
    auth_header = request.headers.get('Authorization')
    
    nombre_festival = request.json['nombre_festival']
    tipo_musica = request.json['tipo_musica']
    duracion = request.json['duracion']
    precio_entrada = request.json['precio_entrada']
    precio_bonos = request.json['precio_bonos']
    
    if auth_header:
        # Extraer el token de autorización sin el prefijo "Bearer"
        token = auth_header.split(' ')[1]
        
        try:
            # Decodificar el token para obtener la información del usuario
            payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            
            # Obtener el ID del usuario del token decodificado
            user_id = payload['user_id']
            
            
    # Insertar los datos en la tabla correspondiente
            cur = mysql.connection.cursor()
            cur.execute('INSERT INTO festival (user_id, nombre_festival, tipo_musica, duracion, precio_entrada, precio_bonos) VALUES (%s, %s, %s, %s, %s,%s )',
                (user_id,nombre_festival, tipo_musica, duracion, precio_entrada, precio_bonos))
            mysql.connection.commit()
            
            return jsonify({'message': 'Festival added successfully'})
        
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except (jwt.InvalidTokenError, KeyError):
            return jsonify({'error': 'Invalid token'}), 401
    else:
        return jsonify({'error': 'Authorization header is missing'}), 401




#OBTENER DICCIONARIO DE TODOS LOS VALORES DE LA BASE DE DATOS DEL USUARIO QUE HA INICIADO SESION
@app.route('/user_festivals/<int:user_id>', methods=['GET'])
def get_user_festivals(user_id):
    # Obtén los festivales específicos del usuario de la base de datos y devuélvelos en la respuesta
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM festival WHERE user_id = %s', (user_id,))
    festivals = cur.fetchall()
    cur.close()

    festival_list = []
    for festival in festivals:
        festival_dict = {
            'id_festival': festival[0],
            'user_id': festival[1],
            'nombre_festival': festival[2],
            'tipo_musica': festival[3],
            'duracion': festival[4],
            'precio_bonos': festival[5],
            'precio_entrada': festival[6]
        }
        festival_list.append(festival_dict)

    # Verificar si existen festivales para el usuario
    has_festivals = len(festival_list) > 0

    # Devolver la respuesta JSON incluyendo la variable has_festivals
    if has_festivals:
        return jsonify({'festivals': festival_list, 'has_festivals': has_festivals})
    else:
        return jsonify({'festivals': [], 'has_festivals': has_festivals})
        

@app.route('/enviar-confirmacion', methods=['POST'])
def enviar_confirmacion():
    data = request.get_json()
    destinatario = data['destinatario']
    contenido = data['contenido']

    try:
        msg = Message('Confirmación de Compra', sender='borderlandfest@hotmail.com', recipients=[destinatario])
        msg.body = contenido

        mail.send(msg)

        return 'Correo de confirmación enviado correctamente'
    except Exception as e:
        return str(e), 500
    
@app.route('/update_festival/<int:festival_id>', methods=['POST'])
def update_festival(festival_id):
    festival_data = request.json

    # Actualizar el festival en la base de datos
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM festival WHERE id_festival = %s', (festival_id,))
    festival = cur.fetchone()
    if festival:
        cur.execute('UPDATE festival SET nombre_festival = %s, tipo_musica = %s, duracion = %s, precio_bonos = %s, precio_entrada = %s WHERE id_festival = %s',
                    (festival_data['nombre_festival'], festival_data['tipo_musica'], festival_data['duracion'], festival_data['precio_bonos'], festival_data['precio_entrada'], festival_id))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'Festival actualizado exitosamente'})
    else:
        cur.close()
        return jsonify({'error': 'Festival no encontrado'})




if __name__ == '__main__':
    app.run(port=3001, debug=True)
