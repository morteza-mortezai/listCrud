<template>
  <div class="bg-white p-5">
    <h4 class="h4 mb-5">
      {{ edit_mode ? 'ویرایش اطلاعات آیتم' : 'ثبت آیتم جدید' }}
    </h4>

    <ValidationObserver v-slot="{ handleSubmit, reset }">
      <form
        @submit.prevent="handleSubmit(handle_submit)"
        @reset.prevent="reset"
      >
        <b-form-row>
          <b-col cols="3" md="1">
            <label for="">نام</label>
          </b-col>
          <b-col cols="9" md="5">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-input
                class="mb-2"
                v-model="formData2.name"
                placeholder="نام"
              ></b-form-input>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </b-col>

          <b-col cols="3" md="1">
            <label for="">عنوان</label>
          </b-col>
          <b-col  cols="9" md="5">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-input
                class="mb-2"
                v-model="formData2.title"
                placeholder="عنوان"
              ></b-form-input>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </b-col>

          <b-col cols="3" md="1">
            <label for="">توضیحات </label>
          </b-col>
          <b-col  cols="9" md="5">
            <b-form-textarea
              class="mb-2"
              v-model="formData2.description"
            ></b-form-textarea>
          </b-col>

          <b-col cols="3" md="1">
            <label for=""> تصویر</label>
          </b-col>
          <b-col  cols="9" md="5">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-file
                accept="image/jpeg, image/png, image/gif"
                drop-placeholder="Drop file here..."
                class="mb-2"
                v-model="formData2.imgaddr"
                placeholder="تصویر"
              ></b-form-file>

              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </b-col>

          <b-col cols="3" md="1">
            <label for=""> سایت</label>
          </b-col>
          <b-col  cols="9" md="5">
            <ValidationProvider
              :rules="{
                regex: /^(http[s]?:\/\/(www\.)?|ftp:\/\/(www\.)?|www\.){1}([0-9A-Za-z-\.@:%_\+~#=]+)+((\.[a-zA-Z]{2,3})+)(\/(.)*)?(\?(.)*)?/,
              }"
              v-slot="{ errors }"
            >
              <b-form-input
                class="mb-2"
                v-model="formData2.website"
                placeholder="آدرس سایت"
              ></b-form-input>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </b-col>

          <b-col cols="3" md="1">
            <label for="">تاریخ</label>
          </b-col>
          <b-col  cols="9" md="5">
            <client-only>
              <date-picker v-model="formData2.date"></date-picker>
            </client-only>
          </b-col>
          <b-col  cols="4" md="2">
            <label>وضعیت </label>
          </b-col>
          <b-col cols="4" md="3">
            <b-form-checkbox v-model="formData2.active" name="activeCheck">
              فعال
            </b-form-checkbox>
          </b-col>
          <b-col cols="4" md="3">
            <b-form-checkbox v-model="formData2.generall" name="generallCheck">
              عمومی
            </b-form-checkbox>
          </b-col>
        </b-form-row>
        <b-form-row class="justify-content-end mt-4">
          <b-col cols="4" md="2">
            <b-button pill type="submit" block variant="success">
              {{ edit_mode ? 'ثبت تغییرات' : 'ثبت' }}
            </b-button>
          </b-col>
          <b-col cols="4" md="2">
            <b-button pill block type="reset" variant="outline-secondary"
              >ریست</b-button
            >
          </b-col>
          <b-col cols="4" md="2">
            <b-button pill block :to="'/'" variant="primary">بازگشت</b-button>
          </b-col>
        </b-form-row>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate'

import { email, regex, required } from 'vee-validate/dist/rules'

extend('regex', { ...regex, message: 'آدرس سایت باید معتبر باشد' })
extend('required', { ...required, message: ' این فیلد الزامی میباشد' })

export default {
  data() {
    return {
      edit_mode: null,
      item: null,
      formData2: {
        id: null,
        name: '',
        title: '',
        website: '',
        active: false,
        generall: false,
        imgaddr: null,
        date: '',
        description: null,
      },
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    DatePicker: () => import('vue-persian-datetime-picker'),
  },
  mounted() {
    console.log('recieved id', this.$route.params.id)
    this.edit_mode = this.$route.params.edit_mode
    if (this.edit_mode) {
      this.get_item_data()
    }
  },
  methods: {
    get_item_data() {
      if (this.$route.params && this.$route.params.id) {
        this.item = this.$store.getters.getter_all_items.find((i) => {
          return i._id === this.$route.params.id
        })

        if (this.item && this.item._id) {
          this.formData2.id = this.item._id
          this.formData2.name = this.item.name
          this.formData2.title = this.item.title
          this.formData2.active = !this.item.isDeleted
          this.formData2.generall = this.item.isGeneral
          this.formData2.website = this.item.url
          this.formData2.description = this.item.description
          // this.formData2.date = this.Date_gre_to_persian(this.item.date)
          // this.formData2.imgaddr = this.item.imgaddr
        }
      }
    },
    update_item() {
      if (this.formData2.date) {
        let old = this.formData2.date.split('/')

        this.formData2.date = this.Date_persian_to_gre(old[0], old[1], old[2])
          .toString()
          .replaceAll(',', '/')
      }
      this.$store
        .dispatch('update_item', this.formData2)
        
    },
    add_item() {
      let old = this.formData2.date.split('/')

      this.formData2.date = this.Date_persian_to_gre(old[0], old[1], old[2])
        .toString()
        .replaceAll(',', '/')
      console.log('ersali', this.formData2)

      this.$store.dispatch('add_item_a', this.formData2)
      //this.$router.push('/')
    },
    handle_submit() {
      this.edit_mode ? this.update_item() : this.add_item()
    },
    Date_persian_to_gre(j_y, j_m, j_d) {
      let JalaliDate = {
        g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
      }
      j_y = parseInt(j_y)
      j_m = parseInt(j_m)
      j_d = parseInt(j_d)
      var jy = j_y - 979
      var jm = j_m - 1
      var jd = j_d - 1

      var j_day_no =
        365 * jy + parseInt(jy / 33) * 8 + parseInt(((jy % 33) + 3) / 4)
      for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i]

      j_day_no += jd

      var g_day_no = j_day_no + 79

      var gy =
        1600 +
        400 *
          parseInt(
            g_day_no / 146097
          ) /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
      g_day_no = g_day_no % 146097

      var leap = true
      if (g_day_no >= 36525) {
        /* 36525 = 365*100 + 100/4 */
        g_day_no--
        gy +=
          100 *
          parseInt(g_day_no / 36524) /* 36524 = 365*100 + 100/4 - 100/100 */
        g_day_no = g_day_no % 36524

        if (g_day_no >= 365) g_day_no++
        else leap = false
      }

      gy += 4 * parseInt(g_day_no / 1461) /* 1461 = 365*4 + 4/4 */
      g_day_no %= 1461

      if (g_day_no >= 366) {
        leap = false

        g_day_no--
        gy += parseInt(g_day_no / 365)
        g_day_no = g_day_no % 365
      }

      for (
        var i = 0;
        g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
        i++
      )
        g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap)
      var gm = i + 1
      var gd = g_day_no + 1

      gm = gm < 10 ? '0' + gm : gm
      gd = gd < 10 ? '0' + gd : gd

      return [gy, gm, gd]
    },
    Date_gre_to_persian(gre_date) {
      let n = gre_date.split('/')

      let a = new Date(n[0], n[1] - 1, n[2])

      return a.toLocaleDateString('fa-IR-u-nu-latn')
    },
  },
}
</script>
