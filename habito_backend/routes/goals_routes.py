from flask import Blueprint, request, jsonify
from models.goals_model import GoalsModel
from models.goalprogress_model import GoalProgressModel
from routes.auth_routes import require_token

goals_bp = Blueprint("goals_bp", __name__)
@goals_bp.route("/goals/<int:user_id>", methods=["GET"])
@require_token
def get_goals(user_id):
    rows = GoalsModel.get_for_user(user_id)
    return jsonify(rows)


@goals_bp.route("/add_goal", methods=["POST"])
@require_token
def add_goal():
    data = request.get_json() or {}
    lid = GoalsModel.create(request.user_id, data.get("goal_title"), data.get("goal_description"), data.get("target_date"))
    return jsonify({"message": "Goal added", "goal_id": lid}), 201


@goals_bp.route("/update_goal/<int:goal_id>", methods=["PUT"])
@require_token
def update_goal(goal_id):
    data = request.get_json() or {}
    GoalsModel.update(goal_id, data.get("goal_title"), data.get("goal_description"), data.get("target_date"))
    return jsonify({"message": "Goal updated"})


@goals_bp.route("/delete_goal/<int:goal_id>", methods=["DELETE"])
@require_token
def delete_goal(goal_id):
    GoalsModel.delete(goal_id)
    return jsonify({"message": "Goal deleted"})


# Goal progress
@goals_bp.route("/goalprogress/<int:goal_id>", methods=["GET"])
@require_token
def get_goal_progress(goal_id):
    rows = GoalProgressModel.get_for_goal(goal_id)
    return jsonify(rows)


@goals_bp.route("/add_progress", methods=["POST"])
@require_token
def add_progress():
    data = request.get_json() or {}
    lid = GoalProgressModel.create(data.get("goal_id"), data.get("progress_date"), data.get("progress_note"), data.get("percentage_done"))
    return jsonify({"message": "Progress added", "progress_id": lid}), 201


@goals_bp.route("/update_progress/<int:progress_id>", methods=["PUT"])
@require_token
def update_progress(progress_id):
    data = request.get_json() or {}
    GoalProgressModel.update(progress_id, data.get("progress_note"), data.get("percentage_done"))
    return jsonify({"message": "Progress updated"})


@goals_bp.route("/delete_progress/<int:progress_id>", methods=["DELETE"])
@require_token
def delete_progress(progress_id):
    GoalProgressModel.delete(progress_id)
    return jsonify({"message": "Progress deleted"})