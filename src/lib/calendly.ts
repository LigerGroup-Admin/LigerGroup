export const CALENDLY_URL = "https://calendly.com/ligerremote-support/30min";

// LigerLearn's event type is separate from LigerForce's — read from env
// rather than hardcoding, so it stays configurable per environment via
// NEXT_PUBLIC_LIGERLEARN_CALENDLY_URL in Vercel.
export const LIGERLEARN_CALENDLY_URL =
  process.env.NEXT_PUBLIC_LIGERLEARN_CALENDLY_URL || undefined;
