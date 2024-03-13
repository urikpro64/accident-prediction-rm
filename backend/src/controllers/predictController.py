import asyncio
from werkzeug.datastructures import FileStorage 
from src.services.dataService import makeDirForStreaming, saveVideoForPredict
from src.services.predictService import checkTensorflowVersion, load_Model, predictImage, predictVideo, predictStreaming

def getTensorflowVersion():
    return checkTensorflowVersion()

def getLoadedModel():
    response = load_Model()
    return response

def getPredictionByImg(img_path):
    response = predictImage(img_path)
    return response

async def getPredictionByVideo(video_file:FileStorage, onlyAccident= True):
    file_name = saveVideoForPredict(video_file)
    response = await predictVideo(file_name, onlyAccident)
    return response

def getPredictionByStreaming(url):
    camera_id = makeDirForStreaming()
    predictStreaming(camera_id, url)