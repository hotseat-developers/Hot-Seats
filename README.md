# Hot-Seats

## [View Deployed App](https://hot-seats.vercel.app)

## About

It's Friday night. Dinner rush is coming in. You just got a whole new team of chefs at your disposal and they have no idea what is on the menu. A waiter comes bursting in the kitchen. "Guys! There is a new popular app that just came out that can help us beat this dinner rush!" You look at the app "HotSeat". The waiter says "It will help you prep your meals faster while teaching the other chefs different prep times to get the orders out quickly and deliciously!" You clap your hands to get your teams attention. You yell out "TEAM IT IS TIME TO COOK!"

Hotseat is an app to enable restaurants to streamline the order preparation
process. It gives cooks the tools to coordinate their food prep to ensure
all food comes out synchronized and correctly cooked. It will feature a custom dashboard for
managing your menu and prep instructions. Additionally it will feature the prep stations that
receive orders in real time and guide the staff on how to prep and cook the meal.

## User Stories
- As a user I want to be able to sign in to the page with authentication
- As a user I want to be able to log into the page after signing up
- As a user I want to be able to pick what role I am assigned to
- As a user I want to be able to create tasks for the cooks to see
- As a user I want to be able to create orders in the point of sale screen to send to the cooks
- As a user I want to be able to see the cook screen with orders on it telling me how to prepare and cook the food
- As a user I want to be able to delete orders and see the timers required to prep and cook the food

## Instructions
- User must run the command npm install
- User must set up their env file
- User must run command npm run dev
- To set up Supabase follow the documentation. Set up the supabase CLI. You can set up organizations with different team members with different access to the database. You can set up your tables here as well. For further documentation please visit https://supabase.com/docs for more information.

## Technologies used

- Next.js (Full stack)
- Supabase (Realtime database built on PostgreSQL that has built in user authentication)
- TypeScript
- Vercel
- Git

## Wireframes

![Main App](wireframes/Main_Screen.jpg)

## Screenshots of Final product
<img width="1437" alt="Screen Shot 2022-09-16 at 7 14 31 PM" src="https://user-images.githubusercontent.com/102195640/190836798-3237a1a4-316d-41be-85a9-19255ccdbe5c.png">
<img width="1440" alt="Screen Shot 2022-09-16 at 7 15 48 PM" src="https://user-images.githubusercontent.com/102195640/190836808-f44d2419-29cd-4e82-9fde-cf03d502c226.png">
<img width="1440" alt="Screen Shot 2022-09-16 at 7 14 50 PM" src="https://user-images.githubusercontent.com/102195640/190836791-e03c61e8-7fec-4441-aa3e-ccf09bd994a2.png">
<img width="1440" alt="Screen Shot 2022-09-16 at 7 15 17 PM" src="https://user-images.githubusercontent.com/102195640/190836759-25b1fb8c-cb67-43a2-97c0-9f2b1ca76167.png">



## MVP Goals
- [x] To allow users to log in and sign up via the login page and signup page
- [x] Allow users to pick what role they are filling in for the day
- [x] Allow users to create and tasks when they are in the manager role
- [x] Allow users to create orders and wipe them clean when not needed when they are in the point of sale role
- [x] Allow users to view orders and go through the steps when cooking the order when they are in the cook role
- [x] Allow users to track their progress with their orders

## Stretch Goals
- [] Sync timers for all food tasks
- [] Allow users to import their photos of food
- [] Allow combo customizations
- [] Allow item customization (example med rare steak/ soggy fries) 
- [] Make a training mode and experienced mode

## The Team
- Scrum Master : Will G.
- Peon : Brandon W.
