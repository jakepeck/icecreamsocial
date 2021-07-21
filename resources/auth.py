

from flask_restful import Resource
from flask import request
from models.user import User
from middleware import create_token, read_token, gen_password, compare_password, strip_token


class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.find_one(email=data['email'])
        if user and compare_password(data['password'], user.password_digest):
            payload = {
                "id": user.id,
                "email": user.email,
                "username": user.username
            }
            token = create_token(payload)
            return {"payload": payload, "token": token}, 200
        return {"message": "Login Failed"}, 401

    def get(self):
        token = strip_token(request)
        if token:
            try:
                payload = read_token(token)
                return payload
            except:
                return {"message": "Unauthorized"}, 401
        return {"message": "Unauthorized"}, 401


class Register(Resource):
    def post(self):
        data = request.get_json()
        params = {
            "username": data['username'],
            "email": data['email'],
            "password_digest": gen_password(data['password'])
        }
        user = User(**params)
        user.create()
        return user.json(), 201
