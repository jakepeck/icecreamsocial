from models.db import db
from models.recipe import Recipe
from models.comment import Comment
from models.user import User
from flask_restful import Resource
from flask import request
from sqlalchemy.orm import joinedload


class Comments(Resource):
    def get(self):
        comments = Comment.find_all()
        return comments

    def post(self):
        data = request.get_json()
        params = {}
        for k in data.keys():
            params[k] = data[k]
        comment = Comment(**params)
        comment.create()
        return comment.json(), 201


class CommentDetail(Resource):
    def get(self, comment_id):
        comment = Comment.find_by_id(comment_id)
        comment2 = Comment.query.options(joinedload(
            'user')).filter_by(id=comment_id).first()
        comment3 = Comment.query.filter_by(id=comment_id).first()
        print('\n\n')
        print(comment2, comment3.user)
        comment_poster = comment3.user
        recipe_post = comment3.recipe
        # return {**recipe.json(), **user.json()}
        # user = User.find_by_id(recipe.poster_id)
        return {**comment3.json(), "comment_poster": comment_poster.json(), "recipe post": recipe_post.json()}

        # alternate/original solution
        ## comment = Comment.find_by_id(comment_id)
        ## user = User.find_by_id(comment.commenter_id)
        # return {**recipe.json(), "comment_poster": user.json()}

    def put(self, comment_id):
        data = request.get_json()
        comment = Comment.find_by_id(comment_id)
        for k in data.keys():
            setattr(comment, k, data[k])
        db.session.commit()
        return comment.json()

    def delete(self, comment_id):
        comment = Comment.find_by_id(comment_id)
        if not comment:
            return {"msg": "Comment not found"}, 404
        db.session.delete(comment)
        db.session.commit()
        return {"msg": "Comment deleted", "payload": comment_id}


class CommentsByUser(Resource):
    def get(self, user_id):
        comments = Comment.find_all_by_user_id(user_id)
        return comments, 200


class CommentsOnRecipe(Resource):
    def get(self, recipe_id):
        comments = Comment.find_all_by_recipe_id(recipe_id)
        return comments, 200
