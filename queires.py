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


def delete_card(card_id):
    return data_manager.execute_insert(
        """
        DELETE FROM cards WHERE id = %(card_id)s;

        """, card_id)


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
        ORDER BY id ASC
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
        ORDER BY id ASC
        """
    )

def update_card(card_details):
    
    old_details = data_manager.execute_select("""
    SELECT id,board_id as old_board,card_order as old_order,status_id as old_status FROM cards
    WHERE id=%(card_id)s
    """, card_details, False)
    # print()
    data_manager.execute_insert(
        """
        UPDATE cards
        SET card_order = card_order-1
        WHERE card_order > %(old_order)s AND board_id=%(old_board)s AND status_id = %(old_status)s;
        """, old_details)
    # fac loc pentru card in noua coloana crescand valoarea cardurilor cu ordine mai mare decat noua pozitie primita de la Robert 
    print('voi creste ordinea elementelor : ')
    print(str(data_manager.execute_select("""
    select * from cards
    WHERE card_order >= %(card_order)s AND board_id=%(board_id)s AND status_id=%(status_id)s
    """,card_details)
    ))
    print('---------')
    data_manager.execute_insert(
        """
        UPDATE cards
        SET card_order = card_order+1
        WHERE card_order >= %(card_order)s AND board_id=%(board_id)s AND status_id=%(status_id)s;
        """,card_details)
    
    # introduc cardul in baza de date pe noua pozitie
    
    data_manager.execute_insert(
        """
        UPDATE cards    
        SET board_id = %(board_id)s,
        card_order = %(card_order)s,
        status_id = %(status_id)s
        WHERE cards.id = %(card_id)s;
        """, card_details)
  
def update_board_name(board_details):
    data_manager.execute_insert(
        """
        UPDATE boards
        SET title = %(board_name)s
        WHERE id = %(board_id)s;
        """, board_details)

def update_status_name(status_details):
    data_manager.execute_insert(
        """
        UPDATE statuses
        SET title = %(status_name)s
        WHERE id = %(status_id)s;
        """, status_details)

def update_card_name(card_details):
    data_manager.execute_insert(
        """
        UPDATE cards
        SET title = %(card_name)s
        WHERE id = %(card_id)s;
        """, card_details)

def check_user_existence(user):
    return data_manager.execute_select(
        """
        SELECT * from users
        WHERE id = %(id)s
        """, user)

def add_user(user):
    data_manager.execute_insert(
        """
        INSERT INTO users (id,name)
        VALUES (%(id)s, %(name)s)
        """, user)

def create_card(card):
    data_manager.execute_insert(
        """
        UPDATE cards
        SET card_order = card_order+1
        WHERE board_id=%(board_id)s;
        """,card)
    data_manager.execute_insert(
        """
        INSERT INTO cards (board_id,status_id,title,card_order)
        VALUES (%(board_id)s,1,'New Card',1)
        """, card)
    return data_manager.execute_select(
        """
        SELECT id AS card_id,title as card_title,card_order,status_id,board_id from cards
        WHERE board_id= 1 AND status_id=1 AND card_order=1""", False)
