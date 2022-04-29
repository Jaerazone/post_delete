<template>
    <div class="page">
        <h1>{{memo.id}}번째 페이지</h1>
        <h2>{{memo.title}}</h2>
        <p>{{memo.memo}}</p>
    </div>
</template>

<script>
export default {
    created() {  // axios를 이용해 값을 들고옴-get
        this.$http.get(`/api/memo/${this.$route.params.id}`)
        .then((response) => {
            console.log(response.data);
            this.memo = response.data;
        })
    },
    data () {
        return {
            memo : {}
        }
    }
}
</script>

<style>

</style>