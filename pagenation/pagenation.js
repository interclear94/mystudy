const boardList = document.querySelector('.boardList');
const _ol = document.querySelector('ol');
const totalPage = 105;
const viewListPage = 10;
const maxPageNum = 5;
const pageNum = Math.ceil(totalPage/viewListPage);
let pageActiveIdx = 0; 
let listIndex = 0;

// 버튼 리스트 생성 
function listCreate(){
  for(let i = totalPage; i >= 1; i--){
    const listCreate = document.createElement("li");
    listCreate.innerHTML =`제목 ${i}`;
    boardList.append(listCreate);
  }

  for(let i=1; i <=pageNum; i++){
    const numBtn = document.createElement('li');
    numBtn.innerHTML = `${i}`;
    numBtn.classList.add('numberBtn');
    _ol.append(numBtn);
  }
}

// init 페이지 생성
function init(index){
  // 리스트 깊은 배열 복사
  const list = document.querySelectorAll('.boardList > li');
  // NodeList 깊은 복사로 하면 배열의 형태로 들어온다
  // for(li of listArray){} 사용 가능
  // li는 변수 .boardList 안에 있는 모든 li를 의미한다
  const listArray = [...list];
  
  // start end : 페이지 
  // start : index(0) * viewListPage(5) = 0
  // end : start(0) + viewPage(5) = 5
  let start = index * viewListPage;
  let end = start + viewListPage;


  for(li of listArray){
    li.style.display = "none";
  }
  // slice(0, 5) 1~5 자르기 !!!! 주의 !!!!
  let newList = listArray.slice(start, end);
  for(nl of newList){
    nl.style.display = 'block';
  }
  
  const numList = document.querySelectorAll('ol > li');
  let numArray = Array.from(numList);
  // 배열.forEach((각각의 목록, 인덱스)=>{
  // 각각의 목록, 인덱스 주의
  // })
  numArray.forEach((item,index)=>{
    item.onclick=(e)=>{
      e.target.classList.add("active-num")
      e.target.classList.remove("numberBtn")

      // 클릭시 페이지 변하는 함수
      init(index)
    }
    item.classList.add('numberBtn');
    item.classList.remove('active-num');
  });
  // 번호 1번 체크 초기화
  numList[index].classList.add('active-num');
}

const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");

function displayPage(num){
  const numberBtn = document.querySelectorAll('ol > li');
  for(nb of numberBtn){
    nb.style.display = "none";
  }

  // 페이지 번호 버튼 생성..
  let totalPageCount = Math.ceil(pageNum / maxPageNum);
  
  let pageArr = [...numberBtn];
  let start = num * maxPageNum;
  let end = start + maxPageNum;

  
  let pageListArr = pageArr.slice(start, end);

  for(let item of pageListArr){
    item.style.display = "block";
  }


  // 인덱스 0번일 때 넥스트 버튼 생성 및 삭제
  if(pageActiveIdx == 0){
    nextBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
  }

  // 인덱스가 마지막일 때 이전 버튼 생성 및 삭제
  if(pageActiveIdx == totalPageCount - 1){
    prevBtn.style.display = "block";
  } else {
    prevBtn.style.display = "none";
  }

  // 페이지 중간에 있을 때 이전 이후 버튼 생성
  // 맨 마지막에 해주어야 한다...!
  if((pageActiveIdx !== 0) && (pageActiveIdx !== totalPageCount - 1)){
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
  }
}
listCreate();
init(0);
displayPage(0)

nextBtn.addEventListener(`click`, ()=>{
  let nextPageNum = pageActiveIdx*maxPageNum+maxPageNum
  init(nextPageNum);
  ++pageActiveIdx;
  displayPage(pageActiveIdx);
});

prevBtn.addEventListener(`click`, ()=>{
  let nextPageNum = pageActiveIdx*maxPageNum-maxPageNum
  init(nextPageNum);
  --pageActiveIdx;
  displayPage(pageActiveIdx);
});
