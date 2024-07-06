interface BoardInfo{
  title : string,
  content : string
}

class List {
  title : string;
  content : string;
  constructor(_title, _content){
    this.title = _title,
    this.content = _content
  }
}

class Board {
  board : string[];
  constructor(){
    this.board = []; 
  }

  getBoard(local){
    if(local === null){
      this.board
    }
  }
  setBoard(list:any){
    this.board.push(list)
    localStorage.setItem("boardArray", JSON.stringify(this.board));
    this.getBoard(JSON.parse("boardArray"));
  }

  save (){
    const submitFrm = document.querySelector("#boardFrm") as HTMLElement;
    const titleInput = document.querySelector("#titleInput") as HTMLInputElement;
    const contentInput = document.querySelector("#contentInput") as HTMLInputElement;
    
    submitFrm.onsubmit = (e: Event) => {
      e.preventDefault()
      boardArray.setBoard(new List(titleInput.value, contentInput.value))
    }
  }
  // getBoard(local){
  //   if(local === null){
  //     this.board
  //   }
}

const titleInput = document.querySelector("#titleInput") as HTMLInputElement;
const contentInput = document.querySelector("#contentInput") as HTMLInputElement;
    
const boardArray = new Board;

boardArray.save()