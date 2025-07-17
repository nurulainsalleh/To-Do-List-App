To Do-List App

This is a basic To-Do List web application built using HTML, CSS, and Javascript. It allows users to create, view, and delete tasks. I built this as part of my the assessment to create a CRUD module.

Features
<br> ⦁	Add new tasks
<br>  ⦁	View list of tasks
<br> ⦁	Delete tasks
<br> ⦁	Basic form validation
<br> ⦁	Clean and modern UI (HTML/CSS/JS separated)
<br> ⦁	Export function to Excel file

How to Run the Project
<br> Option 1: Live Demo
<br> View the app directly via GitHub Pages:
🔗 https://nurulainsalleh.github.io/To-Do-List-App/

Option 2: Run Locally (Using XAMPP or Any Web Server)
Download or copy the following files:

index.html
style.css
script.js

Place all files into a folder, e.g.:
/xampp/htdocs/To-Do-List-App/
Start Apache via your XAMPP control panel.

In your browser, go to:
http://localhost/To-Do-List-App/
Or, use the Live Server extension in VS Code.



Results
1. The Frontend
   <img width="1916" height="861" alt="image" src="https://github.com/user-attachments/assets/8e077db9-58be-4e06-b20f-18c52a4275b7" />

2. The Backend
   Here's the list of features of what i added:
   - Loads tasks from localStorage when the page opens, so the tasks don’t disappear when refreshed.
   - Adds, edits, deletes, and checks tasks using buttons and checkboxes.
   - Saves tasks to localStorage so changes are remembered.
   - Filters tasks (all or completed only).
   - Shows task counts (how many are done or not done).
   - Clears all completed tasks with one button.
   - Exports tasks to Excel using a library (XLSX) instead of JSON files.
