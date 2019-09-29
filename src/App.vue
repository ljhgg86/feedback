<template>
  <div id="app">
    <keep-alive include="fblists">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  created:function(){
    this.funuser();
  },
  methods:{
    funuser:function(){
      var Uid=null,Mobile=null,NickName=null,UserAvatar=null;
      if (/(Android)/i.test(navigator.userAgent)) {
        try{
          Uid=window.jsObj.getUid();
          Mobile=window.jsObj.getMobile();
          NickName=window.jsObj.getNickName();
          UserAvatar=window.jsObj.getUserAvatar();
        }
        catch(error){
          Uid=null;
        }
      }

      else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        try{
          Uid=localStorage.getItem("Uid");
          Mobile=localStorage.getItem("Mobile");
          NickName=localStorage.getItem("NickName");
          UserAvatar=localStorage.getItem("UserAvatar");
          // Uid=window.getUserID();
          // Mobile=window.getPhoneNum();
          // NickName=window.getNickName();
          // UserAvatar=window.getAvater();
        }
        catch(error){
          Uid=null;
        }
      }
      if(Uid==1 || Uid==2){
        Uid=null;
      }
      var temparr={Uid:Uid,Mobile:Mobile,NickName:NickName,UserAvatar:UserAvatar};
      /*var temparr={Uid:491574,Mobile:"13715966381",NickName:"用户",UserAvatar:"http://yao.cutv.com/uc_server/data/avatar/000/49/49/52_avatar_middle.jpg?t=1540520661049"};*/
      this.$store.commit('setUserInfo',temparr);
    },
  }
}
</script>

<style>
html,body {
  font-size: 17px;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.titleLine1 {
  margin: 0 ;
  padding: 0;
  height: 70px;
  width: 100%;
  background-color: #409EFF;
  clear: both;
  position: fixed;
  top:0;
  left:0;
  right: 0;
  z-index: 2000;
}
.titleitem1, .titleitem2 {
  margin: 5px 0;
  padding: 0;
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
.titleitem1{
  float: left;
}
.titleitem2{
  float: right;
}
.titleitem3 {
  margin: 10px 0;
  padding: 0;
  height: 50px;
  width: 60%;
  float: left;
}
.titleitem4 {
  margin: 10px 0;
  padding: 0;
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  width: 60%;
  float: left;
}
</style>
