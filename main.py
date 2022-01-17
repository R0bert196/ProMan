from flask import Flask, render_template, url_for, jsonify, request,redirect
from dotenv import load_dotenv


from util import json_response
import mimetypes
import queires

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()

@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    boards=queires.get_boards()
    return render_template('index.html',boards=boards)


@app.route("/api/boards")
# @json_response
def get_boards():
    """
    All the boards
    """
    return jsonify(queires.get_boards())


@app.route("/api/boards/<int:board_id>/cards/")
# @json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return jsonify(queires.get_cards_for_board(board_id))

@app.route("/api/dragos")
def functii_test():
    queires.test_dragos()
    return redirect('/')


@app.route('/api/create_board', methods=['POST'])
def create_board():
    req = request.get_json()
    print(req)
    queires.create_board(req['boardTitle'])
    return jsonify({'created': True})


@app.route('/api/statuses')
def get_statuses():
    """
    All the statuses, every board will have the same statuses in the begining
    """
    return jsonify(queires.get_statuses())

def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
