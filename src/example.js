import zoro, { actions, loadingPlugin } from './index'
import { createLoading } from './plugin'

const delay = time => new Promise(resolve => setTimeout(resolve, time))

const app = zoro({
  onError(e) {
    console.log('onError: ', e)
  },
  onEffect(effect) {
    console.log('onEffect: ', effect)
  },
  onAction(action) {
    console.log('onAction: ', action)
  },
  async onSetup({ put, select }) {
    console.log('onSetup')
    const { timeout3 } = actions('test')
    await put(timeout3({ param: 1 }))
    console.log('end', select(state => state))
  },
})

app.use(createLoading())

app.model({
  namespace: 'test',

  state: {
    eee: 2,
  },

  async setup({ put, select }) {
    await put({ type: 'timeout' })
    await put({ type: 'test/timeout2' })
  },

  effects: {
    async timeout(action, { put }) {
      await delay(1000)
      put({
        type: 'save',
        payload: {
          name: 'test',
          error: false,
        },
      })
      await put({
        type: 'timeout2',
      })
    },
    async timeout2(action, { put }) {
      await delay(2000)
      put({
        type: 'save',
        payload: {
          name: 'test1',
          error: false,
        },
      })
    },
    async timeout3({ payload }, { put }) {
      console.log(payload)
      await delay(3000)
      put({
        type: 'save',
        payload: {
          name: 'test3',
          error: false,
        },
      })
    },
  },

  reducers: {
    save({ payload }) {
      return payload
    },
  },
})

const store = app.start(false)
store.subscribe(() => console.log('subscribe state: ', store.getState()))
store
  .dispatch({ type: 'test/timeout' })
  .then(data => console.log('test/timeout callback: ', data))
  .catch(e => console.log('test/timeout onError: ', e))
app.setup()
app.model({
  namespace: 'eee',

  setup({ put }) {
    put({ type: 'add' })
  },

  state: 0,

  reducers: {
    add(action, state) {
      return state + 1
    },
  },
})
