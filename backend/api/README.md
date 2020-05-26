In the project directory, you can run..
### `npm install`

..then you run
### `npm run server`

URL is http://localhost:8080/

## Kill any process running on port 8080
kill $(lsof -t -i:8080)
