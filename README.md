### Key Account Manager (KAM) Lead Management System

This document provides detailed information about the **KAM Lead Management System** project, covering the setup, usage, technical requirements, and advanced features.

---

## **Project Overview**

The **Key Account Manager (KAM) Lead Management System** is designed to help KAMs efficiently manage restaurant leads, track interactions, and monitor key performance metrics. It is a full-stack application built using **Node.js** for the backend and **MySQL** as the database and **React.js** for the frontend.

---

## **Features**

### **1. Lead Management**
- Store and manage restaurant leads with the following information:
  - Restaurant name
  - Address
  - Contact number
  - Current status: `New`, `Active`, or `Inactive`
  - Assigned KAM

### **2. Contact Management**
- Maintain contact details for restaurant staff:
  - Name
  - Role (e.g., Owner, Manager)
  - Phone number
  - Email
- Support multiple points of contact per restaurant.

### **3. Interaction Tracking**
- Record and track all interactions with leads, including:
  - Interaction type: `Call`, `Visit`, or `Order`
  - Notes
  - Date of interaction
  - Follow-up required (`Yes/No`)

### **4. Call Planning**
- Set call frequency for leads.
- Display leads requiring calls today.
- Track the last call date for each lead.

### **5. Performance Tracking**
- Monitor performance metrics for leads:
  - Total orders
  - Last order date
  - Threshold-based performance evaluation (`Well-performing` vs. `Underperforming`)

### **6. Simple Dashboard**
- View:
  - All leads
  - Today's pending calls
  - Recent interactions
- Basic search functionality for leads and contacts.

---

## **Technical Stack**

### **Backend**
- **Framework:** Node.js with Express
- **Database:** MySQL
- **ORM:** Sequelize

### **Frontend**
- **Technologies:** React, HTML, CSS, and JavaScript

---

## **Setup Instructions**

### **Prerequisites**
1. Install **Node.js** (v16+).
2. Install **MySQL** and set up a database.
3. Install a REST client like Postman or a browser with API testing capabilities.

### **Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/kam-lead-management.git
   cd kam-lead-management
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in a `.env` file:
   ```plaintext
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=kam_system
   JWT_SECRET=your_secret
   PORT=3000
   ```
4. Initialize the database:
   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
5. Start the server:
   ```bash
   npm start
   ```

6. Access the application:
   - **API Base URL:** `http://localhost:3000`
   - Use the frontend files in the `/frontend` directory or access the deployed version.

---

## **API Documentation**

### **1. Lead Management**
| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| POST   | `/leads`             | Add a new lead             |
| GET    | `/leads`             | Get all leads              |
| PUT    | `/leads/:id`         | Update lead details        |
| DELETE | `/leads/:id`         | Delete a lead              |

### **2. Contact Management**
| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| POST   | `/contacts`          | Add a contact              |
| GET    | `/contacts/:leadId`  | Get contacts for a lead    |
| PUT    | `/contacts/:id`      | Update contact details     |
| DELETE | `/contacts/:id`      | Delete a contact           |

### **3. Interaction Tracking**
| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| POST   | `/interactions`      | Add an interaction         |
| GET    | `/interactions/:leadId` | Get interactions for a lead |
| DELETE | `/interactions/:id`  | Delete an interaction      |

### **4. Call Planning**
| Method | Endpoint                      | Description                         |
|--------|-------------------------------|-------------------------------------|
| POST   | `/call-planning/set-frequency`| Set call frequency for a lead       |
| GET    | `/call-planning/due-today`    | Get leads requiring calls today     |
| PUT    | `/call-planning/update-last-call/:leadId` | Update last call date for a lead  |
| GET    | `/call-planning/get-all`      | Get all call plans                  |

### **5. Performance Tracking**
| Method | Endpoint                      | Description                         |
|--------|-------------------------------|-------------------------------------|
| GET    | `/performance`                | Get all performance metrics         |
| GET    | `/performance/well-performing`| Get well-performing accounts        |
| GET    | `/performance/underperforming`| Get underperforming accounts        |
| PUT    | `/performance/update/:leadId` | Update performance metrics for a lead |

---

## **Database Schema**

### **Leads**
| Column          | Type       | Description                       |
|------------------|------------|-----------------------------------|
| id              | INT        | Primary Key                      |
| restaurant_name | VARCHAR    | Name of the restaurant           |
| address         | VARCHAR    | Address of the restaurant        |
| contact_number  | VARCHAR    | Contact number                   |
| status          | ENUM       | `New`, `Active`, or `Inactive`   |
| assigned_kam    | INT        | Foreign Key to KAM               |

### **Contacts**
| Column   | Type       | Description                       |
|----------|------------|-----------------------------------|
| id       | INT        | Primary Key                      |
| lead_id  | INT        | Foreign Key to Leads             |
| name     | VARCHAR    | Contact name                     |
| role     | VARCHAR    | Role of the contact              |
| phone    | VARCHAR    | Contact phone number             |
| email    | VARCHAR    | Contact email                    |

### **Interactions**
| Column           | Type       | Description                     |
|-------------------|------------|---------------------------------|
| id               | INT        | Primary Key                    |
| lead_id          | INT        | Foreign Key to Leads           |
| type             | ENUM       | `Call`, `Visit`, or `Order`    |
| notes            | TEXT       | Interaction notes              |
| interaction_date | DATE       | Date of the interaction        |

### **Call Planning**
| Column         | Type       | Description                     |
|-----------------|------------|---------------------------------|
| id             | INT        | Primary Key                    |
| lead_id        | INT        | Foreign Key to Leads           |
| call_frequency | INT        | Frequency of calls in days     |
| last_call_date | DATE       | Date of the last call          |

### **Performance**
| Column          | Type       | Description                     |
|------------------|------------|---------------------------------|
| id              | INT        | Primary Key                    |
| lead_id         | INT        | Foreign Key to Leads           |
| total_orders    | INT        | Total number of orders         |
| last_order_date | DATE       | Date of the last order         |

---

## **Demo Instructions**

1. **Set Up Application**:
   - Follow the setup steps to initialize the application.

2. **Record a Demo**:
   - Use tools like OBS or Zoom to record:
     - Setting up the application.
     - Adding, updating, and deleting leads.
     - Interactions with contacts and tracking features.
     - Simple dashboard functionalities.

3. **Upload the Demo**:
   - Provide a link to the demo in the submission.

---

## **Timeline**
- **Submission Deadline**: January 5th, 2025
- Early submissions are encouraged.

---

For further questions or clarifications, please contact the project manager.