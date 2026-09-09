type IconProps = {
  size?: number;
  "aria-hidden"?: boolean;
};

export function InstagramIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function LinkedinIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4.98 3.5a2.48 2.48 0 1 0 0 4.96 2.48 2.48 0 0 0 0-4.96zM3.2 9.5h3.56V21H3.2zM9.85 9.5h3.41v1.57h.05c.48-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.44V21h-3.55v-5.72c0-1.36-.03-3.12-1.9-3.12-1.9 0-2.19 1.49-2.19 3.02V21H9.85z" />
    </svg>
  );
}

export function XIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.53 3h3.16l-6.9 7.89L22 21h-6.36l-4.98-6.51L4.9 21H1.73l7.38-8.44L2 3h6.52l4.5 5.95zm-1.11 16.2h1.75L7.66 4.7H5.78z" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.53c0-.86.24-1.44 1.47-1.44h1.57V4.46A21 21 0 0 0 14.3 4.3c-2.3 0-3.87 1.4-3.87 3.97v2.17H7.87v2.96h2.56V21z" />
    </svg>
  );
}

export function TelegramIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21.05 3.87 2.9 11.03c-1.2.5-1.2 1.19-.22 1.49l4.65 1.45 1.79 5.6c.22.6.38.85.78.85.34 0 .5-.16.7-.36l1.85-1.8 4.68 3.46c.62.34 1.06.17 1.22-.58L22.9 5.14c.24-1.06-.4-1.62-1.85-1.27zM8.5 13.6l8.98-5.7c.42-.26.81-.12.49.17l-7.7 6.98-.31 3.29z" />
    </svg>
  );
}
