//传入state, hanlers, action回传注入
import createReducer from 'createReducer'
import { assert, isFunction, noop} from "./until";

//建立action type
import { NAMESPACE_DIVIDER } from './constant'

//加一个判断是够存在的验证方法
const assertOpts =  opts => {
    const { namespace } = opts;

    assert(
        !!namespace,
        `the model's namespace is necessary, but we get ${namespace}`,
    )
}

class Model {

    constructor(opts){
        assertOpts(opts);
        const {
            namespace,  // 注入命名空间
            state = null,   //空间数据封装
            reducers = {},  //数据处理模块
            effects = {},   //事件封装 action
            setup = noop,   //监听的部分页面初始化事件1
        } = opts
        //将当model传入的对象进行抽离,封装,拓展
        this.namespace =  namespace;
        this.defaultState =  state;
        this.reducers =  this.createReducer(reducers)
        this.effects =  this.createEffects(effects);
        this.actions =  this.createActions({
            ...reducers,
            ...effects
        });
        this.handleSetup = setup;
    }
    getNamespace(){
        return this.namespace;
    }

    getEffects(){
        return this.effects;
    }

    getReducers(){
        return this.reducers;
    }

    getDefaultState(){
        return this.defaultState
    }

    getActions(){
        return this.actions
    }

    createActionType(type){
        return  `${this.namespace}${NAMESPACE_DIVIDER}${type}`;
    }

    //根据单个空间生成， reducers
    createReducer(reducers){
        const _reducers =  Object.keys(reducers).reduce((combine, key)=>{
            const reducer =  reducers[key];
            const type =  this.createActionType(key);
            assert(
                isFunction(reducer),
                `the reducer must be an function, but we get ${typeof reducer} with type ${type}`,
            )
            return {...combine, [type]:reducer}
        }, {})

        //
        return createReducer(this.defaultState, _reducers)
    }
    //根据单个空间生成, Action
    createActions(actions){
        const _that =  this;
        return Object.key(actions).reduce((combine, name)=>({
            ...combine,
            [name]: function(payload, meta, error) {
            return {
                type: _that.createActionType(name),
                payload,
                meta,
                error,
            }
        },
        }),{})
    }

    //根据单个空间生成，Effects
    createEffects(effects){
        return Object.keys(effects).reduce((combine, key) => {
            const effect = effects[key]
            const type = this.createActionType(key)
            assert(
                isFunction(effect),
                `the effect must be an function, but we get ${typeof effect} with type ${type}`,
            )
            return { ...combine, [type]: effect }
         }, {})
    }
}
 export default Model
