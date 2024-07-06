const express = require("express");
const multer = require("multer");
const app = express();

// 사용자가 업로드한 이름 그대로 저장하게 ㅗ디면, 여러 사용자가 이름이 중복되는 파일을 업로드 했을 경우
// 덮어쓰기가 되어 기존 파일이 유실될 수 있다는 이유로 추측된다
// 그래서 보통 중복되기 어려운 임의의 값 등을 파일명에 추가하여 저장하고, 데이터베이스에 그 경로를 저장하는 방식이 사용
// 중복되기 매우 어려운 고유의 값을 만들어주는 uuid4 모듈
const uuid4 = require("uuid4");

const upload = multer({
  // storage는 이미지파일을 어디다 저장할 것인가에 대한 옵션
  storage : multer.diskStorage({
    filename(req, file, done){
      // req : express의 Request 객체, file : 우리가 업로드한 파일에 대한 정보
      // done 미들웨어에서 사용하는 next()와 비슷함 1 인자 : 오류 , 2인자 파일이름
      const randomID = uuid4();
      const ext = path.extname(file.originalname);
      const filename = randomID + ext;
      console.log(file);
      done(null, filename);
    },
    destination(req, file, done){
      console.log(file);
      done(null, path.join(__dirname, "files"));
    }
  }),
  // limits 파일 용량
  limits: {filesize: 5 * 1024 }
});
// multer 함수에 dest 라는 속성을 가진 JS 객체를 인자로 전달한다.
// dest는 destination의 약자로 업로드 될 목적지를 의미
// multer 함수로 upload라는 객체를 반환하는데, 또 다시 upload.single() 메소드를 호출하면 업로드 미들웨어를 생성할 수 있다.
// 이 미들웨어는 multipart/form-data 형식의 body를 파싱해서 파일로 다시 변환하고 dest에 등록된 경로에 업로드한다.
// myFile을 인자로 준 이유 input name속성이 myFile이었기 때문

const uploadMiddleware = upload.single("myFile");

// app.use(uploadMiddleware);
// uploadMiddleware 함수를 2번재 인자로 넘겨주면
// post /upload 일때만 함수가 실행된다.
// 이미지 업로드는 매우 한정적이기 때문에 특정 라우터를 지정해서 미들웨어를 등록해주는 편이 합리적

app.post("/upload", uploadMiddleware, (req, res) => {
  console.log(req.file);
  res.status(200).send("uploaded");
})

// {
//   fieldname: 'myFile',
//   originalname: '3.jpg',    원래파일의 이름
//   encoding: '7bit',
//   mimetype: 'image/jpeg',  확장자 이름
//   destination: 'files/',
//   filename: 'f9b9c9d2f64f77476a521853ff42a105',
//   path: 'files/f9b9c9d2f64f77476a521853ff42a105',   파일 이름
//   size: 17768    용량
// }

const path = require("path");
const publiPath = path.join(__dirname, "public");

app.use(express.static(publiPath));

app.listen(3000, () => {
  console.log("server on~~~")
})