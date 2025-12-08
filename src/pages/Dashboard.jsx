import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign, 
  Handshake,
  Target,
  ArrowUpRight,
  Calendar,
  Clock,
  MoreHorizontal
} from 'lucide-react'
import './Dashboard.css'

const metrics = [
  {
    id: 1,
    title: 'Total Contacts',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'blue'
  },
  {
    id: 2,
    title: 'Revenue (MTD)',
    value: '$124,580',
    change: '+8.2%',
    trend: 'up',
    icon: DollarSign,
    color: 'green'
  },
  {
    id: 3,
    title: 'Active Deals',
    value: '48',
    change: '-3.1%',
    trend: 'down',
    icon: Handshake,
    color: 'orange'
  },
  {
    id: 4,
    title: 'Conversion Rate',
    value: '24.8%',
    change: '+5.4%',
    trend: 'up',
    icon: Target,
    color: 'purple'
  }
]

const recentDeals = [
  { id: 1, name: 'Enterprise Software License', company: 'TechCorp Inc.', value: '$45,000', stage: 'Negotiation', probability: 75 },
  { id: 2, name: 'Annual Support Contract', company: 'Global Systems', value: '$28,500', stage: 'Proposal', probability: 60 },
  { id: 3, name: 'Cloud Migration Project', company: 'DataFlow Ltd.', value: '$72,000', stage: 'Discovery', probability: 40 },
  { id: 4, name: 'Consulting Services', company: 'Innovate Co.', value: '$15,800', stage: 'Closed Won', probability: 100 },
  { id: 5, name: 'Platform Integration', company: 'NextGen Labs', value: '$33,200', stage: 'Qualification', probability: 25 },
]

const upcomingTasks = [
  { id: 1, title: 'Follow up with TechCorp', time: '10:00 AM', type: 'call', priority: 'high' },
  { id: 2, title: 'Send proposal to Global Systems', time: '11:30 AM', type: 'email', priority: 'medium' },
  { id: 3, title: 'Demo meeting with DataFlow', time: '2:00 PM', type: 'meeting', priority: 'high' },
  { id: 4, title: 'Review contract terms', time: '4:00 PM', type: 'task', priority: 'low' },
]

const topPerformers = [
  { id: 1, name: 'Sarah Johnson', role: 'Account Executive', deals: 12, revenue: '$234,500', avatar: 'Sarah' },
  { id: 2, name: 'Michael Chen', role: 'Sales Rep', deals: 9, revenue: '$187,200', avatar: 'Michael' },
  { id: 3, name: 'Emily Davis', role: 'Account Executive', deals: 8, revenue: '$156,800', avatar: 'Emily' },
]

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header animate-slide-up">
        <div className="dashboard-title-section">
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with your sales.</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-secondary">
            <Calendar size={18} />
            <span>Last 30 days</span>
          </button>
          <button className="btn btn-primary">
            <ArrowUpRight size={18} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="metrics-grid animate-slide-up" style={{ animationDelay: '0.1s' }}>
        {metrics.map((metric) => (
          <div key={metric.id} className={`metric-card metric-${metric.color}`}>
            <div className="metric-header">
              <div className={`metric-icon icon-${metric.color}`}>
                <metric.icon size={22} />
              </div>
              <button className="metric-more">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <div className="metric-body">
              <h3 className="metric-value">{metric.value}</h3>
              <p className="metric-title">{metric.title}</p>
            </div>
            <div className="metric-footer">
              <span className={`metric-change ${metric.trend}`}>
                {metric.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {metric.change}
              </span>
              <span className="metric-period">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="card deals-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="card-header">
              <h2>Recent Deals</h2>
              <a href="/deals" className="view-all">View all deals <ArrowUpRight size={14} /></a>
            </div>
            <div className="deals-table">
              <table>
                <thead>
                  <tr>
                    <th>Deal Name</th>
                    <th>Company</th>
                    <th>Value</th>
                    <th>Stage</th>
                    <th>Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDeals.map((deal) => (
                    <tr key={deal.id}>
                      <td className="deal-name">{deal.name}</td>
                      <td className="deal-company">{deal.company}</td>
                      <td className="deal-value">{deal.value}</td>
                      <td>
                        <span className={`stage-badge stage-${deal.stage.toLowerCase().replace(' ', '-')}`}>
                          {deal.stage}
                        </span>
                      </td>
                      <td>
                        <div className="probability-bar">
                          <div 
                            className="probability-fill" 
                            style={{ width: `${deal.probability}%` }}
                          />
                          <span className="probability-text">{deal.probability}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="dashboard-sidebar">
          <div className="card tasks-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="card-header">
              <h2>Today's Tasks</h2>
              <span className="task-count">{upcomingTasks.length}</span>
            </div>
            <ul className="tasks-list">
              {upcomingTasks.map((task) => (
                <li key={task.id} className="task-item">
                  <div className={`task-priority priority-${task.priority}`} />
                  <div className="task-content">
                    <p className="task-title">{task.title}</p>
                    <span className="task-time">
                      <Clock size={12} />
                      {task.time}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card performers-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="card-header">
              <h2>Top Performers</h2>
              <a href="#" className="view-all">View all <ArrowUpRight size={14} /></a>
            </div>
            <ul className="performers-list">
              {topPerformers.map((performer, index) => (
                <li key={performer.id} className="performer-item">
                  <span className="performer-rank">{index + 1}</span>
                  <div className="performer-avatar">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${performer.avatar}&backgroundColor=b6e3f4`} 
                      alt={performer.name} 
                    />
                  </div>
                  <div className="performer-info">
                    <p className="performer-name">{performer.name}</p>
                    <span className="performer-role">{performer.role}</span>
                  </div>
                  <div className="performer-stats">
                    <span className="performer-revenue">{performer.revenue}</span>
                    <span className="performer-deals">{performer.deals} deals</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

