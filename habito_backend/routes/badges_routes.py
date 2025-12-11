from flask import Blueprint, request, jsonify
from models.badges_model import BadgesModel
from routes.auth_routes import require_token

badges_bp = Blueprint("badges_bp", __name__)


@badges_bp.route("/badges", methods=["GET"])
def list_badges():
    rows = BadgesModel.get_all()
    return jsonify(rows)


@badges_bp.route("/add_badge", methods=["POST"])
@require_token
def add_badge():
    data = request.get_json() or {}
    lid = BadgesModel.create(data.get("badge_name"), data.get("badge_description"), data.get("requirement"))
    return jsonify({"message": "Badge added", "badge_id": lid}), 201