# Security for Web App

## Basics

1. Don’t store secret keys in the code. Keep it in a .env file.
2. Don’t add .env file to Github repo
3. Don’t store personal info locally

## Authentication

1. Use Auth0 and a JWT token to authenticate users

## React

1. Be careful when passing props. Inadvertently passing props to the wrong thing may directly expose it to the end user

## GraphQL/MongoDB

1. Don’t store secret keys in the code. Keep it in a .env file.
2. As in React be careful when passing data. Only send what’s needed.

## Stripe

1. Don’t store secret keys in the code. Keep it in a .env file.
