# Zigit interview full-stack application
## Frontend
This applicaiton written in `React` with `Typescript`.

The application contains two routes: <br/>
* `/login`: <br/>
Contains login page with auto-disable button.

* `/info`: <br/>
Contains info loaded from the login page and fetching the projects data from the backend into a `react-table`.

## Backend
This is a `ASP.NET` application connected to a `SSMS` database with `EntityFramework`.

All the requests to the db going threw `store precedures`. Scripts provided in the repo to create the database template.

The `WebApi` contains two controllers:
* `/authenticate`: <br/>
Recieving email and password, and validates it. and whether it valid. returns a token.

* `/info`: <br/>
Receive a token, validates it and return the projects info of the user.
