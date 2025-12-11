# ...existing code...
from database import get_db_connection

class GoalsModel:
    @staticmethod
    def get_for_user(user_id):
        db = get_db_connection()
        cur = db.cursor(dictionary=True)
        cur.execute("SELECT * FROM goals WHERE user_id=%s ORDER BY created_at DESC", (user_id,))
        rows = cur.fetchall()
        cur.close()
        db.close()
        return rows

    @staticmethod
    def create(user_id, title, description, target_date):
        db = get_db_connection()
        cur = db.cursor()
        cur.execute(
            "INSERT INTO goals (user_id, goal_title, goal_description, target_date) VALUES (%s,%s,%s,%s)",
            (user_id, title, description, target_date),
        )
        db.commit()
        lid = cur.lastrowid
        cur.close()
        db.close()
        return lid

    @staticmethod
    def update(goal_id, title, description, target_date):
        db = get_db_connection()
        cur = db.cursor()
        cur.execute(
            "UPDATE goals SET goal_title=%s, goal_description=%s, target_date=%s WHERE goal_id=%s",
            (title, description, target_date, goal_id),
        )
        db.commit()
        cur.close()
        db.close()

    @staticmethod
    def delete(goal_id):
        db = get_db_connection()
        cur = db.cursor()
        cur.execute("DELETE FROM goals WHERE goal_id=%s", (goal_id,))
        db.commit()
        cur.close()
        db.close()
# ...existing code...