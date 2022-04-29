var express = require('express');
var router = express.Router();

const memos = require('../memo.json');
let count = memos.length;

router.get('/', function(req, res, next) {
    console.log(memos);
    res.send(memos);
});

// post를 통해서 WriteView에서 메모값을 받아옴
router.post('/', function(req,res,next) {
    const memo = req.body.data // 객체로받음
    count++;
    const m = {
        id:count,
        writer : memo.writer,
        title : memo.title,
        memo : memo.memo
    }
    memos.push(m)
    res.send('서버 memo객체로 받음ok');
})

// id값을 통해 메모를 구분 노출상관없음, 한개의 memo만 보냄
router.get('/:id', function(req,res,next) {
    // params id 값에는 memo의 id값이 있다, 보내준다
    // id값을 통해서 하나의 메모를 찾거나(find) 걸러낸다(filter)
    //filter로 들고오면 배열로 넣어준다 m은 배열상태
    const m = memos.filter((memo) => { if (memo.id == req.params.id) {return true}});
    // 이렇게 줄일수 있음 const m = memos.filter((memo) => memo.id == req.params.id);
    res.send(m[0]); // : 배열안의 객체상태로 send한다
})

// 작성자 검색
router.post('/:writer', function(req,res,next) {
    const m = memos.filter((memo) => { if (memo.writer == req.params.writer) {return true}});
    res.send(m); // : 배열로 send한다
    
})

// 메모의 id값을 주소로 받아와서 삭제 (delete)
router.delete('/:id', function(req,res,next) {
    const id = req.params.id;
    // memo.id값을 통해 memos의 인덱스를 찾아서 삭제
    // memo.id값을 통해서 memo의 값을 찾음
//(1)const m = memos.filter((memo) => memo.id == id);
    // memo의 값으로 index를 찾아서
    /*  indexOf 메서드 : 배열에서 지정된 요소를 찾을 수 있는 
        첫번째 인덱스를 반환합니다. */
        // memos에서 (만약내가3번선택햇다면) 3번메모의 id값을 index로 반환
//(2)const index = memos.indexOf(m[0]); 
    
    // >> findIndex()를 이용해서 조건이 참인 index값을 찾을 수 있음
    //! memos배열의 객체를 memo에 담아 사용
    const index = memos.findIndex((memo) => memo.id == id) //(1)+(2)합친거
    //memos에서 제거
    memos.splice(index,1);

    console.log(memos);
    res.send(memos);
})

// 메모 수정(put) 을 통해 받아온값 수정 : body의 data로 받아옴
router.put('/updateform', function(req,res,next) {
    const memo = req.body.data.memo; //(프엔에서 memo:this memo 배열로 받아와서 이렇게씀)
    console.log(memo);

    // 메모의 인덱스를 찾아서 값을 할당
    /* 
        (주의) title과 memo의 값이 바뀌었기 때문에, 
        memo.id값으로 찾아야함
        유일한 값이기때문에 findIndex()로 찾아본다
    */
    const index = memos.findIndex((mm) => memo.id == mm.id);
    //! memos배열의 객체를 mm에 담아 사용
    memos[index] = memo; //(위의 const memo가 )
    res.send('ok');
})

module.exports = router;
