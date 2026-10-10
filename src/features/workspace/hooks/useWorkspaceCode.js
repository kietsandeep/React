import { useCallback, useEffect, useState } from "react";

// Files persist per question in localStorage. Remount (key={questionId}) to switch questions.
export function useWorkspaceCode(key, starter) {
  const storageKey = `code:${key}`;
  const [files, setFiles] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved && typeof saved === "object") return { ...starter, ...saved };
    } catch { /* ignore */ }
    return { ...starter };
  });

  useEffect(() => {
    const id = setTimeout(() => {
      try { localStorage.setItem(storageKey, JSON.stringify(files)); } catch { /* ignore */ }
    }, 400);
    return () => clearTimeout(id);
  }, [storageKey, files]);

  const setFile = useCallback((name, content) => setFiles((f) => ({ ...f, [name]: content })), []);
  const applyFiles = useCallback((partial) => setFiles((f) => ({ ...f, ...partial })), []);
  const reset = useCallback(() => {
    try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
    setFiles({ ...starter });
  }, [storageKey, starter]);

  return { files, setFile, applyFiles, reset };
}
