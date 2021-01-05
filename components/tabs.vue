<template>
  <div>
    <h4 class="h4">لیست نرم افزار ها</h4>
    <div class="text-left mb-3">
      <b-btn
        pill
        :to="{ name: 'Register', params: { edit_mode: false } }"
        variant="primary"
      >
        <BIconPlus />

        ثبت نرم افزار
      </b-btn>
    </div>

    <b-tabs content-class="mt-3">
      <b-tab title="نرم افزارهای فعال" active>
        <list :list_type="true" />
      </b-tab>
      <b-tab title="نرم افزارهای غیرفعال ">
        <list :list_type="false" />
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import { BIconPlus } from 'bootstrap-vue'

export default {
  components: {
    BIconPlus,
  },
}
</script>
