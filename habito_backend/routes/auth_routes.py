# ...existing code...
from flask import Blueprint, request, jsonify, current_app, make_response
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps

from models.users_model import UserModel

auth = Blueprint("auth", __name__)


@auth.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    if not data.get("name") or not data.get("email") or not data.get("password"):
        return jsonify({"error": "name, email and password required"}), 400

    if UserModel.get_by_email(data["email"]):
        return jsonify({"error": "Email already registered"}), 409

    hashed = generate_password_hash(data["password"])
    user_id = UserModel.create(data["name"], data["email"], hashed)
    return jsonify({"message": "User created", "user_id": user_id}), 201


@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "email and password required"}), 400

    user = UserModel.get_by_email(data["email"])
    if not user:
        return jsonify({"error": "User not found"}), 404

    if not check_password_hash(user.get("password_hash", ""), data["password"]):
        return jsonify({"error": "Invalid password"}), 401

    token = jwt.encode(
        {
            "user_id": user["user_id"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=8),
        },
        current_app.config.get("SECRET_KEY"),
        algorithm="HS256",
    )

    return jsonify(
        {
            "token": token,
            "user": {"user_id": user["user_id"], "name": user["name"], "email": user["email"]},
        }
    )


# def require_token(f):
#     @wraps(f)
#     def wrapper(*args, **kwargs):
#         auth_header = request.headers.get("Authorization")
#         if not auth_header:
#             return jsonify({"error": "Missing token"}), 401

#         parts = auth_header.split()
#         if len(parts) != 2 or parts[0].lower() != "bearer":
#             return jsonify({"error": "Invalid Authorization header"}), 401

#         token = parts[1]
#         try:
#             decoded = jwt.decode(token, current_app.config.get("SECRET_KEY"), algorithms=["HS256"])
#             request.user_id = decoded.get("user_id")
#         except jwt.ExpiredSignatureError:
#             return jsonify({"error": "Expired token"}), 401
#         except Exception as e:
#             return jsonify({"error": "Invalid or expired token", "detail": str(e)}), 401

#         return f(*args, **kwargs)

#     return wrapper
# ...existing code...

def require_token(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        # allow CORS preflight through
        if request.method == "OPTIONS":
            return make_response(("", 200))

        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify({"error": "Missing token"}), 401

        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != "bearer":
            return jsonify({"error": "Invalid Authorization header"}), 401

        token = parts[1]
        try:
            decoded = jwt.decode(token, current_app.config.get("SECRET_KEY"), algorithms=["HS256"])
            request.user_id = decoded.get("user_id")
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Expired token"}), 401
        except Exception as e:
            return jsonify({"error": "Invalid or expired token", "detail": str(e)}), 401
        
        return f(*args, **kwargs)

    return wrapper