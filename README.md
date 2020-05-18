# TopBudget

Hi! TopBudget is an expense manager and tracker, that I've built in my free time. This project uses ReactJS on the front-end and Django (DRF) on the back-end.

Before starting the project up, you need to have `npm`, `pipenv` and `python3` installed.

# Get started

### Environment

For the app to work, you first need to have two `.env` files in your project. These files handle your production / development environment and may also contain sensitive information.

First, in your `/client` directory, add a `.env` file and write `REACT_APP_API_URL=http://localhost:8000` inside.

In your `/server` directory, add anoher `.env` file and write the following:

```env
ALLOWED_HOSTS=localhost
CORS_ORIGIN_WHITELIST=http://localhost:3000
DATABASE_URL=sqlite:///db.sqlite3
ENV=DEV
SECRET_KEY=your_secret_key
```

Most of these variables neet to be changed in a production environment and they should be kept secret. That's why they are not included in source control.

### Client

To start up the client side of the app, type the following in your terminal:

```shell
cd client
npm install
npm start
```

### Server

To start up the server side of the app, type the following in your terminal:

```shell
cd server

pipenv shell
pipenv install

python manage.py migrate
python manage.py runserver
```

Now you should be able to connect to the app on `localhost:3000`.