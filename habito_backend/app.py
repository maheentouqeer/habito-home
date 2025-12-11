# from flask import Flask, request, jsonify
# import mysql.connector
# from flask_cors import CORS
# import bcrypt


# print("LOADED FROM:", __file__)  

# app = Flask(__name__)
# CORS(app)

# def get_db_connection():
#     return mysql.connector.connect(
#         host="localhost",
#         user="root",
#         password="",
#         database="habito_db"
#     )

# @app.route("/")
# def home():
#     return "Habito Backend Running"

# # -----------------------------
# # GET ALL HABITS
# # -----------------------------
# @app.route("/habits", methods=["GET"])
# def get_habits():
#     db = get_db_connection()
#     cursor = db.cursor(dictionary=True)

#     cursor.execute("SELECT * FROM habits")   
#     habits = cursor.fetchall()

#     cursor.close()
#     db.close()

#     return jsonify(habits)

# # -----------------------------
# # ADD A HABIT
# # -----------------------------
# @app.route("/add_habit", methods=["POST"])
# def add_habit():
#     data = request.json

#     db = get_db_connection()
#     cursor = db.cursor()

#     sql = "INSERT INTO habits (user_id, habit_name, description, frequency) VALUES (%s, %s, %s, %s)"
#     values = (data["user_id"], data["habit_name"], data["description"], data["frequency"])

#     cursor.execute(sql, values)
#     db.commit()

#     cursor.close()
#     db.close()

#     return jsonify({"message": "Habit added successfully"})

# # -----------------------------
# # UPDATE HABIT
# # -----------------------------
# @app.route("/update_habit/<int:habit_id>", methods=["PUT"])
# def update_habit(habit_id):
#     data = request.json
#     db = get_db_connection()
#     cursor = db.cursor()

#     sql = "UPDATE habits SET habit_name=%s, description=%s, frequency=%s WHERE habit_id=%s"
#     values = (data["habit_name"], data["description"], data["frequency"], habit_id)

#     cursor.execute(sql, values)
#     db.commit()

#     cursor.close()
#     db.close()

#     return jsonify({"message": "Habit updated successfully"})


# # -----------------------------
# # DELETE HABIT
# # -----------------------------
# @app.route("/delete_habit/<int:habit_id>", methods=["DELETE"])
# def delete_habit(habit_id):
#     db = get_db_connection()
#     cursor = db.cursor()

#     cursor.execute("DELETE FROM habits WHERE habit_id=%s", (habit_id,))
#     db.commit()

#     cursor.close()
#     db.close()
#     return jsonify({"message": "Habit deleted"})


# # -----------------------------
# # GET ALL USERS
# # -----------------------------
# @app.route("/users", methods=["GET"])
# def get_users():
#     db = get_db_connection()
#     cursor = db.cursor(dictionary=True)

#     cursor.execute("SELECT * FROM users")
#     users = cursor.fetchall()

#     cursor.close()
#     db.close()

#     return jsonify(users)


# # -----------------------------
# # GET USER BY ID
# # -----------------------------
# @app.route("/users/<int:user_id>", methods=["GET"])
# def get_user(user_id):
#     db = get_db_connection()
#     cursor = db.cursor(dictionary=True)

#     cursor.execute("SELECT * FROM users WHERE user_id = %s", (user_id,))
#     user = cursor.fetchone()

#     cursor.close()
#     db.close()

#     return jsonify(user)


# # -----------------------------
# # ADD USER
# # -----------------------------
# @app.route("/add_user", methods=["POST"])
# def add_user():
#     data = request.json
#     db = get_db_connection()
#     cursor = db.cursor()

#     sql = "INSERT INTO users (name, email, password_hash) VALUES (%s, %s, %s)"
#     values = (data["name"], data["email"], data["password_hash"])

#     cursor.execute(sql, values)
#     db.commit()

#     cursor.close()
#     db.close()

#     return jsonify({"message": "User added successfully"})

# # GET HABIT LOGS
# @app.route("/habitlogs/<int:habit_id>", methods=["GET"])
# def get_logs(habit_id):
#     db = get_db_connection()
#     cursor = db.cursor(dictionary=True)

#     cursor.execute("SELECT * FROM habitlogs WHERE habit_id=%s", (habit_id,))
#     logs = cursor.fetchall()

#     cursor.close()
#     db.close()
#     return jsonify(logs)


# # ADD HABIT LOG
# @app.route("/add_log", methods=["POST"])
# def add_log():
#     data = request.json
#     db = get_db_connection()
#     cursor = db.cursor()

#     sql = "INSERT INTO habitlogs (habit_id, log_date, status) VALUES (%s, %s, %s)"
#     values = (data["habit_id"], data["log_date"], data["status"])

#     cursor.execute(sql, values)
#     db.commit()

#     cursor.close()
#     db.close()
#     return jsonify({"message": "Habit log added"})
# # GET ALL GOALS
# @app.route("/goals/<int:user_id>", methods=["GET"])
# def get_goals(user_id):
#     db = get_db_connection()
#     cursor = db.cursor(dictionary=True)

#     cursor.execute("SELECT * FROM goals WHERE user_id=%s", (user_id,))
#     goals = cursor.fetchall()

#     cursor.close()
#     db.close()
#     return jsonify(goals)


# # ADD GOAL
# @app.route("/add_goal", methods=["POST"])
# def add_goal():
#     data = request.json
#     db = get_db_connection()
#     cursor = db.cursor()

#     sql = """INSERT INTO goals (user_id, goal_title, goal_description, target_date)
#              VALUES (%s, %s, %s, %s)"""
#     values = (data["user_id"], data["goal_title"], data["goal_description"], data["target_date"])

#     cursor.execute(sql, values)
#     db.commit()

#     cursor.close()
#     db.close()
#     return jsonify({"message": "Goal added successfully"})


# # UPDATE GOAL
# @app.route("/update_goal/<int:goal_id>", methods=["PUT"])
# def update_goal(goal_id):
#     data = request.json
#     db = get_db_connection()
#     cursor = db.cursor()

#     sql = """
#         UPDATE goals 
#         SET goal_title = %s, goal_description = %s, target_date = %s
#         WHERE goal_id = %s
#     """

#     values = (
#         data["goal_title"],
#         data["goal_description"],
#         data["target_date"],
#         goal_id,
#     )

#     cursor.execute(sql, values)
#     db.commit()

#     cursor.close()
#     db.close()

#     return jsonify({"message": "Goal updated successfully"})
# # DELETE GOAL
# @app.route("/delete_goal/<int:goal_id>", methods=["DELETE"])
# def delete_goal(goal_id):
#     db = get_db_connection()
#     cursor = db.cursor()

#     sql = "DELETE FROM goals WHERE goal_id = %s"
#     cursor.execute(sql, (goal_id,))
#     db.commit()

#     cursor.close()
#     db.close()

#     return jsonify({"message": "Goal deleted successfully"})
# # GET ONE GOAL
# @app.route("/goal/<int:goal_id>", methods=["GET"])
# def get_goal(goal_id):
#     db = get_db_connection()
#     cursor = db.cursor(dictionary=True)

#     cursor.execute("SELECT * FROM goals WHERE goal_id=%s", (goal_id,))
#     goal = cursor.fetchone()

#     cursor.close()
#     db.close()

#     return jsonify(goal)


# # GET PROGRESS FOR GOAL
# @app.route("/goalprogress/<int:goal_id>", methods=["GET"])
# def get_progress(goal_id):
#     db = get_db_connection()
#     cursor = db.cursor(dictionary=True)

#     cursor.execute("SELECT * FROM goalprogress WHERE goal_id=%s", (goal_id,))
#     progress = cursor.fetchall()

#     cursor.close()
#     db.close()
#     return jsonify(progress)


# # ADD PROGRESS
# @app.route("/add_progress", methods=["POST"])
# def add_progress():
#     data = request.json
#     db = get_db_connection()
#     cursor = db.cursor()

#     sql = """INSERT INTO goalprogress (goal_id, progress_date, progress_note, percentage_done)
#              VALUES (%s, %s, %s, %s)"""
#     values = (data["goal_id"], data["progress_date"], data["progress_note"], data["percentage_done"])

#     cursor.execute(sql, values)
#     db.commit()

#     cursor.close()
#     db.close()
#     return jsonify({"message": "Progress added successfully"})
# # GET ALL BADGES
# @app.route("/badges", methods=["GET"])
# def get_badges():
#     db = get_db_connection()
#     cursor = db.cursor(dictionary=True)

#     cursor.execute("SELECT * FROM badges")
#     badges = cursor.fetchall()

#     cursor.close()
#     db.close()
#     return jsonify(badges)


# # ADD BADGE
# @app.route("/add_badge", methods=["POST"])
# def add_badge():
#     data = request.json
#     db = get_db_connection()
#     cursor = db.cursor()

#     sql = "INSERT INTO badges (badge_name, badge_description, requirement) VALUES (%s, %s, %s)"
#     values = (data["badge_name"], data["badge_description"], data["requirement"])

#     cursor.execute(sql, values)
#     db.commit()

#     cursor.close()
#     db.close()
#     return jsonify({"message": "Badge added"})
# # GET BADGES FOR USER
# @app.route("/userbadges/<int:user_id>", methods=["GET"])
# def get_user_badges(user_id):
#     db = get_db_connection()
#     cursor = db.cursor(dictionary=True)

#     cursor.execute("""
#         SELECT b.badge_name, b.badge_description, ub.date_awarded
#         FROM userbadges ub
#         JOIN badges b ON ub.badge_id = b.badge_id
#         WHERE ub.user_id=%s
#     """, (user_id,))
    
#     badges = cursor.fetchall()

#     cursor.close()
#     db.close()
#     return jsonify(badges)


# # ADD USER BADGE
# @app.route("/award_badge", methods=["POST"])
# def award_badge():
#     data = request.json
#     db = get_db_connection()
#     cursor = db.cursor()

#     sql = "INSERT INTO userbadges (user_id, badge_id) VALUES (%s, %s)"
#     values = (data["user_id"], data["badge_id"])

#     cursor.execute(sql, values)
#     db.commit()

#     cursor.close()
#     db.close()
#     return jsonify({"message": "Badge awarded"})

# @app.route("/signup", methods=["POST"])
# def signup():
#     data = request.json
#     name = data.get("name")
#     email = data.get("email")
#     password = data.get("password")

#     if not (name and email and password):
#         return jsonify({"error": "All fields are required"}), 400

#     db = get_db_connection()
#     cursor = db.cursor(dictionary=True)

#     # Check if email exists
#     cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
#     existing = cursor.fetchone()

#     if existing:
#         return jsonify({"error": "Email already registered"}), 400

#     # Hash password using bcrypt
#     hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

#     sql = "INSERT INTO users (name, email, password_hash) VALUES (%s, %s, %s)"
#     cursor.execute(sql, (name, email, hashed_pw))

#     db.commit()
#     cursor.close()
#     db.close()

#     return jsonify({"message": "Signup successful"}), 201
# @app.route("/login", methods=["POST"])
# def login():
#     data = request.json
#     email = data.get("email")
#     password = data.get("password")

#     if not (email and password):
#         return jsonify({"error": "Email and password required"}), 400

#     db = get_db_connection()
#     cursor = db.cursor(dictionary=True)

#     cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
#     user = cursor.fetchone()

#     cursor.close()
#     db.close()

#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     # bcrypt check
#     if not bcrypt.checkpw(password.encode("utf-8"), user["password_hash"].encode("utf-8")):
#         return jsonify({"error": "Incorrect password"}), 401

#     # Remove sensitive field
#     user.pop("password_hash")

#     return jsonify({
#         "message": "Login successful",
#         "user": user
#     })




# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask 
from flask_cors import CORS
from config import Config
from flask_bcrypt import Bcrypt

from routes.auth_routes import auth
from routes.habits_routes import habits_bp
from routes.goals_routes import goals_bp
from routes.badges_routes import badges_bp
from routes.users_routes import users_bp

app = Flask(__name__)
# CORS(app)
# Configure CORS to allow preflight and Authorization header
CORS(
    app,
    resources={r"/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True,
    }},
)

app.config.from_object(Config)

# initialize bcrypt
bcrypt = Bcrypt(app)

# register blueprints
app.register_blueprint(auth, url_prefix="")
app.register_blueprint(habits_bp, url_prefix="")
app.register_blueprint(goals_bp, url_prefix="")
app.register_blueprint(badges_bp, url_prefix="")
app.register_blueprint(users_bp, url_prefix="")

@app.route("/")
def home():
    return "Habito Backend (secure) is running"

if __name__ == "__main__":
    app.run(debug=True, port=Config.PORT)
