const badge = (bg, fg, label) => (
  <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
    <rect width="64" height="64" fill={bg} />
    <text x="62" y="58" textAnchor="end" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="30" fill={fg}>{label}</text>
  </svg>
);

const shield = (fill, label) => (
  <svg viewBox="0 0 64 64" width="60" height="60" aria-hidden="true">
    <path d="M8 4h48l-4.4 48L32 60 12.4 52z" fill={fill} />
    <text x="32" y="40" textAnchor="middle" fontFamily="Arial" fontWeight="800" fontSize="24" fill="#fff">{label}</text>
  </svg>
);

const logos = {
  react: (
    <svg viewBox="-12 -12 24 24" width="64" height="64" fill="none" stroke="#61dafb" strokeWidth="1" aria-hidden="true">
      <circle r="2" fill="#61dafb" stroke="none" />
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </svg>
  ),
  js: badge("#f7df1e", "#111", "JS"),
  angular: (
    <svg viewBox="0 0 64 64" width="60" height="60" aria-hidden="true">
      <path d="M32 3L5 12l4 35 23 14 23-14 4-35z" fill="#dd0031" />
      <path d="M32 3v58l23-14 4-35z" fill="#c3002f" />
      <text x="32" y="43" textAnchor="middle" fontFamily="Arial" fontWeight="800" fontSize="30" fill="#fff">A</text>
    </svg>
  ),
  vue: (
    <svg viewBox="0 0 64 56" width="64" height="56" aria-hidden="true">
      <path d="M0 0h12l20 34L52 0h12L32 56z" fill="#41b883" />
      <path d="M12 0h10l10 17L42 0h10L32 34z" fill="#34495e" />
    </svg>
  ),
  html: shield("#e44d26", "5"),
  css: shield("#2965f1", "3"),
  ts: badge("#3178c6", "#fff", "TS"),
  node: (
    <svg viewBox="0 0 64 64" width="60" height="60" aria-hidden="true">
      <path d="M32 3l25 14.5v29L32 61 7 46.5v-29z" fill="#3c873a" />
      <text x="32" y="41" textAnchor="middle" fontFamily="Arial" fontWeight="800" fontSize="22" fill="#fff">JS</text>
    </svg>
  ),
};

export default function TechLogo({ name }) {
  return logos[name] ?? null;
}
