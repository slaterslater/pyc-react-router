// useSuppressMindbodyCartModal.ts
import { useEffect } from 'react'

const MODAL_ID = 'mindbody_branded_web_cart_modal'
const OVERLAY_CLASS = 'has-overlay'

function isModalOpen(): boolean {
  const iframe = document.querySelector(`#${MODAL_ID}`)
  return !!iframe?.closest('section.is-active')
}

function closeCartModal(): boolean {
  const iframe = document.querySelector(`#${MODAL_ID}`)
  const section = iframe?.closest('section.is-active')
  if (!section) return false
  section.classList.remove('is-active')
  section.setAttribute('aria-hidden', 'true')
  return true
}

function removeOverlayLock() {
  document.documentElement.classList.remove(OVERLAY_CLASS)
}

/** Close the modal if open, and clear the scroll-lock if the modal
 *  isn't (or is no longer) open. Returns true if anything was fixed. */
function suppress(): boolean {
  const closed = closeCartModal()
  // Only strip has-overlay when no modal is legitimately open —
  // if the user opened it themselves later, leave the lock alone.
  if (!isModalOpen()) {
    if (document.documentElement.classList.contains(OVERLAY_CLASS)) {
      removeOverlayLock()
      return true
    }
  }
  return closed
}

export function useSuppressMindbodyCartModal(windowMs = 4000) {
  useEffect(() => {
    suppress()

    // Watch body for the modal injection AND <html> for the class —
    // healcode can apply has-overlay in a separate tick from the modal.
    const observer = new MutationObserver(() => {
      suppress()
    })
    observer.observe(document.body, { childList: true, subtree: true })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    const timeout = setTimeout(() => observer.disconnect(), windowMs)

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) suppress()
    }
    window.addEventListener('pageshow', onPageShow)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [windowMs])
}