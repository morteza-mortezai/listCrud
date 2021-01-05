<template>
  <div>
    <div>
      <b-form-input
        class="mb-2"
        v-model="formData1.id"
        placeholder="شناسه"
      ></b-form-input>
      <b-form-input
        class="mb-2"
        v-model="formData1.name"
        placeholder="نام"
      ></b-form-input>
      <b-form-input
        class="mb-2"
        v-model="formData1.title"
        placeholder="عنوان"
      ></b-form-input>
      <b-form-input
        class="mb-2"
        v-model="formData1.website"
        placeholder="آدرس سایت"
      ></b-form-input>
      <b-form-datepicker
        id="example-i18n-picker"
        v-model="formData1.date"
        locale="fa-IR"
        start-weekday="2"
        :show-decade-nav="false"
        :hide-header="false"
        class="mb-2"
      ></b-form-datepicker>
      <b-form-checkbox
        id="activeCheck"
        v-model="formData1.active"
        name="activeCheck"
      >
        فعال
      </b-form-checkbox>
      <b-form-checkbox
        id="generallCheck"
        v-model="formData1.generall"
        name="generallCheck"
      >
        عمومی
      </b-form-checkbox>
      <b-button variant="success" @click="$store.dispatch('add_item_a' ,{formData1} )">ثبت</b-button>
      <b-button variant="success" disabled>ویرایش</b-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NewRec',
  data() {
    return {
      formData1: {
        id: 1,
        name: '',
        title: '',
        website: '',
        active: false,
        generall: false,
        imgaddr: '',
        data: '',
      },
    }
  },
  methods: {
    add_data() {
      this.$store.commit('add_item', this.formData1)
    },
  },
}
</script>
