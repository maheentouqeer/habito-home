from database import get_db_connection


class HabitModel:
    @staticmethod
    def get_all_for_user(user_id):
        db = get_db_connection()
        cur = db.cursor(dictionary=True)
        cur.execute("SELECT * FROM habits WHERE user_id=%s ORDER BY created_at DESC", (user_id,))
        rows = cur.fetchall()
        cur.close()
        db.close()
        return rows


    @staticmethod
    def create(user_id, habit_name, description, frequency):
        db = get_db_connection()
        cur = db.cursor()
        cur.execute("INSERT INTO habits (user_id, habit_name, description, frequency) VALUES (%s,%s,%s,%s)",
        (user_id, habit_name, description, frequency))
        db.commit()
        lid = cur.lastrowid
        cur.close()
        db.close()
        return lid


    @staticmethod
    def update(habit_id, habit_name, description, frequency):
        db = get_db_connection()
        cur = db.cursor()
        cur.execute("UPDATE habits SET habit_name=%s, description=%s, frequency=%s WHERE habit_id=%s",
        (habit_name, description, frequency, habit_id))
        db.commit()
        cur.close()
        db.close()


    @staticmethod
    def delete(habit_id):
        db = get_db_connection()
        cur = db.cursor()
        cur.execute("DELETE FROM habits WHERE habit_id=%s", (habit_id,))
        db.commit()
        cur.close()
        db.close()