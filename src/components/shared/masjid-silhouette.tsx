/**
 * SVG siluet masjid dengan bulan sabit dan bintang.
 * Digunakan di halaman login, register, dan halaman publik lainnya.
 *
 * @param className - Ekstensi styling Tailwind (default: "size-48")
 */
function MasjidSilhouette({ className = "size-48" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Bulan sabit */}
      <path
        d="M155 20c-8 0-15 3-20 8 4-2 8-3 13-3 12 0 22 10 22 22s-10 22-22 22c-5 0-9-1-13-3a27 27 0 0020 8c15 0 27-12 27-27s-12-27-27-27z"
        fill="currentColor"
        opacity="0.3"
      />

      {/* Bintang */}
      <circle cx="140" cy="40" r="2" fill="currentColor" opacity="0.4" />

      {/* Minaret kiri */}
      <rect x="32" y="55" width="6" height="50" rx="1" fill="currentColor" />
      <rect x="28" y="50" width="14" height="8" rx="2" fill="currentColor" />
      <path d="M35 45l-3 5h6l-3-5z" fill="currentColor" />

      {/* Minaret kanan */}
      <rect x="162" y="55" width="6" height="50" rx="1" fill="currentColor" />
      <rect x="158" y="50" width="14" height="8" rx="2" fill="currentColor" />
      <path d="M165 45l-3 5h6l-3-5z" fill="currentColor" />

      {/* Badan masjid */}
      <rect x="48" y="70" width="104" height="35" rx="2" fill="currentColor" />

      {/* Kubah utama */}
      <path
        d="M55 70c0-25 90-25 90 0"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        opacity="0.9"
      />

      {/* Puncak kubah */}
      <path d="M100 42l-2 4h4l-2-4z" fill="currentColor" />

      {/* Pintu */}
      <rect x="88" y="85" width="24" height="20" rx="2" fill="var(--primary)" />

      {/* Lengkungan pintu */}
      <path d="M88 95c0-8 24-8 24 0" fill="var(--primary)" />

      {/* Jendela kiri */}
      <rect x="60" y="78" width="12" height="10" rx="1" fill="var(--primary)" opacity="0.7" />
      <path d="M60 84c0-5 12-5 12 0" fill="var(--primary)" opacity="0.7" />

      {/* Jendela kanan */}
      <rect x="128" y="78" width="12" height="10" rx="1" fill="var(--primary)" opacity="0.7" />
      <path d="M128 84c0-5 12-5 12 0" fill="var(--primary)" opacity="0.7" />

      {/* Garis horizontal dekoratif */}
      <line x1="55" y1="72" x2="145" y2="72" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    </svg>
  )
}

export { MasjidSilhouette }
