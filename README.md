# WTWR (What to Wear?) — Back End

## Description

A weather-based clothing recommendation app where users can save clothing items and see what to wear based on current weather. This is the back-end server for the WTWR application, providing API endpoints, user authentication, and database management.

## Technologies and Techniques Used

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Validation:** Joi, Celebrate, Validator
- **Logging:** Winston, Express-Winston
- **Security:** bcrypt, Helmet
- **Deployment:** Google Cloud VM, NGINX, PM2, Certbot (SSL)

## Features

- Create account / login
- JWT-based authentication (7-day expiry)
- Add / remove clothing items
- Like / dislike items
- Filter by weather conditions
- Centralized error handling
- Request/response logging
- Input validation (celebrate + joi)

## Deployed Project

- **Domain:** https://wtwr-dev.twilightparadox.com
- **API:** https://api.wtwr-dev.twilightparadox.com
- **Frontend Repo:** https://github.com/RolanBykovIT1025/se_project_react

## Project Pitch Video

- https://drive.google.com/file/d/1h25gz6AAuhsz_KxjQxXYX0X0TxFH9sGm/view?usp=drive_link

## API Structure

### Public routes
- `GET /items` — Get all clothing items
- `POST /signup` — Create a new user
- `POST /signin` — Log in

### Protected routes (require JWT)
- `POST /items` — Create a new clothing item
- `DELETE /items/:id` — Delete an item (owner only)
- `PUT /items/:id/likes` — Like an item
- `DELETE /items/:id/likes` — Unlike an item
- `GET /users/me` — Get current user data
- `PATCH /users/me` — Update user profile

## Project Structure

```
controllers/   — Route handler functions
middlewares/   — Auth, validation, logging, error handling
models/        — Mongoose schemas and models
routes/        — Express route definitions
utils/         — Config, error classes
app.js         — Application entry point
```

## Running the Project

```bash
npm run start   — Launch the server on localhost:3001
npm run dev     — Launch with hot reload (nodemon)
npm run lint    — Run ESLint
```

## Contact

- GitHub: [@RolanBykovIT1025](https://github.com/RolanBykovIT1025)
