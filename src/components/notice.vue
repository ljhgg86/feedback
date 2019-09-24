<template>
  <div class="notice">
    <div class="titleLine1">
      <div class="titleitem1" @click="onClickLeft"><van-icon name="arrow-left" size="22px" color="#fff"/></div>
      <div class="noticeitem">
      公告详情
      </div>
    </div>
  	<van-panel :title="noticeinfo.title" :desc="noticeinfo.created_at">
      <div class="contentClass">{{ noticeinfo.detail }}</div>
    </van-panel>
  </div>
</template>

<script>
import CONST_ from './const'
export default {
  name: 'notice',
  components: {CONST_},
  data:function() {
    return {
      id:0,
      noticeinfo:{}
    };
  },
  computed:{
    
  },
  created:function(){
    this.id=this.$route.query.id;
  },
  mounted:function(){
    this.loadinfo();
  },
  methods:{
    onClickLeft() {
      this.$router.go(-1);
    },
    loadinfo:function(){
      this.$axios.get(CONST_.srvSrc+"api/notice/getNoticeInfo/"+this.id)
      .then(function(data){
        this.noticeinfo = data.data.noticeinfo;
      }.bind(this))
      .catch(function(error){
        console.log(error);
      }.bind(this));
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-panel{
  margin-top: 80px;
  text-align: left;
}
.van-cell__value{
  font-size: 20px !important;
}
.noticeitem {
  margin: 5px 0;
  padding: 0;
  height: 60px;
  width: 60%;
  color:#fff;
  font-size: 1.3em;
  letter-spacing: 6px;
  float: left;
  align-items: center;
    /* Firefox */
  display:-moz-box;
  -moz-box-orient:horizontal;
  -moz-box-pack:center;
  -moz-box-align:center;

  /* Safari、Opera 以及 Chrome */
  display:-webkit-box;
  -webkit-box-orient:horizontal;
  -webkit-box-pack:center;
  -webkit-box-align:center;

  /* W3C */
  display:box;
  box-orient:horizontal;
  box-pack:center;
  box-align:center;
}
.fblistitem1{
  margin: 5px 0;
  padding: 0;
  float: left;
  height: 70px;
  width: 80%;
  float: left;
}
.contentClass{
  padding: 10px 15px;
}
</style>
