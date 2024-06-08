interface BoardInfo{
  title : string,
  content : string,
  boardArray : string[]
}

class List implements BoardInfo{
  title : string;
  content : string;
  boardArray : string[]
  constructor(){}
}