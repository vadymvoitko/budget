/* eslint-disable */
import * as types from '~/store/mutation-types'
import Vue from 'vue'
import uid from 'uid'
import axios from 'axios'

export const state = () => ({
  currencyPairs: {},
  currencyExchangeURL: 'https://api.exchangeratesapi.io/latest',
  budgets: {
    'aaa': {
      id: 'aaa',
      name: 'Food',
      currency: 'USD',
      sum: 1000,
      remBudget: 1000,
      minTransaction: 1000,
      maxTransaction: 1000,
      averageTransaction: 1000
    },
    'ddd': {
      id: 'ddd',
      name: 'Alcohol',
      currency: 'USD',
      sum: 1000,
      remBudget: 1000,
      minTransaction: 1000,
      maxTransaction: 1000,
      averageTransaction: 1000
    }
  },
  transactions: {
    'aaa': {
      'bbb1': {
        target: 'Items',
        sum: 300,
        currency: 'USD'
      },
      'ccc1': {
        target: 'Items',
        sum: 300,
        currency: 'USD'
      }
    }
  }
})

export const getters = {
  getBudgets: ({budgets}) => budgets,
  getTransactionsByBudgetId: ({ transactions }) => id => transactions[id],
  getBudgetById: ({budgets}) => id => budgets[id],
  getAvailableCurrencies: () => process.env.currency,
  getCurrencyPairs: ({currencyPairs}) => currencyPairs
}

export const actions = {
  addBudget({state:{ budgets }, commit }, {name, currency, sum }) {
    let id;
    do { id = uid(10) } while (id in budgets)
    commit(types.ADD_BUDGET, {
      id,
      name,
      currency,
      sum,
      remBudget: sum,
      minTransaction: 0,
      maxTransaction: 0,
      averageTransaction: 0
    })
  },
  addTransaction({ state: { transactions, budgets, currencyPairs }, commit, dispatch }, {budgetId, target, sum, currency}) {
    let id;
    do {
      id = uid(10)
    } while (transactions[budgetId] && id in transactions[budgetId])
    const currencyRate = currencyPairs[budgets[budgetId].currency][currency];
    const sumInBudgetCurrency = sum * currencyRate;

    commit(types.ADD_TRANSACTION, {
      id,
      target,
      currency,
      sum,
      budgetId,
      sumInBudgetCurrency
    })
    dispatch('calculateBudget', {
      budgetId,
      sum,
      sumInBudgetCurrency
    })
  },
  calculateBudget({ state, commit }, { budgetId, sumInBudgetCurrency}) {
    const newSum = state.budgets[budgetId].remBudget - sumInBudgetCurrency
    commit(types.UPDATE_BUDGET, { budgetId, newSum })
  },
  deleteTransaction({commit, state: {budgets, transactions}}, payload){
    if (!(transactions[payload.budgetId] && transactions[payload.budgetId][payload.transactionId] && budgets[payload.budgetId])) {
      commit(types.SHOW_ERROR, 'Cannot delete item');
      return;
    }
    const newSum = budgets[payload.budgetId].remBudget + transactions[payload.budgetId][payload.transactionId].sumInBudgetCurrency
    commit(types.UPDATE_BUDGET, {
      budgetId: payload.budgetId,
      newSum: newSum
    })
    commit(types.DELETE_TRANSACTION, payload)
  },
  async generateCurrencyPairs({state, getters, commit, dispatch}) {
    await getters.getAvailableCurrencies.forEach(async base => {
      try {
        const response = await axios.get(state.currencyExchangeURL, {params: {base}} );
        const rates = response.data && response.data.rates
        commit(types.SET_CURRENCY_PAIRS, {base, rates})
      } catch (err) {
        console.log(err)
      }
    });
    setTimeout(() => {
      dispatch('generateCurrencyPairs')
    }, 108000);
  },
}

export const mutations = {
  [types.ADD_BUDGET]({budgets}, payload ) {
    Vue.set(budgets, payload.id, {
      ...payload
    })
    localStorage.setItem('sum', payload.sum)
  },
  [types.SET_CURRENCY_PAIRS](state, {base, rates} ) {
    Vue.set(state.currencyPairs, base, {
      ...rates
    })
  },
  [types.ADD_TRANSACTION]({transactions}, payload) {
    if (!transactions[payload.budgetId]) transactions[payload.budgetId] = {}
    Vue.set(transactions[payload.budgetId], payload.id, {
      ...payload
    })
  },
  [types.UPDATE_BUDGET]({ budgets }, { budgetId, newSum }) {
    budgets[budgetId].remBudget = newSum
  },
  [types.DELETE_TRANSACTION]({ transactions }, { budgetId, transactionId }) {
    delete transactions[budgetId][transactionId]
  },
  [types.SHOW_ERROR](state, payload) {
    console.error(payload)
  }
}
