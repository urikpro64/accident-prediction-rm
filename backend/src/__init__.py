import os
from flask import Flask, jsonify, send_from_directory
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
    
    @app.route('/images/<path:camera_id>/<path:filename>')
    def sendImage(camera_id, filename):
        path = os.path.join('../', os.getenv('MAIN_UPLOAD_PATH'), os.getenv('SUB_IMAGE_PATH'), camera_id)
        return send_from_directory(path, filename)
    
    #Register blueprint
    app.register_blueprint(auth.authRoute, url_prefix='/auth')
    app.register_blueprint(predict.predictRoute, url_prefix='/predict')

    return app