export const htmlTemplates = {
    board: 1,
    card: 2,
    status: 3,
    
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        case htmlTemplates.status:
            return statusBuilder
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}


export function boardBuilder(board) {
    return `
    <section class="board" data-board>
        <div class="board-header" data-board-id='${board.id}'><span class="board-title" data-board-id='${board.id}' contentEditable="true">${board.title}</span>
            <button class="board-add hiddenAddCardButton" data-board-id="${board.id}">Add Card</button>
            <button class="board-delete" data-board-id="${board.id}">Delete Board</button>
            <button class="board-toggle hidden" data-board-id="${board.id}"><i class="fas fa-chevron-down"></i></button>
        </div>

        <div class="board-columns" data-board-id="${board.id}">
            
            
        </div>
    </section>`;
            
}




function cardBuilder(card) {
    return `<div class="card" data-card-order='${card.card_order}' data-board-id="${card.board_id}" data-card-id="${card.card_id}">
                <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                <div class="card-title data-card-order='${card.card_order}' data-board-id="${card.board_id}" data-card-id="${card.card_id}" contentEditable="true">${card.card_title}</div>
            </div>`;
};

const statusBuilder = status => {

    return `
    <div class="board-column" data-status-id='${status.id}'>
        <div class="board-column-title" contentEditable="true" data-status-id='${status.id}'>${status.title}</div>
        <div class="board-column-content" data-status-id='${status.id}'></div>
    </div>
    `
};

// const newForm = old_title => {
//     return `
//     <div class = "">
//     </di>
//     `
// } 

