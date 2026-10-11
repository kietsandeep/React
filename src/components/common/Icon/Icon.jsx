const paths = {
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  moon: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19c0 1.5-2 2.5-5 2.5" /></>,
  timer: <><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2M9 2h6" /></>,
  trash: <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  code: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  laptop: <><rect x="4" y="5" width="16" height="11" rx="2" /><path d="M2 19h20M10 10l-1.5 1.5L10 13M14 10l1.5 1.5L14 13" /></>,
  caret: <path d="M6 9l6 6 6-6" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
  flame: <path d="M12 3c.5 3 4 5 4 9.5a4 4 0 0 1-8 0c0-2 1-3 2-4 .2 1.2 1 2 2 2 0-3-1-5 0-7.5z" />,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  checkCircle: <><circle cx="12" cy="12" r="9" /><path d="M8 12.5l3 3 5-6" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  flag: <path d="M5 21V4M5 4h11l-2 4 2 4H5" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  // --- added for the workspace page ---
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  chevronUp: <path d="M6 15l6-6 6 6" />,
  play: <path d="M7 5l12 7-12 7z" />,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  sliders: <><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></>,
  refresh: <path d="M20 11a8 8 0 0 0-14.5-4M4 4v4h4M4 13a8 8 0 0 0 14.5 4M20 20v-4h-4" />,
  terminal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9l3 3-3 3M13 15h4" /></>,
  browser: <><circle cx="12" cy="12" r="9" /><path d="M7 12h3l2-4 2 8 2-4h1" /></>,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
};

export default function Icon({ name, size = 18, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      {paths[name]}
    </svg>
  );
}
