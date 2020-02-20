import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import UserDetailScreen from '../screens/UserDetailScreen'

export const Logged = createStackNavigator({
    Home: { screen: HomeScreen },
    UserDetail: { screen: UserDetailScreen },
},
    {
        headerMode: 'none',
        initialRouteName: 'Home',
    }
);
export const LoggedIn =createAppContainer(Logged)
export const Main = createSwitchNavigator({
    Login: { screen: LoginScreen },
    logged: Logged,
    },
    {
        headerMode: 'none',
        initialRouteName: 'Login',
    }
);


export default createAppContainer(Main);