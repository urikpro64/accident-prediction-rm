from src.services.predictService import checkTensorflowVersion, getOnlyAccidentPrediction, load_Model, predictImage, predictVideo


def getTensorflowVersion():
    return checkTensorflowVersion()

def getLoadedModel():
    response = load_Model()
    return response

def getPredictionByImg(img_path):
    response = predictImage(img_path)
    return response

def getPredictionByVideo(video_path):
    response = predictVideo(video_path)
    return response

def getOnlyAccident(video_path):
    response = getOnlyAccidentPrediction(video_path)
    return response