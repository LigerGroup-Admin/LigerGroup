export const CALENDLY_URL = "https://calendly.com/obafemi-oshinowo-ligerforce/30min";

// LigerLearn's event type is separate from LigerForce's and does not exist
// yet — read from env rather than guessing a URL. Unset in dev/preview until
// the event is created and NEXT_PUBLIC_LIGERLEARN_CALENDLY_URL is set in Vercel.
export const LIGERLEARN_CALENDLY_URL =
  process.env.NEXT_PUBLIC_LIGERLEARN_CALENDLY_URL || undefined;
