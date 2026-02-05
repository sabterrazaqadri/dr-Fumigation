# DR Fumigation - Pest Control Services

Professional pest control and fumigation services website with NeonDB backend integration.

## Features

- Responsive design for all devices
- Complete pest control service showcase
- Contact form with NeonDB backend integration
- Modern React/TypeScript implementation
- SEO optimized
- Admin dashboard to view and manage contact form submissions

## Tech Stack

- Frontend: React 18, TypeScript, Vite
- Styling: Tailwind CSS
- Icons: Lucide React
- Backend: Node.js, Express, PostgreSQL (NeonDB)
- Database: NeonDB (PostgreSQL-compatible)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd server
   npm install
   ```
3. Set up your NeonDB connection:
   - Create a NeonDB account and project
   - Copy your connection string
   - Add it to `server/.env` as `NEON_DB_URL`
4. Create the database tables using the migration in `neon_migrations/`
5. Run the application:
   ```bash
   # Terminal 1: Start the backend
   cd server
   npm run dev

   # Terminal 2: Start the frontend
   cd ..
   npm run dev
   ```

Or run both together:
```bash
npm run dev:fullstack
```

## Environment Variables

### Server (server/.env)
```
NEON_DB_URL=your_neon_db_connection_string
ADMIN_PASSWORD=your_secure_admin_password_here
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

## Admin Access

- The admin panel is located at `/admin`
- Access is secured with a login form that requires the admin password
- The default password is set in the environment variables
- Submissions can be viewed, refreshed, and deleted from the admin panel
