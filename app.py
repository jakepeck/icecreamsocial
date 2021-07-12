from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_migrate import Migrate
# only for flask migrate
# from models import story, song, comment
# # only for flask migrate
# from resources import story, song, comment
# from models.db import db



app = Flask(__name__)
CORS(app)
api = Api(app)

# Init db and migrate here
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://localhost:5432/icecreamsocial_db"
app.config['SQLALCHEMY_ECHO'] = True

# Init db and migrate here
# db.init_app(app)
# migrate = Migrate(app, db)

# Leave resources
# api.add_resource(story.Stories, '/stories')
# api.add_resource(story.StoryDetail, '/stories/<int:story_id>')
# api.add_resource(song.Songs, '/songs')
# api.add_resource(song.SongDetail, '/songs/<int:song_id>')
# api.add_resource(comment.Comments,'/comments')

if __name__ == '__main__':
    app.run(debug=True)
