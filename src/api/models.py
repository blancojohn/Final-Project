from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), default="")
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(500), nullable=False)
    direction = db.Column(db.String(1000), nullable=False)
    is_active = db.Column(db.Boolean(), default=True)
    cart_items = db.relationship('CartItem', back_populates='user', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "direction": self.direction,
            "is_active": self.is_active
            # do not serialize the password, its a security breach
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):    
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

# nuestra clase Product donde definimos todo lo necesario para mostrar en la pagina, incluyendo el nuevo agregado descuento
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    category = db.Column(db.String(50), nullable=False)
    discount = db.Column(db.Float, nullable=True, default=0.0)  # Asegurarse de que el valor introducido sea un float por ejemplo 0.20 = 20% de descuento

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "image_url": self.image_url,
            "description": self.description,
            "category": self.category,
            "discount": self.discount,
        }


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    username = db.Column(db.String(80))
    rating = db.Column(db.Integer)
    text = db.Column(db.String(500))

    def serialize(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "username": self.username,
            "rating": self.rating,
            "text": self.text
        }
    
                #tdo este carrito esta hecho a pura preuba y error pero pero funciona :) porfa no tocar o capaz se rompe xd
class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Clave primaria del carrito
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # foreign key al usuario
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)  # foreign key al producto
    quantity = db.Column(db.Integer, default=1, nullable=False)  # cantidad de productos en el carrito
    # relacion entre el usuario y el producto la cual seria muchos a muchos. muchos usuarios pueden agregar muchos productos y los productos pueden
    # ser agregados por muchos usuarios.
    user = db.relationship('User', back_populates='cart_items')  
    product = db.relationship('Product')

    # serializamos el carrito en JSON
    def serialize(self):
        # llama al producto asociado cn el item
        product = Product.query.get(self.product_id)
        if product:
            # si el producto existe llama tdos los datos necesarios pra mostrar en el fton
            return {
                "id": self.id,
                "user_id": self.user_id,
                "product_id": self.product_id,
                "quantity": self.quantity,
                "product": {
                    "name": product.name,
                    "price": product.price,
                    "discount": product.discount,
                    
                }
            }
        else:
            # si el prducto no existe retorna esto
            return {
                "id": self.id,
                "user_id": self.user_id,
                "product_id": self.product_id,
                "quantity": self.quantity
            }
