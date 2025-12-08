import './ContactCard.css'

const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="contact-card">
      <div className="contact-card-header">
        <div className="contact-avatar-large">
          {contact.name.charAt(0).toUpperCase()}
        </div>
        <div className="contact-card-actions">
          <button
            className="icon-btn"
            onClick={() => onEdit(contact)}
            aria-label="Edit contact"
          >
            ✏️
          </button>
          <button
            className="icon-btn icon-btn-danger"
            onClick={() => onDelete(contact.id)}
            aria-label="Delete contact"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="contact-card-body">
        <h3 className="contact-name">{contact.name}</h3>
        <p className="contact-company">{contact.company || 'No company'}</p>

        <div className="contact-details">
          <div className="contact-detail">
            <span className="detail-icon">📧</span>
            <span className="detail-text">{contact.email}</span>
          </div>
          {contact.phone && (
            <div className="contact-detail">
              <span className="detail-icon">📞</span>
              <span className="detail-text">{contact.phone}</span>
            </div>
          )}
        </div>

        <div className="contact-card-footer">
          <span className={`status-badge status-${contact.status}`}>
            {contact.status}
          </span>
          {contact.value && (
            <span className="contact-value">
              ${contact.value.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactCard

