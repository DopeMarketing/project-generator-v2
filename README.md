# Project Generator V2

Enhanced project generator with database schema generation and collaborative project sharing capabilities.

## Features

- **Database Schema Generation**: Create comprehensive Postgres schemas with tables, columns, data types, indexes, and RLS policies
- **Site Map Architecture**: Generate detailed site maps with routes, page purposes, authentication requirements, and component specifications  
- **Team Collaboration**: Invite team members via email with proper permission controls (owner/viewer roles)
- **Project Management**: Create, edit, and share project specifications with structured outputs

## Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL database, Authentication, Real-time subscriptions)
- **Deployment**: Vercel (recommended)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-generator-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Copy the project URL and anon key
   - Run the migration in the Supabase SQL editor:
     ```sql
     -- Copy and paste contents from supabase/migrations/001_initial.sql
     ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── supabase/
│       ├── client.ts
│       └── server.ts
├── supabase/
│   └── migrations/
│       └── 001_initial.sql
├── middleware.ts
├── next.config.ts
├── package.json
└── README.md
```

## Database Schema

The application uses the following main tables:

- **projects**: Store project information and generated specifications
- **project_collaborators**: Manage team member access and invitations
- **project_schemas**: Store generated database schemas
- **site_maps**: Store generated site architecture maps

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details