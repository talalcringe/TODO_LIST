# TodoList App
This is a basic todo list app with voice recording support accessible from anywhere at [https://todo-list-1rsq.onrender.com/].

## Description
Using this app you can create,update and delete tasks. One recording at a time can be associated with the task and will be saved for future viewing in the app's backend. There is no user login/signup/tracking as of now. 

## Technologies
* **Frontend:** React/Typescript
* **Styling:** Material UI
* **HTTP Client:** Axios
* **Data Fetching:** React Query 
* **Backend:** Express/Node.js
* **Database:** MongoDB
* **Storage:** Firebase

## How to Install and Run the Project

### Step 1: Clone or download the project from this repo.
### Step 2: Copy the .env files in their respective folders. i.e. TODO_LIST-main/ and TODO_LIST-main/client/
### Step 3: Run **"npm i"** in TODO_LIST-main/ and TODO_LIST-main/client/ from terminal.
### Step 4: Navigate to TODO_LIST-main/client/ in terminal and run **"npm run build"**.
### Step 5: Come back to TODO_LIST-main/ in terminal and run **npm run start**.
### Step 6: You should be able to access the app from [http://localhost:5173/] now.

## How to Use the Project

Using the project is straightforward. 
* Click on create new task in the bottom right to open the task creation screen. Enter the title and description and optionally record an audio. Click on Save to save this task or cancel to go back without saving.
* You will see the card fir this task now, you can click the trash icon on the bottom left of the card to open a confirmation dialogue to delete the file. Either delete it or cancel to go back from here.
* Besides the delete button there is a pen button, you can click this to open a task updating screen. All functions here are identical to the creation screen. If audio is recorded again, it will replace the previous one.
* On the opposite side there is a checkbox that you can toggle on and off to define if this task is complete or not.
* After adding multiple tasks, you can type a query in the searchbar at the top to find a task quickly.
