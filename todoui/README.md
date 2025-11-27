# Todo UI

A modern, responsive todo list application built with React, TypeScript, and Vite. This application provides a clean interface for managing your daily tasks with features like task completion tracking and due dates.

## 🚀 Features

- ✅ Add new todos with titles and due dates
- 📝 Mark todos as completed or incomplete  
- 🗑️ Delete todos
- 📅 Due date support
- 📱 Responsive design with Bootstrap styling
- ⚡ Fast development with Vite and Hot Module Replacement (HMR)
- 🔧 TypeScript for type safety
- 📦 Ready for Azure Static Web Apps deployment

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript
- **Build Tool**: Vite 7.2.4
- **Styling**: Bootstrap 5.3.8
- **Linting**: ESLint with React hooks plugin
- **Deployment**: Azure Static Web Apps (configured)

## 📋 Project Structure

```
todoui/
├── public/
│   └── staticwebapp.config.json    # Azure Static Web Apps configuration
├── src/
│   ├── components/
│   │   ├── TodoForm.tsx            # Form component for adding new todos
│   │   ├── TodoItem.tsx            # Individual todo item component
│   │   └── TodoList.tsx            # Main list component
│   ├── types/
│   │   └── todo.ts                 # TypeScript interfaces
│   ├── api/
│   │   └── todos.ts                # API layer for todo operations
│   ├── App.tsx                     # Main application component
│   └── main.tsx                    # Application entry point
├── package.json
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
└── eslint.config.js                # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todoui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

The application will automatically reload when you make changes to the source files.

## 📜 Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code quality issues

## 🏗️ Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🌐 Deployment

This project is configured for Azure Static Web Apps deployment with the included `staticwebapp.config.json` file. The configuration handles client-side routing and serves the React app correctly.

### Deploy to Azure Static Web Apps

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to Azure Static Web Apps
3. The app will be available at your Azure Static Web Apps URL

## 🔧 Configuration

### Vite Configuration

The project uses Vite with the following key configurations:
- React SWC plugin for fast refresh
- Development server on port 3000
- Auto-opens browser on start

### TypeScript

Multiple TypeScript configuration files:
- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js environment settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Issues and Support

If you encounter any issues or need support, please [create an issue](../../issues) in this repository.
