"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Review  #HACER AQUI LOS IMPORTS DE LOS MODELOS
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#RUTAS DE PRODUCT
@api.route('/products', methods=['GET'])  
def get_products():
    products = Product.query.all()
    return jsonify([product.serialize() for product in products]), 200

  
@api.route('/products/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    # agarrar producto por id
    product = Product.query.get(product_id)
    if product is None:
        # si no hay producto 404
        abort(404)
    return jsonify(product.serialize()), 200


@api.route('/products', methods=['POST'])
def add_product():
    #se obtiene la info
    body = request.get_json()
    
    # esto es solo una validacion de que no falten campos, la busque en google xd
    if 'name' not in body or 'price' not in body or 'image_url' not in body:
        raise APIException('Missing information', status_code=400) 

    # creamos el nuevo producto
    new_product = Product(
        name=body['name'],
        price=body['price'],
        image_url=body['image_url'],
        description=body.get('description', '')  # el . get lo use porque es opcional agregar una descripcion asi que puede estar vacia
    )

    #Commit para la base de datos, porfavor recordar usar pipenv run migrate y upgrade para crear las tablas
    db.session.add(new_product)
    db.session.commit()

    
    return jsonify(new_product.serialize()), 201



#ENDPOINTS DE REVIEWS
@api.route('/reviews/<int:product_id>', methods=['GET'])
def get_reviews(product_id):
    reviews = Review.query.filter_by(product_id=product_id).all()
    return jsonify([review.serialize() for review in reviews])

@api.route('/reviews/<int:product_id>', methods=['POST'])
def post_review(product_id):
    review_data = request.json
    review = Review(
        product_id=product_id,
        username=review_data['username'],
        rating=review_data['rating'],
        text=review_data['text']
    )
    db.session.add(review)
    db.session.commit()
    return jsonify(review.serialize()), 201

#ENDPOINTS DE USUARIO
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
        return jsonify({"msg":"User/Password son incorrectos"}), 401
    
    if not check_password_hash(user.password, password):
        return jsonify({"msg":"User/Password son incorrectos"}), 401
    
    expirate_token = datetime.timedelta(days = 1)
    access_token = create_access_token(identity = user.id, expires_delta = expirate_token)

    datos = {
        "success": "Inicio de sesión exitoso",
        "access_token":access_token,
        "user": user.serialize()
    }

    return jsonify(datos), 200

@api.route('/register', methods = ['POST'])
def registra_usuario():
    print(request.get_json())
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
    
    return jsonify({"success":"Registro satisfactorio, por favor iniciar sesión"}), 200

@api.route('/me')
@jwt_required()
def me():
    id = get_jwt_identity()
    user = User.query.get(id)
    return jsonify(user.serialize()), 200








