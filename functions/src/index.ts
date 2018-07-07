import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const onReplyCreation = functions.database.ref('/replies/{pushId}').onCreate((snapshot, context) => {
    if (context.auth) {
        const setCreatedAt = snapshot.ref.child('createdAt').set(admin.database.ServerValue.TIMESTAMP);
        const setUserId = snapshot.ref.child('uid').set(context.auth.uid);
        const setUserInfo = admin.auth().getUser(context.auth.uid).then((user) => {
            const setAuthor = snapshot.ref.child('author').set(user.displayName);
            const setAuthorPhoto = snapshot.ref.child('authorPhotoURL').set(user.photoURL);
            return Promise.all([setAuthor, setAuthorPhoto]);
        });
        return Promise.all([setCreatedAt, setUserId, setUserInfo]);
    }
    return null;
});
