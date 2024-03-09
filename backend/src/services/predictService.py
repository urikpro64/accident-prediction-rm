import base64
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
    loaded_model = keras.models.load_model('model/best_model.h5')
    return loaded_model

loaded_model = load_Model()

def process_image_for_frontend(image_path):
    image = cv2.imread(image_path)
    # Resize the image
    
    resized_image = cv2.resize(image, (img_width, img_height))

    # Optionally redact sensitive regions
    # ... (code to redact specific areas)

    # Convert to base64 (optional)
    retval, buffer = cv2.imencode('.jpg', resized_image)
    image_base64 = base64.b64encode(buffer).decode('utf-8')

    return image_base64  # Or return the resized image

def captureImagePerSec(video_path:str, output_path:str):
    print(video_path)
    cap = cv2.VideoCapture(video_path)
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    frame_count = 0
    success = True
    imagelist = []
    while success:
        success, frame = cap.read()

        if frame_count % fps == 0:
            filename = f"frame_{frame_count // fps}.jpg"
            image_path = os.path.join(output_path, filename)
            image_process = process_image_for_frontend(output_path + f'/{filename}')
            image = {
                "imageBase64": image_process,
                "image": output_path + f'/{filename}',
                "sec": frame_count // fps
            }
            imagelist.append(image)
            cv2.imwrite(image_path, frame)
            
        frame_count += 1

    cap.release()
    print(imagelist)
    return imagelist

def predictImage(img_path):
    img = image.load_img(img_path, target_size=(img_height, img_width))
    img_array = image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    predict_result = loaded_model.predict(img_array)
    percentage = {
        'accident': f'{predict_result[0][0]*100:.2f}',
        'nonaccident': f'{predict_result[0][1]*100:.2f}'
    }
    
    return percentage

def predictVideo(video_path):
    output_path = 'temp'
    imagelist = captureImagePerSec(video_path, output_path)
    result = []
    for image in imagelist:
        print(image['image'])
        img_path = image['image']
        predict_result = predictImage(img_path)
        result.append({**predict_result,**image})
    
    return result

def getOnlyAccidentPrediction(video_path):
    result = []
    predict_results = predictVideo(video_path)
    for predict_result in predict_results:
        if(float(predict_result['accident']) >= 50):
            result.append(predict_result)
            
    return result
