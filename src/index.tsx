import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Provider } from "react-redux";
import { combineReducers } from 'redux';
import rootReducer from './services/reducers/Index';
import { loadUserData } from './services/rest/SecurityHelper';
import { loggedIn } from './services/actions/Users';
import Store from './services/Store';


const AppReducer = combineReducers({
    rootReducer
})

loadUserData()
    .then(info =>  {
        console.log('Loaded data: ' + JSON.stringify(info));
        return info.user && info.authentication ? Store.dispatch(loggedIn({
          user: info.user, authenticationInformation: info.authentication,
          init: function (_data?: any): void {
            throw new Error('Function not implemented.');
          },
          toJSON: function (data?: any) {
            throw new Error('Function not implemented.');
          }
        })): false
    })
    .catch(e => console.log(e))

const render = () => {
    const App = require("./App").default;
    ReactDOM.render(
        <Provider store={Store}>
            <App />
        </Provider>,
        document.getElementById("root")
    );
};



render();

/* if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./App", render);
}*/

serviceWorkerRegistration.unregister();