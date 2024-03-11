import os
from uuid import uuid4
from werkzeug.datastructures import FileStorage 

MAIN_UPLOAD_PATH = os.getenv('MAIN_UPLOAD_PATH')
SUB_VIDEO_PATH = os.getenv('SUB_VIDEO_PATH')
SUB_IMAGE_PATH = os.getenv('SUB_IMAGE_PATH')

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

def makeDirForStreaming(camera_id:str):
    path = os.path.join(MAIN_UPLOAD_PATH, SUB_IMAGE_PATH,camera_id)
    makeDir(path)

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

