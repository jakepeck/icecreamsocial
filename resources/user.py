from flask_restful import Resource
from flask import request
# Import user and db here
from models.user import User
from models.db import db


class Users(Resource):
    def get(self):
        data = User.find_all()
        print(data)
        results = [u.json() for u in data]
        return results

    def post(self):
        data = request.get_json()
        user = User(**data)
        user.create()
        return user.json(), 201


class SingleUser(Resource):
    def get(self, id):
        data = User.find_by_id(id)
        if not data:
            return {"message": "Not found"}, 404
        results = data.json()
        return results

    def delete(self, id):
        data = User.find_by_id(id)
        if not data:
            return {"message": "Not found"}, 404
        db.session.delete(data)
        db.session.commit()
        return {"payload": id}

    def put(self, id):
        data = request.get_json()
        user = User.find_by_id(id)
        if not user:
            return {"message": "Not found"}, 404
        for key in data:
            setattr(user, key, data[key])

        db.session.commit()
        return user.json()
