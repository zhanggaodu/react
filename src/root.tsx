import { useState, useContext } from 'react'

export default function Root(ThemeContext) {
  const [key, setKey] = useState(0) // 很神奇的用法
  // const [todos, setTodos] = useState(() => createTodos()); 函数返回什么类型 todos就是什么类型
  function handleClick() {
    setKey(key + 1)
  }

  // userReducer
  const theme = useContext(ThemeContext)
  // useRef 可以用于timer html元素
  // useEffect noreact
  // useMemo cache result
  // useCallback cache function
  return (
    <>
    <div onClick={handleClick}>reset:{key}</div>
    <Form key={key} />
    </>
  )
}
function Form() {
  const [name, setName] = useState('')
  return (
    <input value={name} onChange={e => setName(e.target.value)} />
  )
}