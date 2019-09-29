<template>
  <div class="fblists" id="fblists" @scroll="testScroll($event)">
    <div class="titleLine1">
      <div class="titleitem1" @click="onClickLeft"><van-icon name="arrow-left" size="22px" color="#fff"/>
      </div>
      <div class="titleitem3">
        <van-search
          v-model="searchValue"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          style="height:50px !important;"
        />
      </div>
      <div class="titleitem2" @click="onClickRight"><van-icon name="chat" size="22px" color="#fff"/>
      </div>
    </div>
    <van-list
  	  v-model="loading"
  	  :finished="finished"
  	  @load="onLoad"
  	>
      <div class="fblistitemclass" v-for="(listitem,key) in list" :key="key" @click="panel(listitem.user_id,key)"
      >
        <div class="fblistitem1">{{ listitem.nickname }}</div>
        <div  class="fblistitem2">
          <van-tag v-if="listitem.count" type="danger" plain>
          {{ listitem.count }}
          </van-tag>
        </div>
        <div class="fblistitem3"><van-icon name="arrow"></van-icon></div>
      </div>
	   </van-list>
     <div style="clear:both;"></div>
  </div>
</template>

<script>
import CONST_ from './const'
export default {
  name: 'fblists',
  components: {CONST_},
  data:function() {
    return {
      list: [],
      loading: false,
      finished: false,
      searchValue:'',
      page:0,
      searchPage:0,
      searchFlag:false,
      homeTop:0,
      listIdClicked:-1
    };
  },
  computed:{
    typeid:function(){
      return this.$store.state.typeid;
    },
  },
  created:function(){
    //this.typeid=this.$route.query.typeid;
  },
  mounted:function(){},
  activated(){
    document.getElementById('fblists').scrollTop = this.homeTop || 0;
    if(this.listIdClicked>-1){
      this.list[this.listIdClicked].count = 0;
    }
  },
  deactivated(){
  },
  beforeRouteLeave (to, from, next) {
    let app = document.getElementById("fblists");
    this.homeTop = app.scrollTop || 0;
    next()
  },
  methods:{
    testScroll(e){
      //console.log(e.target.scrollTop);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({path:'/'});
    },
    onSearch(){
      this.searchPage=0;
      this.searchFlag=true;
      this.$axios.get(CONST_.srvSrc+"api/user/searchFbs/"+this.typeid+"/"+this.searchValue+"/"+this.searchPage++)
        .then(function(data){
          data=data.data;
          this.list=data.fblists;
          this.loading = false;
          if(data.fblists.length<15){
            this.finished = true;
          }
        }.bind(this))
        .catch(function(error){
          this.loading = false;
        }.bind(this));
    },
    onCancel(){},
    onLoad() {
        let url="";
        if(this.searchFlag){
          url=CONST_.srvSrc+"api/user/searchFbs/"+this.typeid+"/"+this.searchValue+"/"+this.searchPage++;
        }
        else{
          url=CONST_.srvSrc+"api/user/showFbs/"+this.typeid+"/"+this.page++;
        }
        this.$axios.get(url)
        .then(function(data){
          data=data.data;
          this.list=this.list.concat(data.fblists);
          this.loading = false;
          if(data.fblists.length<15){
            this.finished = true;
          }
        }.bind(this))
        .catch(function(error){
          this.loading = false;
        }.bind(this));
    },
    panel:function(userid,key){
      this.listIdClicked = key;
      this.$router.push({path:'/panel', query:{id:userid}});
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
.fblists{
  height:100%;
  overflow-y: scroll;
}
.van-list{
  margin-top: 80px;
}
.fblistitemclass {
  margin: 0 0 10px 0;
  padding: 0 5%;
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #dcdcdc;
  clear: both;
}
.fblistitem1{
  margin: 5px 0;
  padding: 0;
  float: left;
  height: 50px;
  width: 70%;
  line-height: 50px;
  color: #555;
  text-align: left;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.fblistitem2{
  margin: 0;
  padding: 0;
  float: left;
  height: 60px;
  width: 10%;
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
  padding: 0;
  float: left;
  height: 60px;
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
.van-search{
  background-color: #fff !important;
}
</style>
