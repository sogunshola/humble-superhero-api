# Humble Superhero API

## Overview

The **Humble Superhero API** allows users to add and retrieve superheroes based on their humility scores. It demonstrates best practices in API design using **NestJS**, **DTO validation**, **unit testing**, and **Swagger for API documentation**.

## Features

- Add superheroes with a name, superpower, and humility score (1-10).
- Retrieve superheroes sorted by humility score (highest first).
- Swagger API documentation.
- Unit tests with Jest.

## Tech Stack

- **Node.js** (NestJS framework)
- **TypeScript**
- **Jest** (unit testing)
- **Swagger** (API documentation)

## Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn

### Installation

Clone the repository and install dependencies:

```sh
yarn install
```

### Running the Application

Start the NestJS server:

```sh
yarn start:dev
```

The API will be available at:

- **Base URL:** `http://localhost:3000`
- **Swagger Docs:** `http://localhost:3000/swagger`

## API Endpoints

### Create a Superhero

**POST** `/superheroes`

#### Request Body

```json
{
  "name": "Captain Kind",
  "superpower": "Empathy",
  "humilityScore": 9
}
```

#### Response

```json
{
  "status": true,
  "message": "Superhero created successfully",
  "data": {
    "id": "6f498a14-fedf-4caf-bcca-8b1de2366308",
    "name": "Captain Kind",
    "superpower": "Empathy",
    "humilityScore": 9
  }
}
```

### Get Superheroes (Sorted by Humility)

**GET** `/superheroes`

#### Response

```json
{
  "status": true,
  "message": "Superheroes retrieved successfully",
  "data": [
    {
      "id": "6f498a14-fedf-4caf-bcca-8b1de2366308",
      "name": "Captain Kind",
      "superpower": "Empathy",
      "humilityScore": 9
    }
  ]
}
```

## Swagger API Documentation

Swagger is enabled for easy API exploration.

- Visit: `http://localhost:3000/swagger`
- Available in `src/main.ts` using `@nestjs/swagger`:
- Postman collection: `https://localhost:3000//swagger-json`

## Testing

Run unit tests:

```sh
yarn test
```

## Frontend
Run the frontend application:

```sh
yarn start:frontend
```
![Superhero Creation](./FE-screenshot.png)

## Collaboration Notes

If working in a team:

- Use **Git branches** for feature development.
- Discuss ideas or coming up with POCs before implementation.
- Keep API contracts **consistent** and documented in Swagger.
- Use **DTOs** to ensure input validation.

## If I Had More Time

- Add e2e tests using **Supertest**.
- Implement **database persistence** (e.g., PostgreSQL, MongoDB).
- Spend a bit more time on **frontend** to make it more user-friendly.
- Enhance **Swagger documentation** with more detailed request/response examples.

---
