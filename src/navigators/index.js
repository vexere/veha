import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen'
import SplashScreen from '../screens/SplashScreen'
import getSlideFromRightTransitionConfig from './transitionConfig'
import { AppDrawerNavigator } from './drawers'

export const LoggedIn = createAppContainer(AppDrawerNavigator)

export const RouteNavigate = createStackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  Main: {
    screen: AppDrawerNavigator,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  Login: { screen: LoginScreen },
}, {
  initialRouteName: 'Splash',
  headerMode: 'none',
  mode: 'modal',
  transitionConfig: getSlideFromRightTransitionConfig,
});


export default createAppContainer(RouteNavigate);