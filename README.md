## How to start:

1. In the root directory of the project, execute the following command to spin up containers using Docker and rebuild them if necessary:
    ```bash
    docker-compose up -d --build
    ```

2. Access the Docker container using the following command:
    ```bash
    docker exec -it explorer sh
    ```

3. Run migrations inside the Docker container using the following command:

    ```bash
    npm run migration:run
    ```

## How to test bets:

1. In the root directory of the project, execute the following script, passing the parameters `<user_id>` та `<added_count>`:

    ```bash
    ./take_bet.sh <user_id> <added_count>
    ```

    For example:

    ```bash
    ./take_bet.sh 7 2
    ```

---

Enjoy the development process!
