from flask import Flask, request, jsonify
from flask_mysqldb import MYSQL
from flask_marshmallow import Marshmallow,Schema
from datetime import datetime
import os

#Init app
app = Flask(__name__)
basedir =os.path.abspath(os.path.dirname(__file__))
#database
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///' + os.path.join(basedir,'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICTION']=False
#Init db
db = SQLAlchemy(app)
#Init ma
ma = Marshmallow(app)

#Menu Class/Model
class Product(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(100))
    ingredient=db.Column(db.String(100))
    instruction=db.Column(db.String(100),nullable=True)
    category=db.Column(db.String(100),nullable=True)
    note=db.Column(db.String(100),nullable=True)
    date_added=db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    data_modifed=db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self,name,ingredient,instruction,category,note):
        self.name = name
        self.ingredient = ingredient
        self.instruction = instruction
        self.category = category
        self.note = note
#product schema
class ProductSchema(ma.Schema):
    class Meta:
        fields =('id','name','ingredient','instruction','category','note','date_added','data_modifed')

#Init Schema
product_schema =ProductSchema()
products_schema =ProductSchema(many=True)

# Create a Product
@app.route('/product',methods=['POST'])
def add_product():
    name =request.json['name']
    ingredient =request.json['ingredient']
    instruction =request.json['instruction']
    category =request.json['category']
    note =request.json['note']

    new_product = Product(name,ingredient,instruction,category,note)
    db.session.add(new_product)
    db.session.commit()

    return product_schema.jsonify(new_product)

#Show all products
@app.route('/product', methods=['GET'])
def all_products():
    all_products=Product.query.all()
    result =products_schema.dump(all_products,many=True)
    return jsonify(result)

#Show Single product
@app.route('/product/<id>', methods=['GET'])
def single_product(id):
    product=Product.query.get(id)
    result =product_schema.dump(product)
    return jsonify(result)


#Update Product
@app.route('/product/<id>',methods=['PUT'])
def update_product(id):
    product =Product.query.get(id)    
    name =request.json['name']
    ingredient =request.json['ingredient']
    instruction =request.json['instruction']
    category =request.json['category']
    note =request.json['note']

    product.name=name
    product.ingredient=ingredient
    product.instruction=instruction
    product.category=category
    product.note=note

    db.session.commit()

    return product_schema.jsonify(product)

#Delete product
@app.route('/product/<id>', methods=['DELETE'])
def delete_product(id):
    product=Product.query.get(id)
    db.session.delete(product)
    db.session.commit()
    
    return product_schema.jsonify(product)

#Test series 
@app.route('/',methods=['GET'])
def get():
    return jsonify({'message':'from my server'})

#Run Server
if __name__=='__main__':
    app.run(debug=True)