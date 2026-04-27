'use client';

export default function ViltrumLogo({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
      <mask id="viltrum-mask">
        <rect x="0" y="0" width="100" height="100" fill="white" />
        <rect x="23" y="-10" width="12" height="74" fill="black" />
        <rect x="44" y="13" width="12" height="74" fill="black" />
        <rect x="65" y="36" width="12" height="74" fill="black" />
      </mask>
      <circle cx="50" cy="50" r="48" fill="currentColor" mask="url(#viltrum-mask)" />
    </svg>
  );
}
