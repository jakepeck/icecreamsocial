from resources.review import ReviewDetail, Reviews
from models.recipe import Recipe
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_migrate import Migrate
# only for flask migrate
# from models import story, song, comment
# # only for flask migrate
# from resources import story, song, comment
# from models.db import db
from models.db import db
from models.user import User
from models.comment import Comment
from models.review import Review
from models import user, recipe, comment, review
from resources import comment, user, recipe, review
from resources.auth import Login, Register
from resources.user import Users, SingleUser, UserSuperDetail
from resources.recipe import Recipes, RecipeDetail, RecipeSuperDetail, RecipesByUser, SingleRecipeSuperDetail
from resources.comment import Comments, CommentDetail, CommentsOnRecipe, CommentsByUser, CommentsOnRecipe
import os


app = Flask(__name__)
cors = CORS(app)
api = Api(app)

# Deployment configuration
DATABASE_URL = os.getenv('DATABASE_URL')
if DATABASE_URL:
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL.replace(
        "://", "ql://", 1)
    app.config['SQLALCHEMY_ECHO'] = False
    app.env = 'production'
else:
    app.debug = True
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost:5432/icecreamsocial_db'
    app.config['SQLALCHEMY_ECHO'] = True


# # Init db and migrate here
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://localhost:5432/icecreamsocial_db"
# app.config['SQLALCHEMY_ECHO'] = True

# Init db and migrate here

db.init_app(app)
migrate = Migrate(app, db)

# Leave resources
api.add_resource(Login, '/auth/login')
api.add_resource(Register, '/auth/register')
api.add_resource(Users, '/users')
api.add_resource(SingleUser, '/users/<int:id>')
api.add_resource(UserSuperDetail, '/super/users/<int:user_id>')
api.add_resource(RecipeSuperDetail, '/recipes/super')
api.add_resource(Recipes, '/recipes')
api.add_resource(RecipeDetail, '/recipes/<int:recipe_id>')
api.add_resource(SingleRecipeSuperDetail, '/recipes/super/<int:recipe_id>')
api.add_resource(RecipesByUser, '/recipes/users/<int:user_id>')
api.add_resource(Comments, '/comments')
api.add_resource(CommentsByUser, '/comments/users/<int:user_id>')
api.add_resource(CommentsOnRecipe, '/comments/recipes/<int:recipe_id>')
api.add_resource(CommentDetail, '/comments/<int:comment_id>')
api.add_resource(Reviews, '/reviews')
api.add_resource(ReviewDetail, '/reviews/<int:review_id>')


# if __name__ == '__main__':
#     app.run(debug=True)


# DEPLOYMENT CONFIG
if __name__ == '__main__':
    app.run()
