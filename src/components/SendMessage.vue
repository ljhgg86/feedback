<template>
  <div class="message">
    <van-cell-group>
      <van-field
        v-model="fbContentN.content"
        type="textarea"
        clearable
        placeholder="请输入回复内容"
        rows="1"
        :autosize="fieldSize"
      >
        <van-button
        v-if="fbContentN.content"
        slot="button"
        size="small"
        type="primary"
        @click="onSubmit">
          发送
        </van-button>
        <van-uploader
        v-else
        slot="button"
        :before-read="beforeRead"
        :after-read="afterRead">
          <van-icon name="photograph" size="25px" />
        </van-uploader>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import CONST_ from './const'
export default {
  name: 'SendMessage',
  components: {CONST_},
  props:{
    userid:0,
  },
  data: function() {
    return {
      fbContentN:{
        content:"",
        imageSrcs:null,
        imgflag:0,
        id:0
      },
      fieldSize:{ maxHeight: 60, minHeight: 30 },
      uploadFile:{}
    }
  },
  computed:{
    uploadSrc:function(){
      return CONST_.srvSrc+"api/image/uploadApi";
    },
    typeid:function(){
      return this.$store.state.typeid;
    },
  },
  created:function(){},
  methods:{
    onSubmit:function(){
      this.$axios.defaults.headers.post['Content-Type'] = 'application/json';
        this.$axios.post(CONST_.srvSrc+"api/fbcontent/storeApi",
        {
          params:{
            user_id:this.userid,
            admin_id:this.$store.state.user.id,
            //admin_id:26,
            type_id:this.typeid,
            content:this.fbContentN.content,
            imageSrcs:this.fbContentN.imageSrcs,
          }
        })
      .then(function (data) {
        data=data.data;
        console.log(data);
        if(data.status){
          this.fbContentN.id=data.id;
          this.$emit('sendSuccess',this.fbContentN);
          this.fbContentN.content="";
          this.fbContentN.imageSrcs=null;
          this.fbContentN.imgflag=0;
        }
      }.bind(this))
      .catch(function (error) {
      }.bind(this));
    },
    uploadSuccess:function(response){
    },
    beforeRead:function(file){
      this.$axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      let fd=new FormData();
      fd.append('file',file);
      this.$axios.post(CONST_.srvSrc+"api/image/uploadApi",
        fd)
      .then(function (data) {
        this.fbContentN.imageSrcs=data.data.imageSrcs;
        this.fbContentN.imgflag=1;
        this.onSubmit();
      }.bind(this))
      .catch(function (error) {
      }.bind(this));
    },
    afterRead:function(file){

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message{
  bottom:0;
  z-index: 1;
  position: fixed;
  width: 100%;
}
</style>
