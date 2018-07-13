//基于redux
import { combineReducers } from 'redux'
//封装整个命名空间model
import Model from './model'

//封装结合Store
import createStore from './store'

//获取所有的action type定义封装
import { PLUGIN_EVENT, NAMESPACE_DIVIDER} from "./constant";

import
