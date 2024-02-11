
from flask import Blueprint, jsonify

authRoute = Blueprint('auth',__name__)

@authRoute.route("/test")
def checkAuthApi() :
    response = {
        'message' : 'Authenticaton Api is ready',
        'status' : 200
    }
    return jsonify(response)

