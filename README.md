# `bytes`

Byte-sized software development projects.

## Table of Contents

1. [Local PostgreSQL Container](#1-local-postgresql-container)
2. [Authentication Service](#2-authentication-service)
3. [Automated CI/CD Build and Deploy Pipeline](#3-automated-cicd-build-and-deploy-pipeline)
4. [API Rate Limiting and Caching](#4-api-rate-limiting-and-caching)
5. [Asynchronous Job Queue](#5-asynchronous-job-queue)
6. [OAuth 2.0 Authorization Server](#6-oauth-20-authorization-server)
7. [Websocket Real-Time Updates](#7-websocket-real-time-updates)
8. [Basic Chat Server](#8-basic-chat-server)
9. [Event-Driven Microservices](#9-event-driven-microservices)
10. [Feature Flagging System](#10-feature-flagging-system)
11. [Scheduled Tasks and Cron Jobs](#11-scheduled-tasks-and-cron-jobs)
12. [Cloud-based File Storage and Processing Service](#12-cloud-based-file-storage-and-processing-service)
13. [Asynchronous Task Processing Service](#13-asynchronous-task-processing-service)
14. [Distributed Caching System](#14-distributed-caching-system)
15. [Kubernetes-Based Microservice](#15-kubernetes-based-microservice)

### 1. Local PostgreSQL Container

- **Technology:** `Docker`, `PostgreSQL`
- **Description:** Set up a simple Docker container running PostgreSQL with data persisted in a local volume.
- **Learning outcome:** Docker basics, database containerization, local development environment setup.

### 2. Authentication Service

- **Technology:**
  - `TypeScript`, `Express.js`, `JWT`, `PostgreSQL`
  - `Go`, `JWT`, `PostgreSQL`
- **Description:** Develop a simple authentication service that can be reused across projects.
- **Learning outcome:** Authentication mechanisms, security best practices, reusable service design.

### 3. Automated CI/CD Build and Deploy Pipeline

- **Technology:** `GitHub Actions`, `Docker`, `AWS ECS` or `Azure ACI`
- **Description:** Set up a continuous integration and continuous deployment pipeline for a simple application. Configure it to run tests, build Docker images, and deploy to a staging environment automatically on each push to the main branch.
- **Learning outcome:** Understanding of CI/CD principles, automated testing, containerization, and deployment strategies.

### 4. API Rate Limiting and Caching

- **Technology:**
  - `TypeScript`, `Express.js`, `Redis`
  - `Go`, `Redis`
- **Description:** Enhance an API by adding rate limiting to prevent abuse and implement caching to improve performance. Use Redis for both rate limiting and caching.
- **Learning outcome:** API security, performance optimization, Redis usage, Docker Compose for multi-container applications.

### 5. Asynchronous Job Queue

- **Technology:**
  - `TypeScript`, `Bull`, `Redis`
  - **Alternative:** `Go`, `Machinery`, `Redis`
- **Description:** Implement an asynchronous job queue system that can handle background tasks for your API (e.g., sending emails, generating reports).
- **Learning outcome:** Asynchronous programming, job queue systems, background task processing, scaling considerations.

### 6. OAuth 2.0 Authorization Server

- **Technology:**
  - `TypeScript`, `Express.js`, `Node-OAuth2-Server`
  - `Go`, `Go-OAuth2-Server`
- **Description:** Develop a custom OAuth 2.0 authorization server that supports various grant types. Implement client registration, token issuance, and introspection endpoints.
- **Learning outcome:** Advanced authentication and authorization protocols, security best practices, and token-based authentication systems.

### 7. Websocket Real-Time Updates

- **Technology:**
  - `TypeScript`, `Socket.io`, `Redis`
  - \*`Go`, `some WebSocket library`, `Redis`
- **Description:** Add real-time update capabilities to your API using WebSockets. Use Redis as a pub/sub mechanism to handle scaling.
- **Learning outcome:** Real-time communication protocols, pub/sub patterns, handling stateful connections in a scalable way.

### 8. Basic Chat Server

- **Technology:** `Python` or `Go`, `WebSocket` or `TCP/UDP`
- **Description:** Create a console-based chat server that handles multiple clients. Each client can send and receive messages in real-time.
- **Learning Outcome:** Socket programming, real-time communication, and networking basics.

### 9. Event-Driven Microservices

- **Technology:**
  - `TypeScript`, `Apache Kafka`, `Docker Compose`
  - `Go`, `RabbitMQ`, `Docker Compose`
- **Description:** Create a small event-driven microservices system where services communicate through a message broker. Implement at least two services that produce and consume events.
- **Learning outcome:** Event-driven architecture, message brokers, microservices communication patterns.

### 10. Feature Flagging System

- **Technology:**
  - `TypeScript`, `Express.js`, `Redis`
- **Description:** Implement a feature flagging system that allows you to toggle features on and off without deploying new code. Create a simple UI to manage flags.
- **Learning outcome:** Progressive feature rollout, A/B testing concepts, dynamic configuration management.

### 11. Scheduled Tasks and Cron Jobs

- **Technology:**
  - `TypeScript`, `Node-cron`, `Docker`
  - `Go`, `Gocron`, `Docker`
- **Description:** Implement a system for running scheduled tasks, like daily database cleanups, weekly report generation, or periodic API calls to external services.
- **Learning outcome:** Task scheduling, background processes, time-based job automation.

### 12. Cloud-based File Storage and Processing Service

- **Technology:**
  - `TypeScript`, `Express.js`, `AWS S3`, `AWS Lambda`
  - `Go`, `Azure Blob Storage`, `Azure Functions`
- **Description:** Create a service that allows file uploads to cloud storage. Use serverless functions to trigger processing tasks when new files are uploaded. Implement a simple API to manage and retrieve files.
- **Learning outcome:** Cloud storage integration, serverless function basics, event-driven architecture in the cloud, handling file uploads and downloads in a web service, basic cloud security practices.

### 13. Asynchronous Task Processing Service

- **Technology:**
  - `TypeScript`, `Bull`, `Redis`, `Docker Compose`
  - `Go`, `Machinery`, `Redis`, `Docker Compose`
- **Description:** Create a system with a producer service that generates tasks and a consumer service that processes these tasks asynchronously using a message queue.
- **Learning outcome:** Asynchronous programming, event-driven architectures, scalability concepts, and fault tolerance.

### 14. Distributed Caching System

- **Technology:**
  - `TypeScript`, `Redis`, `Express.js`
  - `Go`, `Redis`
- **Description:** Implement a caching layer for a web application to improve performance. Use distributed caching to store and retrieve frequently accessed data, reducing database load.
- **Learning outcome:** Caching strategies, distributed systems, performance optimization, and data persistence.

### 15. Kubernetes-Based Microservice

- **Technology:** `Kubernetes`, `Docker`, `Node.js` or `Go`, `MongoDB`
- **Description:** Deploy a simple microservice application in a Kubernetes cluster. Use MongoDB for data storage and set up load balancing with multiple instances.
- **Learning Outcome:** Kubernetes orchestration, microservices deployment, container scaling, and high availability.
