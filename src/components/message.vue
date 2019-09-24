<template>
  <div id="message">
    <el-form :inline="true" :model="fbcontentN">
        <el-row type="flex" justify="space-between" align="top">
          <el-col :span="17">
            <el-input type="textarea"
            :autosize="{ minRows: 1, maxRows: 2}"
            v-model="fbcontentN.content"
            placeholder="请输入您的宝贵意见！"
            clearable>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-upload
            :action="uploadSrc"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload">
              <el-button size="small" icon="el-icon-plus" circle></el-button>
            </el-upload>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="small" @click="onSubmit">发送</el-button>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>

<script>
import CONST_ from './const'
export default {
  name: 'message',
  components: {CONST_},
  props:{
    //csrfToken:document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    fbcontent:{},
    typeid:0,
  },
  data: function() {
    return {
      fbcontentN:{
        content:"",
        imageSrcs:null,
        imgflag:0,
        id:0
      },
    }
  },
  computed:{
    uploadSrc:function(){
      return CONST_.srvSrc+"api/image/uploadApi";
    }
  },
  created:function(){},
  methods:{
    onSubmit:function(){
      this.$axios.defaults.headers.post['Content-Type'] = 'application/json';
        this.$axios.post(CONST_.srvSrc+"api/fbcontent/storeApi",
        {
          params:{
            user_id:this.$store.state.user.id,
            admin_id:0,
            type_id:this.typeid,
            content:this.fbcontentN.content,
            imageSrcs:this.fbcontentN.imageSrcs,
          }
        })
      .then(function (data) {
        data=data.data;
        if(data.status){
          this.fbcontentN.id=data.id;
          this.$emit('sendSuccess',this.fbcontentN);
          this.fbcontentN.content="";
          this.fbcontentN.imageSrcs=null;
          this.fbcontentN.imgflag=0;
        }
      }.bind(this))
      .catch(function (error) {
      }.bind(this));
    },
    uploadSuccess:function(response){
      this.fbcontentN.imageSrcs=response.imageSrcs;
      this.fbcontentN.imgflag=1;
      this.onSubmit();
    },
    beforeUpload:function(file){
      const isJPEG = file.type === 'image/jpeg';
      const isJPG = file.type === 'image/jpg';
      const isPNG = file.type === 'image/png';
      if (!(isJPEG||isJPG||isPNG)) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      return isJPEG || isJPG || isPNG;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
