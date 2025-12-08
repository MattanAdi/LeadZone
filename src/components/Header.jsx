import { useState } from 'react'
import { 
  Search, 
  Bell, 
  Plus,
  ChevronDown,
  Menu
} from 'lucide-react'
import './Header.css'

function Header() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="header">
      <div className="header-left">
        <button className="mobile-menu-btn">
          <Menu size={20} />
        </button>
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search contacts, deals, companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <kbd className="search-shortcut">⌘K</kbd>
        </div>
      </div>

      <div className="header-right">
        <button className="create-btn">
          <Plus size={18} />
          <span>Create</span>
          <ChevronDown size={14} />
        </button>

        <div className="header-actions">
          <button className="action-btn notification-btn">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
        </div>

        <div className="user-menu">
          <div className="user-avatar">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" 
              alt="User avatar" 
            />
          </div>
          <div className="user-info">
            <span className="user-name">Alex Morgan</span>
            <span className="user-role">Sales Manager</span>
          </div>
          <ChevronDown size={16} className="user-chevron" />
        </div>
      </div>
    </header>
  )
}

export default Header

