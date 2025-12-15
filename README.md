# Transportation Management System (TMS) - POC

## 🚀 Overview
A scalable full-stack Proof of Concept (POC) for a Transportation Management System. This application demonstrates a high-performance GraphQL API backend and a responsive, aesthetic React frontend for managing shipment data.

**Live Demo:** [Link to your Vercel/Netlify URL]
**API Playground:** [Link to your Render/Railway URL]/graphql

## 🛠 Tech Stack
* **Backend:** NestJS, TypeScript, GraphQL (Code-First), PostgreSQL, TypeORM.
* **Frontend:** React (Vite), Tailwind CSS, Apollo Client, Shadcn/UI (for accessibility and design).
* **Deployment:** Vercel (Frontend) + Render (Backend) + Neon (Postgres).

## 📋 Key Features
* **Data Visualization:** Dual-view system allowing users to toggle between a Data Grid (Table) and Tile View (Cards).
* **Role-Based Access Control (RBAC):** Distinct capabilities for `ADMIN` (can delete/edit) and `EMPLOYEE` (read-only views).
* **Performance:** * Server-side pagination and sorting to handle large datasets.
    * Optimized database indexing on `status` and `trackingId`.
* **Design:** Responsive layout with a collapsible hamburger menu and "Slide-over" detailed views for shipments.

## 📝 Architectural Decisions & Assumptions
**1. Data Model Strategy**
The requirement document mentioned an "Employee" data model but requested "Shipment" queries. Given the context of *UltraShip TMS*, I prioritized the **Shipment Entity** as the core business domain.
* **Shipment Fields:** `trackingId`, `status`, `origin`, `destination`, `estimatedDelivery`.
* **User Entity:** Used solely for RBAC (Admin vs. Employee).

**2. Scalability**
* **GraphQL:** Solves over-fetching issues by allowing the client to request only necessary fields (e.g., Grid View requests fewer fields than Detail View).
* **Structure:** Backend follows a modular architecture (Services, Resolvers, DTOs) ensuring easy extension for microservices.

## ⚙️ Local Setup

### Backend
1. Navigate to server: `cd server`
2. Install dependencies: `npm install`
3. Set up `.env` (see `.env.example`).
4. Run app: `npm run start:dev`

### Frontend
1. Navigate to client: `cd client`
2. Install dependencies: `npm install`
3. Run app: `npm run dev`

## 🧪 Testing credentials
To test the RBAC features, use the following login credentials:

* **Admin User:** `admin@ultraship.com` / `admin123` (Full Access)
* **Employee User:** `staff@ultraship.com` / `staff123` (Read Only)

ultraship-tms-poc/
├── README.md              # Your documentation (Crucial for the assignment)
├── .gitignore             # Ignore node_modules, .env, dist, etc.
├── package.json           # Optional: scripts to install/run both (if you want)
│
├── server/                # NESTJS BACKEND
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── common/        # Shared logic
│   │   │   └── guards/    # Auth guards (RBAC)
│   │   ├── database/      # Database config
│   │   ├── shipments/     # SHIPMENT MODULE
│   │   │   ├── shipment.entity.ts
│   │   │   ├── shipment.resolver.ts
│   │   │   ├── shipment.service.ts
│   │   │   └── dto/       # Inputs for filtering/pagination
│   │   └── users/         # USER/AUTH MODULE
│   │       ├── user.entity.ts
│   │       ├── auth.service.ts
│   │       └── user.resolver.ts
│   ├── test/
│   ├── .env               # DB credentials (DO NOT COMMIT)
│   ├── .env.example       # Template for the reviewer
│   ├── docker-compose.yml # (Optional) Good for "extraordinary" points
│   └── package.json
│
└── client/                # REACT FRONTEND
    ├── src/
    │   ├── assets/
    │   ├── components/    # Shared UI (Buttons, Layouts, Shadcn components)
    │   │   ├── ui/        # Shadcn base components
    │   │   └── Layout.tsx # Sidebar + Header wrapper
    │   ├── features/      # Feature-based folder structure
    │   │   └── shipments/
    │   │       ├── components/
    │   │       │   ├── ShipmentGrid.tsx
    │   │       │   ├── ShipmentTile.tsx
    │   │       │   └── ShipmentDetailModal.tsx
    │   │       └── hooks/ # Custom hooks (useShipments)
    │   ├── pages/         # Route pages
    │   │   ├── Dashboard.tsx
    │   │   └── Login.tsx
    │   ├── graphql/       # Generated types from backend
    │   ├── App.tsx
    │   └── main.tsx
    ├── .env               # API URL
    ├── tailwind.config.js
    └── package.json