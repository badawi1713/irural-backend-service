# irural-indihome-API

To build irural-indihome API.

## Requirements

For development, you will only need Sequelize, Node.js and a node global package, npm install --save depedency, installed in your environment.

## Install

    $ git clone git@gitlab.com:jogjaweb2020/backend-service.git
    $ cd folder
    $ npm install
    $ npx sequelize init
    $ config with your phpmyadmin
    $ npx sequelize db:create
    $ npx sequelize db:migrate

## Import the database

The mysql database file is already on this repository, you can find it by open the database directory, and import it into your phpMyAdmin.

## Running the project

    $ npm start

## user's endpoint

| No  | HTTP Method | URI                   | Operation                 |
| --- | ----------- | --------------------- | ------------------------- |
| 1   | POST        | /api/v1/auth/register | Register admin            |
| 2   | Post        | /api/v1/auth/login    | Login admin and get token |

## Customer's endpoint

| No  | HTTP Method | URI                             | Operation                               |
| --- | ----------- | ------------------------------- | --------------------------------------- |
| 1   | POST        | /api/v1/customer/register/:role | Register Customer and upload files data |
| 2   | GET         | /api/v1/customer/customer       | Get all data customer                   |
| 3   | GET         | /api/v1/customer/isp            | Get all data customer_isp               |
| 4   | GET         | /api/v1/customer/files          | Get all files                           |
| 5   | GET         | /api/v1/customer/file/:id       | Get file id                             |
| 6   | GET         | /api/v1/customer/allfile/:id    | Get all files by id                     |

JWT token’s for full access on the backend system

## Thank You
