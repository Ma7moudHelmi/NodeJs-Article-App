# Article NodeJS App with Google Authentication and Email Verification

This is a NodeJS application that uses Express, JWT, PassportJS and Google OAuth2.0 for authentication and nodemailer
for email verification. It allows users to create and read articles while ensuring that only authenticated users can
create articles and that email verification is required before a user can create an article.

## Requirements

* Node.js installed on your machine
* A Google Developer Account and a registered OAuth2.0 application
* A Gmail account to send verification emails from
* A MongoDB database to store user and article data

## Installation
Clone the repository to your local machine
Install the required packages by running npm install
Create a .env file in the root directory of the project and add the following environment variables:
```
PORT=3000
MONGODB_URI=<your mongodb uri>
CLIENT_ID=<your google client id>
CLIENT_SECRET=<your google client secret>
GOOGLE_CALLBACK_URL=/callbacks
JWT_SECRET=<your jwt secret>
EMAIL_ADDRESS=<your gmail email address>
EMAIL_PASSWORD=<your gmail email password>
```
