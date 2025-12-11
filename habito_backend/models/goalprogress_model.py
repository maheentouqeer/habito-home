# ...existing code...
from database import get_db_connection


class GoalProgressModel:
    @staticmethod
    def get_for_goal(goal_id):
        db = get_db_connection()
        cur = db.cursor(dictionary=True)
        cur.execute(
            "SELECT * FROM goalprogress WHERE goal_id=%s ORDER BY progress_date DESC",
            (goal_id,),
        )
        rows = cur.fetchall()
        cur.close()
        db.close()
        return rows

    @staticmethod
    def create(goal_id, progress_date, progress_note, percentage_done):
        db = get_db_connection()
        cur = db.cursor()
        cur.execute(
            "INSERT INTO goalprogress (goal_id, progress_date, progress_note, percentage_done) VALUES (%s,%s,%s,%s)",
            (goal_id, progress_date, progress_note, percentage_done),
        )
        db.commit()
        lid = cur.lastrowid
        cur.close()
        db.close()
        return lid

    @staticmethod
    def update(progress_id, progress_note, percentage_done):
        db = get_db_connection()
        cur = db.cursor()
        cur.execute(
            "UPDATE goalprogress SET progress_note=%s, percentage_done=%s WHERE progress_id=%s",
            (progress_note, percentage_done, progress_id),
        )
        db.commit()
        cur.close()
        db.close()

    @staticmethod
    def delete(progress_id):
        db = get_db_connection()
        cur = db.cursor()
        cur.execute("DELETE FROM goalprogress WHERE progress_id=%s", (progress_id,))
        db.commit()
        cur.close()
        db.close()
# ...existing code...