# My Capstone

## Setup Repository

1. Clone the repository: `git clone https://github.com/nicolette-cheng/nicolette-cheng-capstone-server.git`
2. Install dependencies: `npm install`
3. Set environment variables in a `.env` file.

## Setup Database

1. Pull `develop` branch, run `npm install` to download all dependencies listed in package.json:

```
"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "knex": "^3.1.0",
    "mysql2": "^3.11.4"
  }
```

2. Via the database extension in vscode, click + to add new database. A new query file should be generated, edit it to say `wabisabi`. Click `Run`.

3. Ensure the `.env` file looks similar to the following:

```
PORT=8080
DB_HOST=127.0.0.1
DB_NAME=wabisabi
DB_USER=<your_user_name>
DB_PASSWORD=<your_password>
```

## Migrate + Seed Data

1.  ***Run in terminal***: `npx knex migrate:latest` OR `npm run migrate`.
    Expected return message in terminal should be `Batch 1 run: 2 migrations` for both tasks and rewards migrations.

    Refresh database to see new empty tables in `wabisabi`.

2.  ***Run in terminal***: `npx knex seed:run` OR `npm run seed`.
    Expected return message in terminal should be `Ran 2 seed files` for both tasks and rewards seeds.

    Refresh database to see new table contents.

## Run Server

- Start the server: `npm run dev`
- Access the app at: `http://localhost:8080`
