"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product  #HACER AQUI LOS IMPORTS DE LOS MODELOS
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#RUTAS DE PRODUCT
@api.route('/products', methods=['GET'])  
def get_products():
    products = Product.query.all()
    return jsonify([product.serialize() for product in products]), 200

@api.route('/products', methods=['POST'])
def add_product():
    #se obtiene la info
    body = request.get_json()
    
    # esto es solo una validacion de que no falten campos
    if 'name' not in body or 'price' not in body or 'image_url' not in body:
        raise APIException('Missing information', status_code=400)

    # creamos el nuevo producto
    new_product = Product(
        name=body['name'],
        price=body['price'],
        image_url=body['image_url'],
        description=body.get('description', '')  # el . get lo use porque es opcional agregar una descripcion
    )

    #Commit para la base de datos
    db.session.add(new_product)
    db.session.commit()

@api.route('/products/<>', methods=['POST'])
    
    return jsonify(new_product.serialize()), 201

