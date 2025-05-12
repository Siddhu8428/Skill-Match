# # === Flask Backend: app.py (updated to support zip upload + SQLite DB) ===
import os
import zipfile
import sqlite3
from flask import Flask, request, render_template, redirect, url_for, flash
from werkzeug.utils import secure_filename
from flask import send_from_directory

UPLOAD_FOLDER = 'resumes_unzipped'
ALLOWED_EXTENSIONS = {'zip'}

app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/download/<filename>')
def download_file(filename):
    return send_from_directory('resumes_unzipped', filename, as_attachment=True)

# Initialize SQLite database
def init_db():
    conn = sqlite3.connect('skillmatch.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS resumes
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  filename TEXT,
                  job_description TEXT,
                  similarity_score REAL)''')
    conn.commit()
    conn.close()

init_db()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/upload', methods=['GET', 'POST'])
def upload_zip():
    if request.method == 'POST':
        job_desc = request.form['job_description']
        file = request.files['zipfile']

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            zip_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
            file.save(zip_path)

            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(app.config['UPLOAD_FOLDER'])

            os.remove(zip_path)  # Clean up zip file

            # Simulate resume processing & storing dummy similarity score
            for fname in os.listdir(app.config['UPLOAD_FOLDER']):
                if fname.endswith('.pdf') or fname.endswith('.docx'):
                    conn = sqlite3.connect('skillmatch.db')
                    c = conn.cursor()
                    c.execute("INSERT INTO resumes (filename, job_description, similarity_score) VALUES (?, ?, ?)",
                              (fname, job_desc, round(0.6 + 0.4 * (hash(fname) % 100) / 100, 2)))
                    conn.commit()
                    conn.close()

            flash("Zip uploaded and resumes processed.")
            return redirect(url_for('results'))
        else:
            flash("Invalid file format. Please upload a .zip file.")
    return render_template('upload.html')

@app.route('/results')
def results():
    conn = sqlite3.connect('skillmatch.db')
    c = conn.cursor()
    c.execute("SELECT filename, job_description, (similarity_score)*100 FROM resumes ORDER BY similarity_score DESC")
    data = c.fetchall()
    conn.close()
    return render_template('results.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)
