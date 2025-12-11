from flask import Blueprint, jsonify, request
from models.users_model import UserModel
from routes.auth_routes import require_token

users_bp = Blueprint("users_bp", __name__)


@users_bp.route("/users", methods=["GET"])
@require_token
def list_users():
    # this returns only the current user details for now
    user = UserModel.get_by_id(request.user_id)
    return jsonify(user)


@users_bp.route("/users/<int:user_id>", methods=["GET"])
@require_token
def get_user(user_id):
    user = UserModel.get_by_id(user_id)
    return jsonify(user)