# DMARC Reports

Reads DMARC Reports in XML format and display the results in a Dashboard.

## Requirements

- Node.js v20.12.1
- PNPM
- MongoDB 8.0
- Typescript
- React.js

## Install develpment environment

1. Clone this repo.
2. Install dependencies
   ```bash
   pnpm install
   ```
3. Create a .env file to set the environment variables.

   | Variable         | Description               | Example           |
   | ---------------- | ------------------------- | ----------------- |
   | APP_PORT         | Server port               | 3000              |
   | MONGODB_USER     | Database user for the app | dmarc_reports_app |
   | MONGODB_PASSWORD | DB user password          | myPassword@       |
   | MONGODB_DATABASE | Database name             | dmarc_reports     |
   | MONGODB_PORT     | Database port             | 27017             |

4. Build the app.
   ```bash
   pnpm run build
   ```
5. Start the server.
   ```bash
   pnpm run start
   ```

## Access the Dashboard

You can access the Dashboard through http://localhost:3000
