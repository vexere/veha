import messaging from '@react-native-firebase/messaging';
import {AsyncStorage} from 'react-native';

const requestPermission = async () => {
  await messaging().registerForRemoteNotifications();
  const granted = messaging().requestPermission();

  if (granted) {
    getToken();
    console.log('User granted messaging permissions!');
  } else {
    console.log('User declined messaging permissions :(');
  }
};

const getToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await messaging().getToken();
    console.log('token = ', fcmToken);
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
};

const createNotificationListeners = async () => {
  messaging().subscribeToTopic('all');
  messaging().onMessage(remoteMessage =>
    console.log('FCM Message Data:', remoteMessage.data),
  );
};

export {requestPermission, createNotificationListeners};
