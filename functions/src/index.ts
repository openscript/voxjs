import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const onReplyCreation = functions.database.ref('/replies/{pushId}').onCreate((snapshot, context) => {
    if (context.auth) {
        const setCreatedAt = snapshot.ref.child('created_at').set(admin.database.ServerValue.TIMESTAMP);
        const setUserId = snapshot.ref.child('uid').set(context.auth.uid);
        const setAuthor = admin.auth().getUser(context.auth.uid).then((user) => { return snapshot.ref.child('author').set(user.displayName) });
        return Promise.all([setCreatedAt, setUserId, setAuthor]);
    }
    return null;
});
