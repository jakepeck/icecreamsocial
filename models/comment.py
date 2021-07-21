from datetime import datetime
from models.db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(
    ), nullable=False, onupdate=datetime.utcnow)
    commenter_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipe_id = db.Column(
        db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    def __init__(self, content, commenter_id, recipe_id):
        self.content = content
        self.commenter_id = commenter_id
        self.recipe_id = recipe_id

    def json(self):
        return {"id": self.id, "content": self.content, "commenter_id": self.commenter_id, "recipe_id": self.recipe_id, "created_at": str(self.created_at), "updated_at": str(self.updated_at)}

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    @classmethod
    def find_all(cls):
        comments = Comment.query.all()
        return [c.json() for c in comments]

    @classmethod
    def find_by_id(cls, comment_id):
        comment = Comment.query.filter_by(id=comment_id).first()
        return comment

    @classmethod
    def find_all_by_recipe_id(cls, r_id):
        comments = Comment.query.filter_by(recipe_id=r_id)
        return [c.json() for c in comments]

    @classmethod
    def find_all_by_user_id(cls, user_id):
        comments = Comment.query.filter_by(commenter_id=user_id)
        return [c.json() for c in comments]
