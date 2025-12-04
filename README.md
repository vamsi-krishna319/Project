📌 Employee Shift Board – Full Stack Application

A mini HR utility to manage employee work shifts with secure authentication, role-based access control, and business rule validations.

🚀 Tech Stack
Area	Technology
Frontend	React / Next.js
Backend	Node.js, Express.js
Database	MongoDB / PostgreSQL / MySQL (choose one)
Authentication	JWT (JSON Web Token)
UI	Tailwind / Material UI / Basic CSS
API Client	Axios
Deployment (optional)	Vercel / Netlify + Render / Railway
🔥 Core Features
🔐 Authentication (JWT)

Login using email & password

Two seeded roles:

Admin

Normal User

Protected routes with role validation

🧑‍💼 Employee Shift Management
Field	Description
Name	Employee Name
Employee Code	Unique Identifier
Department	Eg: HR, Sales, Tech
⏱ Shift Fields
Field	Description
Date	Shift date
Start Time	Shift start
End Time	Shift end
⚠️ Business Rules (Mandatory)
Rule	Description
❌ Overlap Shifts	A user cannot have two overlapping shifts on the same date
⏳ Minimum Duration	Shift must be at least 4 hours long
🔒 Access Control	Normal users can view only their own shifts; Admin can view all shifts
🛠 Backend API Routes
Method	Endpoint	Role	Description
POST	/login	Public	Login & get token
GET	/employees	Admin	View all employees
POST	/shifts	Admin	Assign a new shift
GET	/shifts?employee=x&date=y	Admin/User	Fetch shifts
DELETE	/shift/:id	Admin	Delete a shift
🔎 Response Structure

All responses follow:

{
  "success": true/false,
  "message": "Message here",
  "data": { }
}

🖥 Frontend Pages
Page	Role
Login	Public
Dashboard	Admin / User
Shift Assignment Form	Admin
Shifts Table	Admin / User
UI Capabilities

Show validation & API errors

Responsive layout (mobile + desktop)

🔐 Seeded Demo Credentials (Must Exist)
Email	Password	Role
hire-me@anshumat.org
	HireMe@2025!	Admin (for reviewer login)

You may add one more test user example:
| normal@user.com
 | User@1234 | User |

🧪 Postman Collection

A Postman collection is included in the repository under:

/postman/shift-board.postman_collection.json

🏗 Installation & Setup
Backend
cd backend
npm install
npm run seed        # optional: to insert demo users
npm start


Create a .env with:

PORT=5000
JWT_SECRET=your-secret-key
DB_URL=your-database-url

Frontend
cd frontend
npm install
npm start


Create .env with:

VITE_API_BASE_URL=http://localhost:5000
