import { useCallback, useEffect, useState } from "react";

export function useProgress(topicSlug) {
  const key = `progress:${topicSlug}`;
  const [done, setDone] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(key) || "[]")); }
    catch { return new Set(); }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify([...done])); } catch { /* ignore */ }
  }, [key, done]);
  const toggle = useCallback((id) => {
    setDone((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);
  return { done, toggle };
}
