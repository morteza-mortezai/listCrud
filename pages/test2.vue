<template>
  <div>
      <h1>axios</h1>
     <b-form>
       <b-file
       v-model="img"
       ></b-file>
     </b-form>
  </div>
</template>
<script>
export default {
  data(){
   return{
      img:''
   }
  }
}
</script>

