from flask import Flask, render_template, jsonify

app = Flask(__name__)

# --- Mock User Data (can be replaced with a database) ---
USERS = {
    'user': {'password': '12345', 'role': 'user'},
    'admin': {'password': '12345', 'role': 'admin'}
}

@app.route('/')
def login_page():
    """Renders the login page."""
    return render_template('index.html')

@app.route('/user_dashboard')
def user_dashboard():
    """Renders the user dashboard page."""
    # In a real app, you would protect this route and pass user data
    return render_template('user_dashboard.html')

@app.route('/admin_dashboard')
def admin_dashboard():
    """Renders the admin dashboard page."""
    # In a real app, you would protect this route and pass admin data
    return render_template('admin_dashboard.html')

if __name__ == '__main__':
    app.run(debug=True)