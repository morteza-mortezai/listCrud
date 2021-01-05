const axios = require('axios')
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzk3ODYzMmU1YWI0MThmZDc3OGEwMSIsInVzZXJuYW1lIjoiYmFiYWsiLCJ0eXBlIjoidGF4IiwiYXBwIjp7ImFwcElkIjoiNWUyNDRhNDhkMjZhYmJmZmVjMGFjZDdkIiwiYXBwTmFtZSI6IkNwYXkgVGF4Iiwib3JnIjp7Im9yZ0lkIjoiNWUzNTJmYjBiNzU3MjBiYjg4MzEyMmFlIiwicm9sZXMiOlt7InJvbGVJZCI6IjVlOTE1NzY4ZjhlODIzMDAxOGZjOTIxYSIsInJvbGVOYW1lIjoiQWRtaW4iLCJfaWQiOiI1ZTQwMDdhMzJhMWNlNDFlYjUzZWE3ZjcifV19fSwiaWF0IjoxNjA5ODIzMzMyLCJleHAiOjE2MDk5MDk3MzJ9.FCV__VIuNd3Ml0ZtAR9MKrle57iOaZDXkRicvjvx4NE'
const bU = 'https://taxapi.cpay.ir/api/app'

export const state = () => ({
  search_query: {},

  fields: [
    { key: 'id', label: 'شناسه' },
    { key: 'name', label: 'نام' },
    { key: 'title', label: 'عنوان' },
    { key: 'action', label: 'اکشن' },
    { key: 'edit', label: 'ویرایش' },
    { key: 'generall', label: 'عمومی' },
    { key: 'active', label: 'فعال' },
  ],
  items: [],
  items2: [],
})

export const getters = {
  getter_items: (state) => {
    if (state.search_query.name && !state.search_query.title) {
      return state.items.filter((i) => i.name.includes(state.search_query.name))
    }

    if (state.search_query.title && !state.search_query.name) {
      return state.items.filter((i) =>
        i.title.includes(state.search_query.title)
      )
    }
    if (state.search_query.title && state.search_query.name) {
      return state.items.filter(
        (i) =>
          i.title.includes(state.search_query.title) &&
          i.name.includes(state.search_query.name)
      )
    }
    if (!state.search_query.name && !state.search_query.title) {
      return state.items
    }
  },
  getter_fields: (state) => {
    return state.fields
  },
  getter_all_items: (state) => {
    return state.items
  },
}

export const mutations = {
  mut_search_query(state, search_value) {
    state.search_query = search_value
  },
  mut_set_all(state, v) {
    state.items = v
    console.log('array', v)
  },
  mut_delete(state, id) {
    let a = state.items.filter((i) => i.id === id)
    let b = state.items.indexOf(a)
    state.items.splice(b, 1)
  },
  add_item(state, item) {
    state.items.push(item)
  },

  update(state, m) {
    state.items.splice(state.items.indexOf(m.old), 1, m.new)
  },

  mut_toggle(state, id) {
    let a = state.items.filter((i) => i.id === id)
    let b = state.items.indexOf(a)
    state.items.isDeleted = !state.items.isDeleted
  },
  mut_set_other_data(state, nv) {
    state.items2.push({
      name: nv.name,
      imgaddr: nv.imgaddr,
      date: nv.date,
    })
    console.log('pushed to other array' , state.items2)
  },
}

export const actions = {
  action_set_search_query(context, v) {
    context.commit('mut_search_query', v)
  },
  delete(context, id) {
    console.log('item for delete', id)
    axios
      .post(
        bU + '/delete',
        { appId: id },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log('data deleted', res)
      })
      .catch((err) => {
        console.log('delete  error', err)
      })
      .then(() => {
        context.commit('mut_delete', id)
      })
  },

  update_item(context, nv) {
    console.log('update', nv)
    axios
      .post(
        bU + '/update',
        {
          name: nv.name,
          title: nv.title,
          url: nv.website,
          isGeneral: nv.generall,
          secretKey: '',
          description: nv.description,
          appId: nv.id,
        },

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log('rec data', res)
      })
      .catch((err) => {
        console.log('fetch error', err)
      })
  },

  add_item_a(context, nv) {
    axios
      .post(
        bU + '/create',
        {
          name: nv.name,
          title: nv.title,
          url: nv.website,
          isGeneral: nv.generall,
          secretKey: '',
          description: nv.title,
        },

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log('rec data', res)
        context.commit('mut_set_other_data', nv)
      })
      .catch((err) => {
        console.log('fetch error', err)
      })
  },
  toggle(context, id) {
    console.log('status change id', id)
    axios
      .post(
        bU + '/status/change',
        { appId: id },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log('status changed', res)
      })
      .then(() => {
        context.commit('mut_toggle', id)
      })
      .catch((err) => {
        console.log('status change ', err)
      })
  },

  get_all_items(context) {
    axios
      .post(
        bU + '/getall',
        { pageNum: 0, count: 10 },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log('rec data', res.data.result.apps)
        context.commit('mut_set_all', res.data.result.apps)
      })
      .catch((err) => {
        console.log('fetch error', err)
      })
  },
}
