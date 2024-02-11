from flask import Flask, jsonify
from flask_cors import CORS

from .routes import auth, predict

def create_app() :
    app = Flask(__name__)
    CORS(app)
    #Test Api is running
    @app.route('/')
    def checkApi():
        response = {
            'status':200
        }
        return jsonify(response)
    
    #Register blueprint
    app.register_blueprint(auth.authRoute, url_prefix='/auth')
    app.register_blueprint(predict.predictRoute, url_prefix='/predict')

    return app