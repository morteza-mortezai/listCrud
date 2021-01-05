<template>
  <div>
    {{get_all}}
  </div>
</template>
<script>
export default {
  computed:{
    get_all(){
      return this.$store.getters.getter_items
    }
  },
  methods:{
    get_all2(){
      this.$store.dispatch('get_all_items' )
    }
  },
  mounted(){
    this.get_all2()
  }
}
</script>