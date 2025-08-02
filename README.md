# Expense-Tracer
This is a full-stack personal finance tracking web app that allows users to securely register, log in, and manage their daily expenses. It uses Flask as the backend framework and SQLite as the database. The frontend is responsive and mobile-ready with PWA support.
#  Expense Tracker (Flask + SQLite + PWA)

A personal finance tracker web app built with Flask and SQLite, supporting user login, expense management, data visualization, and mobile-friendly Progressive Web App features.

---

##  Features

-  User Registration and Login (session-based)
-  Add, view, and delete daily expenses
-  Data stored securely in SQLite database
-  Real-time pie chart using Chart.js
-  Mobile-first responsive UI with optional dark mode
-  REST API for dynamic expense handling (AJAX)
-  Installable as a Progressive Web App (PWA)

---

##  Tech Stack

- **Backend:** Flask (Python), SQLite
- **Frontend:** HTML5, CSS3, JavaScript
- **Visualization:** Chart.js
- **Storage:** SQLite
- **PWA:** manifest.json + service worker

---

##  Setup Instructions

```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker

# Install Flask
pip install flask

# Create database
python database_setup.py

# Run the app
python app.py
