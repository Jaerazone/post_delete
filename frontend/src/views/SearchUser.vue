<template>
    <div class="search">
        
        <h1>작성자 글찾기</h1>
        <div class="container">
            <input type="text" v-model="writer" placeholder="작성자를 입력해보세요">
            <button @click="searchUser">작성자 검색</button>
        </div>

        <table class="board-table">
            <tr class="tr-1">
                <th>id</th>
                <th>작성자</th>
                <th>제목</th>
                <th>메모내용</th>
            </tr>
            <tr v-for="memo in memo" :key="memo.i">
                <th>{{memo.id}}</th>
                <th>{{memo.writer}}</th>
                <th>{{memo.title}}</th>
                <th>{{memo.memo}}</th>
            </tr>
        </table>
    </div> 
</template>

<script>
export default {
    name : 'SearchUser',
    data () {
        return {
            writer : '',
            memo : []
        }
    },
    methods : { //axios를 통해 값을 보낸다-post
        searchUser () {
            this.$http.post(`api/memo/${this.writer}`)
            .then((response) => {
                this.memo = response.data
            })
        }
    }
}
</script>

<style>


.container input {
    font-size: 14px;
    padding: 7px 14px;
    border: 1px solid #ccc;
    margin-right: 10px;
    text-align: center;
}

.container button {
    padding : 3px 6px;
}

.board-table {
    background-color: #f9f7f9;
    margin: auto;
    padding: 10px;
}

table, tr, th {
    border: 1px solid rgb(0, 0, 0);
}

table {
    width: 100%;
    border-collapse: collapse;
}

tr, th {
    padding : 10px
}

.tr-1 {
    height: 50px;
}


</style>