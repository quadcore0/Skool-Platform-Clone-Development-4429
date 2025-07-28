# Skool Clone - Learning Community Platform

A modern learning community platform built with React and Supabase, inspired by Skool.

## Features

- 🏠 **Dashboard** - Overview of your learning journey
- 👥 **Communities** - Create and join learning communities
- 📚 **Courses** - Interactive learning content
- 💬 **Forum** - Discussion and Q&A
- 📅 **Events** - Live sessions and workshops
- 👤 **Profiles** - User profiles and achievements
- 🔍 **Search** - Find content across the platform
- ⚙️ **Settings** - Customize your experience

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Supabase (Optional)

For a fully functional backend, you'll need to set up Supabase:

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your project URL and anon key from the API settings
3. Replace the credentials in `src/lib/supabase.js`:

```javascript
const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseAnonKey = 'your-anon-key-here'
```

### 3. Run the Development Server
```bash
npm run dev
```

## Demo Mode

The app includes a **demo mode** that works without Supabase setup:

- ✅ **Authentication** - Mock login/signup (use any email/password)
- ✅ **Communities** - Browse and create communities
- ✅ **Courses** - View course content and lessons
- ✅ **Forum** - Read and post in discussions
- ✅ **Events** - View upcoming events
- ✅ **Search** - Find content across the platform

## Authentication

### Demo Login
- Email: `demo@example.com`
- Password: `password123`

Or create a new account with any email and password.

### Social Login
Google and Facebook login buttons are included but require Supabase configuration.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Forms**: React Hook Form
- **Backend**: Supabase (optional)
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, Theme)
├── lib/               # Utilities and configurations
├── pages/             # Page components
├── stores/            # Zustand stores
└── common/            # Common utilities
```

## Building for Production

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for learning and development.