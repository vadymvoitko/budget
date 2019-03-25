/* eslint-disable */
import * as types from '~/store/mutation-types'

export const state = () => ({
  testState: '',
  locale: {},
})

export const getters = {
  getLocale: state => 'asdfsafd',
}

export const actions = {
  async sendContactData ({commit}, userData) {
    try {
      const res = await this.$axios.post(api.publicApi.contactUs(), userData)
    } catch (err) {
      throw err
    }
  },
}

export const mutations = {
  [types.SET_MAIN_SPINNER] (state, payload) {
    localStorage.setItem('amount', payload.amount)
    localStorage.setItem('currency', payload.currency)
  },
}
