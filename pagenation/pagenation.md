# 페이지네이션 알고리즘

1. 페이지마다 목록을 넣어주기
2. 페이지가 많으면 화살표가 나오게

> 필요한 변수들
> 1. 한 페이지 안에 몇개를 담을 것인가
> 2. 몇개의 리스트를 받을지? rows --> rows.length
> ㄴ NodeList 출력
> 3. 몇개의 페이지가 나오는가? Math.ceil(전체리스트 / 한페이지 안에 몇개를 담을 것인가)


## 1. 페이지네이션 생성

forEach사용 이유 : 이벤트
```js
  const rowsPerPage = 10; // ㄴ
  const rows = document.qeurySelectorAll("tbody tr");
  const rowsCount = rows.length;
  const pageCount = Math.ceil(rowsCount/rowsPerPage);
  const numbers = document.querySelector(`#numbers`);

  let pageActiveIdx = 0; // 현재 보고 있는 페이지그룹 번호
  let currentPageNum = 0; // 현재 보고 있는 페이지네이션 번호
  let maxPageNum = 3; // 페이지 그룹 최대 개수

  const prevPageBtgn = document.querySelector(`.pagination .fa-arrow-left`);
  const nextPageBtgn = document.querySelector(`.pagination .fa-arrow-right`);

  for(let i = 1; i <= pageCount; i++){
    numbers.innerHTML += `<li><a href="">${i}</a></li>`;
  }
  const numberBtn = numbers.querySelector(`a`);


  // 페이지네이션 번호 감추기
  for(nb of numberBtn){
    nb.style.display = "none";
  }


  numberBtn.forEach((item, idx) => {
    item.addEventListener("click", (e)=>{
      e.preventDefault();
    })

    // 테이블 함수

    // 인덱스추출
    console.log(idx);
    // NodeList 이기 떄문에 배열로 사용 불가능
    // nodelist, htmlcollectio -> array
    // Array.from(대상), [...대상]



    // 테이블 출력 함수
    displayRow(idx);
  })

  console.log();
  // 모든 내용을 안 보이게 하고
  function displayRow(idx){
    // idx 0
    // slice(0, 10);
    // idx 1
    // slice(10, 20)

    let start = idx*rowsPerPage;
    let end = start+rowsPerPage;
    // idx1 100개 목록 인덳흐 번호
    // slice(start, end)
    // slice(0,10) 0~9까지 자른다
    // splice 오려내기

    let rowsArray = [...rows];
    for(ra of rowsArray){
      ra.style.display = 'none';
    }

    let newRows = rowsArray.slice(start, end);
    for(nr of newRows){
      nr.style.display = '';
    }

    for(nb of numberBtn){
      nb.classList.remove(`active`)
    }
    numbers[idx].classList.add(`active`)
    //

  } // displayRow

  displayRow(0); // 1번째 
  const nextBtn = document.querySelector(".nextBtn");
  const prevBtn = document.querySelector(".prevBtn");
  // 페이지네이션 그룹 표시 함수
  function diosplayPage(num){
    // 페이지네이션 번호 감추기
    for(nb of numberBtn){
      nb.style.display = "none";
    }
    let totlaPageCount = Math.ceil(pageCount/maxPerPage);

    let pageArr = [..numberBtn];
    let start = num*maxPageNum;
    let end = start+maxPageNum;
    let pageListArr = pageArr.slice(start, end);

    for(let item of pageListArr){
      item.style.display = `block`;
    }
    if(pageActiveIdx == 0){
      prevBtn.style.display = "block";
    } else {
      prevBtn.style.display = "none";
    }

    if(pageActiveIdx == totalPageCount-1){
      nextBtn.style.display = "block";
    } else {
      nextBtn.style.display = "none";
    }
  }
  displaypage(0)

  
  nextPageBtn.addEventListener(`click`, ()=>{
    let nextPageNum = pageActiveIdx*maxPageNum+maxPageNum
    displayRow(nextPageNum);
    ++pageActiveIdx;
    displayPage(pageActiveIdx);
  });
  // 과정)
  // 123 - pageActiveIdx 0
  // displayrow(3)
  // 456 - pageActiveIdx 1
  // displayrow(6)
  // 789 - pageActiveIdx 2
  // displayrow(9)
  prevPageBtn.addEventListener(`click`, ()=>{
    let nexPageNum = pageActiveIdx*maxPageNum-maxPageNum
    displayRow(nexPageNum);
    --pageActiveIdx;
    displayPage(pageActiveIdx);
  });

```