import firebase from '@react-native-firebase/app'
import { Platform } from 'react-native'


const iosConfig = {}

const androidConfig = {
  clientId: '635972048772-2f3qlost5qo8o1fufsigt9e6oid4bpet.apps.googleusercontent.com',
  appId: '1:635972048772:android:25096c79b9bd049fa4afd1',
  apiKey: 'AIzaSyAhjL0EFPmBXMPzlaU-Mk2pzZGED-K4nxM',
  databaseURL: 'https://vxr-demo-e2ed0.firebaseio.com',
  storageBucket: 'vxr-demo-e2ed0.appspot.com',
  messagingSenderId: '635972048772',
  projectId: 'vxr-demo-e2ed0',
  persistence: true
}

if (!firebase.apps.length) {
  firebase.initializeApp(Platform.OS === 'ios' ? iosConfig : androidConfig);
}
