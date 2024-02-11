from src import create_app

app = create_app()

app.config['FLASK_ENV'] = 'production'

if __name__ == '__main__':
    app.run(
        debug=False,
        port=5000,
        host="0.0.0.0",
        )