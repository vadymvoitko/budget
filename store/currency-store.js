/* eslint-disable */
import * as types from '~/store/mutation-types'
import Vue from 'vue'
import { http } from './axiosConfig'
import { from } from 'rxjs'
import { distinctUntilChanged, pluck } from 'rxjs/operators'

export const state = () => ({
  currencyPairs: {}
})

export const getters = {
  getAvailableCurrencies: () => process.env.currency
}

let subscriptions = []

export const actions = {
  generateCurrencyPairs({getters, commit, dispatch}) {
    getters.getAvailableCurrencies.forEach(async base => {
      // here I use alternative to ugly promise - rx Observables in the simpliest implementation to
      // not increase the complexity. In case of big data, chained operations can be piped
      // and the difficulcy of algoithm will remain x1 as opposed to native js where it will be x*chains.
      // Moreover it gives you more functions to process the data
      subscriptions.push(from
        (http.get('/latest', {params: {base}} ))
        .pipe(
            distinctUntilChanged(),
            pluck('data', 'rates')
          )
        .subscribe(
          rates => commit(types.SET_CURRENCY_PAIRS, {base, rates}),
          error => commit(types.SHOW_ERROR, error)
        ))
    });
    setTimeout(() => {
      subscriptions.forEach(item => item.unsubscribe())
      subscriptions = []
      dispatch('generateCurrencyPairs')
    }, 1800000);
  },
}

export const mutations = {
  [types.SET_CURRENCY_PAIRS](state, {base, rates} ) {
    Vue.set(state.currencyPairs, base, {
      ...rates
    })
  },
  [types.SHOW_ERROR](state, payload) {
    console.error(payload)
  }
}
