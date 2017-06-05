# T3 - Tic-Tac-Toe

[Tic-Tac-Toe](https://en.wikipedia.org/wiki/Tic-tac-toe) game implemented using [React](https://facebook.github.io/react/)

This project was created using the [Create React App](https://github.com/facebookincubator/create-react-app) tool and uses [StandardJS](https://github.com/feross/standard) rules

[Demo](https://t3-tictactoe.herokuapp.com/)

## Dependencies

To run this project the following environment is necessary:

- [Yarn](https://yarnpkg.com)
- Node >= 8.0.0

## Run the project

Install the package dependencies using `yarn`:

```bash
yarn
```

Then, to start a development server running the application:

```bash
yarn start
```

This will open a browser window to `http://localhost:3000/`

## Winning condition algorithm

Each square in the board is represented by either a 0 (free space), a number 1 (player 1: `X`) or a number -1 (player 2: `O`)

When taking a turn, the sum of these values for the selected row and column is updated to be compared with the size of the board.

For example if the sum of a row is 3, it means that player 1 won by completing that row. Likewise if the sum was -3 then player 2 won that row.

Also both diagonals are sumed in such a manner.

This method uses `n + n + 2` values to check if there is a winner.



