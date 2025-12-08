import { useContext } from 'react'
import { CRMContext } from '../context/CRMContext'
import './Dashboard.css'

const Dashboard = () => {
  const { contacts } = useContext(CRMContext)

  const stats = {
    totalContacts: contacts.length,
    leads: contacts.filter((c) => c.status === 'lead').length,
    customers: contacts.filter((c) => c.status === 'customer').length,
    totalValue: contacts.reduce((sum, c) => sum + (c.value || 0), 0),
  }

  const recentContacts = [...contacts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Welcome to your CRM overview</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalContacts}</h3>
            <p className="stat-label">Total Contacts</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔍</div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.leads}</h3>
            <p className="stat-label">Leads</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.customers}</h3>
            <p className="stat-label">Customers</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3 className="stat-value">
              ${stats.totalValue.toLocaleString()}
            </h3>
            <p className="stat-label">Total Value</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Contacts</h2>
        {recentContacts.length > 0 ? (
          <div className="recent-contacts">
            {recentContacts.map((contact) => (
              <div key={contact.id} className="recent-contact-card">
                <div className="contact-avatar">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <div className="contact-info">
                  <h4>{contact.name}</h4>
                  <p>{contact.company || 'No company'}</p>
                </div>
                <div className="contact-status">
                  <span className={`status-badge status-${contact.status}`}>
                    {contact.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No contacts yet. Add your first contact!</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard

