from flask_restful import Resource, reqparse
import logging as logger
from models.Recipe import RecipeModel


parser = reqparse.RequestParser()
parser.add_argument('ingredients', required=True, help='This field cannot be left blank')
parser.add_argument('recipe_name', required=True, help='This field cannot be left blank')
parser.add_argument('instructions', required=True, help='This field cannot be left blank')
parser.add_argument('category', required=True, help='This field cannot be left blank')
parser.add_argument('notes', required=True, help='This field cannot be left blank')
class Recipe(Resource):
    def get(self, id):
        recipe = RecipeModel.find_by_id(id)
        if recipe:
            return recipe.json()
        return {'message': 'Recipe not found'}, 404

    def delete(self, id):
    
        recipe = RecipeModel.find_by_id(id)
        if recipe:
            recipe.delete_from_db()

            return {'message': 'item has been deleted'}

    def put(self, id):
        # Create or Update
        recipe = RecipeModel.find_by_id(id)
        try:
            recipe.save_to_db()
        
        except Exception as e:
            # Just print(e) is cleaner and more likely what you want,
            # but if you insist on printing message specifically whenever possible...
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
        return recipe.json()

class RecipeList(Resource):
    # parser.add_argument('ingredients', required=True, help='This field cannot be left blank')
    def get(self):
        return {'recipes': [recipe.json() for recipe in RecipeModel.query.all()]}
    def post(self):
        data = parser.parse_args()
        # recipe = RecipeModel()
        recipe = RecipeModel(**data)
        print(recipe)
        try:
            recipe.save_to_db()
        except Exception as e:
            # Just print(e) is cleaner and more likely what you want,
            # but if you insist on printing message specifically whenever possible...
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
        except:
            return {"message": "An error occurred inserting the item."}, 500
        return recipe.json(), 201