from flask import Blueprint, request, jsonify
from models.habits_model import HabitModel
from models.habitlogs_model import HabitLogsModel
from routes.auth_routes import require_token

habits_bp = Blueprint("habits_bp", __name__)


@habits_bp.route("/habits", methods=["GET"])
@require_token
def get_habits():
    rows = HabitModel.get_all_for_user(request.user_id)
    return jsonify(rows)


@habits_bp.route("/add_habit", methods=["POST"])
@require_token
def add_habit():
    data = request.get_json() or {}
    lid = HabitModel.create(request.user_id, data.get("habit_name"), data.get("description"), data.get("frequency"))
    return jsonify({"message": "Habit created", "habit_id": lid}), 201


@habits_bp.route("/update_habit/<int:habit_id>", methods=["PUT"])
@require_token
def update_habit(habit_id):
    data = request.get_json() or {}
    HabitModel.update(habit_id, data.get("habit_name"), data.get("description"), data.get("frequency"))
    return jsonify({"message": "Habit updated"})


@habits_bp.route("/delete_habit/<int:habit_id>", methods=["DELETE"])
@require_token
def delete_habit(habit_id):
    HabitModel.delete(habit_id)
    return jsonify({"message": "Habit deleted"})


# Habit logs endpoints
@habits_bp.route("/habitlogs/<int:habit_id>", methods=["GET"])
@require_token
def get_habit_logs(habit_id):
    rows = HabitLogsModel.get_for_habit(habit_id)
    return jsonify(rows)


@habits_bp.route("/add_log", methods=["POST"])
@require_token
def add_log():
    data = request.get_json() or {}
    lid = HabitLogsModel.create(data.get("habit_id"), data.get("log_date"), data.get("status"))
    return jsonify({"message": "Log added", "log_id": lid}), 201


@habits_bp.route("/delete_log/<int:log_id>", methods=["DELETE"])
@require_token
def delete_log(log_id):
    HabitLogsModel.delete(log_id)
    return jsonify({"message": "Log deleted"})