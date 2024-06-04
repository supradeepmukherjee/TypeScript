import { FormEvent, ReactNode, createContext, useReducer, useState } from "react"
import Box from "./Components/Box"
import ContextBox from "./Components/ContextBox"
import { useDispatch, useSelector } from "react-redux"
import { decrement, increment } from "./redux"

interface Person {
  name: string
  age: number
}

type ThemeType = 'light' | 'dark'
interface ThemeContextType {
  theme: ThemeType
  toggleTheme: () => void
}
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => { }
})
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('light')
  return <ThemeContext.Provider value={{
    theme,
    toggleTheme: () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }}>
    {children}
  </ThemeContext.Provider>
}
type StateType = { count: number }
type ActionType =
  {
    type: 'Increment',
    payload: number
  }
  |
  {
    type: 'Decrement',
    payload: number
  }
const reducer = (state: StateType, { payload, type }: ActionType) => {
  switch (type) {
    case 'Increment':
      return { count: state.count + payload }
    case 'Decrement':
      return { count: state.count - payload }
    default:
      return state
  }
}
const initialState: StateType = {
  count: 0
}

function App() {
  const [val, setVal] = useState<string>('')
  const [user, setUser] = useState<Person>({
    name: '',
    age: 0
  })
  const [count, setCount] = useState<number>(0)
  const dispatchRedux = useDispatch()
  const countRedux = useSelector(({ count }: StateType) => count)
  const submitHandler = (e: FormEvent<HTMLFormElement>) => e.preventDefault()
  const [state, dispatch] = useReducer(reducer, initialState,)
  const inc = (): void => dispatch({
    type: 'Increment',
    payload: 1
  })
  const dec = (): void => dispatch({
    type: 'Decrement',
    payload: 1
  })
  const incRedux = () => dispatchRedux(increment(count))
  const decRedux = () => dispatchRedux(decrement(count))
  return (
    <ThemeProvider>
      {/* <Box label="Search" setter={setVal} val={val} /> */}
      <form onSubmit={submitHandler}>
        <input type="number" value={user.age} onChange={e => setUser({ ...user, age: Number(e.target.value) })} placeholder="Enter your Age" />
        <input type="text" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} placeholder="Enter your Name" />
        <button type="submit">
          Register
        </button>
      </form>
      <ContextBox />
      <h1>
        Count Change
      </h1>
      <p>
        Count: {state.count}
      </p>
      <button onClick={dec}>
        -
      </button>
      <button onClick={inc}>
        +
      </button>
      <h1>
        Count Change Redux
      </h1>
      <p>
        Redux Count: {countRedux}
      </p>
      <input type="number" value={count} onChange={e => setCount(Number(e.target.value))} />
      <button onClick={decRedux}>
        -
      </button>
      <button onClick={incRedux}>
        +
      </button>
    </ThemeProvider>
  )
}

export default App