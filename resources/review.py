from models.db import db
from models.recipe import Recipe
from models.comment import Comment
from models.review import Review
from models.user import User
from flask_restful import Resource
from flask import request
from sqlalchemy.orm import joinedload


class Reviews(Resource):
    def get(self):
        reviews = Review.find_all()
        return reviews

    def post(self):
        data = request.get_json()
        params = {}
        for k in data.keys():
            params[k] = data[k]
        review = Review(**params)
        review.create()
        return review.json(), 201


class ReviewDetail(Resource):
    def get(self, review_id):
        review3 = Review.query.filter_by(id=review_id).first()
        review_poster = review3.user
        recipe_post = review3.recipe
        return {**review3.json(), "review_poster": review_poster.json(), "recipe post": recipe_post.json()}

    def put(self, review_id):
        data = request.get_json()
        review = Review.find_by_id(review_id)
        for k in data.keys():
            setattr(review, k, data[k])
        db.session.commit()
        return review.json()

    def delete(self, review_id):
        review = Review.find_by_id(review_id)
        if not review:
            return {"msg": "Review not found"}, 404
        db.session.delete(review)
        db.session.commit()
        return {"msg": "Review deleted", "payload": review_id}
