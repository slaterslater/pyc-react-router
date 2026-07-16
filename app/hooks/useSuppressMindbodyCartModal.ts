// useSuppressMindbodyCartModal.ts
import { useEffect } from 'react'

const MODAL_ID = 'mindbody_branded_web_cart_modal'

function closeCartModal(root: ParentNode = document): boolean {
  const iframe = root.querySelector(`#${MODAL_ID}`)
  const section = iframe?.closest('section.is-active')
  if (!section) return false
  section.classList.remove('is-active')
  section.setAttribute('aria-hidden', 'true')
  return true
}

/**
 * Prevents Mindbody's cart modal from auto-opening when returning
 * to the site with an active MB cart session. Only suppresses the
 * automatic open shortly after mount — user-initiated opens later
 * (clicking a cart/link widget) are left alone.
 */
export function useSuppressMindbodyCartModal(windowMs = 4000) {
  useEffect(() => {
    // Catch it if it's already in the DOM (bfcache restore)
    closeCartModal()

    // Otherwise wait for healcode to inject it
    const observer = new MutationObserver(() => {
      if (closeCartModal()) observer.disconnect()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    // Stop watching after a grace period so we never eat a modal the
    // user deliberately opened later in the session
    const timeout = setTimeout(() => observer.disconnect(), windowMs)

    // bfcache restores skip effects re-running in some setups —
    // pageshow covers coming "back" from mindbody explicitly
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) closeCartModal()
    }
    window.addEventListener('pageshow', onPageShow)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [windowMs])
}