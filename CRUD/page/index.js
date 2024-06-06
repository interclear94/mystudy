const state = [];
class Reply{
  constructor(content){
    this.id = "나는전설이다"
    this.content = content;
    this.update = false;
    this.now = new Date();  
  }

  getTime(division){
    const y = this.now.getFullYear();
    const m = this.now.getMonth()+1;
    const d = this.now.getDate();
  
    return[
      y,
      (m < 9 ? "0":"")+m,
      (d < 9 ? "0":"")+d
    ].join(division);
  }
}

const replyCount = () => {
  const countNum = document.querySelector("#count");
  countNum.innerHTML = state.length;
};

function addState(content){
  const instance = new Reply(content);
  state.push(instance);
  replyCount();
}

function commentReply(index){
  const item = state[index];
  const boardContent = document.querySelector(".board-content");
  const list = document.createElement("ul");
  const li = document.createElement("li");
  const commentId = document.createElement("span");
  const commentText = getContentBox(item.update, item.content);
  const commentDate = document.createElement("span");
  
  list.dataset.index = index;

  commentId.innerHTML = item.id;
  commentDate.innerHTML = new Reply().getTime("-");
  
  boardContent.append(list);
  list.append(li);

  li.append(commentId, commentText, commentDate);
}

const getContentBox = (flag, content) => !flag ? replyWrap(content) : replyUpdate(content); 

function draw(){
  const boardContent = document.querySelector(".board-content");
  boardContent.innerHTML ="";
  for(let i = state.length-1; i >= 0; i--){
    commentReply(i);
  }
}

const commentFrm = document.getElementById("commentFrm");
commentFrm.onsubmit = function(e){
  e.preventDefault();

  const { content } = e.target;
  const { value } =  content;

  addState(value);
  draw();
}

function replyWrap(content){
  const comment = document.createElement("span");
  // const editBtn = document.createElemnet("button");
  // const deleteBtn = document.createElemnet("button");
  comment.innerHTML = `
    ${content}<button onclick="edit()">수정</button><button onclick="deleteFn()">삭제</button>
  `;
  return comment;
}

function replyUpdate(content){
  const comment = document.createElement("span");
  const update = document.createElement("button");
  const updateInput = document.createElement("input");

  updateInput.onkeyup = function(e){
    if(e.keyCode !== 13) return;
    // try{
      const { index } = e.target.parentNode.parentNode.parentNode.dataset;
      const { value } = e.target;
      // console.log(index)
      state[index].content = value;
      state[index].update = !state[index].update;
      draw();     
    // } catch(e){
    //   alert(e.message);
    // }
  }
  comment.innerHTML = `
  ${content}<button onclick="edit()">수정</button><button onclick="deleteFn()">삭제</button>
`;
  return {update, updateInput}
}

function edit(){
  const { index } = event.target.parentElement.parentElement.parentElement.dataset;
  const span = event.target.parentElement;
  
  // ul.class
  // console.log(index)
  // const boardContent =  event.target.parentElement.parentElement.parentElement
  const content = span.innerHTML;
  state[index].update = !state[index].update;
  const { update, updateInput } = getContentBox(state[index].update, content);
  span.append(update, updateInput);
  
}

function deleteFn(){
  const { index } = event.target.parentNode.parentNode.parentNode.dataset;

  const flag = confirm("지우겠씁니까?");

  if(!flag) return;
  state.splice(index, 1);
  console.log( state);
  
  draw();
}