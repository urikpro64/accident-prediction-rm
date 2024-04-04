from flask import Blueprint, jsonify

from ..services.dataService import getAllCamera, saveDatabaseCamera


dataRoute = Blueprint('data', __name__)

@dataRoute.route('/')
def checkDataApi():
    response = {
    'message': 'Data Api is ready',
    'status': 200
    }
    return jsonify(response)

@dataRoute.route('/saveCamera')
def saveCamera():
    saveDatabaseCamera('camera_1',' camera_1', 'https://camerai1.iticfoundation.org/hls/kk02.m3u8')
    response = {
        'message': 'Data Api is ready',
        'status': 200
    }
    return jsonify(response)

@dataRoute.route('/getAllCamera')
def getListCamera():
    list = getAllCamera()
    response = {
        'result': list,
        'status': 200
    }
    return jsonify(response)