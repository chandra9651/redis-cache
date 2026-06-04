# 🚀 Node.js + MongoDB + Redis Cache API

A high-performance backend API built using Node.js, Express, MongoDB, and Redis with caching and performance benchmarking.

---

# 📌 Features

- Product REST API
- MongoDB integration (Mongoose)
- Redis caching for fast response
- Cache hit/miss logging
- Query filtering (category-wise)
- Performance benchmarking using Autocannon
- Docker-based Redis setup

---

# ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Redis
- Docker
- Autocannon
- Test Performance by CLI - autocannon -c 5 -d 10 http://localhost:5000/api/products?category=Laptops


---

# Run Redis container
- docker run -d --name redis-server -p 6379:6379 redis

# Open Redis CLI
- docker exec -it redis-server redis-cli

# 📁 Project Setup

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
