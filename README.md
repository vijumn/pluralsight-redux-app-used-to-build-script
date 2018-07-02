# Building Applications with React and Redux in ES6 on Pluralsight

This repo contains the completed React and Redux application created in [Building Applications with React and Redux in ES6](https://app.pluralsight.com/library/courses/react-redux-react-router-es6) on Pluralsight.

## Branches

I've created various branches to show different approaches for building the same React app.

| Branch | Description |
|--------|-------------|
| master | The final React and Redux app created in the course. This exactly matches the final course exercise.|
| update | This branch updates all dependencies to the latest version. I'm regularly keeping this branch updated. [This PR outlines the changes](https://github.com/coryhouse/pluralsight-redux-app-used-to-build-script/pull/1). |
| sagas | This branch uses Redux Saga instead of Redux thunk. |
| plain-react | This branch uses plain React instead of Redux. [This PR outlines the changes](https://github.com/coryhouse/pluralsight-redux-app-used-to-build-script/pull/10). As you can see, for an app this size, plain React is preferable.|
| context | This branch uses React context to store user data and display it on the course list page. [This PR outlines the changes](https://github.com/coryhouse/pluralsight-redux-app-used-to-build-script/pull/11) |
