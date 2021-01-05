<template>
  <div>
    <span v-if="active" > <BIconCheck variant="success" /></span>
    <span v-else>
      <BIconX variant="danger"/>
    </span>
  </div>
</template>
<script>
import {BIconCheck,BIconX} from 'bootstrap-vue'
export default {
  components:{BIconCheck ,BIconX},
 props:['active']
}
</script>
