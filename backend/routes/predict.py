from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.predictor import predict_disorders
import json

predict_bp = Blueprint('predict', __name__)

@predict_bp.route('/predict', methods=['POST'])
@jwt_required()
def predict():
    from models.user import db, PredictionHistory
    user_id = get_jwt_identity()
    data = request.get_json()
    answers = data.get('answers', {})

    if not answers:
        return jsonify({'error': 'No answers provided'}), 400

    result = predict_disorders(answers)

    history = PredictionHistory(
        user_id=int(user_id),
        answers=json.dumps(answers),
        result=json.dumps(result)
    )
    db.session.add(history)
    db.session.commit()

    return jsonify(result), 200

@predict_bp.route('/history', methods=['GET'])
@jwt_required()
def history():
    from models.user import PredictionHistory
    user_id = get_jwt_identity()
    records = PredictionHistory.query.filter_by(user_id=int(user_id))\
        .order_by(PredictionHistory.created_at.desc()).limit(10).all()
    return jsonify([
        {
            'id': r.id,
            'created_at': r.created_at.isoformat(),
            'result': json.loads(r.result)
        } for r in records
    ]), 200