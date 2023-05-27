from flask import Flask, request, jsonify, render_template, redirect
import sqlite3

app = Flask(__name__, static_url_path='/static')


def create_table():
    conn = sqlite3.connect('patients.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS patients
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT NOT NULL,
                  phone TEXT NOT NULL,
                  gender TEXT NOT NULL,
                  cast TEXT NOT NULL,
                  dob TEXT NOT NULL,
                  marital_status TEXT NOT NULL,
                  address TEXT NOT NULL,
                  insurance TEXT NOT NULL,
                  past_medical_history TEXT)''')
    conn.commit()
    conn.close()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/data')
def data():
    conn = sqlite3.connect('patients.db')
    c = conn.cursor()
    c.execute("SELECT * FROM patients")
    patients = c.fetchall()
    conn.close()
    return render_template('display_data.html', patients=patients)


@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    phone = request.form['phone']
    gender = request.form['gender']
    cast = request.form['cast']
    dob = request.form['dob']
    marital_status = request.form['marital_status']
    address = request.form['address']
    insurance = request.form['insurance']
    past_medical_history = request.form['past_medical_history']

    conn = sqlite3.connect('patients.db')
    c = conn.cursor()
    c.execute('''INSERT INTO patients (name, phone, gender, cast, dob, marital_status, address, insurance, past_medical_history)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''',
              (name, phone, gender, cast, dob, marital_status, address, insurance, past_medical_history))
    conn.commit()
    conn.close()

    return redirect('/data')


if __name__ == '__main__':
    create_table()
    app.run(debug=False, port=8000, host='0.0.0.0')
