import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen'
import UserListScreen from '../screens/UserListScreen'
import UserDetailScreen from '../screens/UserDetailScreen'

const Main = createStackNavigator({
    Login: { screen: LoginScreen },
    UserList: { screen: UserListScreen },
    UserDetail: { screen: UserDetailScreen },
},
{
    headerMode: 'none',
    initialRouteName: 'Login',
}
);

export default createAppContainer(Main);