/**
 * @author Luận Nguyễn Hữu
 * @email huuluan0606@gmail.com
 */

import {
  createStackNavigator
} from 'react-navigation-stack';
import {
  createDrawerNavigator
} from 'react-navigation-drawer';


import HomeScreen from '../../screens/HomeScreen';
import NotificationList from '../../screens/notification/NotificationList';
import UserDetailScreen from '../../screens/UserDetailScreen';
import CustomDrawer from './custom'
import NotificationDetail from '../../screens/notification/NotificationDetail'
import UserInfoScreen from '../../screens/UserInfoScreen'

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  NotificationList: {
    screen: NotificationList
  },
  UserDetail: {
    screen: UserDetailScreen
  },
  NotificationDetail: {
    screen: NotificationDetail
  },
  UserInfo: {
    screen: UserInfoScreen
  }
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
})


export const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: AppStack,
  },
}, {
  contentComponent: CustomDrawer,
  drawerBackgroundColor: 'white',
  overlayColor: 'rgba(0,0,0,0.5)',
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#6b52ae',
  },
  edgeWidth: 0
});