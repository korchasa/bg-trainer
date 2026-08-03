import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

export interface HintContent {
  hint: string;
  rule?: string;
}

interface HintChannel {
  /** Hint for the question on screen, or null when no game is running. */
  content: HintContent | null;
  isOpen: boolean;
  /** Engine call: announce the current question's hint. Clears the "used" mark. */
  publish: (content: HintContent | null) => void;
  /** Header call: show the modal. Marks the hint used for the current question. */
  open: () => void;
  close: () => void;
  /** Engine call at answer time — a ref read, so it never triggers a re-render. */
  wasUsed: () => boolean;
}

const Ctx = createContext<HintChannel | null>(null);

/**
 * FR-HINT-MODAL: the hint lives in the game header, but only the engine knows
 * which question is on screen. The engine publishes here, the header reads —
 * which keeps the button in one place instead of once per engine.
 */
export function HintProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<HintContent | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const usedRef = useRef(false);

  const publish = useCallback((next: HintContent | null) => {
    setContent(next);
    setIsOpen(false);
    usedRef.current = false;
  }, []);

  // FR-MASTERY: opening the modal counts as a hint, exactly as revealing the
  // old inline hint did — mastery softens for an item answered with help.
  const open = useCallback(() => {
    setIsOpen(true);
    usedRef.current = true;
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const wasUsed = useCallback(() => usedRef.current, []);

  const value = useMemo(
    () => ({ content, isOpen, publish, open, close, wasUsed }),
    [content, isOpen, publish, open, close, wasUsed],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useHintChannel(): HintChannel {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useHintChannel must be used inside <HintProvider>");
  return ctx;
}
