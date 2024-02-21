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
