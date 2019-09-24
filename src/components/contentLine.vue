<template>
  <div class="contentline">
    <el-row type="flex"  :justify="justify">
      <el-col :span="2">
        <img src="fbcontent.avatar">
      </el-col>
      <el-col v-if="fbcontent.imgflag==0" :span="18" class="contentLeft">
        {{ fbcontent.content }}
      </el-col>
      <el-col v-else :span="16">
        <img src="fbcontent.content">
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'contentline',
  props:{
    fbcontent:{},
  },
  data: function() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:{
    justify:function(){
      return this.fbcontent.admin_id ? "start" : "end";
    },
  },
  created:function(){},
  methods:{},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
