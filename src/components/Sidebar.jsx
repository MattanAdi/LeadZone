import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Handshake, 
  CheckSquare,
  Settings,
  HelpCircle,
  Zap,
  ChevronRight
} from 'lucide-react'
import './Sidebar.css'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/contacts', icon: Users, label: 'Contacts' },
  { path: '/companies', icon: Building2, label: 'Companies' },
  { path: '/deals', icon: Handshake, label: 'Deals' },
  { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
]

const bottomItems = [
  { path: '/settings', icon: Settings, label: 'Settings' },
  { path: '/help', icon: HelpCircle, label: 'Help & Support' },
]

function Sidebar() {
  const location = useLocation()

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <Zap size={24} />
          </div>
          <span className="logo-text">LeadZone</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <span className="nav-section-title">Main Menu</span>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <item.icon size={20} className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                  <ChevronRight size={16} className="nav-arrow" />
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-section nav-section-bottom">
          <ul className="nav-list">
            {bottomItems.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <item.icon size={20} className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="upgrade-card">
          <div className="upgrade-icon">
            <Zap size={20} />
          </div>
          <div className="upgrade-content">
            <h4>Upgrade to Pro</h4>
            <p>Unlock all features</p>
          </div>
          <button className="upgrade-btn">Upgrade</button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

