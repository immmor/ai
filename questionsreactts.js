const questionsreactts = [
    {
        id: 1,
        type: "select",
        title: "React TypeScript基础",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">React TypeScript中哪个关键字用于定义组件类型？</p>
                </div>`,
        options: ["React.FC", "Component", "FunctionComponent", "ReactComponent"],
        correct: 0,
        explanation: "React TypeScript中使用React.FC（FunctionComponent）类型来定义函数组件"
    },
    {
        id: 2,
        type: "fill",
        title: "React TypeScript组件定义",
        content: `<div class="p-4 font-mono text-sm">
                    <div>interface <span class="code-blank" data-id="2-1" data-answer="Props"></span> {</div>
                    <div>  name: string;</div>
                    <div>  age: number;</div>
                    <div>}</div>
                    <div>const MyComponent: <span class="code-blank" data-id="2-2" data-answer="React.FC<Props>"></span> = ({ name, age }) => {</div>
                    <div>  return &lt;div&gt;{name} - {age}&lt;/div&gt;;</div>
                    <div>};</div>
                </div>`,
        instruction: "填写TypeScript接口和组件类型",
        hint: "接口命名和React组件类型定义",
        explanation: "React TypeScript组件需要定义Props接口并使用React.FC类型"
    },
    {
        id: 3,
        type: "correct",
        title: "React TypeScript状态管理",
        content: `<div class="p-4 font-mono text-sm">
                    <div>const [count, setCount] = <span class="text-red-600">useState()</span>;</div>
                </div>`,
        instruction: "找出代码中的错误并修正（只需要输入错误的部分）",
        correct: "useState<number>(0)",
        hint: "React TypeScript中useState需要提供初始值和类型",
        explanation: "React TypeScript中useState需要指定类型和初始值，如useState<number>(0)"
    },
    {
        id: 4,
        type: "sentence",
        title: "React TypeScript事件处理",
        content: `<div class="p-4 font-mono text-sm">
                    <div>const handleClick = (event: <span class="code-blank" data-id="4-1" data-answer="React.MouseEvent"></span>) => {</div>
                    <div>  console.log('Clicked');</div>
                    <div>};</div>
                    <div>&lt;button <span class="code-blank" data-id="4-2" data-answer="onClick"></span>={handleClick}&gt;点击&lt;/button&gt;</div>
                </div>`,
        instruction: "填写React TypeScript事件处理代码",
        hint: "事件类型和事件属性",
        explanation: "React TypeScript中事件处理需要指定正确的类型，如React.MouseEvent",
        fullSentence: "const handleClick = (event: React.MouseEvent) => {\n  console.log('Clicked');\n};\n<button onClick={handleClick}>点击</button>"
    },
    {
        id: 5,
        type: "select",
        title: "React TypeScript Hook类型",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">React TypeScript中useEffect Hook的返回值类型是什么？</p>
                </div>`,
        options: ["void", "undefined", "() => void", "Promise<void>"],
        correct: 0,
        explanation: "useEffect Hook返回void类型，不能返回任何值"
    },
    {
        id: 6,
        type: "fill",
        title: "React TypeScript泛型组件",
        content: `<div class="p-4 font-mono text-sm">
                    <div>interface ListProps&lt;<span class="code-blank" data-id="6-1" data-answer="T"></span>&gt; {</div>
                    <div>  items: T[];</div>
                    <div>  renderItem: (item: T) => React.ReactNode;</div>
                    <div>}</div>
                    <div>function List&lt;T&gt;(props: ListProps&lt;T&gt;) {</div>
                    <div>  return &lt;div&gt;{props.items.map(props.renderItem)}&lt;/div&gt;;</div>
                    <div>}</div>
                </div>`,
        instruction: "填写泛型参数",
        hint: "泛型类型参数",
        explanation: "React TypeScript泛型组件使用类型参数T来定义可复用的组件"
    },
    {
        id: 7,
        type: "sentence",
        title: "React TypeScript Context",
        content: `<div class="p-4 font-mono text-sm">
                    <div>interface <span class="code-blank" data-id="7-1" data-answer="ThemeContextType"></span> {</div>
                    <div>  theme: string;</div>
                    <div>  toggleTheme: () => void;</div>
                    <div>}</div>
                    <div>const ThemeContext = <span class="code-blank" data-id="7-2" data-answer="React.createContext"></span>&lt;ThemeContextType | undefined&gt;(undefined);</div>
                    <div>export const ThemeProvider: React.FC = ({ children }) => {</div>
                    <div>  const [theme, setTheme] = useState('light');</div>
                    <div>  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');</div>
                    <div>  return &lt;ThemeContext.Provider value={{ theme, toggleTheme }}&gt;{children}&lt;/ThemeContext.Provider&gt;;</div>
                    <div>};</div>
                </div>`,
        instruction: "填写React TypeScript Context代码",
        hint: "Context类型定义和创建",
        explanation: "React TypeScript Context需要定义类型并使用React.createContext创建",
        fullSentence: "interface ThemeContextType {\n  theme: string;\n  toggleTheme: () => void;\n}\nconst ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);\nexport const ThemeProvider: React.FC = ({ children }) => {\n  const [theme, setTheme] = useState('light');\n  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');\n  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;\n};"
    },
    {
        id: 8,
        type: "sentence",
        title: "React TypeScript自定义Hook",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="8-1" data-answer="export"></span> function useLocalStorage&lt;T&gt;(key: string, initialValue: T) {</div>
                    <div>  const [storedValue, setStoredValue] = useState&lt;T&gt;(() => {</div>
                    <div>    try {</div>
                    <div>      const item = window.localStorage.getItem(key);</div>
                    <div>      return item ? JSON.parse(item) : initialValue;</div>
                    <div>    } catch (error) {</div>
                    <div>      return initialValue;</div>
                    <div>    }</div>
                    <div>  });</div>
                    <div>  const setValue = (value: T) => {</div>
                    <div>    setStoredValue(value);</div>
                    <div>    window.localStorage.setItem(key, JSON.stringify(value));</div>
                    <div>  };</div>
                    <div>  return [storedValue, setValue] <span class="code-blank" data-id="8-2" data-answer="as const"></span>;</div>
                    <div>}</div>
                </div>`,
        instruction: "填写React TypeScript自定义Hook代码",
        hint: "导出关键字和类型断言",
        explanation: "自定义Hook需要正确导出并使用类型断言确保类型安全",
        fullSentence: "export function useLocalStorage<T>(key: string, initialValue: T) {\n  const [storedValue, setStoredValue] = useState<T>(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      return initialValue;\n    }\n  });\n  const setValue = (value: T) => {\n    setStoredValue(value);\n    window.localStorage.setItem(key, JSON.stringify(value));\n  };\n  return [storedValue, setValue] as const;\n}"
    },
    {
        id: 9,
        type: "sentence",
        title: "React TypeScript高阶组件",
        content: `<div class="p-4 font-mono text-sm">
                    <div>function <span class="code-blank" data-id="9-1" data-answer="withLoading"></span>&lt;P extends object&gt;(Component: React.ComponentType&lt;P&gt;) {</div>
                    <div>  return function WithLoading(props: P & { loading?: boolean }) {</div>
                    <div>    if (props.loading) {</div>
                    <div>      return &lt;div&gt;Loading...&lt;/div&gt;;</div>
                    <div>    }</div>
                    <div>    return &lt;Component {...props} /&gt;;</div>
                    <div>  };</div>
                    <div>}</div>
                </div>`,
        instruction: "填写React TypeScript高阶组件代码",
        hint: "高阶组件函数名",
        explanation: "高阶组件是一个接收组件并返回新组件的函数",
        fullSentence: "function withLoading<P extends object>(Component: React.ComponentType<P>) {\n  return function WithLoading(props: P & { loading?: boolean }) {\n    if (props.loading) {\n      return <div>Loading...</div>;\n    }\n    return <Component {...props} />;\n  };\n}"
    },
    {
        id: 10,
        type: "sentence",
        title: "React TypeScript路由",
        content: `<div class="p-4 font-mono text-sm">
                    <div>interface <span class="code-blank" data-id="10-1" data-answer="RouteParams"></span> {</div>
                    <div>  id: string;</div>
                    <div>}</div>
                    <div>const UserDetail: React.FC = () => {</div>
                    <div>  const { id } = useParams&lt;<span class="code-blank" data-id="10-2" data-answer="RouteParams"></span>&gt;() as RouteParams;</div>
                    <div>  return &lt;div&gt;User ID: {id}&lt;/div&gt;;</div>
                    <div>};</div>
                </div>`,
        instruction: "填写React TypeScript路由参数代码",
        hint: "路由参数接口定义和使用",
        explanation: "React Router TypeScript需要定义路由参数接口",
        fullSentence: "interface RouteParams {\n  id: string;\n}\nconst UserDetail: React.FC = () => {\n  const { id } = useParams<RouteParams>() as RouteParams;\n  return <div>User ID: {id}</div>;\n};"
    },
    {
        id: 11,
        type: "sentence",
        title: "React TypeScript表单处理",
        content: `<div class="p-4 font-mono text-sm">
                    <div>interface <span class="code-blank" data-id="11-1" data-answer="FormData"></span> {</div>
                    <div>  name: string;</div>
                    <div>  email: string;</div>
                    <div>}</div>
                    <div>const MyForm: React.FC = () => {</div>
                    <div>  const [formData, setFormData] = useState&lt;FormData&gt;({ name: '', email: '' });</div>
                    <div>  const handleChange = (e: <span class="code-blank" data-id="11-2" data-answer="React.ChangeEvent<HTMLInputElement>"></span>) => {</div>
                    <div>    setFormData({ ...formData, [e.target.name]: e.target.value });</div>
                    <div>  };</div>
                    <div>  return &lt;form&gt;</div>
                    <div>    &lt;input name="name" value={formData.name} onChange={handleChange} /&gt;</div>
                    <div>    &lt;input name="email" value={formData.email} onChange={handleChange} /&gt;</div>
                    <div>  &lt;/form&gt;;</div>
                    <div>};</div>
                </div>`,
        instruction: "填写React TypeScript表单处理代码",
        hint: "表单数据接口和事件类型",
        explanation: "React TypeScript表单需要定义数据接口和正确的事件类型",
        fullSentence: "interface FormData {\n  name: string;\n  email: string;\n}\nconst MyForm: React.FC = () => {\n  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });\n  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n    setFormData({ ...formData, [e.target.name]: e.target.value });\n  };\n  return <form>\n    <input name=\"name\" value={formData.name} onChange={handleChange} />\n    <input name=\"email\" value={formData.email} onChange={handleChange} />\n  </form>;\n};"
    },
    {
        id: 12,
        type: "sentence",
        title: "React TypeScript Redux",
        content: `<div class="p-4 font-mono text-sm">
                    <div>interface <span class="code-blank" data-id="12-1" data-answer="CounterState"></span> {</div>
                    <div>  value: number;</div>
                    <div>}</div>
                    <div>const initialState: CounterState = { value: 0 };</div>
                    <div>const counterSlice = createSlice({</div>
                    <div>  name: 'counter',</div>
                    <div>  initialState,</div>
                    <div>  reducers: {</div>
                    <div>    increment: (state) => { state.value += 1; },</div>
                    <div>    decrement: (state) => { state.value -= 1; }</div>
                    <div>  }</div>
                    <div>});</div>
                    <div>export const { increment, decrement } = counterSlice.actions;</div>
                    <div>export <span class="code-blank" data-id="12-2" data-answer="default"></span> counterSlice.reducer;</div>
                </div>`,
        instruction: "填写React TypeScript Redux代码",
        hint: "状态接口和默认导出",
        explanation: "Redux Toolkit TypeScript需要定义状态接口",
        fullSentence: "interface CounterState {\n  value: number;\n}\nconst initialState: CounterState = { value: 0 };\nconst counterSlice = createSlice({\n  name: 'counter',\n  initialState,\n  reducers: {\n    increment: (state) => { state.value += 1; },\n    decrement: (state) => { state.value -= 1; }\n  }\n});\nexport const { increment, decrement } = counterSlice.actions;\nexport default counterSlice.reducer;"
    },
    {
        id: 13,
        type: "sentence",
        title: "React TypeScript测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>import { render, screen } from '@testing-library/react';</div>
                    <div>import userEvent from '@testing-library/user-event';</div>
                    <div>test('should increment counter', <span class="code-blank" data-id="13-1" data-answer="async"></span> () => {</div>
                    <div>  render(&lt;Counter /&gt;);</div>
                    <div>  const button = screen.getByRole('button');</div>
                    <div>  <span class="code-blank" data-id="13-2" data-answer="await"></span> userEvent.click(button);</div>
                    <div>  expect(screen.getByText('1')).toBeInTheDocument();</div>
                    <div>});</div>
                </div>`,
        instruction: "填写React TypeScript测试代码",
        hint: "异步测试关键字",
        explanation: "React Testing Library TypeScript测试需要使用async/await处理异步操作",
        fullSentence: "import { render, screen } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\ntest('should increment counter', async () => {\n  render(<Counter />);\n  const button = screen.getByRole('button');\n  await userEvent.click(button);\n  expect(screen.getByText('1')).toBeInTheDocument();\n});"
    },
    {
        id: 14,
        type: "sentence",
        title: "React TypeScript性能优化",
        content: `<div class="p-4 font-mono text-sm">
                    <div>interface <span class="code-blank" data-id="14-1" data-answer="ExpensiveComponentProps"></span> {</div>
                    <div>  data: string[];</div>
                    <div>}</div>
                    <div>const ExpensiveComponent = <span class="code-blank" data-id="14-2" data-answer="React.memo"></span>&lt;ExpensiveComponentProps&gt;(({ data }) => {</div>
                    <div>  return &lt;div&gt;{data.join(', ')}&lt;/div&gt;;</div>
                    <div>});</div>
                </div>`,
        instruction: "填写React TypeScript性能优化代码",
        hint: "组件Props接口和记忆化",
        explanation: "使用React.memo可以避免不必要的重新渲染，提高性能",
        fullSentence: "interface ExpensiveComponentProps {\n  data: string[];\n}\nconst ExpensiveComponent = React.memo<ExpensiveComponentProps>(({ data }) => {\n  return <div>{data.join(', ')}</div>;\n});"
    }
];