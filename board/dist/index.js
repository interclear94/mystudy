class List {
    constructor(_title, _content) {
        this.title = _title,
            this.content = _content;
    }
}
class Board {
    constructor() {
        this.board = [];
    }
    setBoard(list) {
        this.board.push(list);
        localStorage.setItem("boardArray", JSON.stringify(this.board));
    }
    save() {
        const submitFrm = document.querySelector("#boardFrm");
        const titleInput = document.querySelector("#titleInput");
        const contentInput = document.querySelector("#contentInput");
        submitFrm.onsubmit = (e) => {
            e.preventDefault();
            boardArray.setBoard(new List(titleInput.value, contentInput.value));
        };
    }
}
const titleInput = document.querySelector("#titleInput");
const contentInput = document.querySelector("#contentInput");
const boardArray = new Board;
boardArray.save();
