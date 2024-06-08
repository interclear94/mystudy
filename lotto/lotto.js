const lottoRandom = [];
const resultBox = [];

for(let i = 1; i <= 45; i++){
  lottoRandom.push(i)
}

const btn = document.querySelector("button");
const _ul = document.querySelector("ul")
btn.onclick = () => {
  for(let i = 1; i <= 6; i++){
    let randomNum = parseInt(Math.random() * 44) + 1
    let num = lottoRandom[randomNum]
    lottoRandom.splice(randomNum, 1);
    resultBox.push(num);

    const _li = document.createElement("li");
    _li.innerHTML = num;

    _ul.append(_li);
  }
  console.log(lottoRandom)
  console.log(resultBox)
}