import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """
    
    # remove this code once you implement the database
    # return [{"title": "board1", "id": 1}, {"title": "board2", "id": 2}]

    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )

def get_statuses():
    """
    Gather every statuses column in the table of statuses
    """
    statuses = data_manager.execute_select(
        """
        SELECT * FROM statuses;
        """)
    return statuses



def create_board(title):
    print(title)
    new_id = data_manager.execute_select("SELECT count(id) as counter from boards")[0]['counter'] + 1
    data_manager.execute_insert(
        """
        INSERT INTO boards (id, title) 
        VALUES (%(id)s,%(title)s)
        """
        ,{"id": new_id,"title":title}
        )
    


def get_cards_for_board(board_id):
    # remove this code once you implement the database
    return [{"title": "title1", "id": 1}, {"title": "board2", "id": 2}]

    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


# def create_board(title):
#     return data_manager.execute_select(
#         """
#         INSERT INTO boards VALUES(
#             39
#         )
#         ;
#         """
#     )


def get_board_details(board_id):
    return data_manager.execute_select(
    """
    SELECT statuses.id as status_id, statuses.title as status_title, cards.card_order as card_order, cards.title as card_title,cards.id as card_id,boards.id as board_id
    FROM cards INNER JOIN boards
    ON cards.board_id=boards.id
    INNER JOIN statuses
    ON cards.status_id=statuses.id
    WHERE boards.id = %(board_id)s
    ORDER BY boards.title ASC, statuses.id ASC, cards.card_order ASC


    """,
    variables={'board_id': board_id}
    )

def get_statuses():
    return data_manager.execute_select(
        """
        SELECT * FROM statuses
        """
    )

def update_card(card_details):
    
    data_manager.execute_insert(
        """
        UPDATE cards
        SET card_order = card_order+1
        WHERE card_order >= %(card_order)s AND board_id=%(board_id)s;
        """,card_details)

    data_manager.execute_insert(
        """
        UPDATE cards
        SET board_id = %(board_id)s,
        card_order = %(card_order)s,
        status_id = %(status_id)s
        WHERE cards.id = %(card_id)s;
        """, card_details)
    return True