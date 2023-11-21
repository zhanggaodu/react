import { useState, useRef, useReducer, createContext, useEffect } from 'react'

export default function Root() {
  const [key, setKey] = useState(0) // 很神奇的用法
  // const [todos, setTodos] = useState(() => createTodos()); 函数返回什么类型 todos就是什么类型
  function handleClick() {
    setKey(key + 1)
  }

  // function fn(){ return 1}
  // userReducer 只能在top component和自己的组件里用 涉及值的复杂逻辑状态时和使用之前的值优于useState
  const [state, dispatch] = useReducer(reduce, {age: 20, name: 'vue'}) // 如果初始化的状态跟初始化的函数返回值类型不一致也不会报错
  function reduce(state: any, action: object) {
    if (action.type === 'click') {
      return { // 返回的就是state的值 会直接覆盖
        ...state,
        age: state.age+1
      }
    }
  }
  function handlerClick() {
    dispatch({type:'click'})
  }

  // useContext
  const ThemeContext = createContext(null)

  // useRef create a value not need for rendering

  // useImperativeHandle 定制自己的ref

  // useEffect noreact （setup, dependence?） 可能会在浏览器重绘之前执行，如果需要block re-paint使用useLayoutEffect 只能在client执行


  // useMemo cache result
  // useCallback cache function
  return (
    <>
    <ThemeContext.Provider value="dark">
      <div onClick={handleClick}>reset:{key}</div>
      <Form key={key} />
      <div onClick={handlerClick}>click{state.age} {state.name}</div>
    </ThemeContext.Provider>
    </>
  )
}
function Form() {
  const [name, setName] = useState('')
  const inputRef = useRef(null)
  useEffect(() => {
    // inputRef.current 可以在effect中更改或者作为函数的参数
    // 组价并不会向外暴露ref fix使用forwardRef
    console.log(inputRef.current)
    inputRef.current.focus()
  })
  // const theme = useContext(ThemeContext)
  return (
    <>
      <input ref={inputRef} value={name} onChange={e => setName(e.target.value)} />
    </>
  )
}