<template>
  <div class="update">
    <h1>메모를 수정해주세요</h1>  
    <input type="text" v-model="memo.writer" placeholder="이름을 입력하세요"> <br>
    <input type="text" v-model="memo.title" placeholder="제목을 입력하세요"> <br>
    <textarea name="" cols="30" rows="10" v-model="memo.memo" placeholder="메모내용을 입력하세요"></textarea> <br>
    <button @click="updatememo">전송</button>
  </div>
</template>

<script>

export default { 
  //ListView에서 수정버튼 클릭하자마자 이 화면에서 이미떠있어야해서 created로 get
  //PageView의 내용을 복사해서 사용해도됨...... 동일한 값이라서
  name: 'WriteView',
  data () {
    return {
      // writer : '',
      // title : '',
      // memo : ''
      memo : { //? 이부분 이해안감!
        writer : '',
        title : '',
        memo : ''
      }
    }
  },
  created() {
    this.$http.get(`/api/memo/${this.$route.params.id}`)
    .then((response) => {
    console.log(response.data);
    this.memo = response.data;
    })
  },
  methods : { // axios를 통해 제출 버튼을 눌렀을때 값을 수정해줌 -put
    updatememo () {
      this.$http.put('/api/memo/updateform', {
        data : {
          // 객체 자체를 보내줌
          memo : this.memo
        }
      })
      .then ((response) => {
        console.log(response.data)
        this.$router.push('/')
      })
    }
  }
  
}
</script>
