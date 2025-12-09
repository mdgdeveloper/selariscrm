---
title: SelarisCRM Endpoints
version: 1.0.0
description: Documentation of all API endpoints for SelarisCRM.
lastUpdated: 2025-12-07
---

# SelarisCRM Endpoints

## Provider Endpoints

### Create New Provider
- **Endpoint**: `POST /api/providers`
- **Description**: Create a new provider record in the system.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "notes": "string",
    "logo": "string"
  }
  ```
- **Response**:
  - **201 Created**
  ```json
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "notes": "string",
    "logo": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Get Provider by ID
- **Endpoint**: `GET /api/providers/{id}`
- **Description**: Retrieve a provider record by its ID.
- **Response**:
  - **200 OK**
  ```json
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "notes": "string",
    "logo": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```
  - **404 Not Found**
  ```json
  {
    "error": "Provider not found"
  }
  ```

### Update Provider
- **Endpoint**: `PUT /api/providers/{id}`
- **Description**: Update an existing provider record.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "notes": "string",
    "logo": "string"
  }
  ```
- **Response**:
  - **200 OK**
  ```json
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "notes": "string",
    "logo": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```
  - **404 Not Found**
  ```json
  {
    "error": "Provider not found"
  }
  ```

## Cliente Endpoint 

### Create New Cliente
- **Endpoint**: `POST /api/clientes`
- **Description**: Create a new cliente record in the system.
