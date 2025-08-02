# ImpactLens - AI-Driven Jira Impact Analysis Tool

A web application that uses LLM to analyze new Jira tickets and identify potential missed impacts, related tickets, and regression testing areas through intelligent caching and real-time synchronization.

## 🚀 Quick Start

### Prerequisites
- Java 17 (OpenJDK or Oracle JDK)
- Node.js 18+ 
- Docker and Docker Compose
- Maven or Gradle

### Quick Setup
```bash
# Clone the repository
git clone <repository-url>
cd ImpactLens

# Start all services with Docker
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:8080
# API Docs: http://localhost:8080/swagger-ui.html
```

## 📁 Project Structure

```
ImpactLens/
├── frontend/                 # Next.js application
├── backend/                  # Spring Boot API
├── docs/                     # Documentation
├── docker-compose.yml        # Local development
└── README.md                 # This file
```

## 🛠️ Development

### Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

## 📚 Documentation

- [Implementation Plan](./docs/IMPACT_ANALYSIS_PLAN.md)
- [Technical Specification](./docs/TECHNICAL_SPECIFICATION.md)
- [Quick Start Guide](./docs/QUICK_START.md)

## 🔧 Features

- **AI-Powered Analysis**: Uses OpenAI to analyze Jira tickets
- **Intelligent Caching**: Redis-based caching with webhook updates
- **Real-time Sync**: Webhook processing for live Jira updates
- **Impact Analysis**: Identifies related tickets and potential gaps
- **Regression Testing**: Recommends testing areas based on analysis

## 🏗️ Architecture

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Spring Boot 3.x with Java 17
- **Database**: PostgreSQL with JPA/Hibernate
- **Cache**: Redis with Spring Cache
- **AI**: OpenAI API integration
- **Deployment**: Docker containerization

## 📊 Success Metrics

- Response time: < 2 seconds for cached data
- Accuracy: > 90% relevant ticket identification
- Uptime: > 99.9% availability
- Cache hit rate: > 80%

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 