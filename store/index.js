/* eslint-disable */
import * as types from '~/store/mutation-types'
import Vue from 'vue'
import uid from 'uid'

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
  addBudget({state:{ budgets }, commit }, {name, currency, sum }) {
    let id;
    do { id = uid() } while (id in budgets)
    commit(types.ADD_BUDGET, {
      id,
      name,
      currency,
      sum,
      remBudget: sum,
      minTransaction: sum,
      maxTransaction: sum,
      averageTransaction: 1000,
      transactions: {}
    })
  }
}

export const mutations = {
  [types.ADD_BUDGET]({budgets}, payload ) {
    Vue.set(budgets, payload.id, {
      ...payload
    })
    localStorage.setItem('sum', payload.sum)
  },
}
