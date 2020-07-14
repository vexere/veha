import AsyncStorage from '@react-native-community/async-storage';

export default class DeviceStorage {

  getStorage = (key) => {
    return AsyncStorage.getItem(key).then((data) => {
      return data;
    })
  }

  setStorage = (key, value) => {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  dropStorage = (key) => {
    return AsyncStorage.removeItem(key);
  }
}