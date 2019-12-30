import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen'
import UserListScreen from '../screens/UserListScreen'
import UserDetailScreen from '../screens/UserDetailScreen'

export const Logged = createStackNavigator({
    UserList: { screen: UserListScreen },
    UserDetail: { screen: UserDetailScreen },
},
    {
        headerMode: 'none',
        initialRouteName: 'UserList',
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