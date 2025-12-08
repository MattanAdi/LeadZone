# LeadZone CRM

A modern, responsive CRM application built with React, inspired by HubSpot's design. Manage your leads and customers with an intuitive interface that works beautifully on desktop and mobile devices.

## Features

- 📊 **Dashboard** - Overview of your contacts, leads, customers, and total value
- 👥 **Contact Management** - Add, edit, and delete contacts with full CRUD operations
- 🔍 **Search & Filter** - Quickly find contacts by name, email, or company
- 📱 **Mobile Responsive** - Fully optimized for mobile devices with a hamburger menu
- 💾 **Local Storage** - Data persists in your browser's local storage
- 🎨 **Modern UI** - Clean, HubSpot-inspired design with smooth animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
LeadZone/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Main layout with navigation
│   │   ├── Dashboard.jsx        # Dashboard with stats
│   │   ├── Contacts.jsx         # Contacts list page
│   │   ├── ContactCard.jsx      # Individual contact card
│   │   └── ContactForm.jsx      # Add/Edit contact form
│   ├── context/
│   │   └── CRMContext.jsx       # Global state management
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Features in Detail

### Dashboard
- View total contacts, leads, customers, and total value
- See recent contacts at a glance
- Responsive stat cards

### Contacts
- Add new contacts with name, email, phone, company, status, and value
- Edit existing contacts
- Delete contacts with confirmation
- Filter by status (All, Leads, Customers)
- Search by name, email, or company
- Responsive grid layout

### Mobile Experience
- Hamburger menu for navigation
- Touch-friendly buttons and cards
- Optimized layouts for small screens
- Modal forms that work well on mobile

## Technologies Used

- **React 18** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Styling with custom properties and modern features

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

This project is configured for GitHub Pages deployment. The app will automatically deploy when you push to the `main` branch.

### Enable GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to **Pages** in the left sidebar
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically build and deploy your app

Your app will be available at: `https://mattanadi.github.io/LeadZone/`

### Manual Deployment

If you prefer to deploy manually:

```bash
npm run build
# Then push the dist folder to the gh-pages branch
```

## License

MIT

