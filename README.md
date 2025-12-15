# 🚚 UltraShip TMS - Full Stack POC

A next-generation Transportation Management System (TMS) built to streamline logistics operations. This Proof of Concept (POC) demonstrates a scalable **GraphQL** backend and a high-performance **React** frontend with Role-Based Access Control (RBAC).



## 🚀 Live Demo & Repository
* **Live URL:** [Insert your Vercel/Netlify Link Here]
* **Repository:** [Insert your GitHub Link Here]

---

## 🛠 Tech Stack
This project uses a modern, type-safe stack designed for scalability and performance.

### **Backend (Server)**
* **Framework:** [NestJS](https://nestjs.com/) (Node.js)
* **API:** GraphQL (Code-First approach)
* **Database:** PostgreSQL + TypeORM
* **Auth:** JWT + Role-Based Access Control (RBAC)
* **Validation:** Class-Validator & Class-Transformer

### **Frontend (Client)**
* **Framework:** React 18 (Vite)
* **Styling:** Tailwind CSS (Responsive Design)
* **State/API:** Apollo Client (GraphQL)
* **UI Components:** Lucide Icons, Custom Modals, Slide-overs
* **Utils:** Date-fns, LocalStorage

---

## ✨ Key Features (Assignment Requirements)

### 1. 🎨 Extraordinary UI/UX
* **Dual View Mode:** Toggle between a data-dense **Grid View** (Table) and a visual **Tile View** (Cards).
* **Smooth Animations:** Details open in a "Slide-over" drawer with CSS transitions.
* **Responsive:** Fully functional on mobile/tablet (Hamburger menu included).

### 2. ⚡️ Performance & Scalability
* **Server-Side Pagination:** Efficiently handles large datasets (fetches 10 records at a time).
* **Filtering & Sorting:** Backend-optimized queries for status filtering.
* **Optimized API:** GraphQL prevents over-fetching data.

### 3. 🔐 Security & RBAC
* **Secure Authentication:** JWT-based login system.
* **Role Management:**
    * **ADMIN:** Can View, Create, Edit, and Delete shipments.
    * **EMPLOYEE:** Read-only access (Create buttons are hidden).

---

## 🏁 Getting Started (Run Locally)

Follow these steps to get the application running on your machine in under 5 minutes.

### Prerequisites
* Node.js (v18+)
* PostgreSQL (Local or Docker)

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/ultraship-tms-poc.git](https://github.com/YOUR_USERNAME/ultraship-tms-poc.git)
cd ultraship-tms-poc

cd server
npm install

# Option A: If you have Docker (Easiest)
docker-compose up -d

# Option B: If you use local Postgres
# Update server/src/app.module.ts with your DB credentials if needed.

# Run the Server
npm run start:dev

cd client
npm install
npm run dev