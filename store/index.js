/* eslint-disable */
import * as types from '~/store/mutation-types'
import Vue from 'vue'
import uid from 'uid'
import axios from 'axios'
import { Decimal as D } from 'decimal.js'

export const state = () => ({
  currencyPairs: {},
  currencyExchangeURL: 'https://api.exchangeratesapi.io/latest',
  budgets: {},
  transactions: {}
})

export const getters = {
  getBudgets: ({budgets}) => budgets,
  getTransactionsByBudgetId: ({ transactions }) => id => transactions[id],
  getBudgetById: ({budgets}) => id => {
    const cloneBudget = {...budgets[id]}
    delete cloneBudget.transactionSums
    return cloneBudget
  },
  getAvailableCurrencies: () => process.env.currency,
  getCurrencyPairs: ({ currencyPairs }) => currencyPairs
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
      minTransaction: new D(0),
      maxTransaction: new D(0),
      averageTransaction: new D(0),
      transactionSums: []
    })
    $nuxt._router.push(`/budget/${id}`)
  },
  addTransaction({ state: { transactions, budgets, currencyPairs }, commit, dispatch }, {budgetId, target, sum, currency}) {
    let id;
    do {
      id = uid(10)
    } while (transactions[budgetId] && id in transactions[budgetId])
    const currencyRate = new D(currencyPairs[budgets[budgetId].currency][currency]);
    const sumInBudgetCurrency = new D(sum.div(currencyRate).toFixed(2));
    let newTransactionSums = [...budgets[budgetId].transactionSums]
    newTransactionSums.push(sumInBudgetCurrency)

    commit(types.UPDATE_BUDGET_TRANSACTION_SUMMS, {
      budgetId,
      newTransactionSums
    })
    commit(types.ADD_TRANSACTION, {
      id,
      target,
      currency,
      sum,
      budgetId,
      sumInBudgetCurrency
    })
    dispatch('calculateBudgetsStatistic', budgetId)
    dispatch('calculateBudget', {
      budgetId,
      sum,
      sumInBudgetCurrency
    })
  },
  calculateBudget({ state, commit }, { budgetId, sumInBudgetCurrency}) {
    const newSum = new D(new D(state.budgets[budgetId].remBudget).sub(sumInBudgetCurrency).toFixed(2))
    commit(types.UPDATE_BUDGET, { budgetId, newSum })
  },
  deleteTransaction({commit, state: {budgets, transactions}, dispatch}, {budgetId, transactionId}){
    if (!(transactions[budgetId] && transactions[budgetId][transactionId] && budgets[budgetId])) {
      commit(types.SHOW_ERROR, 'Cannot delete item');
      return;
    }
    const newSum = new D(budgets[budgetId].remBudget).add(new D(transactions[budgetId][transactionId].sumInBudgetCurrency))
    let newTransactionSums = [...budgets[budgetId].transactionSums]
    newTransactionSums.splice(newTransactionSums.indexOf(transactions[budgetId][transactionId].sumInBudgetCurrency), 1)
    commit(types.UPDATE_BUDGET_TRANSACTION_SUMMS, {
      budgetId,
      newTransactionSums
    })
    commit(types.UPDATE_BUDGET, {
      budgetId: budgetId,
      newSum: newSum
    })
    commit(types.DELETE_TRANSACTION, {budgetId, transactionId})
    dispatch('calculateBudgetsStatistic', budgetId)
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
  deriveDataFromStorage({commit}) {
    const budgets = localStorage.getItem('budgets')
    const transactions = localStorage.getItem('transactions')
    budgets && commit(types.INIT_BUDGETS, JSON.parse(budgets))
    transactions && commit(types.INIT_TRANSACTIONS, JSON.parse(transactions))
  },
  calculateBudgetsStatistic({commit, state}, budgetId) {
    const transactionSumsById = state.budgets[budgetId].transactionSums;
    const stats = transactionSumsById.reduce((acc, next) => {
      acc.average = acc.average.add(next)
      acc.min = acc.min !== undefined && acc.min.lte(next) ? acc.min : next
      acc.max = acc.max.gte(next) ? acc.max : next
      return acc
    },{
      max: new D(0),
      average: new D(0)
    })
    stats.average = new D(stats.average.div(new D(transactionSumsById.length)).toFixed(2))
    commit(types.UPDATE_STATISTIC, {stats, budgetId})
  }
}

export const mutations = {
  [types.ADD_BUDGET]({budgets}, payload ) {
    Vue.set(budgets, payload.id, {
      ...payload
    })
    localStorage.setItem('budgets', JSON.stringify(budgets))
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
    localStorage.setItem('transactions', JSON.stringify(transactions))
  },
  [types.UPDATE_BUDGET]({ budgets }, { budgetId, newSum }) {
    budgets[budgetId].remBudget = newSum
    localStorage.setItem('budgets', JSON.stringify(budgets))
  },
  [types.DELETE_TRANSACTION]({ transactions, budgets }, { budgetId, transactionId }) {
    delete transactions[budgetId][transactionId]
    localStorage.setItem('transactions', JSON.stringify(transactions))
  },
  [types.SHOW_ERROR](state, payload) {
    console.error(payload)
  },
  [types.INIT_BUDGETS](state, payload) {
    state.budgets = payload;
  },
  [types.INIT_TRANSACTIONS](state, payload) {
    state.transactions = payload;
  },
  [types.UPDATE_STATISTIC]({ budgets }, {stats, budgetId}) {
    budgets[budgetId].minTransaction = stats.min;
    budgets[budgetId].maxTransaction = stats.max;
    budgets[budgetId].averageTransaction = stats.average;
  },
  [types.UPDATE_BUDGET_TRANSACTION_SUMMS]({ budgets }, {
    budgetId,
    newTransactionSums
  }) {
    budgets[budgetId].transactionSums = newTransactionSums
  },
}
