<template>
  <div class="panel">
  <div class="titleLine1">
    <div class="titleitem1" @click="onClickLeft"><van-icon name="arrow-left" size="22px" color="#fff"/></div>
    <div class="titleitem4">
    {{ title }}
    </div>
    <div class="titleitem2" @click="onClickRight"><van-icon name="chat" size="22px" color="#fff"/></div>
  </div>
   <van-button
   type="primary"
   size="small"
   round
   plain
   :disabled=moreflag
   @click="onLoad">
     {{ tip }}
   </van-button>
   <div v-for="(fbContent,index) in fbContents" class="fbRow">
    <van-row>
      <van-tag plain>{{ fbContent.created_at }}</van-tag>
    </van-row>
    <van-row type="flex" v-if="fbContent.admin_id==0">
      <van-col :span="4">
        <img :src="fbContent.user.avatar" :onerror="userAvatar" class="avatarStyleL"/>
      </van-col>
      <van-col :span="16" v-if="fbContent.imgflag==0" class="contentLeft">
        <div class="textlineL">
          {{ fbContent.content }}
        </div>
      </van-col>
      <van-col :span="16" v-else>
        <div class="imglineL">
          <img :src="fbContent.content" class="imgStyle" @click="imgPreview(fbContent.content)" />
        </div>
      </van-col>
    </van-row>
    <van-row type="flex" v-else justify="end">
      <van-col :span="16" v-if="fbContent.imgflag==0" class="contentRight">
        <div class="textlineR">
          {{ fbContent.content }}
        </div>
      </van-col>
      <van-col :span="16" v-else>
        <div class="imglineR">
          <img :src="fbContent.content" class="imgStyle" @click="imgPreview(fbContent.content)" />
        </div>
      </van-col>
      <van-col :span="1">
        <van-icon
        v-if="fbContent.revokeflag"
        name="clear"
        size="10px"
        @click="delContent(fbContent.id,index)">
        </van-icon>
      </van-col>
      <van-col :span="4">
        <img :src="fbContent.admin.avatar" :onerror="adminAvatar" class="avatarStyleR"/>
      </van-col>
    </van-row>
   </div>
   <SendMessage
   :userid="this.id"
   @sendSuccess="sendSuccess">
   </SendMessage>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import CONST_ from './const'
import SendMessage from './SendMessage.vue'
export default {
  name: 'panel',
  components: {ImagePreview, CONST_, SendMessage},
  data:function() {
    return {
      id:0,
      page:0,
      fbContents:[],
      fbContentN:{},
      fieldSize:{ maxHeight: 60, minHeight: 30 },
      tip:"点击更多",
      moreflag:false,
      adminAvatar:'this.src="'+CONST_.adminAvatar+'";this.onerror=null;',
      userAvatar:'this.src="'+CONST_.userAvatar+'";this.onerror=null;',
      title:"反馈回复",
      timeoutIds:[]
    };
  },
  computed:{
    fbUser:function(){
      return this.fbContents[0].user;
    },
    typeid:function(){
      return this.$store.state.typeid;
    },
  },
  created:function(){
    this.id=this.$route.query.id;
  },
  mounted:function(){
    this.onLoad();
  },
  methods:{
    onClickLeft:function(){
      this.$router.go(-1);
    },
    onClickRight:function(){
      this.$router.push({path:'/'});
    },
    onLoad:function(){
      this.$axios.get(CONST_.srvSrc+"api/fbcontent/getFbcontentsApi/"+this.typeid+"/"+this.id+"/"+this.page)
      .then(function(data){
        var fbContents=data.data.fbContents.reverse();
        this.fbContents=fbContents.concat(this.fbContents);
        if(fbContents.length<4){
          this.tip="没有更多了";
          this.moreflag=true;
        }
        this.page++;
        this.title=this.fbContents[0].user.name;
      }.bind(this))
      .catch(function(error){
        console.log(error);
      }.bind(this));
    },
    sendSuccess:function(fbContentN){
      this.fbContents.push({
        admin:this.$store.state.user,
        admin_id:this.$store.state.user.id,
        content:fbContentN.imgflag ? fbContentN.imageSrcs : fbContentN.content,
        created_at:this.getFormatDate(),
        updated_at:this.getFormatDate(),
        delflag:0,
        imgflag:fbContentN.imgflag,
        videoflag:0,
        readflag:0,
        user:this.fbUser,
        user_id:this.id,
        revokeflag:1,
        id:fbContentN.id
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
    imgPreview:function(imgSrc){
      const instance = ImagePreview({
        images:[imgSrc],
        startPosition:0,
        showIndex:false,
        onClose(){}
      });
    },
    delContent:function(id,index){
      this.$axios.get(CONST_.srvSrc+"api/fbcontent/delContent/"+id)
        .then(function(data){
          let fbContentsLen=this.fbContents.length;
          window.clearTimeout(this.timeoutIds[fbContentsLen-index]);
          this.timeoutIds.splice(fbContentsLen-index,1);
          this.fbContents.splice(index,1);
        }.bind(this))
        .catch(function(error){
          console.log(error);
        }.bind(this));
    },
    hideRevoke:function(){
      let fbContentsTmp=this.fbContents;
      let timeoutIdsLen=this.timeoutIds.length;
      fbContentsTmp[fbContentsTmp.length-timeoutIdsLen].revokeflag=0;
      this.timeoutIds.splice(timeoutIdsLen-1,1);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel{
  margin-top:85px;
  height: 100%;
  margin-bottom: 80px;
}
.fbRow{
  margin: 10px 10px 20px 10px;
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
.textlineL{
  line-height: 26px;
  display:inline-block;
  background-color:#DCDFE6;
  padding-right: 6px;
  padding-left: 6px;
  margin-left: 6px;
}
.textlineR{
  line-height: 26px;
  display:inline-block;
  background-color:#F2F6FC;
  padding-right: 6px;
  padding-left: 6px;
  text-align: left;
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
.footRow{
  bottom:0;
  z-index: 1;
  position: fixed;
  width: 100%;
}
</style>
