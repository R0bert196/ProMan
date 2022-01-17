export const htmlTemplates = {
    board: 1,
    card: 2
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}

// export function boardBuilder(board) {
//     return `<div class="board">
//                 <div class="board-header" data-board-id=${board.id}>${board.title}</div>
//                 <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
//             </div>`;
// }

export function boardBuilder(board) {
    return `
    <section class="board" data-board>
        <div class="board-header"><span class="board-title">${board.title}</span>
            <button class="board-add">Add Card</button>
            <button class="board-toggle" data-board-id="${board.id}"><i class="fas fa-chevron-down"></i></button>
        </div>

        <div class="board-columns">
            <div class="board-column">
                <div class="board-column-title">New</div>
                <div class="board-column-content">
                    
                </div>
            </div>
            <div class="board-column">
                <div class="board-column-title">In Progress</div>
                <div class="board-column-content">

                </div>
            </div>
            <div class="board-column">
                <div class="board-column-title">Testing</div>
                <div class="board-column-content">
                
                </div>
            </div>
            <div class="board-column">
                <div class="board-column-title">Done</div>
                <div class="board-column-content">
                    
                </div>
            </div>
        </div>
    </section>`;
            
}




function cardBuilder(card) {
    return `<div class="card">
                <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                <div class="card-title data-board-id="${card.board_id}" data-card-id=${card.id}">${card.title}</div>
            </div>`;
};

