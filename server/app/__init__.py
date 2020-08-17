import os
import logging
import firebase_admin
import firebase_admin.auth

from flask import Flask, request, jsonify
from flask_cors import CORS

def create_app(test_config=None):
    """Creates and configures the app.
    """

    print(os.environ.get("GOOGLE_APPLICATION_CREDENTIALS"))
    print(__name__)

    firebase = firebase_admin.initialize_app()

    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY="dev"
    )
    CORS(app)

    if test_config is None:
        app.config.from_pyfile("config.py", silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError as e:
        logging.warning(
            f"Did not create app.instance_path=`{app.instance_path}`"
            )
        logging.warning(e)
    
    @app.route("/")
    def home():
        return "Job service."

    @app.route("/add", methods=["POST"])
    def add_job():
        try:
            name = request.form['name']
            bid = request.form['bid']
            token = request.form['token']
        except Exception as e:
            logging.error(e)
            return jsonify({
                "message": "Form not complete."
            }), 400

        try:
            token_info = firebase_admin.auth.verify_id_token(token, check_revoked=True)
        except Exception as e:
            logging.error(e)
            return jsonify({
                "message": "Bad token."
            }), 400
        
        return jsonify({
            "message": "Job added."
        }), 201
    
    @app.route("/list", methods=["GET"])
    def list_jobs():
        return jsonify({
            jobs: []
        }), 200

    return app


