const container = document.querySelector(".board-container");

export let dataHandler = {
  getBoards: async function () {
    const response = await apiGet("/api/boards");
    return response;
  },
  getStatuses: async function () {
    const request = await fetch(`api/status/content`);
    const response = await request.json();
    return response;
  },

  deleteBoard: async function (boardId) {
    let toSend = {
      board_id: boardId,
    };
    const request = await fetch(`/api/delete-board`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSend),
    });
    const response = await request.json();
    return response;
  },

  deleteStatuses: async function (stat) {
    let toSend = {
      stat,
    };
    const request = await fetch(`/api/delete-stat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSend),
    });
    const response = await request.json();
    return response;
  },
  getBoardContent: async function (boardId) {
    // the statuses are retrieved and then the callback function is called with the statuses
    let toSend = {
      boardId: boardId,
    };
    const request = await fetch(`api/board/content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSend),
    });
    const response = await request.json();
    return response;
  },
  getCardsByBoardId: async function (boardId) {
    const response = await apiGet(`/api/boards/${boardId}/cards/`);
    return response;
  },
  updateCard: async function (card) {
    let toSend = {
      card,
    };
    const request = await fetch("/api/update/card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toSend),
    });
    const response = await request.json();
    return response;
  },
  updateCardName: async function (cardName, cardId) {
    let toSend = {
      card_name: cardName,
      card_id: cardId,
    };
    const request = await fetch("/api/update/card-name", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toSend),
    });
    const response = await request.json();
    return response;
  },

  insertCard: async function (board_id) {
    let toSend = {
      board_id,
    };
    const request = await fetch("/api/insert-card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSend),
    });
    const response = await request.json();
    return response;
  },

  updateName: async function (text, boardId) {
    let toSend = {
      board_name: text,
      board_id: boardId,
    };
    const request = await fetch("/api/update/board-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSend),
    });
    const response = await request.json();
    return response;
  },

  updateStatusName: async function (text, boardId) {
    let toSend = {
      status_name: text,
      status_id: boardId,
    };
    const request = await fetch("/api/update/status-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSend),
    });
    const response = await request.json();
    return response;
  },
  deletecardFromDB: async function (cardId) {
    let toSend = {
      card_id: cardId,
    };
    const request = await fetch("/api/card/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSend),
    });
    const response = await request.json();
    return response;
  },

  createNewBoard: async function (boardTitle) {
    // creates new board, saves it and calls the callback function with its data
    container.innerHTML = "";
    let toSend = {
      boardTitle,
    };
    const request = await fetch("/api/create_board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSend),
    });
    const response = await request.json();
    return response;
  },

  createNewStatus: async function () {
    const request = await fetch("/api/create-stat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    return response;
  },
};

async function apiGet(url) {
  let response = await fetch(url, {
    method: "GET",
  });
  if (response.status === 200) {
    let data = response.json();
    return data;
  }
}
