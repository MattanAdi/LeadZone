import { useState, useContext } from 'react'
import { CRMContext } from '../context/CRMContext'
import ContactForm from './ContactForm'
import ContactCard from './ContactCard'
import './Contacts.css'

const Contacts = () => {
  const { contacts, deleteContact } = useContext(CRMContext)
  const [showForm, setShowForm] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredContacts = contacts.filter((contact) => {
    const matchesFilter =
      filter === 'all' || contact.status === filter
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.company &&
        contact.company.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const handleEdit = (contact) => {
    setEditingContact(contact)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      deleteContact(id)
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingContact(null)
  }

  return (
    <div className="contacts">
      <div className="contacts-header">
        <div>
          <h1>Contacts</h1>
          <p className="contacts-subtitle">Manage your leads and customers</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Add Contact
        </button>
      </div>

      <div className="contacts-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({contacts.length})
          </button>
          <button
            className={`filter-btn ${filter === 'lead' ? 'active' : ''}`}
            onClick={() => setFilter('lead')}
          >
            Leads ({contacts.filter((c) => c.status === 'lead').length})
          </button>
          <button
            className={`filter-btn ${filter === 'customer' ? 'active' : ''}`}
            onClick={() => setFilter('customer')}
          >
            Customers ({contacts.filter((c) => c.status === 'customer').length})
          </button>
        </div>
      </div>

      {showForm && (
        <ContactForm
          contact={editingContact}
          onClose={handleFormClose}
        />
      )}

      <div className="contacts-grid">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>No contacts found. {searchQuery && 'Try adjusting your search.'}</p>
            {!searchQuery && (
              <button
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                Add Your First Contact
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Contacts

