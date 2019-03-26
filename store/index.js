/* eslint-disable */
import * as types from '~/store/mutation-types'
// import node_uid from 'node-uid'

export const state = () => ({
  budgets: {
    'aaa': {
      id: 'aaa',
      name: 'Food',
      currency: 'USD',
      sum: 1000,
      remBudget: 1000,
      minTransaction: 1000,
      maxTransaction: 1000,
      averageTransaction: 1000,
      transactions: {
        'bbb': {
          id: 'bbb',
          purpose: 'Items',
          sum: 300,
          currency: 'USD'
        },
        'ccc': {
          id: 'ccc',
          purpose: 'Items',
          sum: 300,
          currency: 'USD'
        }
      }
    },
    'ddd': {
      id: 'ddd',
      name: 'Alcohol',
      currency: 'USD',
      sum: 1000,
      remBudget: 1000,
      minTransaction: 1000,
      maxTransaction: 1000,
      averageTransaction: 1000,
      transactions: {
        'bbb1': {
          purpose: 'Items',
          sum: 300,
          currency: 'USD'
        },
        'ccc1': {
          purpose: 'Items',
          sum: 300,
          currency: 'USD'
        }
      }
    }
  },
  currency_rate: 'https://api.exchangeratesapi.io/latest?base=USD'
})

export const getters = {
  getBudgets: state => state.budgets,
  getTransactionsByBudgetId: state => id => state.budgets[id].transactions,
  getBudgetById: state => id => state.budgets[id]
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
