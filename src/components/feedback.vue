<template>
  <div class="feedback">
    <el-container>
      <el-header>
        <el-col :span="16" :offset="4">
          {{ title }}
        </el-col>
        <el-col :span="4">
          <div class="check-btn">
            <el-button v-if="adminFlag"  type="warning" icon="el-icon-edit" circle plain  @click="showFblist()">
            </el-button>
          </div>
        </el-col>
      </el-header>
      <el-main>
        <van-notice-bar v-if="showNotice" mode="closeable">
          {{ notice }}
        </van-notice-bar>
        <el-row type="flex" justify="center">
          <el-button type="text" :disabled=moreflag @click="loadinfo">{{ tip }}</el-button>
        </el-row>
        <div v-for="(fbcontent, index) in fbcontents">
          <el-row>
            <el-tag type="warning" size="mini">{{ fbcontent.created_at }}</el-tag>
          </el-row>
          <el-row type="flex" v-if="fbcontent.admin_id==0" justify="end">
            <el-col v-if="fbcontent.imgflag==0" :span="16" class="contentRight">
              <div class="textlineR">
                {{ fbcontent.content }}
              </div>
            </el-col>
            <el-col v-else :span="16">
              <div class="imglineR">
                <img :src="fbcontent.content" class="imgStyle" @click="imgPreview(fbcontent.content)" />
              </div>
            </el-col>
            <el-col :span="1">
              <el-button
                  v-if="fbcontent.revokeflag"
                  plain
                  circle
                  size="mini"
                  class="revoke"
                  icon="el-icon-circle-close-outline"
                  @click="delContent(fbcontent.id,index)">
                </el-button>
            </el-col>
            <el-col :span="4">
              <img :src="fbcontent.user.avatar" :onerror="userAvatar" class="avatarStyleR">
            </el-col>
          </el-row>
          <el-row type="flex" v-else justify="start">
            <el-col :span="4">
              <img :src="fbcontent.admin.avatar" :onerror="adminAvatar" class="avatarStyleL">
            </el-col>
            <el-col v-if="fbcontent.imgflag==0" :span="16" class="contentLeft">
              <div class="textlineL">
                {{ fbcontent.content }}
              </div>
            </el-col>
            <el-col v-else :span="16">
              <div class="imglineL">
                <img :src="fbcontent.content" class="imgStyle" @click="imgPreview(fbcontent.content)" />
              </div>
            </el-col>
          </el-row>
        </div>
      </el-main>
      <el-footer style="height:60px;">
        <message :typeid="this.typeid" @sendSuccess="sendSuccess">
        </message>
      </el-footer>
    </el-container>
    <el-dialog
    :visible="imgpre"
    width="80%"
    @close="imgPreviewClose"
    center>
      <img :src="imgsrc" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>
import CONST_ from './const'
import message from './message.vue'
export default {
  name: 'feedback',
  components: {CONST_ , message},
  data:function() {
    return {
      title:"",
      fbcontents:[],
      notice:"",
      tip:"点击更多",
      page:0,
      moreflag:false,
      imgpre:false,
      imgsrc:"",
      adminAvatar:'this.src="'+CONST_.adminAvatar+'";this.onerror=null;',
      userAvatar:'this.src="'+CONST_.userAvatar+'";this.onerror=null;',
      timeoutIds:[],
      typeids:[]
    }
  },
  computed:{
    Uid:function(){
      return this.$store.state.userInfo.Uid;
    },
    loginState:function(){
      return !(this.Uid=="(null)"||this.Uid=="null"||this.Uid==null);
    },
    adminFlag:function(){
      return (this.$store.state.userRoleid == 3 && this.typeids.indexOf(this.typeid)>=0);
    },
    showNotice:function(){
      return this.notice!="";
    },
    typeid:function(){
      return this.$store.state.typeid;
    },
  },
  created:function(){
    var url = location.search;
    let tempid = 0;
    if (url.indexOf("?") != -1){
      var str = url.substr(1);
      if(str.indexOf("=") != -1){
        tempid=parseInt(str.substr(str.indexOf("=")+1));
      }
    }
    this.$store.commit('setTypeid',tempid);
    if(this.loginState){
      this.getTypeids(this.$store.state.userInfo.Mobile);
      this.setLocalUser(this.$store.state.userInfo.Mobile);
    }
    this.loadinfo();
    this.getNotice();
  },
  mounted:function(){
  },
  methods:{
    getTypeids:function(name){
      this.$axios.get(CONST_.srvSrc+"api/user/getTypeidsByName/"+name)
      .then(function (data) {
        data=data.data;
        if(data){
          this.typeids = data.typeids;
          return;
        }
      }.bind(this))
      .catch(function (error) {
      }.bind(this));
    },
    setLocalUser:function(name){
      this.$axios.get(CONST_.srvSrc+"api/user/searchByName/"+name)
      .then(function (data) {
        data=data.data;
        if(data){
          this.$store.commit('setUserRoleid',data.role_id);
          return;
        }
        this.$store.commit('setUserRoleid',0);
      }.bind(this))
      .catch(function (error) {
        this.$store.commit('setUserRoleid',0);
      }.bind(this));
    },
    showFblist:function(){
      this.$router.push({path:'/fblists'});
    },
    loadinfo:function(){
       if(!this.loginState){
         this.$message({
           message: '请先登录汕头橄榄台！',
           type: 'warning'
         });
         return;
       }
       else{
        this.$axios.defaults.headers.post['Content-Type'] = 'application/json';
        this.$axios.post(CONST_.srvSrc+"api/fbcontent/getFbcontentsApi",
        {
          params:{
            typeid:this.typeid,
            name:this.$store.state.userInfo.Mobile,
            nickname:this.$store.state.userInfo.NickName,
            avatar:this.$store.state.userInfo.UserAvatar,
            password:"123456",
            role_id:4,
            page:this.page++,
          }
        })
      .then(function (data) {
        data=data.data;
        this.$store.commit('setUser',data.user);
        var fbContents=data.fbContents.reverse();
        if(fbContents.length<4){
          this.tip="没有更多了";
          this.moreflag=true;
        }
        this.fbcontents=fbContents.concat(this.fbcontents);
        // fbContents.reverse();
        // for(let index in fbContents){
        //   this.fbcontents.unshift(fbContents[index]);
        // }
      }.bind(this))
      .catch(function (error) {
      }.bind(this));
      }
    },
    getNotice:function(){
      this.$axios.get(CONST_.srvSrc+"api/notice/getShowtop/"+this.typeid)
        .then(function(data){
          data=data.data;
          this.notice=data.notices;
          this.title = data.type.name;
        }.bind(this))
        .catch(function(error){
          console.log(error);
        }.bind(this));
    },
    onSubmit:function(){},
    getJustify:function(adminid){
      return adminid ? 'start' : 'end';
    },
    showNoticelist:function(){
      this.$router.push({path:'/noticelist'});
    },
    sendSuccess:function(fbcontentN){
      this.fbcontents.push({
        admin:null,
        admin_id:0,
        content:fbcontentN.imgflag ? fbcontentN.imageSrcs : fbcontentN.content,
        created_at:this.getFormatDate(),
        updated_at:this.getFormatDate(),
        delflag:0,
        imgflag:fbcontentN.imgflag,
        videoflag:0,
        readflag:0,
        user:this.$store.state.user,
        user_id:this.$store.state.user.id,
        revokeflag:1,
        id:fbcontentN.id
      });
      var timeoutId=window.setTimeout(this.hideRevoke,120000);
      this.timeoutIds.push(timeoutId);
    },
    getFormatDate:function(){
      var date= new Date();
      var month=date.getMonth()+1;
      var day=date.getDate();
      if(month<10){
        month="0"+month;
      }
      if(day<10){
        day="0"+day;
      }
      return date.getFullYear()+"-"+month+"-"+day+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    },
    imgPreview:function(src){
      this.imgpre=true;
      this.imgsrc=src;
    },
    imgPreviewClose:function(){
      this.imgpre=false;
    },
    delContent:function(id,index){
      this.$axios.get(CONST_.srvSrc+"api/fbcontent/delContent/"+id)
        .then(function(data){
          let fbcontentsLen=this.fbcontents.length;
          window.clearTimeout(this.timeoutIds[fbcontentsLen-index]);
          this.timeoutIds.splice(fbcontentsLen-index,1);
          this.fbcontents.splice(index,1);
        }.bind(this))
        .catch(function(error){
          console.log(error);
        }.bind(this));
    },
    hideRevoke:function(){
      let fbcontentsTmp=this.fbcontents;
      let timeoutIdsLen=this.timeoutIds.length;
      fbcontentsTmp[fbcontentsTmp.length-timeoutIdsLen].revokeflag=0;
      this.timeoutIds.splice(timeoutIdsLen-1,1);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header{
    background-color: #409EFF;
    color: #fff;
    text-align: center;
    font-size: 1.2em;
    line-height: 60px;
    letter-spacing: 10px;
    position: fixed;
    top: 0;
    z-index: 1000;
    width: 100%;
  }
  .check-btn{
    line-height: 60px;
    vertical-align: middle;
    float: right;
  }
  .el-row{
    margin-bottom: 20px;
  }
  .el-footer{
    background-color: #fff;
    padding: 0;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    width: 100%;
  }
  .el-main{
    margin-top: 40px;
    margin-bottom: 60px;
    padding: 20px 5px 20px 5px;
  }
  .el-textarea{
    vertical-align: middle;
  }
  .contentRight{
    text-align: right;
    word-break: break-all;
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .contentLeft{
    text-align: left;
    word-break: break-all;
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .imgStyle{
    max-width: 70%;
  }
  .avatarStyleR{
    width:40px;
    height: 40px;
    margin-left: 10px;
  }
  .avatarStyleL{
    width:40px;
    height: 40px;
    margin-right:10px;
  }
  .imglineL{
    text-align: left;
  }
  .imglineR{
    text-align: right;
  }
  .textlineL{
    line-height: 26px;
    display:inline-block;
    background-color:#DCDFE6;
    padding-right: 6px;
    padding-left: 6px;
  }
  .textlineR{
    line-height: 26px;
    display:inline-block;
    background-color:#F2F6FC;
    padding-right: 6px;
    padding-left: 6px;
    text-align: left;
  }
  .revoke{
    border: #fff !important;
  }
</style>
