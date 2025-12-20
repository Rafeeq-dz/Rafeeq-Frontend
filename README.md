<p align="center">
  <img src="./public/images/logo-white.svg" alt="Rafeeq Logo" width="200"/>
</p>

<h1 align="center">Rafeeq Frontend - AI-Powered Educational Platform</h1>

<p align="center">
  A modern, AI-powered educational platform built with React and TypeScript, designed specifically for Algerian students and educational institutions.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-3.0-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

## 🚀 Features

- **AI-Powered Content Generation**: Generate exams, quizzes, and exercises with AI
- **Smart Calendar & Scheduling**: AI-driven schedule management and study planning
- **Career Vision**: Personalized opportunity recommendations based on student profile
- **Resource Library**: Upload and share educational resources (local files & external links)
- **Study Groups**: Collaborative learning with video chat integration
- **Whiteboard Collaboration**: Real-time drawing and collaboration with Tldraw
- **Real-time Chat**: AI assistant for administrative help and study guidance
- **Bot Integration**: Connect with Discord and Telegram bots
- **Dark Mode Support**: Complete theme customization

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Routing**: React Router v6
- **State Management**: React Context API
- **HTTP Client**: Fetch API
- **AI Integration**: Google Gemini 2.0
- **Whiteboard**: Tldraw
- **Notifications**: Sonner (Toast)
- **PDF Generation**: jsPDF
- **Code Quality**: Biome, ESLint

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Rafeeq-dz/Rafeeq-Frontend.git
cd Rafeeq-Frontend/client
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the `client` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000
VITE_AI_BASE_URL=https://your-ai-api-url.ngrok-free.dev

# Google Gemini API (for AI features)
VITE_GEMINI_API=your_gemini_api_key_here

# Optional: Development settings
VITE_ENABLE_DEV_TOOLS=true
```

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
client/
├── public/                 # Static assets
│   ├── icons/             # Icon files
│   └── images/            # Image assets
├── src/
│   ├── api/               # API client and configurations
│   │   └── api.ts         # Centralized API functions
│   ├── assets/            # Application assets
│   │   ├── logo.svg
│   │   └── logo-white.svg
│   ├── components/        # Reusable components
│   │   ├── auth/          # Authentication components
│   │   ├── landing/       # Landing page components
│   │   ├── layout/        # Layout components
│   │   ├── study-groups/  # Study group components
│   │   └── ui/            # Shadcn UI components
│   ├── contexts/          # React Context providers
│   │   └── auth-context.tsx
│   ├── lib/               # Utility functions
│   │   └── utils.ts
│   ├── pages/             # Page components
│   │   ├── auth/          # Login, Register
│   │   ├── dashboard/     # Dashboard pages
│   │   │   ├── overview/
│   │   │   ├── calendar/
│   │   │   ├── ai-hub/
│   │   │   │   ├── ai-tools/
│   │   │   │   ├── opportunities/
│   │   │   │   └── discord-sync/
│   │   │   ├── my-learning/
│   │   │   │   ├── courses/
│   │   │   │   ├── resources/
│   │   │   │   ├── study-groups/
│   │   │   │   ├── workspace/
│   │   │   │   └── whiteboard/
│   │   │   └── settings/
│   │   └── landing/       # Landing page
│   ├── types/             # TypeScript type definitions
│   │   └── types.ts
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   ├── index.css          # Global styles
│   └── vite-env.d.ts      # Vite type definitions
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── biome.json             # Biome configuration
└── components.json        # Shadcn UI configuration
```

## 🎯 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Biome
```

## 🔑 Key Features Implementation

### AI Content Generation
**Location**: `/src/pages/dashboard/ai-hub/ai-tools/`

Generate curriculum-aligned educational content:
- **Exam Generator**: Creates comprehensive exams with detailed corrections
- **Quiz Generator**: Multiple-choice quizzes with explanations
- **Exercise Generator**: Practice problems with step-by-step solutions
- **Smart Prompting**: Context-aware question generation

**Supported Subjects**:
- Mathematics
- Physics
- Chemistry
- Biology
- Computer Science
- Literature
- History
- Geography

**Difficulty Levels**:
- Beginner
- Intermediate
- Advanced
- Expert
- Baccalaureate Level

### Smart Calendar
**Location**: `/src/pages/dashboard/calendar/`

AI-powered schedule management:
- **Natural Language Input**: Describe your routine in plain language
- **AI Schedule Generation**: Automatic weekly schedule creation
- **Pre-built Plans**: Final exams prep, balanced study, weekend intensive
- **Event Management**: Exams, homework, study sessions, routine activities
- **Priority Levels**: High, medium, low
- **Visual Organization**: Month/day views with color coding

### Career Vision (Opportunities)
**Location**: `/src/pages/dashboard/ai-hub/opportunities/`

Personalized opportunity discovery:
- **AI-Matched Recommendations**: Based on student profile
- **Match Percentage**: Shows compatibility score
- **Content Filtering**: Internships, events, courses, research, training
- **Profile Display**: Name, specialty, GPA, interests, goals, strengths
- **Real-time Updates**: Fetches from recommendation API

### Resource Library
**Location**: `/src/pages/dashboard/my-learning/resources/`

University-specific resource management:
- **Dual Resource Support**:
  - Local uploads: PDF, DOC, PPT, Images, ZIP (max 50MB)
  - External links: YouTube, documents, repositories
- **17 University Subjects**: Mathematics, Physics, Chemistry, Computer Science, Electronics, etc.
- **Resource Types**: Course materials, past exams, lecture notes, TD/TP solutions, research papers
- **Tags**: licence, master, TD, TP, exam, cours
- **Sharing**: Share resources with classmates

### Study Groups
**Location**: `/src/pages/dashboard/my-learning/study-groups/`

Collaborative learning environment:
- **Video Chat**: Integrated video conferencing
- **Group Management**: Create and join study groups
- **Shared Workspace**: Collaborative study sessions
- **Real-time Communication**: Chat and screen sharing

### Whiteboard
**Location**: `/src/pages/dashboard/my-learning/whiteboard/`

Visual collaboration tool:
- **Tldraw Integration**: Professional drawing canvas
- **Real-time Collaboration**: Multiple users drawing simultaneously
- **Tools**: Pen, shapes, text, images, sticky notes
- **Export Options**: Save as PNG, PDF, or JSON

## 🎨 Theming

The application supports both light and dark modes with automatic theme switching.

**Brand Colors**:
- Primary Purple: `#4A3AFF`
- Secondary Magenta: `#DC1FFF`
- Dark Navy: `#0A0820`
- White: `#FFFFFF`

**Typography**:
- Font: DM Sans
- Weights: 300, 400, 500, 600, 700, 800

**Dark Mode Implementation**:
- Theme toggle in header
- Persistent theme preference
- Smooth transitions
- Logo variants (logo.svg / logo-white.svg)

## 🔐 Authentication

**Location**: `/src/contexts/auth-context.tsx`

JWT-based authentication with Context API:

**Auth Context Provides**:
- `user` - Current user object
- `login(user, token)` - Authenticate and store token
- `logout()` - Clear authentication
- `isAuthenticated` - Boolean authentication status

**Protected Routes**:
```tsx
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

**Auth Flow**:
1. User logs in via `/auth/login`
2. Token stored in localStorage
3. Token sent with all API requests
4. Auto-redirect to dashboard on successful auth
5. Logout clears token and redirects to landing

## 🌐 API Integration

**Location**: `/src/api/api.ts`

Centralized API client with multiple modules:

### Authentication API (`authApi`)
```typescript
authApi.login(email, password)
authApi.register(userData)
authApi.logout()
```

### Course API (`courseApi`)
```typescript
courseApi.getCourses()
courseApi.getCourseById(id)
courseApi.createCourse(courseData)
courseApi.enrollInCourse(courseId)
```

### Classroom API (`classroomApi`)
```typescript
classroomApi.getClassrooms()
classroomApi.getClassroomById(id)
classroomApi.joinClassroom(classroomId)
```

### Resource API (`resourceApi`)
```typescript
resourceApi.getResources()
resourceApi.uploadResource(formData)
resourceApi.shareResource(resourceId, userIds)
```

### AI API (`aiApi`)
```typescript
// Content Generation
aiApi.generateExam(subject, numQuestions, userInput)
aiApi.generateQuiz(subject, numQuestions, userInput)
aiApi.generateExercise(subject, numQuestions, difficulty, userInput)

// Schedule Generation
aiApi.generateWeeklySchedule(userInput)

// Profiling & Recommendations
aiApi.generateUserProfile(name, age, specialty, goals, interests, yearsOfStudy)
aiApi.getRecommendations(query, contentType?, limit?)
```

**API Configuration**:
- Base URL from `VITE_API_BASE_URL`
- AI Base URL from `VITE_AI_BASE_URL`
- Automatic token injection
- Error handling with toast notifications
- Ngrok header for development

## 📱 Responsive Design

Mobile-first approach with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

**Responsive Features**:
- Collapsible sidebar on mobile
- Touch-friendly buttons and inputs
- Optimized layouts for all screen sizes
- Hamburger menu for navigation
- Bottom navigation on mobile

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Output directory: `dist/`

### Deployment Options

**Vercel** (Recommended):
```bash
npm install -g vercel
vercel --prod
```

**Netlify**:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Static Hosting**:
- Upload `dist/` folder to any static hosting service
- Configure environment variables on hosting platform
- Set up custom domain if needed

### Environment Variables in Production

Make sure to set these environment variables on your hosting platform:
- `VITE_API_BASE_URL`
- `VITE_AI_BASE_URL`
- `VITE_GEMINI_API`

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests with coverage
npm run test:coverage
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Code Style**:
- Follow existing code patterns
- Use TypeScript for type safety
- Write meaningful commit messages
- Add comments for complex logic
- Format code with Biome before committing

## 🐛 Known Issues

- None at the moment

## 📝 Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | Yes | - |
| `VITE_AI_BASE_URL` | AI service base URL | Yes | - |
| `VITE_GEMINI_API` | Google Gemini API key | Yes | - |
| `VITE_ENABLE_DEV_TOOLS` | Enable development tools | No | false |

## 🔧 Troubleshooting

**Port already in use**:
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Dependencies not installing**:
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build errors**:
```bash
# Check TypeScript errors
npm run type-check
```

## 📞 Support

For support, email support@rafeeq.dz or join our Discord community.

## 📄 License

This project is proprietary and confidential. © 2025 Rafeeq Platform. All rights reserved.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Shadcn** - For beautiful UI components
- **Tailwind CSS** - For utility-first styling
- **Google** - For Gemini AI API
- **Tldraw** - For whiteboard integration
- **All Contributors** - For testing and feedback

---

**Built with ❤️ for Algerian Students**

*Last Updated: December 20, 2025*
