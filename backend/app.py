from flask import Flask
import logging as logger
from flask_restful import Api
from api.Recipe import Recipe, RecipeList
import logging
from db import db
from flask_cors import CORS
    

app = Flask(__name__)
api = Api(app)
handler = logging.StreamHandler()
handler.setLevel(logging.ERROR)
app.logger.addHandler(handler)
app.config.from_object('config')
db.init_app(app)
CORS(app, origins="http://127.0.0.1:3000", allow_headers=[
    "Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
    supports_credentials=True)

api.add_resource(Recipe, "/api/recipe/<int:id>")
api.add_resource(RecipeList, "/api/recipes")

if __name__=='__main__':
    
    
    logger.debug("Starting Recipe App")
    app.run(debug=True)