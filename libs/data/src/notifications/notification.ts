import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

interface INotification {
    id?: string;
    title: string;
    description: string;
    recipient: string;
    isRead?: boolean;
    type: string;
    icon?: {};
    date?: Date;
}

enum NotificationIcon {

}


export class Notification {
    id?: string;
    title: string;
    type = '';
    description: string;
    icon = '';
    recipient: string;
    isRead = false;
    date: Timestamp;


    constructor(notification: INotification) {
        Object.assign(this, notification);
    }
}
