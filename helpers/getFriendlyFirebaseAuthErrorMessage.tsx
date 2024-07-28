const errorMessages = {
  "auth/email-already-in-use": "The email address is already in use.",
  "auth/invalid-email": "The email address is not valid.",
  "auth/user-disabled": "The user account has been disabled.",
  "auth/user-not-found": "There is no user corresponding to this email.",
};

export function getFriendlyFirebaseAuthErrorMessage(errorCode) {
  return errorMessages[errorCode] || "Please check email or password again.";
}
