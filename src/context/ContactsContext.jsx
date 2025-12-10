import { createContext, useContext, useState, useEffect } from 'react'

const ContactsContext = createContext(null)

export const useContacts = () => {
  const context = useContext(ContactsContext)
  if (!context) {
    throw new Error('useContacts must be used within ContactsProvider')
  }
  return context
}

const initialContacts = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@techcorp.com', phone: '+1 (555) 123-4567', company: 'TechCorp Inc.', status: 'customer', avatar: 'Sarah', lastActivity: '2 hours ago' },
  { id: 2, name: 'Michael Chen', email: 'mchen@globalsys.com', phone: '+1 (555) 234-5678', company: 'Global Systems', status: 'lead', avatar: 'Michael', lastActivity: '5 hours ago' },
  { id: 3, name: 'Emily Davis', email: 'emily.davis@dataflow.io', phone: '+1 (555) 345-6789', company: 'DataFlow Ltd.', status: 'prospect', avatar: 'Emily', lastActivity: '1 day ago' },
  { id: 4, name: 'James Wilson', email: 'jwilson@innovate.co', phone: '+1 (555) 456-7890', company: 'Innovate Co.', status: 'customer', avatar: 'James', lastActivity: '2 days ago' },
  { id: 5, name: 'Lisa Anderson', email: 'l.anderson@nextgen.com', phone: '+1 (555) 567-8901', company: 'NextGen Labs', status: 'lead', avatar: 'Lisa', lastActivity: '3 days ago' },
  { id: 6, name: 'Robert Taylor', email: 'rtaylor@synergy.io', phone: '+1 (555) 678-9012', company: 'Synergy Solutions', status: 'prospect', avatar: 'Robert', lastActivity: '4 days ago' },
  { id: 7, name: 'Amanda Martinez', email: 'amanda.m@cloudtech.com', phone: '+1 (555) 789-0123', company: 'CloudTech Inc.', status: 'customer', avatar: 'Amanda', lastActivity: '5 days ago' },
  { id: 8, name: 'David Brown', email: 'dbrown@futurewave.co', phone: '+1 (555) 890-1234', company: 'FutureWave', status: 'lead', avatar: 'David', lastActivity: '1 week ago' },
]

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState(() => {
    // Load from localStorage or use initial data
    const saved = localStorage.getItem('leadzone-contacts')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        return initialContacts
      }
    }
    return initialContacts
  })

  // Save to localStorage whenever contacts change
  useEffect(() => {
    localStorage.setItem('leadzone-contacts', JSON.stringify(contacts))
  }, [contacts])

  const addContact = (contactData) => {
    const newContact = {
      ...contactData,
      id: Date.now(),
      avatar: contactData.name.split(' ')[0] || 'User',
      lastActivity: 'Just now',
      createdAt: new Date().toISOString(),
    }
    setContacts(prev => [newContact, ...prev])
    return newContact
  }

  const updateContact = (id, updates) => {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === id ? { ...contact, ...updates } : contact
      )
    )
  }

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(contact => contact.id !== id))
  }

  const value = {
    contacts,
    addContact,
    updateContact,
    deleteContact,
  }

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  )
}

