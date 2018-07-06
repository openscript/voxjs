import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onReplyCreation = functions.database.ref('/replys/{pushId}').onCreate((snapshot, context) => {
    return snapshot.ref.child('created_at').set(admin.database.ServerValue.TIMESTAMP);
});
