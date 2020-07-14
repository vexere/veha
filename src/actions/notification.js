export function reloadNotification(dataReloadNoti) {
  return async (dispatch) => {
    try {
      dispatch(reloadNotificationSucess(dataReloadNoti));
    } catch (exception) {
      console.log(exception)
    }
  }
}

export function reloadNotificationSucess(dataReloadNoti) {
  return {
    type: 'RELOAD_NOTIFICATION_SUCCESS',
    dataReloadNoti: dataReloadNoti
  }
}