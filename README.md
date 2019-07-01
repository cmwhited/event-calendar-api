# Event Calendar API

This api is built on the [NestJs](https://docs.nestjs.com/) NodeJs framework. It connects to a `MongoDB` database
using the `mongoose` library. It exposes this data as a `GraphQL` API to query and mutate the data.

## Install Deps

To install the dependencies:

```bash
$ yarn
```

## Environment

This app uses the `dotenv` environment configuration library for environment-based configuration.
The database uri is set in a `.env` file. Create a `.env` file in the project directory and add:

```
DB_HOST='your mongodb server host'
```

For instance: `mongodb://127.0.0.1:27017/event_calendar?maxPoolSize=5&minPoolSize=`

## Running the App locally

```bash
$ yarn start:dev
```
