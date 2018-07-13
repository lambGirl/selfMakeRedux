//判断是不是布尔类型
export const isBoolean = bool => typeof bool === 'boolean'
//判断是不是function
export const isFunction  = func => typeof  func === 'function'
//用方法来组织继续输出后面的东西
export const assert = (validate, message)=>{
    if( (isBoolean(validate)&& !validate)||(isFunction(validate)&& !validate())){
        throw  new Error(message);
    }
}

//判断是否为对象
export const isObject =  obj => obj !== null && typeof  obj === 'object' && !isArray(obj)

export const noop = () => {}
