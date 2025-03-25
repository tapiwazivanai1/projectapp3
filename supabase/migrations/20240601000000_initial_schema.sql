-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create branches table first (since users references it)
CREATE TABLE IF NOT EXISTS branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT,
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  user_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('individual', 'branch', 'admin')),
  branch_id UUID REFERENCES branches(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  goal DECIMAL(10, 2) NOT NULL,
  raised DECIMAL(10, 2) DEFAULT 0,
  deadline DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'completed')),
  category TEXT,
  branch_id UUID REFERENCES branches(id),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contributions table
CREATE TABLE IF NOT EXISTS contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  project_id UUID REFERENCES projects(id) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT,
  transaction_id TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create magazine_submissions table
CREATE TABLE IF NOT EXISTS magazine_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content_type TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  branch_id UUID REFERENCES branches(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  feedback TEXT,
  attachments JSONB,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create magazine_sections table (for organizing the magazine)
CREATE TABLE IF NOT EXISTS magazine_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create magazine_content table (for organizing approved submissions into sections)
CREATE TABLE IF NOT EXISTS magazine_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id UUID REFERENCES magazine_sections(id) NOT NULL,
  submission_id UUID REFERENCES magazine_submissions(id) NOT NULL,
  order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('contribution', 'project', 'magazine', 'event')),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies

-- Users table policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data" 
  ON users FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Branch coordinators can view users in their branch" 
  ON users FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() 
      AND u.role = 'branch' 
      AND u.branch_id = users.branch_id
    )
  );

CREATE POLICY "Admins can view all users" 
  ON users FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() 
      AND u.role = 'admin'
    )
  );

-- Projects table policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active projects" 
  ON projects FOR SELECT 
  USING (status = 'active');

CREATE POLICY "Branch coordinators can manage their branch's projects" 
  ON projects FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() 
      AND u.role = 'branch' 
      AND u.branch_id = projects.branch_id
    )
  );

CREATE POLICY "Admins can manage all projects" 
  ON projects FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() 
      AND u.role = 'admin'
    )
  );

-- Contributions table policies
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own contributions" 
  ON contributions FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Users can create contributions" 
  ON contributions FOR INSERT 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Branch coordinators can view contributions for their branch's projects" 
  ON contributions FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      JOIN projects p ON p.branch_id = u.branch_id 
      WHERE u.id = auth.uid() 
      AND u.role = 'branch' 
      AND p.id = contributions.project_id
    )
  );

CREATE POLICY "Admins can view all contributions" 
  ON contributions FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() 
      AND u.role = 'admin'
    )
  );

-- Magazine submissions policies
ALTER TABLE magazine_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own submissions" 
  ON magazine_submissions FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Users can create submissions" 
  ON magazine_submissions FOR INSERT 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Branch coordinators can view and update submissions for their branch" 
  ON magazine_submissions FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() 
      AND u.role = 'branch' 
      AND u.branch_id = magazine_submissions.branch_id
    )
  );

CREATE POLICY "Admins can manage all submissions" 
  ON magazine_submissions FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.id = auth.uid() 
      AND u.role = 'admin'
    )
  );

-- Notifications policies
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications" 
  ON notifications FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" 
  ON notifications FOR UPDATE 
  USING (user_id = auth.uid());
