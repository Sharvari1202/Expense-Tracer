from flask import Flask, render_template, redirect, url_for, request, session, g
import sqlite3

app = Flask(__name__)
app.secret_key = "your_secret_key"
DATABASE = 'database.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db:
        db.close()

@app.route('/')
def home():
    if 'user' in session:
        return render_template("index.html", user=session['user'])
    return redirect(url_for("login"))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (request.form['username'], request.form['password']))
        user = cursor.fetchone()
        if user:
            session['user'] = user[1]
            return redirect(url_for("home"))
        return "Invalid credentials"
    return render_template("login.html")

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        db = get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (request.form['username'], request.form['password']))
        db.commit()
        return redirect(url_for("login"))
    return render_template("register.html")

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for("login"))

if __name__ == '__main__':
    app.run(debug=True)
# Run once
conn = sqlite3.connect("database.db")
cursor = conn.cursor()
cursor.execute('''CREATE TABLE expenses (id INTEGER PRIMARY KEY, user TEXT, title TEXT, amount REAL, date TEXT)''')
conn.commit()
conn.close()
