# Employee Management

A web application for managing employee records. It provides an interface to view, add, edit, and delete employees, with data stored in MongoDB.

## Features

- View employee records in a table
- Add employees with a name, email, phone number, and position
- Edit and delete existing employees
- Prevent duplicate email addresses and phone numbers
- Store employee records in MongoDB

## Tech stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Redux Toolkit for client-side state
- MongoDB with Mongoose
- CSS Modules and Tailwind CSS

## Prerequisites

- Node.js and npm
- A MongoDB database, local or hosted

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root and set your MongoDB connection string:

   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/employee_management
   ```

   Replace the example URI with your own MongoDB connection string if needed.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## API routes

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/employees` | Retrieve employee records |
| `POST` | `/api/employees` | Create an employee |
| `PUT` | `/api/employees/[id]` | Update an employee |
| `DELETE` | `/api/employees/[id]` | Delete an employee |

Employee records have `name`, `email`, `phone`, and `position` fields. All fields are required; email addresses and phone numbers must be unique.

## Project structure

```text
app/
  api/employees/       Employee API routes
  page.tsx             Main employee management page
components/            Header, employee form, table, and Redux provider
lib/
  features/employees/  Employee Redux state and API actions
  mongoose.js          MongoDB connection
  store.js             Redux store
models/                Mongoose employee model
```
