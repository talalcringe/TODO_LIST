# TodoList App

This is a basic todo list app accessible from anywhere at [https://todo-list-1rsq.onrender.com/] (It may take some time to load the first time as its hosted on a free plan).

## Description

Using this app you can create,update and delete tasks. One recording at a time can be associated with the task and will be saved for future viewing in the app's backend. There is no user login/signup/tracking as of now.

## Technologies

- **Frontend:** React/Typescript
- **Styling:** Material UI
- **HTTP Client:** Axios
- **Data Fetching:** React Query
- **Backend:** Express/Node.js
- **Database:** MongoDB

## How to Install and Run the Project

### Step 1: Clone or download the project from this repo.

### Step 2: If you have MongoDB Compass or are willing to download it:(Otherwise goto Step 3)

- Open mongoDB Compass.
- Create or open a connection and copy its connection string.
- Create a new database. Name the database "todolist" and collection any name.
- Create a file named ".env" at the root of the project. Enter: "MONGO_URI=(copied URI/connection string)". After the URI(after the last slash), type "todolist".

### Step 3: If you followed step 2 goto step 4. Otherwise:

- Open the mongoDB atlas website and create a new project named "todolist".
- Create a cluster. Select M0 tier. Create Deployment.
- Choose a username or password for connecting to the cluster and copy and save the passord for later.
- Choose connection method. Select drivers. Copy the URI under point 3.
- Create a file named ".env" at the root of the project. Enter: "MONGO_URI=(copied URI)". In the URI just pasted, replace <password> with the actual password copied earlier.

- Back on the site, in the left sidebar, under SECURITY, open Network Access. Add IP address.
- Click allow access from anywhere and confirm.

### Step 4: Inside the client folder, create another .env file with the path to the server. By default it is "VITE_BASE_URL='http://localhost:3000/'".

### Step 5: Now run **"npm i"** in TODO_LIST-main/ and TODO_LIST-main/client/ from terminal.

### Step 4: Navigate to TODO_LIST-main/ in terminal and run **"npm run dev"**.

### Step 5: Now go to TODO_LIST-main/client/ in terminal and run **npm run dev**.

### Step 6: You should be able to access the app from [http://localhost:5173/] now.

## How to Use the Project

Using the project is straightforward.

- Click on create new task in the bottom right to open the task creation screen. Enter the title and description. Click on Save to save this task or cancel to go back without saving.
- You will see the card fir this task now, you can click the trash icon on the bottom left of the card to open a confirmation dialogue to delete the file. Either delete it or cancel to go back from here.
- Besides the delete button there is a pen button, you can click this to open a task updating screen. All functions here are identical to the creation screen.
- On the opposite side there is a checkbox that you can toggle on and off to define if this task is complete or not.
- After adding multiple tasks, you can type a query in the searchbar at the top to find a task quickly.
- Tasks are sorted by last updated but completing a task will push it to the bottom with other completed tasks
