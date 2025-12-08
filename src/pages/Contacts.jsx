import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Mail,
  Phone,
  Building2,
  ChevronDown,
  Check,
  X
} from 'lucide-react'
import './Contacts.css'

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

function Contacts() {
  const [contacts, setContacts] = useState(initialContacts)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedContacts, setSelectedContacts] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || contact.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const toggleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(filteredContacts.map(c => c.id))
    }
  }

  const toggleSelect = (id) => {
    setSelectedContacts(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="contacts-page">
      <div className="page-header animate-slide-up">
        <div className="page-title-section">
          <h1>Contacts</h1>
          <p>Manage and organize your contacts</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          <span>Add Contact</span>
        </button>
      </div>

      <div className="contacts-toolbar animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="search-filter-group">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>
          <div className="filter-dropdown">
            <button className="filter-btn">
              <Filter size={16} />
              <span>Status: {filterStatus === 'all' ? 'All' : filterStatus}</span>
              <ChevronDown size={14} />
            </button>
            <div className="filter-menu">
              {['all', 'customer', 'lead', 'prospect'].map(status => (
                <button 
                  key={status}
                  className={`filter-option ${filterStatus === status ? 'active' : ''}`}
                  onClick={() => setFilterStatus(status)}
                >
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  {filterStatus === status && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="results-info">
          <span>{filteredContacts.length} contacts</span>
        </div>
      </div>

      <div className="contacts-table-container animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <table className="contacts-table">
          <thead>
            <tr>
              <th className="checkbox-col">
                <label className="checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                    onChange={toggleSelectAll}
                  />
                  <span className="checkmark"></span>
                </label>
              </th>
              <th>Contact</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Status</th>
              <th>Last Activity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className={selectedContacts.includes(contact.id) ? 'selected' : ''}>
                <td className="checkbox-col">
                  <label className="checkbox">
                    <input 
                      type="checkbox" 
                      checked={selectedContacts.includes(contact.id)}
                      onChange={() => toggleSelect(contact.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <div className="contact-cell">
                    <div className="contact-avatar">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.avatar}&backgroundColor=b6e3f4`}
                        alt={contact.name}
                      />
                    </div>
                    <span className="contact-name">{contact.name}</span>
                  </div>
                </td>
                <td>
                  <a href={`mailto:${contact.email}`} className="contact-email">
                    <Mail size={14} />
                    {contact.email}
                  </a>
                </td>
                <td>
                  <a href={`tel:${contact.phone}`} className="contact-phone">
                    <Phone size={14} />
                    {contact.phone}
                  </a>
                </td>
                <td>
                  <div className="contact-company">
                    <Building2 size={14} />
                    {contact.company}
                  </div>
                </td>
                <td>
                  <span className={`status-badge status-${contact.status}`}>
                    {contact.status}
                  </span>
                </td>
                <td className="last-activity">{contact.lastActivity}</td>
                <td>
                  <button className="action-menu-btn">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredContacts.length === 0 && (
          <div className="empty-state">
            <p>No contacts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Contacts

