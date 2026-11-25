# Workout Buddy: bug hunt

There are 10 bugs in this codebase. The app starts, but it behaves incorrectly. Compare its behavior to the spec below to find them.

|          | Easy | Medium | Hard |
| -------- | ---- | ------ | ---- |
| Frontend | 2    | 2      | 1    |
| Backend  | 2    | 2      | 1    |

Fix one bug per commit, then open a single PR explaining what was wrong, how you found it, and how you fixed it. Some bugs hide others, so retest after each fix.

## Spec

### Frontend

- The home page at `/` shows all workouts and the form.
- Clicking "Workout Buddy" in the navbar goes to the home page.
- The delete icon sits in the top right corner of each workout card.
- Submitting a complete form saves the workout and clears the inputs.
- A newly added workout appears once, at the top of the list, without a refresh.
- Submitting an incomplete form shows the server's error message and outlines the missing fields in red.
- Deleting a workout removes only that workout, without a refresh.

### Backend

| Method | Route | Behavior |
| ------ | ----- | -------- |
| GET | `/api/workouts` | Returns all workouts, most recently **created** first |
| GET | `/api/workouts/:id` | Returns that one workout, or 404 if it doesn't exist |
| POST | `/api/workouts` | Creates a workout. If fields are missing, returns 400 and lists exactly the fields missing from that request. A complete request always succeeds. |
| PATCH | `/api/workouts/:id` | Updates the workout and returns the updated version, or returns 404 if it doesn't exist. Never creates a workout. |
| DELETE | `/api/workouts/:id` | Deletes and returns the workout, or 404 if it doesn't exist |


## Setup

In `backend/.env`, replace `<password>` with the password you were given, and `<yourname>` with your name (for example `workouts-sam`). This keeps your data separate from everyone else's. Never commit `.env`.

Requires Node 20 or newer.

Backend:

    cd backend
    npm install
    cp .env.example .env    # then fill in MONGO_URI (see above)
    npm run dev

Frontend, in a second terminal:

    cd frontend
    npm install
    cp .env.example .env
    npm start

## Testing with Postman

[Postman](https://www.postman.com/downloads/) lets you send requests straight to the backend, so you can tell whether a bug is in the backend or the frontend. Net Ninja explains it very well in his [MERN tutorial series](https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE).

- Base URL: `http://localhost:4000/api/workouts`. For one workout, add `/<id>`, using an `_id` from GET all.
- For POST and PATCH, set **Body → raw → JSON**, for example `{ "title": "Squats", "load": 40, "reps": 10 }`.
- Check the status code and response body against the spec. Test sequences too, such as a bad POST followed by a good one. For a valid ID that doesn't exist, use `64b000000000000000000000`.

For the frontend, use the **Network** tab in DevTools (F12) to see what the page sends and gets back.

## Hints

Open a hint only when you're stuck.

### Frontend

<details><summary>Easy 1: navbar</summary>

Click the "Workout Buddy" title and look at the URL. Compare where the link goes with the routes defined in `App.js`.
</details>

<details><summary>Easy 2: delete icon</summary>

Where the icon sits is controlled by CSS. Find the rule for `.workout-details span` in `index.css`.
</details>

<details><summary>Medium 1: the form doesn't save</summary>

Submit the form with the Network tab open and look at the POST's status code and request headers. The same body works in Postman. What does Postman send that the form doesn't?
</details>

<details><summary>Medium 2: no error message</summary>

Look at the JSON the server sends back for an incomplete form. Which key holds the message, and which key does the form read?
</details>

<details><summary>Hard: new workouts don't appear</summary>

Refresh after adding a workout. If it appears, it was saved and only the display is broken. React re-renders only when state changes to a new object. Compare `CREATE_WORKOUT` with `DELETE_WORKOUT` in the context file.
</details>

### Backend

<details><summary>Easy 1: updating</summary>

Send a PATCH request. Does Express find a matching route? Check which HTTP methods the router file uses.
</details>

<details><summary>Easy 2: getting one workout</summary>

GET a single workout by ID. Is the response one object or an array? Check which controller function the route calls.
</details>

<details><summary>Medium 1: list order</summary>

Edit an old workout, then GET all. Which timestamp is the list sorted by?
</details>

<details><summary>Medium 2: updating a missing workout</summary>

PATCH `64b000000000000000000000`, then GET all. Look at the options passed to `findOneAndUpdate`.
</details>

<details><summary>Hard: valid requests rejected</summary>

Send a POST missing `reps`, then a complete POST. Restart the server and send only the complete one. Where is `emptyFields` created, and how long does it last?
</details>
