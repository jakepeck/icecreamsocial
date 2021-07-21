from flask_restful import Resource
from flask import request
# Import user and db here
from models.user import User
from models.db import db


class Users(Resource):
    def get(self):
        data = User.find_all()
        results = [u.json() for u in data]
        return results

    def post(self):
        data = request.get_json()
        user = User(**data)
        user.create()
        return user.json(), 201


class SingleUser(Resource):
    def get(self, id):
        user = User.find_by_id(id)
        if not user:
            return {"message": "Not Found"}, 404
        return user.json()

    def delete(self, id):
        user = User.find_by_id(id)
        if not user:
            return {"message": "Not Found"}, 404
        db.session.delete(user)
        db.session.commit()
        return {"payload": id}

    def put(self, id):
        user = User.find_by_id(id)
        if not user:
            return {"message": "Not Found"}, 404
        data = request.get_json()
        for key in data:
            setattr(user, key, data[key])
        db.session.commit()
        return user.json()


class UserSuperDetail(Resource):
    def get(self, user_id):
        user = User.find_by_id(user_id)
        if not user:
            return {"message": "Not Found"}, 404
        user_comments = user.comments
        user_recipes = user.recipes
        return {"user": user.json(), "user_comments": [uc.json() for uc in user_comments], "user_recipes": [ur.json() for ur in user_recipes]}
