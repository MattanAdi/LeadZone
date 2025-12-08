import { useState } from 'react'
import { 
  Plus, 
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  MoreHorizontal,
  Filter,
  User
} from 'lucide-react'
import './Tasks.css'

const initialTasks = [
  { id: 1, title: 'Follow up with TechCorp about enterprise deal', assignee: 'Sarah Johnson', dueDate: 'Today', dueTime: '10:00 AM', priority: 'high', completed: false, type: 'call', avatar: 'Sarah' },
  { id: 2, title: 'Send proposal to Global Systems', assignee: 'Michael Chen', dueDate: 'Today', dueTime: '2:00 PM', priority: 'high', completed: false, type: 'email', avatar: 'Michael' },
  { id: 3, title: 'Prepare demo presentation for DataFlow', assignee: 'Emily Davis', dueDate: 'Tomorrow', dueTime: '9:00 AM', priority: 'medium', completed: false, type: 'task', avatar: 'Emily' },
  { id: 4, title: 'Review contract with legal team', assignee: 'James Wilson', dueDate: 'Tomorrow', dueTime: '11:00 AM', priority: 'medium', completed: false, type: 'meeting', avatar: 'James' },
  { id: 5, title: 'Update CRM with new lead information', assignee: 'Lisa Anderson', dueDate: 'Dec 12', dueTime: '3:00 PM', priority: 'low', completed: false, type: 'task', avatar: 'Lisa' },
  { id: 6, title: 'Schedule quarterly review with NextGen Labs', assignee: 'Robert Taylor', dueDate: 'Dec 15', dueTime: '10:00 AM', priority: 'medium', completed: false, type: 'meeting', avatar: 'Robert' },
  { id: 7, title: 'Complete onboarding for new client', assignee: 'Amanda Martinez', dueDate: 'Dec 10', dueTime: '1:00 PM', priority: 'high', completed: true, type: 'task', avatar: 'Amanda' },
  { id: 8, title: 'Send thank you note to Innovate Co.', assignee: 'David Brown', dueDate: 'Dec 8', dueTime: '4:00 PM', priority: 'low', completed: true, type: 'email', avatar: 'David' },
]

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
    if (filter === 'all') return matchesSearch
    if (filter === 'active') return matchesSearch && !task.completed
    if (filter === 'completed') return matchesSearch && task.completed
    return matchesSearch
  })

  const activeTasks = filteredTasks.filter(t => !t.completed)
  const completedTasks = filteredTasks.filter(t => t.completed)

  return (
    <div className="tasks-page">
      <div className="page-header animate-slide-up">
        <div className="page-title-section">
          <h1>Tasks</h1>
          <p>Stay on top of your to-dos</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>

      <div className="tasks-toolbar animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </button>
          <button 
            className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({tasks.filter(t => !t.completed).length})
          </button>
          <button 
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({tasks.filter(t => t.completed).length})
          </button>
        </div>
      </div>

      <div className="tasks-container animate-slide-up" style={{ animationDelay: '0.2s' }}>
        {activeTasks.length > 0 && (
          <div className="tasks-section">
            <h2 className="section-title">Active Tasks</h2>
            <div className="tasks-list">
              {activeTasks.map((task) => (
                <div key={task.id} className={`task-card priority-${task.priority}`}>
                  <button 
                    className="task-checkbox"
                    onClick={() => toggleTask(task.id)}
                  >
                    <Circle size={22} />
                  </button>
                  
                  <div className="task-content">
                    <h3 className="task-title">{task.title}</h3>
                    <div className="task-meta">
                      <span className={`task-type type-${task.type}`}>{task.type}</span>
                      <span className="task-assignee">
                        <div className="assignee-avatar">
                          <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.avatar}&backgroundColor=b6e3f4`}
                            alt={task.assignee}
                          />
                        </div>
                        {task.assignee}
                      </span>
                      <span className="task-due">
                        <Calendar size={14} />
                        {task.dueDate}
                      </span>
                      <span className="task-time">
                        <Clock size={14} />
                        {task.dueTime}
                      </span>
                    </div>
                  </div>

                  <span className={`priority-badge priority-${task.priority}`}>
                    {task.priority}
                  </span>

                  <button className="task-menu">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="tasks-section completed-section">
            <h2 className="section-title">Completed</h2>
            <div className="tasks-list">
              {completedTasks.map((task) => (
                <div key={task.id} className="task-card completed">
                  <button 
                    className="task-checkbox checked"
                    onClick={() => toggleTask(task.id)}
                  >
                    <CheckCircle2 size={22} />
                  </button>
                  
                  <div className="task-content">
                    <h3 className="task-title">{task.title}</h3>
                    <div className="task-meta">
                      <span className={`task-type type-${task.type}`}>{task.type}</span>
                      <span className="task-assignee">
                        <div className="assignee-avatar">
                          <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.avatar}&backgroundColor=b6e3f4`}
                            alt={task.assignee}
                          />
                        </div>
                        {task.assignee}
                      </span>
                    </div>
                  </div>

                  <button className="task-menu">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredTasks.length === 0 && (
          <div className="empty-state">
            <p>No tasks found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tasks

