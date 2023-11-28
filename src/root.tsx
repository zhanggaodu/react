import { useState, useRef, useReducer, createContext, useEffect, useMemo, useTransition, useDeferredValue, 
  Fragment, Suspense, useContext, forwardRef } from 'react'
import { TooltipsContent } from './pages/tooltips'
import MyInput from './pages/myInput'

type Action = {
  type: string
}
type State =  {
  age: number,
  name: string
}
type Theme = "light" | "dark" | "system"
const ThemeContext = createContext<Theme>("system")
const useGetTheme = () => useContext(ThemeContext)

export default function Root() {
  const initialState: State = { age: 20, name: 'vue' }
  const [key, setKey] = useState<number>(0) // 很神奇的用法 更改组件的key就可以得到一个新的组件
  // const [todos, setTodos] = useState(() => createTodos()); 函数返回什么类型 todos就是什么类型
  function handleClick() {
    setKey(key + 1)
  }

  // function fn(){ return 1}
  // userReducer 只能在top component和自己的组件里用 涉及值的复杂逻辑状态时和使用之前的值优于useState
  const [state, dispatch] = useReducer(reduce, initialState) // 如果初始化的状态跟初始化的函数返回值类型不一致也不会报错
  function reduce(state: State, action: Action): State {
    if (action.type === 'click') {
      return { // 返回的就是state的值 会直接覆盖
        ...state,
        age: state.age+1
      }
    }
    throw new Error('Unknown action type')
  }

  function handlerClick() {
    dispatch({type:'click'})
  }

  // useContext
  // const ThemeContext = createContext(null)

  // useRef create a value not need for rendering

  // useImperativeHandle 定制自己的ref

  // useEffect （setup, dependence?） 可能会在浏览器重绘之前执行，如果需要block re-paint使用useLayoutEffect 只能在client执行
  // 主要是使用外部的system
  // useLayoutEffect 在浏览器重绘之前触发 例如tooltip 确定弹出框在元素的上下左右
  // useinsertionEffect css in js 在更改dom之前动态插入css

  // useMemo cache result 如果数据没有变化react可以复用计算过的数据或者跳过重新渲染
  const v = useMemo(() => {
    return state.age
  },[key])
  // useCallback cache function 在重新渲染之前缓存函数
  // useTransition 更新数据但是不阻塞ui 配合suspence一起使用
  const [isPending, startTranstition] = useTransition() 
  // usedeferValue  react会首先渲染old Value then re-rendering new value in background 
  // react会重新渲染而不是更新值，在后台尝试用新值去重新渲染 节流
  const [query, setQuery] = useState('')
  const deferQuery = useDeferredValue(query)


  // build in react components
  // Fragment like <></> mutiple your jsx nodes togeter
  // Profile measurement cpu and memory overhead
  // Suspence diaplay a fallback while childcomponents are loading  fallback={<Loading/>} 嵌套使用会一层一层的出现
  // 可以和defervalue一起使用在新值被render之前会有loading
  // startTansition 高优先级的更新
  // StrictMode
  // define own components
  // forwardRef 用forwardRef声明的组件可以向外暴露ref
  const myInputRef = useRef<HTMLInputElement>(null)
  function fn() {
    myInputRef.current.focus()
  }
  // lazy 懒加载资源 第一次使用lazy的资源时react才会去resolve
  // memo skip re-rendering step when its props are unchanged
  // useFormStatus show form表单的提交状态

  let style_text = {
    color: 'green'
  }

  return (
    <Fragment>
      <ThemeContext.Provider value="dark">
        <div style={style_text} onClick={handleClick}>reset:{key}</div>
        <Suspense fallback={<h2>loading...</h2>}>
          <Form key={key} query={deferQuery}/>
        </Suspense>
        <div onClick={handlerClick}>click{state.age} {state.name}</div>
        {/* 弹出框 */}
        {/* <TooltipsContent tooltipContent={<div>this is tooltips</div>}>hover on me</TooltipsContent> */}
      </ThemeContext.Provider>
      <div> useMemo {v}</div>
      <input type="text" value={query} onChange={(e) => {setQuery(e.target.value)}} />
      <form>
        <MyInput label="Enter your name:" ref={myInputRef} />
      </form>
      <div onClick={fn}>点击暴露ref</div>
    </Fragment>
  )
}

function Form({ query }: { query: string }) {
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement>()
  useEffect(() => {
    // inputRef.current 可以在effect中更改或者作为函数的参数
    // 组价并不会向外暴露ref fix使用forwardRef
    // inputRef.current.focus()
  })
  const theme = useGetTheme()
  return (
    <>
    <div>theme{theme}</div>
      <input ref={inputRef} value={name} onChange={e => setName(e.target.value)} />
      <div>deferValue{query}</div>
    </>
  )
}