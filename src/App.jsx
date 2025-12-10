import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ContactsProvider } from './context/ContactsContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Contacts from './pages/Contacts'
import Deals from './pages/Deals'
import Companies from './pages/Companies'
import Tasks from './pages/Tasks'
import Calendar from './pages/Calendar'
import './App.css'

function App() {
  console.log('📱 App component rendering...')
  
  return (
    <ContactsProvider>
      <Router basename="/LeadZone">
        <div className="app-layout">
          <Sidebar />
          <div className="main-content">
            <Header />
            <main className="page-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ContactsProvider>
  )
}

export default App
