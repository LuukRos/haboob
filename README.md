# Haboob 😎

Haboob (an intense type of dust/sand storm) is a small weather application and serves as a small but quite possibly evergrowing (passion) project that shows weather specific information based on a user's current geolocation, as well as optionally added cities. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses OpenWeatherMap's [OneCall](https://openweathermap.org/api/one-call-3) and [Geocoding](https://openweathermap.org/api/geocoding-api) APIs.

## Stack 🥞

React with TypeScript, TailwindCSS, Chart.js.

## Structure 🗂

The project, because it is based on [CRA](https://github.com/facebook/create-react-app), leverages a certain set-in-stone folder structure. Some things that need to be noted/highlighted:

-   assets (containing all fonts, icons and styles (if any, for the latter))
-   components (containing all components (each in their own folder with the component-file and an index file that exports said component as default; I opted for this structure to group things together and also scope future unit tests with the component))
-   context (containing all application context logic)
-   hooks (containing all custom hooks)
-   shared (containing constants and helper functions used throughout the application)
-   types (containing custom TypeScript type definitions)

## Todos and improvements 📝

Obviously as for any perfectionist, this project contains things to be improved upon as well. These things include but are not limited to:

-   Improved/generic fetch requests
-   Improved visualisation of temperature charts on light/dark mode
-   Improved visualisation of UV index
-   Visualisation of pressure
-   Improved HTML semantics
-   Unit tests
-   Include information such as air pollution, maps showing temperatures, percipitation
-   Improved (custom) icon set
-   Micro animations
-   Clever usage of fonts

## All the below is standard and untouched Create React App information 📓

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
