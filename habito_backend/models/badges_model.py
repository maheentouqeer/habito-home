# ...existing code...
from database import get_db_connection


class BadgesModel:
    @staticmethod
    def get_all():
        db = get_db_connection()
        cur = db.cursor(dictionary=True)
        cur.execute("SELECT * FROM badges ORDER BY badge_id DESC")
        rows = cur.fetchall()
        cur.close()
        db.close()
        return rows

    @staticmethod
    def create(name, description, requirement):
        db = get_db_connection()
        cur = db.cursor()
        cur.execute(
            "INSERT INTO badges (badge_name, badge_description, requirement) VALUES (%s,%s,%s)",
            (name, description, requirement),
        )
        db.commit()
        lid = cur.lastrowid
        cur.close()
        db.close()
        return lid
# ...existing code...