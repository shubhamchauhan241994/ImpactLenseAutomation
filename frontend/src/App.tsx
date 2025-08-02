import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AnalysisHistoryPage } from './pages/AnalysisHistoryPage'
import { Layout } from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<AnalysisHistoryPage />} />
      </Routes>
    </Layout>
  )
}

export default App 