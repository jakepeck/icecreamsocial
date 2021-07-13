from datetime import datetime
from models.db import db


class Recipe(db.Model):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    photo = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(
    ), nullable=False, onupdate=datetime.utcnow)
    poster_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __init__(self, photo, title, content, poster_id):
        self.photo = photo
        self.title = title
        self.content = content
        self.poster_id = poster_id

    def json(self):
        return {"id": self.id, "photo": self.photo, "title": self.title, "content": self.content, "poster_id": self.poster_id, "created_at": str(self.created_at), "updated_at": str(self.updated_at)}

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    @classmethod
    def find_all(cls):
        recipes = Recipe.query.all()
        return [recipe.json() for recipe in recipes]

    @classmethod
    def find_by_id(cls, recipe_id):
        recipe = Recipe.query.filter_by(id=recipe_id).first()
        return recipe
