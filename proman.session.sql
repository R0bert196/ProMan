-- SELECT * FROM cards where id = 13;
-- SELECT * FROM statuses;

-- delete from boards where id>3
-- SELECT board_id as old_board,card_order as old_order FROM cards
-- where id=1

-- update  cards
-- set board_id = 1,
-- card_order = 2
-- status_id = 1
-- where cards.id = 7;
-- SELECT * FROM cards;

-- SELECT cards.title as card_title, cards.card_order as card_order, statuses.title as status_title, statuses.id as status_id, boards.title as board_title
-- FROM cards INNER JOIN boards
-- ON cards.board_id=boards.id
-- INNER JOIN statuses
-- ON cards.status_id=statuses.id
-- WHERE boards.id = 2
-- ORDER BY boards.title ASC, statuses.id ASC, cards.card_order ASC


-- DROP TABLE users;
-- CREATE TABLE users (
--     id VARCHAR(50) PRIMARY key not NULL,
--     name VARCHAR(256) NOT NULL
-- )

SELECT * FROM cards
