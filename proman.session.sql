SELECT * FROM cards;
-- SELECT * FROM statuses;

update  cards
set board_id = 1,
card_order = 2
status_id = 1
where cards.id = 7;
-- SELECT * FROM cards;

-- SELECT cards.title as card_title, cards.card_order as card_order, statuses.title as status_title, statuses.id as status_id, boards.title as board_title
-- FROM cards INNER JOIN boards
-- ON cards.board_id=boards.id
-- INNER JOIN statuses
-- ON cards.status_id=statuses.id
-- WHERE boards.id = 2
-- ORDER BY boards.title ASC, statuses.id ASC, cards.card_order ASC
