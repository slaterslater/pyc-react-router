import { useEffect } from 'react';

export function useEscapeToClose(expanded: boolean, close: () => void) {
  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        'keydown',
        function handler(event: KeyboardEvent) {
          if (event.key === 'Escape') {
            close();
          }
        },
        { signal: abortController.signal }
      );
    }

    return () => abortController.abort();
  }, [expanded, close]);
}