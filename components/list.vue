<template>
  <div class="table-responsive">
    <table class="table  ">
      <b-thead>
        <tr>
          <th v-for="h in get_fields" :key="h.key">{{ h.label }}</th>
        </tr>
      </b-thead>
      <tbody >
        <tr v-for="i in get_items" :key="i.id">
          <td>{{ i._id }}</td>
          <td>{{ i.name }}</td>
          <td>{{ i.title }}</td>
          <td>
            <b-link
              href=""
              @click.prevent="deleteItem(i._id)"
              :class="{ disabled: i.isDeleted }"
              :disabled="i.isDeleted"
            >
              <b-icon-trash-2 />
            </b-link>
          </td>
          <td>
            <b-link
              :class="{ disabled: i.isDeleted }"
              :disabled="i.isDeleted"
              :to="{
                name: 'Register',
                params: { edit_mode: true, id: i._id },
              }"
            >
              <BIconLayoutTextSidebar />
            </b-link>
          </td>
          <td>
            <tik :active="i.isGeneral" />
          </td>
          <td>
            <input
              type="checkbox"
              @change.prevent="toggle(i._id)"
              :checked="!i.isDeleted"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { BIconCheck, BIconTrash2, BIconLayoutTextSidebar } from 'bootstrap-vue'

export default {
  components: { BIconCheck, BIconTrash2, BIconLayoutTextSidebar },
  props: ['list_type'],
  computed: {
    get_items() {
      return this.$store.getters.getter_items.filter(i=> i.isDeleted!==this.list_type)
    },
    get_fields() {
      return this.$store.getters.getter_fields
    },
  },
  methods: {
    deleteItem(id) {
      this.$bvModal.msgBoxConfirm('آیا برای پاک کردن آیتم مطمین هستید ؟').then((value) => {
        if (value === true) {
          this.$store.dispatch('delete', id)
        }
      })
    },
    toggle(id) {
      this.$store.dispatch('toggle', id)
    },
  },
}
</script>
<style>
.disabled {
  color: grey !important;
}
</style>
