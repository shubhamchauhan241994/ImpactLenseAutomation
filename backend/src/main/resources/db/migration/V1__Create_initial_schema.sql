-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'USER',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create jira_tickets table
CREATE TABLE jira_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_key VARCHAR(50) UNIQUE NOT NULL,
    ticket_id VARCHAR(50) NOT NULL,
    summary TEXT,
    description TEXT,
    status VARCHAR(50),
    priority VARCHAR(20),
    assignee VARCHAR(100),
    reporter VARCHAR(100),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    raw_data JSONB,
    last_synced_at TIMESTAMP DEFAULT NOW(),
    ttl_expires_at TIMESTAMP,
    created_by UUID REFERENCES users(id)
);

-- Create analysis_results table
CREATE TABLE analysis_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_key VARCHAR(50) NOT NULL,
    analysis_data JSONB NOT NULL,
    processing_time INTEGER,
    cache_hit BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- Create related_tickets table
CREATE TABLE related_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_ticket_key VARCHAR(50) NOT NULL,
    related_ticket_key VARCHAR(50) NOT NULL,
    relevance_score DECIMAL(3,2),
    relationship_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(source_ticket_key, related_ticket_key)
);

-- Create webhook_events table
CREATE TABLE webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(50) NOT NULL,
    ticket_key VARCHAR(50),
    payload JSONB,
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create user_preferences table
CREATE TABLE user_preferences (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    theme VARCHAR(20) DEFAULT 'LIGHT',
    auto_refresh BOOLEAN DEFAULT false,
    notifications_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create refresh_tokens table
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    is_revoked BOOLEAN DEFAULT false
);

-- Create indexes for better performance
CREATE INDEX idx_jira_tickets_key ON jira_tickets(ticket_key);
CREATE INDEX idx_jira_tickets_status ON jira_tickets(status);
CREATE INDEX idx_jira_tickets_assignee ON jira_tickets(assignee);
CREATE INDEX idx_jira_tickets_updated_at ON jira_tickets(updated_at);

CREATE INDEX idx_analysis_results_ticket_key ON analysis_results(ticket_key);
CREATE INDEX idx_analysis_results_created_at ON analysis_results(created_at);

CREATE INDEX idx_related_tickets_source ON related_tickets(source_ticket_key);
CREATE INDEX idx_related_tickets_related ON related_tickets(related_ticket_key);
CREATE INDEX idx_related_tickets_relevance ON related_tickets(relevance_score);

CREATE INDEX idx_webhook_events_type ON webhook_events(event_type);
CREATE INDEX idx_webhook_events_ticket_key ON webhook_events(ticket_key);
CREATE INDEX idx_webhook_events_created_at ON webhook_events(created_at);

CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);

-- Insert default admin user
INSERT INTO users (username, email, password_hash, first_name, last_name, role)
VALUES (
    'admin',
    'admin@impactlens.com',
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', -- password: admin123
    'Admin',
    'User',
    'ADMIN'
);

-- Insert default user preferences for admin
INSERT INTO user_preferences (user_id, theme, auto_refresh, notifications_enabled)
SELECT id, 'LIGHT', false, true FROM users WHERE username = 'admin'; 