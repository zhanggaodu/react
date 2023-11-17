import { useState, useContext } from 'react'

export default function Root(ThemeContext) {
  const [index, setIndex] = useState(0)
  const [todos, setTodos] = useState(() => createTodos());
  function handleClick() {
    setIndex(index => index + 1)
    setIndex(index => index + 1) // nextstate
  }
  function createTodos() {
    return 'todo2'
  }
  // userReducer
  const theme = useContext(ThemeContext)
  // useRef 可以用于timer html元素
  // useEffect noreact
  // useMemo cache result
  // useCallback cache function
  return (
    <>
    <div onClick={handleClick}>index:{index + todos}</div>
    </>
  )
}