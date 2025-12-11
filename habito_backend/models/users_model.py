from database import get_db_connection

class UserModel:
    @staticmethod
    def get_by_email(email):
        db = get_db_connection()
        cur = db.cursor(dictionary=True)
        cur.execute("SELECT * FROM users WHERE email=%s", (email,))
        user = cur.fetchone()
        cur.close()
        db.close()
        return user

    @staticmethod
    def get_by_id(user_id):
        db = get_db_connection()
        cur = db.cursor(dictionary=True)
        cur.execute("SELECT user_id, name, email, date_joined FROM users WHERE user_id=%s", (user_id,))
        user = cur.fetchone()
        cur.close()
        db.close()
        return user

    @staticmethod
    def create(name, email, password_hash):
        db = get_db_connection()
        cur = db.cursor()
        sql = "INSERT INTO users (name, email, password_hash) VALUES (%s, %s, %s)"
        cur.execute(sql, (name, email, password_hash))
        db.commit()
        inserted_id = cur.lastrowid
        cur.close()
        db.close()
        return inserted_id