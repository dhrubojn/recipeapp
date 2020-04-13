from db import db

# Recipe Model
class RecipeModel(db.Model):
    __tablename__ = 'recipe'
    id=db.Column(db.Integer, primary_key=True)
    recipe_name=db.Column(db.String(255))
    ingredients=db.Column(db.Text,nullable=True)
    instructions=db.Column(db.Text,nullable=True)
    category=db.Column(db.String(100),nullable=True)
    notes=db.Column(db.Text,nullable=True)
    date_added=db.Column(db.DateTime, nullable=True)
    date_modified=db.Column(db.DateTime, nullable=True)

    def __init__(self,recipe_name,ingredients,instructions,category,notes):
        self.recipe_name = recipe_name
        self.ingredients = ingredients
        self.instructions = instructions
        self.category = category
        self.notes = notes
    def json(self):
        return {'id':self.id, 'recipe_name': self.recipe_name, 'ingredients': self.ingredients, 'instructions': self.instructions, 'category': self.category, 'notes': self.notes}

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()  # simple TOP 1 select

    def find_by_name(cls, recipe_name):
        return cls.query.filter_by(recipe_name=recipe_name).first()

    def save_to_db(self): 
        db.session.add(self)
        db.session.commit()  

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()    