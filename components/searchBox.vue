<template>
  <div class="cContainer p-3">
    <b-row>
      <b-col cols="12 " class="mb-4">
        <h3 class="h4">جستجوی نرم افزار</h3>
      </b-col>
      <b-col cols="12" md="6" class="mb-3">
        <b-form-row>
          <b-col cols="3">
            <label for="srchName">نام :</label>
          </b-col>
          <b-col >
            <b-form-input id="srchName" ref="name"></b-form-input>
          </b-col>
        </b-form-row>
      </b-col>
      <b-col cols="12" md="6">
        <b-form-row>
          <b-col cols="3" >
            <label for="srchTitle">عنوان :</label>
          </b-col>
          <b-col  class="text-left">
            <b-form-input id="srchTitle" ref="title"></b-form-input>
          </b-col>

        </b-form-row>
      </b-col>
      <b-col cols="12" class="text-left">
          <b-btn pill class="mt-3" variant="primary" @click="srch"
              >جستجو</b-btn
            >
            <b-btn pill class="mt-3" variant="outline-primary" @click="srch_all"
              >جستجوی همه</b-btn
            >
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      t: null,
      params: {
        name: null,
        title: null,
      },
    }
  },
  methods: {
    srch() {
      this.params.name = this.$refs.name.localValue
      this.params.title = this.$refs.title.localValue
      this.$store.dispatch('action_set_search_query', this.params)
    },
    srch_all() {
      this.params.name = ''
      this.params.title = ''
      this.$store.dispatch('action_set_search_query', this.params)
    },
  },
}
</script>
<style scoped>
.cContainer {
  background-color: #fff;
}
</style>
