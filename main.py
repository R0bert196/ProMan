from flask import Flask, render_template, url_for, jsonify, request, redirect, session
from dotenv import load_dotenv
from datetime import timedelta
import os
from authlib.integrations.flask_client import OAuth


import mimetypes
import queires

mimetypes.add_type("application/javascript", ".js")
app = Flask(__name__)
load_dotenv()
app.secret_key = os.getenv("APP_SECRET_KEY")
app.config["SESSION_COOKIE_NAME"] = "google-login-session"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=5)


oauth = OAuth(app)
google = oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    access_token_url="https://accounts.google.com/o/oauth2/token",
    access_token_params=None,
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    authorize_params=None,
    api_base_url="https://www.googleapis.com/oauth2/v1/",
    userinfo_endpoint="https://openidconnect.googleapis.com/v1/userinfo",  # This is only needed if using openId to fetch user info
    client_kwargs={"scope": "openid email profile"},
)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    if session.get("profile"):
        print(queires.check_user_existence(session.get("profile")))
        if not queires.check_user_existence(session.get("profile")):
            queires.add_user(session.get("profile"))
    boards = queires.get_boards()
    return render_template("index.html", boards=boards)


@app.route("/api/boards")
def get_boards():
    """
    All the boards
    """
    return jsonify(queires.get_boards())


@app.route("/api/boards/<int:board_id>/cards/")
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return jsonify(queires.get_cards_for_board(board_id))


@app.route("/api/dragos")
def functii_test():
    queires.test_dragos()
    return redirect(url_for("index"))


@app.route("/api/create_board", methods=["POST"])
def create_board():
    req = request.get_json()
    # print(req)
    queires.create_board(req["boardTitle"])
    return jsonify({"created": True})


@app.route("/api/board/content", methods=["POST", "GET"])
def get_board_content():
    """
    All the statuses, every board will have the same statuses in the begining
    """
    board_id = request.get_json()["boardId"]
    return jsonify(queires.get_board_details(board_id))


@app.route("/api/status/content", methods=["POST", "GET"])
def get_status_content():
    """
    returns all the statuses in the db
    """
    return jsonify(queires.get_statuses())


@app.route("/api/update/card", methods=["POST"])
def update_card():
    card_id = request.get_json()
    print(str(card_id))
    queires.update_card(card_id["card"])
    return jsonify(True)


@app.route("/api/update/board-name", methods=["POST"])
def update_board_name():
    board = request.get_json()
    queires.update_board_name(board)
    return jsonify(True)


@app.route("/api/card/delete", methods=["POST"])
def delete_card():
    card_id = request.get_json()
    print(card_id)
    queires.delete_card(card_id)
    return jsonify(True)


@app.route("/api/update/status-name", methods=["POST"])
def update_status_name():
    status = request.get_json()
    print(str(status))
    queires.update_status_name(status)
    return jsonify(True)


@app.route("/api/update/card-name", methods=["POST"])
def update_card_name():
    card = request.get_json()
    queires.update_card_name(card)
    return jsonify(True)


@app.route("/api/insert-card", methods=["POST"])
def insert_card():
    card = request.get_json()
    first_available_column = queires.get_statuses()[0]["id"]
    card["board_id"]["first_column"] = first_available_column
    return jsonify(queires.create_card(card["board_id"]))


@app.route("/api/create-stat", methods=["POST"])
def create_stat():
    queires.create_stat()
    return jsonify(True)


@app.route("/api/delete-stat", methods=["POST"])
def delete_stat():
    sent_info = request.get_json()
    queires.delete_stat(sent_info["stat"])
    return jsonify(True)


@app.route("/api/delete-board", methods=["POST"])
def delete_board():
    sent_info = request.get_json()
    print("informatii primte :   ", sent_info)
    queires.delete_board(sent_info)
    return jsonify(True)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule(
            "/favicon.ico",
            redirect_to=url_for("static", filename="favicon/favicon.ico"),
        )


@app.route("/login")
def login():
    google = oauth.create_client("google")  # create the google oauth client
    redirect_uri = url_for("authorize", _external=True)
    return google.authorize_redirect(redirect_uri)


@app.route("/authorize")
def authorize():
    google = oauth.create_client("google")  # create the google oauth client
    token = (
        google.authorize_access_token()
    )  # Access token from google (needed to get user info)
    resp = google.get("userinfo")  # userinfo contains stuff u specificed in the scrope
    user_info = resp.json()
    user = oauth.google.userinfo()  # uses openid endpoint to fetch user info
    # Here you use the profile/user data that you got and query your database find/register the user
    # and set ur own data in the session not the profile from google
    session["profile"] = user_info
    session.permanent = True  # make the session permanant so it keeps existing after broweser gets closed
    return redirect(url_for("index"))


@app.route("/logout")
def logout():
    for key in list(session.keys()):
        session.pop(key)
    return redirect(url_for("index"))


if __name__ == "__main__":
    main()
