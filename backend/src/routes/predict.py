import os
from flask import Blueprint, jsonify, request
from src.controllers.predictController import getLoadedModel, getPredictionByImg, getPredictionByVideo, getOnlyAccidentPrediction, getTensorflowVersion
predictRoute = Blueprint('predict',__name__)

@predictRoute.route('/')
def checkPredictApi() :
    response = {
        'message' : 'Prediction Api is ready',
        'status' : 200
    }
    return jsonify(response)

@predictRoute.route('/tensorflow')
def checkTensorflowVersion():
    response = {
        'version' : getTensorflowVersion(),
        'status' : 200
    }
    return jsonify(response)

@predictRoute.route('/image', methods=['POST'])
def predictImage():
    img_file = request.files['file']
    img_file.save('temp/'+img_file.filename)
    result = getPredictionByImg('temp/'+img_file.filename)
    response = {
        'status': 200,
        'result' : result
    }
    return jsonify(response)

@predictRoute.route('/video', methods=['POST'])
def predictVideo():
    video_file = request.files['file']
    video_file.save('targetVideo/'+video_file.filename)
    result = getPredictionByVideo('targetVideo/'+video_file.filename)
    response = {
        'status': 200,
        'result' : result
    }
    return jsonify(response)