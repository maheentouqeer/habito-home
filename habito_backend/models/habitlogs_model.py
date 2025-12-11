from database import get_db_connection


class HabitLogsModel:
    @staticmethod
    def get_for_habit(habit_id):
        db = get_db_connection()
        cur = db.cursor(dictionary=True)
        cur.execute("SELECT * FROM habitlogs WHERE habit_id=%s ORDER BY log_date DESC", (habit_id,))
        rows = cur.fetchall()
        cur.close()
        db.close()
        return rows


    @staticmethod
    def create(habit_id, log_date, status):
        db = get_db_connection()
        cur = db.cursor()
        cur.execute("INSERT INTO habitlogs (habit_id, log_date, status) VALUES (%s,%s,%s)",
        (habit_id, log_date, status))
        db.commit()
        lid = cur.lastrowid
        cur.close()
        db.close()
        return lid

    @staticmethod
    def delete(log_id):
        db = get_db_connection()
        ur = db.cursor()
        ur.execute("DELETE FROM habitlogs WHERE log_id=%s", (log_id,))
        db.commit()
        ur.close()
        db.close()