# Accident Prediction Web Application

## Project Overview
This project, named "Accident Prediction Web Application", aims to utilize video and image processing techniques to predict potential accidents in real-time using live CCTV footage.

## Technology Stack
- Backend: Flask(3.0.0) on Python(3.11.7)
- Frontend: NextJs(14.0.4)
- Additional libraries:
    * tensorflow(2.15.0)
    * opencv-python(4.8.0.76)

## Key Features
- Uploads video files for non-realtime or offline analysis.
- Captures images from live streaming CCTV feeds.
- Processes captured images and videos using AI models to predict potential accidents.
- Displays prediction results and alerts on the user interface.

## Getting Started
- **Prerequisites:**
    - Python(3.11.7)
    - NodeJs(19.9.0) \*optional version

- **Installation:**
    1. Clone the repository
    ```bash
        git clone https://github.com/urikpro64/accident-prediction-rm.git
    ```
    2. Install dependencies
        - **Backend**
        
        ```bash
        cd backend
        pip install -r requirements.txt
        ```

        - **Frontend**
        
        ```bash
        cd frontend
        yarn install
        ```

    3. **Running Appliecation:**
        - **Backend**
        
        ```bash
        cd backend
        flask run
        ```

        - **Frontend**
        
        ```bash
        cd frontend
        yarn dev
        ```
## Additional Notes

- This project is for educational and research purposes only. It is not intended to be a replacement for professional safety measures or real-world accident detection systems.
- Please refer to the project documentation for more detailed information on:
  - Training and deploying the prediction models.
  - Specific configurations or dependencies.
  - Contributing to the project or reporting issues.