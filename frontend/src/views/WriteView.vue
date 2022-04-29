<template>
  <div class="write">
    <h1>메모를 작성해주세요</h1>  
    <input type="text" v-model="writer" placeholder="이름을 입력하세요"> <br>
    <input type="text" v-model="title" placeholder="제목을 입력하세요"> <br>
    <textarea name="" cols="30" rows="10" v-model="memo" placeholder="메모내용을 입력하세요"></textarea> <br>
    <button @click="addmemo">전송</button>
  </div>
</template>

<script>

export default {
  name: 'WriteView',
  data () {
    return {
      writer : '',
      title : '',
      memo : ''
    }
  },
  methods : { // axios를 통해 값을 보낸다- post, 메소드를 사용한다 
    addmemo () {
      this.$http.post('api/memo', {
        data : {
          writer : this.writer,
          title : this.title,
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
