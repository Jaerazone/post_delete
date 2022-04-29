<template>
  <div class="list">
    <h1>게시판 입니다</h1>
    <table>
      <tr>
        <td>id</td>
        <td>작성자</td>
        <td>제목</td>
      </tr>
      <tr v-for="memo in memo" :key="memo.i">
        <td>{{memo.id}}</td>
        <td>{{memo.writer}}</td>
        <td @click="$router.push(`/page/${memo.id}`)" >{{memo.memo}}</td>
        
        <!--수정 버튼을 눌렀을때, UpdateForm.vue 으로 이동 (화면 출력과 관련)
        이동할때 메모세부내용이 전부 서버로 보내져야 
        updateform 에서 created로 볼수있다
        -->
        <td><button @click="$router.push(`/updateform/${memo.id}`)">수정</button></td>

        
        <!--
          삭제 버튼을 눌렀을때, 삭제할 memo.id를 서버로 넘겨주기 (데이터와 관련)
          배열에서 id값 같은메모를 삭제한다 
        -->
        <td><button @click="deletememo(memo.id)">삭제</button></td>
      </tr>
    </table>
    <h3>제목을 누르면 내용 페이지로 넘어갑니다</h3>
  </div>
</template>

<script>

export default {
  name: 'ListView',
  data () {
    return {
      memo : []
    }
  },
  created() { // axios를 이용해 값을 들고옴-get
    this.$http.get('/api/memo')
    .then((response) => {
      console.log(response.data)
      this.memo = response.data
    })
  },
  methods : {
    deletememo(id) { //axios를 통해 클릭한 id값을 가진 memo를 삭제 (memo.id를 인자로 받아와서->id라고 명시하고씀)
                  //(id값을 보낼수 없기 때문에 주소로 id값을 보냄)
      this.$http.delete(`/api/memo/${id}`)
      .then((response) => {
        // 서버에서 값이 삭제 된 메모 
        //-> 서버로 요청해서 값이 삭제되었지만 
        //화면에서 적용하기 위해서 메모배열을 들고옴

        /* 프엔에 와서 배열을 다시 할당 시켜주면됨
          (서버에서는 삭제되었지만 화면에서는 
           다시 들고오지 않기 때문에 이화면 그대로 값들이 남아있다. 
           그래서 다시 this.memo에 서버에서 들고 온 값을 넣어줘야 
           '화면에서 삭제었다' 라는걸 확인할 수 있음)
        */
        this.memo = response.data
      })
    }
  }
  
}
</script>

<style>

</style>