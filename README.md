AI-Powered Quiz Generator App
An innovative web application that leverages the power of Artificial Intelligence to generate customizable quizzes on various topics. Built with Next.js, Firebase for robust backend services, and styled with Tailwind CSS, this app provides a seamless experience for creating, managing, and taking quizzes.

✨ Features
AI-Powered Quiz Generation: Utilize the Gemini API to dynamically generate quiz questions and answers based on user-provided topics or text.

User Authentication: Secure user login and registration powered by Firebase Authentication.

Quiz Management: Users can create, view, edit, and delete their generated quizzes.

Interactive Quiz Taking: A user-friendly interface for taking quizzes.

Responsive Design: Optimized for various devices using Tailwind CSS.

Real-time Data Sync: Firebase Firestore ensures that all quiz data is updated in real-time across devices.

🚀 Technologies Used
Next.js: A React framework for building fast, scalable, and SEO-friendly web applications.

Firebase:

Firestore: A flexible, scalable NoSQL cloud database for storing quiz data (questions, options, user scores, etc.).

Authentication: For secure user registration and login.

Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.

Gemini API: Powers the AI capabilities for generating quiz content.

🛠️ Setup Instructions
Follow these steps to get the project up and running on your local machine.

Prerequisites
Node.js (LTS version recommended)

npm or yarn

1. Clone the Repository
git clone <https://github.com/Gopi-Kumar18/AI-Quiz-App>
cd ai-quiz-website

2. Install Dependencies
npm install
# or
yarn install

3. Firebase Project Setup
Go to the Firebase Console.

Create a new Firebase project.

Add a new web app to your Firebase project.

Copy your Firebase configuration object.

Enable Firestore Database and Firebase Authentication (e.g., Email/Password, Google Sign-in) in your Firebase project.

Set up Firestore Security Rules to control data access. For development, you might start with permissive rules, but ensure you secure them for production.

4. Environment Variables
Create a .env.local file in the root of your project and add your Firebase configuration and Gemini API key:

NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_FIREBASE_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_FIREBASE_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_FIREBASE_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_FIREBASE_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_FIREBASE_APP_ID"
NEXT_PUBLIC_GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

Replace the placeholder values with your actual Firebase and Gemini API keys.

5. Run the Application
npm run dev
# or
yarn dev

The application will be accessible at http://localhost:3000.

💡 Usage
Register/Login: Create a new account or log in using your credentials.

Generate Quiz: Navigate to the "Generate Quiz" section. Provide a topic or paste text, and the AI will create a quiz for you.

Manage Quizzes: View all your created quizzes, edit their content, or delete them.

Take Quiz: Select a quiz from your list and start answering questions.

🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

Project Images:

1.) **Home Page After Firebase Authentication.**

<img width="1888" height="867" alt="image" src="https://github.com/user-attachments/assets/209e93d6-c739-4155-b530-262dcc3d6a23" />


2.) **Quiz- Display Page** 

<img width="1339" height="934" alt="image" src="https://github.com/user-attachments/assets/d1bca4f5-5ada-418f-bdda-fdd9e6c2808e" />


3.) **Results - Page**

<img width="1887" height="947" alt="image" src="https://github.com/user-attachments/assets/6a711864-66fa-4282-bb78-df4043906c87" />


4.) **History Tracking Page**

<img width="1444" height="1020" alt="image" src="https://github.com/user-attachments/assets/e097d5f0-8436-43f7-85af-977c95907314" />

