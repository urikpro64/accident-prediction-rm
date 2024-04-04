import os
from uuid import uuid4
from werkzeug.datastructures import FileStorage 
import mysql.connector

MAIN_UPLOAD_PATH = os.getenv('MAIN_UPLOAD_PATH')
SUB_VIDEO_PATH = os.getenv('SUB_VIDEO_PATH')
SUB_IMAGE_PATH = os.getenv('SUB_IMAGE_PATH')

mydb = mysql.connector.connect(
    host = os.getenv('DATABASE_URL'),
    user = os.getenv('DATABASE_USERNAME'),
    password = os.getenv('DATABASE_PASSWORD'),
    database = os.getenv('DATABASE_NAME')
)

def makeDir(path):
    try:
        if not os.path.exists(path):
            os.makedirs(path)
            print(f"Directory created successfully: {path}")
            return True
        else:
            print(f"Directory already exists: {path}")
            return True
    except OSError as e:
        print(f"Error creating directory: {e}")
        return False

def makeDirForStreaming():
    uuid = str(uuid4())
    path = os.path.join(MAIN_UPLOAD_PATH, SUB_IMAGE_PATH, uuid)
    makeDir(path)
    return uuid

def saveFile(file: FileStorage, file_name):
    upload_path = os.path.join(MAIN_UPLOAD_PATH, SUB_VIDEO_PATH)
    if not makeDir(upload_path):
        return False
    file_path = os.path.join(upload_path, file_name)
    file.save(file_path)
    # print(file_path)
    return file_path

def saveVideoForPredict(file: FileStorage):
    uuid = str(uuid4())
    file_type = file.filename.split('.')[1]
    file_name = f'{uuid}.{file_type}'
    upload_path = saveFile(file, file_name)
    return file_name

def saveDatabaseCamera(camera_id, camera_name, address):
    mycursor = mydb.cursor()
    sql_query = "INSERT INTO camera (cameraId, cameraName, address) VALUES (%s, %s, %s)"
    val = (camera_id, camera_name, address)
    mycursor.execute(sql_query, val)
    mydb.commit()
    return True

def removeDatabaseCamera(camera_id):
    mycursor = mydb.cursor()

    sql = "DELETE FROM camera WHERE cameraId = %s"
    val = (camera_id,)

    mycursor.execute(sql, val)
    mydb.commit()

    if mycursor.rowcount > 0:
        return True
    else:
        print("No row deleted from camera table (cameraId might not exist).")
        return False

def saveDatabasePrediction(predictionId, cameraId, imageURL, accident, nonaccident, timestamp, sec=None):
    mycursor = mydb.cursor()
    sql_query = "INSERT INTO prediction (predictionId, cameraId, imageURL, accident, nonaccident, sec, timestamp) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    val = (predictionId, cameraId, imageURL, accident, nonaccident, timestamp, sec)
    mycursor.execute(sql_query, val)
    mydb.commit()
    return True

def getAllCamera():
    mycursor = mydb.cursor()
    sql_query = "SELECT * FROM camera"
    mycursor.execute(sql_query)
    cameras = mycursor.fetchall()
    response = []
    for camera in cameras:
        response.append({
            "cameraName": camera[0],
            "description": camera[1],
            "address": camera[2],
            "location": camera[3],
            "cameraId": camera[4]
        })
    # print(response)
    return response