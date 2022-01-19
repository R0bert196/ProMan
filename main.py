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
    # print(req)
    queires.create_board(req['boardTitle'])
    return jsonify({'created': True})


@app.route('/api/board/content',methods=['POST','GET'])
def get_board_content():
    """
    All the statuses, every board will have the same statuses in the begining
    """
    board_id= request.get_json()['boardId']
    return jsonify(queires.get_board_details(board_id))

@app.route('/api/status/content',methods=['POST','GET'])
def get_status_content():
    """
    returns all the statuses in the db
    """
    return jsonify(queires.get_statuses())

@app.route('/api/update/card',methods=['POST'])
def update_card():
    card_id=request.get_json()
    queires.update_card(card_id['card'])
    return jsonify(True)

@app.route('/api/update/board-name',methods=['POST'])
def update_board_name():
    board=request.get_json()
    queires.update_board_name(board)
    return jsonify(True)

@app.route('/api/update/status-name',methods=['POST'])
def update_status_name():
    status=request.get_json()
    print(str(status))
    queires.update_status_name(status)
    return jsonify(True)

@app.route('/api/update/card-name',methods=['POST'])
def update_card_name():
    card=request.get_json()
    print(str(card))
    # queires.update_card_name(card)
    return jsonify(True)

def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
