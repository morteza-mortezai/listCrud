<template>
  <div class="py-4">
    <search-box class="shadow bg-white" />

    <tabs class="bg-white mt-4 p-3 shadow" />
    <b-modal id="edit-modal">
      <new-rec />
    </b-modal>
  </div>
</template>

<script>
export default {
  methods: {
    get_all_items() {
      this.$store.dispatch('get_all_items')
    },
  },
  mounted() {
    this.get_all_items()
  },
}
</script>
