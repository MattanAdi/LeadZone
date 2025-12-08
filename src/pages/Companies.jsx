import { useState } from 'react'
import { 
  Plus, 
  Search,
  MoreHorizontal,
  Globe,
  Users,
  DollarSign,
  MapPin,
  ExternalLink
} from 'lucide-react'
import './Companies.css'

const companies = [
  { 
    id: 1, 
    name: 'TechCorp Inc.', 
    industry: 'Technology', 
    size: '1000-5000', 
    revenue: '$50M - $100M',
    location: 'San Francisco, CA',
    website: 'techcorp.com',
    contacts: 12,
    deals: 3,
    logo: 'TC',
    color: '#3b82f6'
  },
  { 
    id: 2, 
    name: 'Global Systems', 
    industry: 'IT Services', 
    size: '500-1000', 
    revenue: '$20M - $50M',
    location: 'New York, NY',
    website: 'globalsystems.io',
    contacts: 8,
    deals: 2,
    logo: 'GS',
    color: '#10b981'
  },
  { 
    id: 3, 
    name: 'DataFlow Ltd.', 
    industry: 'Data Analytics', 
    size: '100-500', 
    revenue: '$10M - $20M',
    location: 'Austin, TX',
    website: 'dataflow.io',
    contacts: 5,
    deals: 1,
    logo: 'DF',
    color: '#8b5cf6'
  },
  { 
    id: 4, 
    name: 'Innovate Co.', 
    industry: 'Consulting', 
    size: '50-100', 
    revenue: '$5M - $10M',
    location: 'Boston, MA',
    website: 'innovate.co',
    contacts: 4,
    deals: 2,
    logo: 'IC',
    color: '#f59e0b'
  },
  { 
    id: 5, 
    name: 'NextGen Labs', 
    industry: 'Biotechnology', 
    size: '200-500', 
    revenue: '$15M - $30M',
    location: 'Seattle, WA',
    website: 'nextgenlabs.com',
    contacts: 6,
    deals: 1,
    logo: 'NL',
    color: '#ec4899'
  },
  { 
    id: 6, 
    name: 'Synergy Solutions', 
    industry: 'Software', 
    size: '100-200', 
    revenue: '$8M - $15M',
    location: 'Chicago, IL',
    website: 'synergysolutions.io',
    contacts: 7,
    deals: 2,
    logo: 'SS',
    color: '#06b6d4'
  },
]

function Companies() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="companies-page">
      <div className="page-header animate-slide-up">
        <div className="page-title-section">
          <h1>Companies</h1>
          <p>Manage your company accounts</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          <span>Add Company</span>
        </button>
      </div>

      <div className="companies-toolbar animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <span className="results-count">{filteredCompanies.length} companies</span>
      </div>

      <div className="companies-grid animate-slide-up" style={{ animationDelay: '0.2s' }}>
        {filteredCompanies.map((company) => (
          <div key={company.id} className="company-card">
            <div className="company-card-header">
              <div className="company-logo" style={{ backgroundColor: company.color }}>
                {company.logo}
              </div>
              <button className="company-menu">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <h3 className="company-name">{company.name}</h3>
            <span className="company-industry">{company.industry}</span>

            <div className="company-info">
              <div className="info-row">
                <MapPin size={14} />
                <span>{company.location}</span>
              </div>
              <div className="info-row">
                <Globe size={14} />
                <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">
                  {company.website}
                  <ExternalLink size={12} />
                </a>
              </div>
              <div className="info-row">
                <Users size={14} />
                <span>{company.size} employees</span>
              </div>
              <div className="info-row">
                <DollarSign size={14} />
                <span>{company.revenue}</span>
              </div>
            </div>

            <div className="company-card-footer">
              <div className="stat">
                <span className="stat-value">{company.contacts}</span>
                <span className="stat-label">Contacts</span>
              </div>
              <div className="stat">
                <span className="stat-value">{company.deals}</span>
                <span className="stat-label">Deals</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Companies

