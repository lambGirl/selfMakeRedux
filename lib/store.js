//底层基于redux，标准三要数
import {createStore, applyMiddleware, compose } from 'redux'

const window =  (function(){return this})() || Function('return this')();

//抛出一个集成了reducer，ware，state的store，middle中间件
export default ({rootReducer, middlewares, initialState})=>{

   const composeEnhancers = window&&window..__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
   ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
   :compose;
   const store = createStore(
       rootReducer,
       initialState,
       composeEnhancers(applyMiddleware(...middlewares))
   )
    return store;
}
