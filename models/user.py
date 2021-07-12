# from models.db import db
# from datetime import datetime


# class User(db.Model):
#     __tablename__ = 'users'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String, nullable=False)
#     email = db.Column(db.String, nullable=False, unique=True)
#     password_digest = db.Column(db.String(255), nullable=False)
#     created_at = db.Column(
#         db.DateTime, default=datetime.utcnow, nullable=False)
#     updated_at = db.Column(db.DateTime, default=datetime.utcnow(
#     ), nullable=False, onupdate=datetime.utcnow)

#     def __init__(self, name, email, password_digest):
#         self.name = name
#         self.email = email
#         self.password_digest = password_digest

#     def json(self):
#         return {"name": self.name, "email": self.email, "password_digest": self.password_digest, "created_at": str(self.created_at), "updated_at": str(self.updated_at)}

#     def create(self):
#         db.session.add(self)
#         db.session.commit()
#         return self.json()

#     @classmethod
#     def find_one(cls, email):
#         user = User.query.filter_by(email=email).first()
#         return user
from sqlalchemy.orm import backref
from models.db import db
from datetime import datetime


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_digest = db.Column(db.String(255), nullable=False)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(
    ), nullable=False, onupdate=datetime.utcnow)
    recipes = db.relationship("Recipe", cascade='all',
                              backref=db.backref('user', lazy=True))

    def __init__(self, username, email, password_digest):
        self.username = username
        self.email = email
        self.password_digest = password_digest

    def json(self):
        return {"id": self.id, "username": self.username, "email": self.email, "password_digest": self.password_digest, "created_at": str(self.created_at), "updated_at": str(self.updated_at)}

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self.json()

    @classmethod
    def find_one(cls, email):
        user = User.query.filter_by(email=email).first()
        return user

    @classmethod
    def find_all(cls):
        return User.query.all()

    @classmethod
    def find_by_id(cls, id):
        return User.query.filter_by(id=id).first()
