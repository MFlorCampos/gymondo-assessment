# Workout Management System

This project is a web-based platform for managing workouts, developed using **Next.js** and **Supabase**.

## Tech Stack

- **Next.js 15.2**:
  - Enables server-side rendering and static page generation
  - Integrated routing and API management
- **Supabase**:
  - Utilizes a PostgreSQL database
  - Supports real-time updates
  - Note: this db will only be available for 1 week
- **TypeScript**:
  - Enhances code reliability by catching errors early
  - Improves code readability and documentation
  - Provides better IDE support
- **TailwindCSS**:
  - A utility-first CSS framework
  - Highly flexible and customizable
  - Eliminates the need to switch between HTML and CSS files

## Key Features

- View and browse workouts with pagination
- Apply filters based on start date and category
- Responsive design
- Detailed workout information page
- Navigation between the Workout List and Detail pages

## User Scenarios

### **Workout List Page**

- A **global header** with a logo is visible.
- A **toolbar** allows filtering workouts by:
  - **Start date**: Shows workouts starting within the next 12 months.
  - **Category**: Enables filtering by multiple categories (`c1`, `c2`, `c3`, etc.).
- The **workout catalog** displays a maximum of 20 workouts per page.
- **Pagination controls** allow browsing through additional workouts.
- Clicking on any workout redirects the user to the **Workout Detail Page**.

### **Workout Detail Page**

- The detailed view displays:
  - **Workout name**
  - **Start date**
  - **Category**
- A button allows users to navigate back to the **Workout List Page**.

## Database Information

- A dataset containing **1000 workouts** is preloaded to enable pagination.
- Each workout entry includes:
  - **Name**: Text field
  - **Description**: Text field
  - **Start Date**: Date field
  - **Category**: Text field (values: `c1`, `c2`, `c3`, `c4`, `c5`, `c6`, `c7`)

## Setting Up the Environment

1. Clone the repository:

```bash
git clone [repository-url]
cd [project-directory]
```

2. Add the `.env` file to the root directory.

## Installation & Running the App

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your web browser.

## Project Structure

- `/app` - Core application files
  - `/components` - Reusable UI components
  - `/lib` - Utility modules (Supabase client setup)
  - `/utils` - Helper functions
  - `/types` - TypeScript type definitions

## Running Tests

1. Run unit tests:

```bash
npm run test
```
