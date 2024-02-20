"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/login', methods=['POST'])
def inicia_sesion_usuario():

    email = request.json.get('email')
    password = request.json.get('password')

    if not email:
        return jsonify({"msg": "Email es requerido"}), 400
    if not password:
        return jsonify({"msg": "Password es requerido"}), 400
    
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"msg":"User/Name son incorrectos"}), 401
    
    if not check_password_hash(user.password, password):
        return jsonify({"msg":"User/Name son incorrectos"}), 401
    
    expirate_token = datetime.timedelta(days = 1)
    access_token = create_access_token(identity = user.id, expires_delta = expirate_token)

    datos = {
        "access_token":access_token,
        "user": user.serialize()
    }

    return jsonify(datos), 200

@api.route('/register', methods = ['POST'])
def registra_usuario():

    name = request.json.get('name', '')
    email = request.json.get('email')
    direction = request.json.get('direction', '')
    password = request.json.get('password')
    is_active = request.json.get('is_active', True)

    if not email:
        return jsonify({"msg": "Email es requerido"}), 400
    if not password:
        return jsonify({"msg": "Password es requerido"}), 400
    
    found = User.query.filter_by(email=email).first()
    if found:
        return jsonify({"msg":"Este email existe"}), 400
    
    user = User()
    user.name = name
    user.email = email
    user.direction = direction
    user.password = generate_password_hash(password)
    user.is_active = is_active

    user.save()

    if not user:
        return jsonify({"msg":"Error, por favor intenta de nuevo"}), 400
    
    return jsonify({"msg":"Registro , por favor iniciar sesión"}), 200
    


        






