from datetime import datetime
from models.db import db


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(
    ), nullable=False, onupdate=datetime.utcnow)
    reviewer_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipe_id = db.Column(
        db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    def __init__(self, rating, content, reviewer_id, recipe_id):
        self.rating = rating
        self.content = content
        self.reviewer_id = reviewer_id
        self.recipe_id = recipe_id

    def json(self):
        return {"id": self.id, "rating": self.rating, "content": self.content, "reviewer_id": self.reviewer_id, "recipe_id": self.recipe_id, "created_at": str(self.created_at), "updated_at": str(self.updated_at)}

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    @classmethod
    def find_all(cls):
        reviews = Review.query.all()
        return [r.json() for r in reviews]

    @classmethod
    def find_by_id(cls, review_id):
        review = Review.query.filter_by(id=review_id).first()
        return review
