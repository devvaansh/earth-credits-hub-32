Blue Carbon Registry Platform

The Trust Layer for Blue Carbon: A Verifiable, AI-Powered MRV System on the Blockchain.
Smart India Hackathon - Problem Statement

Field	Details
Problem Statement ID	25038
Title	Blockchain Based Blue Carbon Registry and MRV System
Theme	Clean & Green Technology
Category	Software
This README provides an overview of our project for the SIH Hackathon, including team details, relevant links, tasks completed, the technology stack, key features, and steps to run the project locally.

Team PLUTO

Team Leader: Raj Aryan - @aryanraj45

Team Members

Name	Roll Number	GitHub Username
Raj Aryan	2024UIC4038	@aryanraj45
Devansh	2024UIC3507	@devvaansh
Daksh Pathak	2024UIC3539	@dakshhhhh16
Prakhar Sharma	2024UIC3543	@prakhar0608shrma
Aastha Suhani	2024UCB6631	@Aastha3011
Nehal Pathak	2024UCD2175	@nehal1930
🔗 Project Links

Resource	Link
SIH Presentation	Final SIH Presentation
Video Demonstration	Watch Video
Live Deployment	View Deployment
Source Code	GitHub Repository
 Tasks Completed

 UI/UX Design: Designed an intuitive and modern user interface for all user roles (NGO, Verifier, Admin).
 Frontend Development: Built a responsive frontend using React, TypeScript, and Shadcn/UI.
 User Dashboards: Implemented dedicated dashboards for NGOs, Verifiers, and Administrators.
 Blockchain Integration: Integrated Solana wallet connectivity for transactions and authentication.
 AI Assistant: Developed an AI-powered chatbot using the Gemini API to guide users through project submission.
 MRV Components: Created UI components for the Monitoring, Reporting, and Verification (MRV) workflow, including map comparators and data analysis tabs.
 Backend Setup: Established a Node.js/Express server to handle API requests for AI report generation and satellite data.
 Smart Contract Development: (In Progress) Designing on-chain programs for minting carbon credit NFTs.
 Full MRV Automation: (In Progress) Integrating satellite imagery analysis pipeline.
🛠️ Tech Stack

Frontend

Framework: React (with Vite)
Language: TypeScript
Styling: Tailwind CSS
UI Components: Shadcn/UI
Animation: Framer Motion
Blockchain

Platform: Solana
Wallet Integration: Solana Wallet-Adapter
Backend & AI

Runtime: Node.js
Framework: Express.js
AI Model: Google Gemini API
Automation: Playwright
Database

Type: NoSQL (MongoDB)
✨ Key Features

Immutable Registry: All projects and carbon credits are recorded on the Solana blockchain, creating a tamper-proof and publicly verifiable audit trail.
AI-Powered MRV: Automated analysis of satellite imagery provides scientific, unbiased verification of carbon sequestration and ecosystem health, reducing costs and manual effort.
Role-Based Dashboards: Tailored user experiences for NGOs to submit projects, Verifiers to analyze evidence, and Admins to oversee the platform.
AI-Guided Submission: An integrated chatbot assistant (VerifiAI) helps NGOs navigate the complex project submission process, reducing errors and improving data quality.
Interactive Data Verification: An advanced workspace for verifiers with tools like a map comparator, document viewer, and AI analysis summaries to make informed decisions.
On-Chain Transactions: Secure and transparent on-chain actions for key events, including airdrops for testing and future minting of carbon credits.
🚀 How to Run Locally

Prerequisites

Node.js (v18 or higher)
npm or yarn
A .env file in the root directory and in the backend directory.
Setup

Clone the repository:

git clone [https://github.com/aryanraj45/blue-carbon-registry.git](https://github.com/aryanraj45/blue-carbon-registry.git)
Navigate to the project directory:

cd blue-carbon-registry
Install frontend dependencies:

npm install
Navigate to the backend directory and install dependencies:

cd backend
npm install
cd .. 
Create Environment Files:

In the project's root directory, create a file named .env for the frontend:
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
Inside the backend directory, create another file named .env for the server:
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SUPER_SECRET_JWT_KEY
Run the backend server:

npm run server
(This command should be configured in your root package.json to run the backend server)

Run the frontend development server:

Open a new terminal in the same root directory.
npm run dev
Open the application:

Open your browser and navigate to http://localhost:5173 (or the port specified in your terminal).
