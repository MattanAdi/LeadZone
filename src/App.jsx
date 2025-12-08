import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import Contacts from './components/Contacts'
import { CRMContext } from './context/CRMContext'

function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load contacts from localStorage
    const savedContacts = localStorage.getItem('crm-contacts')
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts))
    } else {
      // Initialize with sample data
      const sampleContacts = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          company: 'Acme Corp',
          status: 'lead',
          value: 5000,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '+1 (555) 234-5678',
          company: 'Tech Solutions',
          status: 'customer',
          value: 15000,
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Bob Johnson',
          email: 'bob.johnson@example.com',
          phone: '+1 (555) 345-6789',
          company: 'Digital Agency',
          status: 'lead',
          value: 8000,
          createdAt: new Date().toISOString(),
        },
      ]
      setContacts(sampleContacts)
      localStorage.setItem('crm-contacts', JSON.stringify(sampleContacts))
    }
    setLoading(false)
  }, [])

  const addContact = (contact) => {
    const newContact = {
      ...contact,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    const updatedContacts = [...contacts, newContact]
    setContacts(updatedContacts)
    localStorage.setItem('crm-contacts', JSON.stringify(updatedContacts))
  }

  const updateContact = (id, updatedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, ...updatedContact } : contact
    )
    setContacts(updatedContacts)
    localStorage.setItem('crm-contacts', JSON.stringify(updatedContacts))
  }

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id)
    setContacts(updatedContacts)
    localStorage.setItem('crm-contacts', JSON.stringify(updatedContacts))
  }

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
  }

  return (
    <CRMContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,
      }}
    >
      <Router basename={import.meta.env.PROD ? "/LeadZone" : ""}>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </CRMContext.Provider>
  )
}

export default App

