
# Commit Hub

  

## Overview

  
The project aims to create a commitment management forum for individuals to set and achieve goals. Users can share their goals, progress, and receive encouragement and rewards from the community, mimicking the real-world scenario of family members supporting each other.

![Website mockup](https://www.canva.com/design/DAF5RrzmM_o/7vhhyJnQTNDV7stZQYmJbg/edit?utm_content=DAF5RrzmM_o&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

  

### Problem

 Many people struggle with motivation and accountability when pursuing personal goals. This app addresses the need for a platform where users can share their goals, receive motivation, and track their progress.

## Installation
  
Follow the steps below to run a local instance of CommitHub.

**For the Server**
 1. Clone this repo - ### [aisha-atta-capstone-api](https://github.com/nana55/aisha-atta-capstone-api)
 2. Create a database in MySQL and name it "commithub" - `CREATE DATABASE commithub`
 3. Install dependencies - `npm i` 
 4. Run migrations - `npm run migrate`
 5. Run seeds - `npm run seed`
 6. Create environment variables in **.env** file with your details 

    	 PORT=?
    	 DB_HOST=?
    	 DB_USER=?
    	 DB_PASSWORD=?
    	 DB_NAME=commithub
7. Start the server with `npm run dev`

**For the Client**
8. Clone this repo ### [aisha-atta-capstone](https://github.com/nana55/aisha-atta-capstone)
9. Install dependencies - `npm i` 
10. If your server is running on a port different from **8080**, kindly modify the URL_PATH in the `authentication.jsx` file 
11. Run the react app with `npm run dev` 


### User Profile

-   **Primary Users:** Individuals seeking motivation and accountability for their goals.
-   **How They Use It:** Users can create goals, share updates, receive encouragement from others, and offer support to fellow members.
  

### Features

1.  **User Registration and Authentication:**
    
    -   Users can create accounts and log in securely.
    -   JWT for authentication.
2.  **Goal Creation and Tracking:**
    
    -   Users can create new goals, upload pictures as a reference point, and update their progress.
    -   Track and display goal completion percentages.
3.  **Community Interaction:**
    
    -   Users can comment on and like each other's goals.
    -   Forum-like discussions for broader community support.
4. **Generate quotes from an external API**

## Implementation

  

### Tech Stack

-   React for the frontend.
-   SCSS for styling.
-   Axios for handling HTTP requests.
-   MySQL as the database.
-   Knex.js as the SQL query builder.
-   JWT for authentication.

 
  

### APIs
**Random Quotes** 
 [Quotable API](https://docs.quotable.io/docs/api/b3b9b39f25dd9-get-random-quote) was used to fetch random quotes for the application. All quotes are provided by the Quotable API, and I appreciate their service.  
Details about the API can be found on their website https://docs.quotable.io/.

  

### Sitemap

  

-   **Home:** Feed of user goals and community interactions.
-   **Profile:** View profiles and update progress.
-   **SideBar:** - Create Goals
						- View dashboard
						- View motivational quotes
- **Login** 
- **Register**
- **Logout**
  

### Mockups

  
![Mockup](https://www.canva.com/design/DAF3dNmrk8I/view)

https://www.canva.com/design/DAF3dNmrk8I/GZPSPElOcyfuPXyMKDZ9-A/view?utm_content=DAF3dNmrk8I&utm_campaign=designshare&utm_medium=link&utm_source=editor
  

### Data

  

-   **Users Table:**
    
    -   UserID (Primary Key)
    -   Name
    -   Email
    -   Username
    -   Password (Hashed)
    -   Avatar 
    -   Created_at
     
-   **Goals Table:**
    
    -   GoalID (Primary Key)
    -   Description
    -   Image
    -   User_ID (Foreign Key references Users Table)
    -   Category
    -   Created_at
    
-   **Comments Table:**
    
    -   CommentID (Primary Key)
    -   Comment
    -   User_Comment_ID (Foreign Key references Users Table)
    -   Goals_Comment_ID (Foreign Key references Goals Table)
    -   Created_at
     
-   **Likes Table:**
    
    -   LikeID (Primary Key)
    -   User_Like_ID (Foreign Key references Users Table)
    -   Goals_Like_ID (Foreign Key references Goals Table)

-   **Stars Table:**
    
    -   StarID (Primary Key)
    -   User_Star_ID (Foreign Key references Users Table)
    -   Goals_Star_ID (Foreign Key references Goals Table)


  

### Endpoints

  

1. **Authentication Endpoints:**

-   `/api/auth` (GET)
    -   Description: Get authentication details.
-   `/api/auth/login` (POST)
    -   Description: Login and obtain an access token.
-   `/api/auth/register` (POST)
    -   Description: Register a new user.
-   `/api/auth/logout` (POST)
    -   Description: Logout and invalidate the current session.
   
2.  **User Endpoints:**

-   `/api/users/profile/:id` (GET)
    -   Description: Get user details by ID.
    
3.  **Goal Endpoints:**

-   `/api/goals/` (GET, POST)
    
    -   Description: Get all goals or create a new goal.
-   `/api/goals/user/:userId` (GET)
    
    -   Description: Get goals by a specific user's ID.
-   `/api/goals/userid` (GET)
    
    -   Description: Get goals by the current user's ID.

4. **Comments Endpoints:**

-   `/api/comments/` (GET, POST)
    -   Description: Get comments by goal or add a new comment.

5. **Likes Endpoints:**

-   `/api/likes/` (GET, POST, DELETE)
    -   Description: Get likes, add a new like, or delete a like.

6. **Stars Endpoints:**

-   `/api/stars/` (GET, POST, DELETE)
    -   Description: Get stars, add a new star, or delete a star.
  
7. **Progress Endpoints:**

-   `/api/progress/` (GET, PUT)
    -   Description: Get all progress data or update progress.

  

### Auth
  

-   JWT used for authentication.

  

## Roadmap
  

-   Set up project structure and basic React components.
-   Implement user registration and authentication.
-   Create and style home, goals, and community pages.
-   Develop goal creation and tracking functionality.
-   Implement community interaction features.
-   Testing
  

## Nice-to-haves

  
- Reward system: Implement a reward mechanism where users can offer virtual gifts to each other for completing milestones or gift cards
-   Mobile responsiveness for broader accessibility
-   Notifications for goal updates and community interactions
-   Advanced privacy settings for user goals
-   Option to modify goals and user profiles
-   Additonal stats on the dashboard