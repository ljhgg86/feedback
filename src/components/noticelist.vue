<template>
  <div class="noticelist">
    <div class="titleLine1">
      <div class="titleitem1" @click="onClickLeft"><van-icon name="arrow-left" size="22px" color="#fff"/></div>
      <div class="noticeitem">
      公告列表
      </div>
    </div>
    <van-list
  	  v-model="loading"
  	  :finished="finished"
  	  @load="onLoad"
  	>
    <div class="fblistitemclass" v-for="(listitem,key) in list" :key="key" @click="notice(listitem.id)"
      >
        <div class="fblistitem1">
          <div class="fblistitem3">{{ listitem.title }}</div>
          <div class="fblistitem4">{{ listitem.created_at }}</div>
        </div>
        <div class="fblistitem2"><van-icon name="arrow"></van-icon></div>
      </div>
	   </van-list>
  </div>
</template>

<script>
import CONST_ from './const'
export default {
  name: 'noticelist',
  components: {CONST_},
  data:function() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },
  computed:{
    typeid:function(){
      return this.$store.state.typeid;
    },
  },
  created:function(){
  },
  mounted:function(){},
  methods:{
    onClickLeft() {
      this.$router.go(-1);
    },
    onCancel(){},
    onLoad() {
        this.$axios.get(CONST_.srvSrc+"api/notice/getNoticeList/"+this.typeid)
        .then(function(data){
          let noticeArray=data.data.noticelist.data;
          this.list=this.list.concat(noticeArray);
          this.loading = false;
          if(noticeArray.length<15){
            this.finished = true;
          }
        }.bind(this))
        .catch(function(error){
          console.log(error);
          this.loading = false;
          this.finished = true;
        }.bind(this));
    },
    notice:function(id){
      this.$router.push({path:'/notice', query:{id:id}});
    },
    onChange:function(){}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-nav-bar{
  background-color: #f2f2f2;
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
.van-list{
  margin-top: 80px;
}
.fblistitemclass {
  margin: 0 0 10px 0;
  padding: 0 5% 5px 5%;
  height: 75px;
  width: 100%;
  border-bottom: 1px solid #dcdcdc;
  clear: both;
}
.fblistitem1{
  margin: 5px 0;
  padding: 0;
  float: left;
  height: 70px;
  width: 80%;
  float: left;
}
.fblistitem2{
  margin: 0;
  padding: 0;
  float: left;
  height: 70px;
  width: 20%;
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
.fblistitem3{
  margin: 0;
  padding: 0px 10px 0px 0;
  height: 50px;
  line-height: 25px;
  width: 100%;
  text-align: left;
  font-size: 16px;
  color: #555;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-pack: center;
  -webkit-line-clamp: 2;
  display: box;
  box-orient: vertical;
  box-pack: center;
  line-clamp: 2;
  overflow: hidden;
}
.fblistitem4{
  margin: 0;
  padding:0;
  height: 20px;
  line-height: 20px;
  width: 100%;
  text-align: left;
  font-size: 12px;
  color: #777;
}
</style>
