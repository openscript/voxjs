"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.onReplyCreation = functions.database.ref('/replys/{pushId}').onCreate((snapshot, context) => {
    if (context.auth) {
        const setCreatedAt = snapshot.ref.child('created_at').set(admin.database.ServerValue.TIMESTAMP);
        const setUserId = snapshot.ref.child('uid').set(context.auth.uid);
        const setAuthor = admin.auth().getUser(context.auth.uid).then((user) => { return snapshot.ref.child('author').set(user.displayName); });
        return Promise.all([setCreatedAt, setUserId, setAuthor]);
    }
    return null;
});
//# sourceMappingURL=index.js.map