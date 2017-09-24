import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import Routes from '../../Routes'
// const AppNavigator = StackNavigator(AppRouteConfigs);

// const navReducer = (state = initialState, action) => {
//     const nextState = AppNavigator.router.getStateForAction(action, state);
  
//     // Simply return the original `state` if `nextState` is null or undefined.
//     return nextState || state;
//   };
// const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));
const AppNavigator = StackNavigator(Routes);

const navReducer = (state , action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

  
  export default navReducer;