# Social Post

## User Stories

- [x] As a user, I can see a list of posts
- [x] As a user, I can add post
- [x] As a user, I can update post
- [x] As a user, I can delete post

## Libraries

- [Chakra UI](https://chakra-ui.com) for looks and feel in general
- [Redux](https://redux.js.org) for state management
- [Redux Toolkit](https://redux-toolkit.js.org) for easier write redux store
- [Redux-Saga](https://redux-saga.js.org) for redux side effect manager

## Available Scripts

- `npm run setup`: Setup the project.
- `npm run cz`: Run commitizen cli.
- `npm run dev`: Runs the app in the development mode.
- `npm run build`: Build the app to the production mode.
- `npm run preview`: Preview the app in the production mode.
- `npm run lint`: Lint the code.
- `npm run format`: Formitize the code.
- `npm run test`: Run the test.

## Project Structure

```
./src/
├── components    # shared components used across the entire application
├── config        # global configuration, env variables, etc
├── features      # feature based modules
├── providers     # all of the application providers
├── stores        # global state stores
├── tests         # test utilities and mock server
├── theme         # global styles and overridden chakra ui theme
└── utils         # shared utility functions
```
