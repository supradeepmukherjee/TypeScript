import { Suspense, lazy } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Header from './Components/Header'
import Loader from './Components/Loader'
const Home = lazy(() => import("./Components/Home"))
const Learn = lazy(() => import("./Components/Learn"))
const Quiz = lazy(() => import("./Components/Quiz"))
const Result = lazy(() => import("./Components/Result"))

const App = () => (
  <Router>
    <Header />
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Suspense>
  </Router>
)

export default App