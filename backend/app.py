from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = 'mental_health_secret_key_2024'
    app.config['JWT_SECRET_KEY'] = 'jwt_mental_health_secret_2024'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mental_health.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    from models.user import db
    db.init_app(app)

    CORS(app, supports_credentials=True, origins='*')
    JWTManager(app)

    with app.app_context():
        from routes.auth import auth_bp
        from routes.predict import predict_bp
        app.register_blueprint(auth_bp, url_prefix='/api/auth')
        app.register_blueprint(predict_bp, url_prefix='/api')
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
