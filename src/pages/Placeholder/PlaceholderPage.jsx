import { useLocation, Link } from "react-router-dom";

export default function PlaceholderPage() {
  const { pathname } = useLocation();
  return (
    <div className="container" style={{ padding: "96px 20px", textAlign: "center" }}>
      <h1 style={{ marginBottom: 8 }}>Coming soon</h1>
      <p style={{ color: "var(--muted)", marginBottom: 20 }}>The page <code>{pathname}</code> isn't built yet.</p>
      <Link to="/" style={{ color: "var(--brand)", fontWeight: 700 }}>Back to home</Link>
    </div>
  );
}
