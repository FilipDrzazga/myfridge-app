import { FIREBASE_DB, set, ref, push } from "../firebase/firebaseConfig";

export class RealtimeDB {
  createNewUserOnDB(userId, email) {
    set(ref(FIREBASE_DB, "users/" + userId), {
      username: email,
      email: email,
    });
  }
  addNewItem(userId, values) {
    const fridgeRef = ref(FIREBASE_DB, "users/" + userId + "/fridge");
    if (fridgeRef) {
      const newFridgeItemRef = push(fridgeRef);
      set(newFridgeItemRef, {
        ...values,
      });
    } else {
      set(ref(FIREBASE_DB, "users/" + userId), {
        fridge: [values],
      });
    }
  }
}
