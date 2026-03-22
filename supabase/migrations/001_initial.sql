-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;

-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  scope_document JSONB,
  database_schema JSONB,
  site_map JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project collaborators table
CREATE TABLE project_collaborators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'viewer' CHECK (role IN ('owner', 'viewer')),
  invited_email VARCHAR(255),
  invitation_status VARCHAR(20) DEFAULT 'pending' CHECK (invitation_status IN ('pending', 'accepted', 'declined')),
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(project_id, user_id),
  UNIQUE(project_id, invited_email)
);

-- Create project schemas table for generated database schemas
CREATE TABLE project_schemas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  schema_name VARCHAR(255) NOT NULL,
  tables_config JSONB NOT NULL,
  indexes_config JSONB,
  rls_policies JSONB,
  generated_sql TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site maps table for generated site architecture
CREATE TABLE site_maps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  routes_config JSONB NOT NULL,
  auth_requirements JSONB,
  components_config JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_schemas ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_maps ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects
CREATE POLICY "Users can view projects they own or collaborate on" ON projects
  FOR SELECT USING (
    owner_id = auth.uid() OR 
    id IN (
      SELECT project_id FROM project_collaborators 
      WHERE user_id = auth.uid() AND invitation_status = 'accepted'
    )
  );

CREATE POLICY "Users can create their own projects" ON projects
  FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Only owners can update projects" ON projects
  FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Only owners can delete projects" ON projects
  FOR DELETE USING (owner_id = auth.uid());

-- RLS Policies for project_collaborators
CREATE POLICY "Users can view collaborators for projects they own or collaborate on" ON project_collaborators
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE owner_id = auth.uid()
    ) OR
    (user_id = auth.uid() AND invitation_status = 'accepted')
  );

CREATE POLICY "Only project owners can manage collaborators" ON project_collaborators
  FOR ALL USING (
    project_id IN (
      SELECT id FROM projects WHERE owner_id = auth.uid()
    )
  );

-- RLS Policies for project_schemas
CREATE POLICY "Users can view schemas for accessible projects" ON project_schemas
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE 
        owner_id = auth.uid() OR 
        id IN (
          SELECT project_id FROM project_collaborators 
          WHERE user_id = auth.uid() AND invitation_status = 'accepted'
        )
    )
  );

CREATE POLICY "Only project owners can manage schemas" ON project_schemas
  FOR ALL USING (
    project_id IN (
      SELECT id FROM projects WHERE owner_id = auth.uid()
    )
  );

-- RLS Policies for site_maps
CREATE POLICY "Users can view site maps for accessible projects" ON site_maps
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE 
        owner_id = auth.uid() OR 
        id IN (
          SELECT project_id FROM project_collaborators 
          WHERE user_id = auth.uid() AND invitation_status = 'accepted'
        )
    )
  );

CREATE POLICY "Only project owners can manage site maps" ON site_maps
  FOR ALL USING (
    project_id IN (
      SELECT id FROM projects WHERE owner_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX projects_owner_id_idx ON projects(owner_id);
CREATE INDEX project_collaborators_project_id_idx ON project_collaborators(project_id);
CREATE INDEX project_collaborators_user_id_idx ON project_collaborators(user_id);
CREATE INDEX project_schemas_project_id_idx ON project_schemas(project_id);
CREATE INDEX site_maps_project_id_idx ON site_maps(project_id);