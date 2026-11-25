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

Test in sequences, not just single requests: edit an old workout and then list all, or send a bad request followed by a good one. For a valid ID that doesn't exist, use `64b000000000000000000000`.

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
