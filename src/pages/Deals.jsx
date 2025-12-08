import { useState } from 'react'
import { 
  Plus, 
  MoreHorizontal,
  DollarSign,
  Calendar,
  User,
  Building2,
  GripVertical
} from 'lucide-react'
import './Deals.css'

const stages = [
  { id: 'qualification', name: 'Qualification', color: '#3b82f6' },
  { id: 'discovery', name: 'Discovery', color: '#f59e0b' },
  { id: 'proposal', name: 'Proposal', color: '#8b5cf6' },
  { id: 'negotiation', name: 'Negotiation', color: '#ec4899' },
  { id: 'closed-won', name: 'Closed Won', color: '#10b981' },
]

const initialDeals = [
  { id: 1, title: 'Enterprise License', company: 'TechCorp Inc.', value: 45000, contact: 'Sarah Johnson', stage: 'negotiation', dueDate: 'Dec 15', avatar: 'Sarah' },
  { id: 2, title: 'Support Contract', company: 'Global Systems', value: 28500, contact: 'Michael Chen', stage: 'proposal', dueDate: 'Dec 20', avatar: 'Michael' },
  { id: 3, title: 'Cloud Migration', company: 'DataFlow Ltd.', value: 72000, contact: 'Emily Davis', stage: 'discovery', dueDate: 'Jan 5', avatar: 'Emily' },
  { id: 4, title: 'Consulting Package', company: 'Innovate Co.', value: 15800, contact: 'James Wilson', stage: 'closed-won', dueDate: 'Dec 1', avatar: 'James' },
  { id: 5, title: 'Platform Integration', company: 'NextGen Labs', value: 33200, contact: 'Lisa Anderson', stage: 'qualification', dueDate: 'Jan 10', avatar: 'Lisa' },
  { id: 6, title: 'Security Audit', company: 'Synergy Solutions', value: 22000, contact: 'Robert Taylor', stage: 'qualification', dueDate: 'Dec 28', avatar: 'Robert' },
  { id: 7, title: 'Data Analytics', company: 'CloudTech Inc.', value: 54000, contact: 'Amanda Martinez', stage: 'proposal', dueDate: 'Jan 15', avatar: 'Amanda' },
  { id: 8, title: 'API Development', company: 'FutureWave', value: 38000, contact: 'David Brown', stage: 'discovery', dueDate: 'Jan 8', avatar: 'David' },
  { id: 9, title: 'Training Program', company: 'TechStart Inc.', value: 12500, contact: 'John Miller', stage: 'negotiation', dueDate: 'Dec 22', avatar: 'John' },
  { id: 10, title: 'Hardware Upgrade', company: 'DataDrive Co.', value: 89000, contact: 'Kate Williams', stage: 'closed-won', dueDate: 'Nov 30', avatar: 'Kate' },
]

function Deals() {
  const [deals, setDeals] = useState(initialDeals)
  const [draggedDeal, setDraggedDeal] = useState(null)

  const getDealsByStage = (stageId) => {
    return deals.filter(deal => deal.stage === stageId)
  }

  const getStageTotal = (stageId) => {
    return getDealsByStage(stageId).reduce((sum, deal) => sum + deal.value, 0)
  }

  const handleDragStart = (e, deal) => {
    setDraggedDeal(deal)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, stageId) => {
    e.preventDefault()
    if (draggedDeal) {
      setDeals(prev => prev.map(deal => 
        deal.id === draggedDeal.id ? { ...deal, stage: stageId } : deal
      ))
      setDraggedDeal(null)
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="deals-page">
      <div className="page-header animate-slide-up">
        <div className="page-title-section">
          <h1>Deals Pipeline</h1>
          <p>Drag and drop deals to update their stage</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          <span>New Deal</span>
        </button>
      </div>

      <div className="pipeline animate-slide-up" style={{ animationDelay: '0.1s' }}>
        {stages.map((stage) => (
          <div 
            key={stage.id} 
            className="pipeline-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <div className="column-header" style={{ '--stage-color': stage.color }}>
              <div className="column-title">
                <span className="stage-indicator" />
                <h3>{stage.name}</h3>
                <span className="deal-count">{getDealsByStage(stage.id).length}</span>
              </div>
              <div className="column-total">{formatCurrency(getStageTotal(stage.id))}</div>
            </div>
            
            <div className="column-body">
              <button className="add-deal-btn">
                <Plus size={16} />
                <span>Add deal</span>
              </button>
              
              {getDealsByStage(stage.id).map((deal) => (
                <div 
                  key={deal.id} 
                  className="deal-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, deal)}
                >
                  <div className="deal-card-header">
                    <GripVertical size={16} className="drag-handle" />
                    <h4 className="deal-title">{deal.title}</h4>
                    <button className="deal-menu">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                  
                  <div className="deal-company">
                    <Building2 size={14} />
                    <span>{deal.company}</span>
                  </div>
                  
                  <div className="deal-value">
                    <DollarSign size={14} />
                    <span>{formatCurrency(deal.value)}</span>
                  </div>
                  
                  <div className="deal-card-footer">
                    <div className="deal-contact">
                      <div className="contact-avatar-small">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${deal.avatar}&backgroundColor=b6e3f4`}
                          alt={deal.contact}
                        />
                      </div>
                      <span>{deal.contact}</span>
                    </div>
                    <div className="deal-date">
                      <Calendar size={12} />
                      <span>{deal.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Deals

