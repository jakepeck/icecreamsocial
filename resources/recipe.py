from models.db import db
from models.recipe import Recipe
from models.user import User
from flask_restful import Resource
from flask import request
from sqlalchemy.orm import joinedload


class Recipes(Resource):
    def get(self):
        recipes = Recipe.find_all()
        return recipes

    def post(self):
        data = request.get_json()
        params = {}
        for k in data.keys():
            params[k] = data[k]
        recipe = Recipe(**params)
        recipe.create()
        return recipe.json(), 201


class RecipeDetail(Resource):
    def get(self, recipe_id):
        recipe = Recipe.find_by_id(recipe_id)
        recipe2 = Recipe.query.options(joinedload(
            'user')).filter_by(id=recipe_id).first()
        recipe_poster = recipe2.user
        # return {**recipe.json(), **user.json()}
        # user = User.find_by_id(recipe.poster_id)
        return {**recipe2.json(), "user": recipe_poster.json()}

        # alternate/original solution
        ## recipe = Recipe.find_by_id(recipe_id)
        ## user = User.find_by_id(recipe.poster_id)
        # return {**recipe.json(), "poster": user.json()}

    def put(self, recipe_id):
        data = request.get_json()
        recipe = Recipe.find_by_id(recipe_id)
        for k in data.keys():
            recipe[k] = data[k]
        db.session.commit()
        return recipe.json()

    def delete(self, recipe_id):
        recipe = Recipe.find_by_id(recipe_id)
        if not recipe:
            return {"msg": "Recipe not found"}, 404
        db.session.delete(recipe)
        db.session.commit()
        return {"msg": "Recipe deleted", "payload": recipe_id}
