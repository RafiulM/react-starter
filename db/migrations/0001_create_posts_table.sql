-- Migration: Create posts table for blog functionality
-- Created at: 2025-08-14

CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');

CREATE TABLE IF NOT EXISTS post (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt VARCHAR(500),
    featured_image TEXT,
    status post_status NOT NULL DEFAULT 'draft',
    author_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT post_slug_unique UNIQUE (slug)
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_post_slug ON post(slug);

-- Create index on author_id for faster user-based queries
CREATE INDEX IF NOT EXISTS idx_post_author_id ON post(author_id);

-- Create index on status for filtering published/draft posts
CREATE INDEX IF NOT EXISTS idx_post_status ON post(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_post_created_at ON post(created_at DESC);

-- Create trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_post_updated_at 
    BEFORE UPDATE ON post 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO post (title, slug, content, excerpt, author_id, status) VALUES
('Welcome to Our Blog', 'welcome-to-our-blog', 'This is the first post on our new blog. We''re excited to share our thoughts and ideas with you!', 'Welcome to our new blog where we''ll share insights and updates.', (SELECT id FROM "user" LIMIT 1), 'published'),
('Getting Started with React', 'getting-started-with-react', 'React is a powerful JavaScript library for building user interfaces. In this post, we''ll explore the basics...', 'Learn the fundamentals of React development.', (SELECT id FROM "user" LIMIT 1), 'draft');