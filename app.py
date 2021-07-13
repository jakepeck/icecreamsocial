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
from resources.user import Users, SingleUser
from resources.recipe import Recipes, RecipeDetail, RecipeSuperDetail, RecipesByUser
from resources.comment import Comments, CommentDetail, CommentsByRecipe, CommentsByUser, CommentsOnRecipe

app = Flask(__name__)
CORS(app)
api = Api(app)


# Init db and migrate here
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://localhost:5432/icecreamsocial_db"
app.config['SQLALCHEMY_ECHO'] = True

# Init db and migrate here

db.init_app(app)
migrate = Migrate(app, db)

# Leave resources
# api.add_resource(story.Stories, '/stories')
# api.add_resource(story.StoryDetail, '/stories/<int:story_id>')
# api.add_resource(song.Songs, '/songs')
# api.add_resource(song.SongDetail, '/songs/<int:song_id>')
# api.add_resource(comment.Comments,'/comments')
api.add_resource(Login, '/auth/login')
api.add_resource(Register, '/auth/register')
api.add_resource(Users, '/users')
api.add_resource(SingleUser, '/users/<int:id>')
api.add_resource(RecipeSuperDetail, '/recipes/super')
api.add_resource(Recipes, '/recipes')
api.add_resource(RecipeDetail, '/recipes/<int:recipe_id>')
api.add_resource(RecipesByUser, '/recipes/users/<int:user_id>')
api.add_resource(CommentsByUser, '/comments/users/<int:user_id>')
api.add_resource(CommentsOnRecipe, '/comments/recipes/<int:recipe_id>')
api.add_resource(CommentDetail, '/comments/<int:comment_id>')
api.add_resource(Reviews, '/reviews')
api.add_resource(ReviewDetail, '/reviews/<int:review_id>')


if __name__ == '__main__':
    app.run(debug=True)
