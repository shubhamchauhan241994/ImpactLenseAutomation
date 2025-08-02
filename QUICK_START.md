# ImpactLens - Quick Start Guide

## Prerequisites

### Required Software
- **Java 17** (OpenJDK or Oracle JDK)
- **Maven** or **Gradle**
- **Node.js** (v18 or higher) for frontend
- **npm** or **yarn**
- **Docker** and **Docker Compose**
- **Git**

### Required Accounts
- **OpenAI API** account with API key
- **Jira** instance with API access
- **PostgreSQL** database (local or cloud)
- **Redis** instance (local or cloud)

## Environment Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ImpactLens
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies (Maven)
cd ../backend
mvn clean install

# Or with Gradle
cd ../backend
./gradlew build
```

### 3. Environment Configuration

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=ImpactLens
```

#### Backend (application.yml)
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/impactlens
    username: username
    password: password
    driver-class-name: org.postgresql.Driver
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
  
  redis:
    host: localhost
    port: 6379
  
  cache:
    type: redis
    redis:
      time-to-live: 86400000 # 24 hours

server:
  port: 8080

jira:
  base-url: https://your-domain.atlassian.net
  username: your-email@domain.com
  api-token: your-api-token

openai:
  api-key: your-openai-api-key

jwt:
  secret: your-jwt-secret-key
  expiration: 900000 # 15 minutes

logging:
  level:
    com.impactlens: DEBUG
    org.springframework.cache: DEBUG
```

### 4. Database Setup

#### Using Docker (Recommended)
```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Run database migrations
cd backend
mvn flyway:migrate

# Seed initial data (optional)
mvn spring-boot:run -Dspring.profiles.active=dev
```

#### Manual Setup
1. Install PostgreSQL locally
2. Create database: `createdb impactlens`
3. Install Redis locally
4. Run migrations: `npm run db:migrate`

### 5. Start Development Servers

#### Terminal 1 - Backend
```bash
cd backend
mvn spring-boot:run
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

#### Terminal 3 - Database (if not using Docker)
```bash
# Start PostgreSQL
brew services start postgresql

# Start Redis
brew services start redis
```

## First Run

### 1. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- API Documentation: http://localhost:8080/swagger-ui.html
- Health Check: http://localhost:8080/actuator/health

### 2. Test the Setup
1. Open http://localhost:3000
2. Enter a Jira ticket ID (e.g., PROJ-123)
3. Click "Analyze" to test the complete flow

### 3. Verify Components
- ✅ Frontend loads without errors
- ✅ Backend API responds to health check
- ✅ Database connection established
- ✅ Redis cache working
- ✅ Jira API integration functional
- ✅ OpenAI API integration working

## Development Workflow

### 1. Code Structure
```
ImpactLens/
├── frontend/                 # Next.js application
│   ├── app/                 # App router pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities and config
│   └── public/              # Static assets
├── backend/                 # Spring Boot API
│   ├── src/main/java/
│   │   └── com/impactlens/
│   │       ├── controllers/ # REST controllers
│   │       ├── services/    # Business logic
│   │       ├── repositories/# Data access layer
│   │       ├── entities/    # JPA entities
│   │       ├── config/      # Configuration classes
│   │       ├── security/    # Security configuration
│   │       └── utils/       # Helper functions
│   ├── src/main/resources/
│   │   ├── application.yml  # Configuration
│   │   └── db/migration/   # Flyway migrations
│   └── src/test/java/       # Test classes
├── docs/                    # Documentation
└── docker-compose.yml       # Local development
```

### 2. Common Commands

#### Backend
```bash
# Development
mvn spring-boot:run

# Database
mvn flyway:migrate
mvn flyway:clean
mvn flyway:info

# Testing
mvn test
mvn test -Dtest=*Test

# Build
mvn clean package
mvn clean install
```

#### Frontend
```bash
# Development
npm run dev

# Build
npm run build

# Testing
npm run test
npm run test:e2e

# Linting
npm run lint
```

### 3. Git Workflow
```bash
# Create feature branch
git checkout -b feature/analysis-engine

# Make changes and commit
git add .
git commit -m "feat: implement analysis engine"

# Push and create PR
git push origin feature/analysis-engine
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Restart PostgreSQL
brew services restart postgresql

# Check connection
psql -h localhost -U username -d impactlens
```

#### 2. Redis Connection Failed
```bash
# Check if Redis is running
brew services list | grep redis

# Restart Redis
brew services restart redis

# Test connection
redis-cli ping
```

#### 3. Jira API Issues
- Verify Jira credentials in `.env`
- Check Jira API permissions
- Ensure Jira instance is accessible
- Test with curl:
```bash
curl -u "email:api-token" \
  "https://your-domain.atlassian.net/rest/api/3/myself"
```

#### 4. OpenAI API Issues
- Verify API key in `.env`
- Check OpenAI account balance
- Ensure API key has correct permissions
- Test with curl:
```bash
curl -H "Authorization: Bearer your-api-key" \
  "https://api.openai.com/v1/models"
```

### 5. Frontend Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### 6. Backend Build Issues
```bash
# Clear build cache
rm -rf dist

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## Next Steps

### 1. Complete Setup Verification
- [ ] All services running
- [ ] Database migrations applied
- [ ] API endpoints responding
- [ ] Frontend loading correctly
- [ ] Test analysis working

### 2. Development Tasks
- [ ] Review the implementation plan
- [ ] Set up your IDE with recommended extensions
- [ ] Configure linting and formatting
- [ ] Set up pre-commit hooks
- [ ] Create your first feature branch

### 3. Production Preparation
- [ ] Set up staging environment
- [ ] Configure production databases
- [ ] Set up monitoring and logging
- [ ] Prepare deployment pipeline
- [ ] Security audit

## Support

### Documentation
- [Implementation Plan](./IMPACT_ANALYSIS_PLAN.md)
- [Technical Specification](./TECHNICAL_SPECIFICATION.md)
- [API Documentation](./docs/api.md)

### Getting Help
1. Check the troubleshooting section above
2. Review the technical specification
3. Check GitHub issues
4. Contact the development team

### Useful Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Jira REST API Documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/) 