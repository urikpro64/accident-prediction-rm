import numpy as np
import os
import cv2
import tensorflow as tf
import keras
from keras import layers
from keras.models import model_from_json, load_model
from keras.preprocessing import image

batch_size = 100
img_height = 250
img_width = 250

def checkTensorflowVersion():
    print('version')
    return tf.__version__

def load_Model():
    loaded_model = keras.models.load_model('model/model')
    return loaded_model

loaded_model = load_Model()

def captureImagePerSec(video_path:str, output_path:str):
    cap = cv2.VideoCapture(video_path)
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    frame_count = 0
    success = True
    while success:
        success, frame = cap.read()

        if frame_count % fps == 0:
            image_path = os.path.join(output_path, f"frame_{frame_count // fps}.jpg")
            cv2.imwrite(image_path, frame)
            
        frame_count += 1

    cap.release()
    return True

def predictImage(img_path):
    img = image.load_img(img_path, target_size=(img_height, img_width))
    img_array = image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    predict_result = loaded_model.predict(img_array)
    percentage = {
        'image': img_path,
        'accident': f'{predict_result[0][0]*100:.2f}',
        'nonaccident': f'{predict_result[0][1]*100:.2f}'
    }
    
    return percentage

def predictVideo(video_path):
    output_path = 'temp'
    captureImagePerSec(video_path, output_path)
    result = []
    
    for filename in os.listdir(output_path):
        if filename.endswith('.jpg') :
            img_path = output_path + f'/{filename}'
            predict_result = predictImage(img_path)
            result.append(predict_result)
    
    return result

def getOnlyAccidentPrediction(video_path):
    result = []
    predict_results = predictVideo(video_path)
    for predict_result in predict_results:
        if(float(predict_result['accident']) >= 50):
            result.append(predict_result)
            
    return result

