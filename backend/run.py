from src import create_app
from dotenv import load_dotenv
import os
load_dotenv()

app = create_app()

app.config['FLASK_ENV'] = os.getenv("FLASK_ENV")

if __name__ == '__main__':
    app.run(
        debug=False,
        port=5000,
        host="0.0.0.0",
        )