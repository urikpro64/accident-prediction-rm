import os
from flask import Blueprint, jsonify, request
from ..controllers.predictController import getPredictionByVideo, getPredictionByStreaming
from ..services.predictService import changeModelPredict, checkTensorflowVersion, load_Model, predictImage, stopPredictStreaming

predictRoute = Blueprint('predict', __name__)

@predictRoute.route('/')
def checkPredictApi():
  response = {
    'message': 'Prediction Api is ready',
    'status': 200
  }
  return jsonify(response)

@predictRoute.route('/tensorflow')
def checkTensorflowVersion():
  response = {
    'version': checkTensorflowVersion(),
    'status': 200
  }
  return jsonify(response)

@predictRoute.route('/image', methods=['POST'])
async def predictImage():
  img_file = request.files['file']
  img_path = f'temp/{img_file.filename}'
  img_file.save(img_path)
  result = await predictImage(img_path)
  response = {
    'status': 200,
    'result': result
  }
  return jsonify(response)

@predictRoute.route('/video', methods=['POST'])
async def predictVideo():
  video_file = request.files['file']
  result = await getPredictionByVideo(video_file, onlyAccident=True)
  response = {
    'status': 200,
    'result': result
  }
  return jsonify(response)

# Placeholder route for future streaming implementation
@predictRoute.route('/streaming/', methods=['GET','POST'])
async def streamingPredict():
  url = request.json.get('url')
  camera_name = request.json.get('camera_name')
  getPredictionByStreaming(camera_name, url)
  response = {
    'message': 200
  }
  return jsonify(response)

@predictRoute.route('/stop/<path:camera_id>', methods=['GET'])
async def stopStreamingPredict(camera_id):
  stopPredictStreaming(camera_id)
  response = {
    'message': 200
  }
  return jsonify(response)
  
@predictRoute.route('/changemodel', methods=['POST'])
async def changeModel():
  model_file = request.files['file']
  isChange = changeModelPredict(model_file)
  response = {
    'status': 200,
    'result': [],
    'isChange': isChange
  }
  return jsonify(response)