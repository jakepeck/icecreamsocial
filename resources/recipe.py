from models.db import db
from models.recipe import Recipe
from models.user import User
from flask_restful import Resource
from flask import request
from sqlalchemy.orm import joinedload
from models.comment import Comment


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
        return {**recipe2.json(), "recipe_poster": recipe_poster.json()}

        # alternate/original solution
        ## recipe = Recipe.find_by_id(recipe_id)
        ## user = User.find_by_id(recipe.poster_id)
        # return {**recipe.json(), "poster": user.json()}

    def put(self, recipe_id):
        data = request.get_json()
        recipe = Recipe.find_by_id(recipe_id)
        for k in data.keys():
            setattr(recipe, k, data[k])
        db.session.commit()
        return recipe.json()

    def delete(self, recipe_id):
        recipe = Recipe.find_by_id(recipe_id)
        if not recipe:
            return {"msg": "Recipe not found"}, 404
        db.session.delete(recipe)
        db.session.commit()
        return {"msg": "Recipe deleted", "payload": recipe_id}


class RecipeSuperDetail(Resource):
    def get(self):
        # recipes = Recipe.query.options(joinedload(
        #     'user'))
        recipes = Recipe.query
        return [{"recipe": recipe.json(), "recipe_poster": recipe.user.json(), "comments": [{"comment": comment.json(), "commenter_username": comment.user.username} for comment in recipe.comments]}for recipe in recipes]

    # def get(self, r_id):

        # recipe = Recipe.find_by_id(r_id)
        # # recipe2 = Recipe.query.options(joinedload(
        # #     'user')).filter_by(id=recipe_id).first()
        # recipe_poster = recipe.user
        # rec_comments = recipe.comments
        # print(rec_comments)
        # recipe_comments = Comment.query.filter_by(recipe_id=r_id)
        # comments = [comment.json() for comment in recipe_comments]
        # print(comments)
        # # return {**recipe.json(), **user.json()}
        # # user = User.find_by_id(recipe.poster_id)
        # return {**recipe.json(), "recipe_poster": recipe_poster.json(), "comments": comments}


class RecipesByUser(Resource):
    def get(self, user_id):
        recipes = Recipe.find_all_by_user_id(user_id)
        return recipes, 200


class SingleRecipeSuperDetail(Resource):
    def get(self, recipe_id):
        # recipes = Recipe.query.options(joinedload(
        #     'user'))
        recipe = Recipe.find_by_id(recipe_id)
        return [{"recipe": recipe.json(), "recipe_poster": recipe.user.json(), "comments": [{"comment": comment.json(), "commenter_username": comment.user.username} for comment in recipe.comments]}for recipe in recipes]
