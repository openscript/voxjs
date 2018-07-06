import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onReplyCreation = functions.database.ref('/replys/{pushId}').onCreate((snapshot, context) => {
    if (context.auth) {
        const setCreatedAt = snapshot.ref.child('created_at').set(admin.database.ServerValue.TIMESTAMP);
        const setUserId = snapshot.ref.child('uid').set(context.auth.uid);
        const setAuthor = admin.auth().getUser(context.auth.uid).then((user) => snapshot.ref.child('author').set(user.displayName));
        return Promise.all([setCreatedAt, setUserId, setAuthor]);
    }
});
