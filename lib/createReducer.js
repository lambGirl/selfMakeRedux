//引入工具库
import {assert,isObject,isFunction} from "./until";

export default (initialState, handlers = {})=>{
    //先判断对象，否则throw
    assert(
        isObject(handlers),
        'the second argument of createReducer should be an object',
    )

    return (state =  initialState, action)=>{
        if({}.hasOwnProperty.call(handlers, action.type)){
            const handler = handlers[action.type]
            return handler(action, state)
        }

        //先判断方法，否则throw
        assert(
            isFunction(handler),
            `the reducer handler should be a function, but we get ${typeof handler}`,
        )

        return state
    }
}
