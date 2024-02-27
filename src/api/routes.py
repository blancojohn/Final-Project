"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Review, CartItem  #HACER AQUI LOS IMPORTS DE LOS MODELOS
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



@api.route('/Categoria/<Perros>', methods=['GET'])
def get_Perros(Perros):
    # agarrar categoria
    categoria = Perros.query.get(Perros)
    if categoria is None:
        # si no hay categoria 404
        abort(404)
    return jsonify(categoria.serialize()), 200

@api.route('/Categoria/<Gatos>', methods=['GET'])
def get_Gatos(Gatos):
    # agarrar categoria
    categoria = Gatos.query.get(Gatos)
    if categoria is None:
        # si no hay categoria 404
        abort(404)
    return jsonify(categoria.serialize()), 200





   



##ENDPOINTS DE REVIEWS
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


#ENDPOINTS DEL CARRITO

@api.route('/cart', methods=['POST'])
@jwt_required()
#el jwt requred de aqui es para q solamente se pueda usar el carrito si estas logeado, no tenemos funcion de comprar anonimo sin logeo.
def add_to_cart():
    # agarra el ID del usuario logeado en ese momento
    user_id = get_jwt_identity()
    # obtiene el id del producto y la cantidad del mismo
    product_id = request.json.get('product_id')
    quantity = request.json.get('quantity', 1)  # por default la cantidad es 1
    
    # crea un nuevo item en el carrito con los siguientes datos
    cart_item = CartItem(user_id=user_id, product_id=product_id, quantity=quantity)
    # agrega el item al carrito en la base de datos
    db.session.add(cart_item)
    # hago commit a los cambios en la base de datos
    db.session.commit()
    # retorna el item serializado como respuesta con un 201 lo q significa exito 
    return jsonify(cart_item.serialize()), 201

@api.route('/cart', methods=['GET'])
@jwt_required()
def get_cart():
    # se agarra la id del usuario con jwt
    user_id = get_jwt_identity()
    # busco el usuario especifico en la base d datos con el id que me devuelva jwt
    user = User.query.get(user_id)
    # y aqui simplemente se retorna con el get los items dentro del carrito de dicho usuario
    return jsonify([item.serialize() for item in user.cart_items]), 200

@api.route('/cart/<int:item_id>', methods=['DELETE'])
@jwt_required()
def remove_from_cart(item_id):
    # nuevamente obtenemos el id
    user_id = get_jwt_identity()
    # se busca el item dentro del carrito del usuario que se quiere eliminar
    cart_item = CartItem.query.filter_by(id=item_id, user_id=user_id).first()
    if cart_item:
        # si el item existe lo borramos de la base de datos cn db.session.delete
        db.session.delete(cart_item)
        # guardamos los cambios despues de eliminarlo
        db.session.commit()
        # devolvemos un mensaje de exito
        return jsonify({'success': 'Item removido'}), 200
    # si el item no se encuentra en la base de datos devolvemos error 404
    return jsonify({'error': 'Item no encontrado en la base de datos'}), 404


@api.route('/cart/<int:item_id>', methods=['PUT'])
@jwt_required()
# funcion para actualizar el carrito utilizamos PUT.
def update_cart_item(item_id):
    # obtenemos id del usuario
    user_id = get_jwt_identity()
    # buscamos el item cn el id del mismo y del respectivo user
    cart_item = CartItem.query.filter_by(id=item_id, user_id=user_id).first()
    if cart_item:
        # si item existe actualizamos la cantidad
        new_quantity = request.json.get('quantity')
        if new_quantity and new_quantity > 0:
            cart_item.quantity = new_quantity
            db.session.commit()  # hacemos commit en la db
            # return si es exitoso
            return jsonify({'success': 'Cantidad actualizada correctamente'}), 200
        else:
            # return si no es valido
            return jsonify({'error': 'Cantidad proporcionada no es válida'}), 400
    # si el item no existe return error
    return jsonify({'error': 'Item no encontrado en el carrito'}), 404