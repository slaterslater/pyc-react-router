import { useScript } from "usehooks-ts";

export function useMindBodyWidget() {
  return useScript(`https://brandedweb.mindbodyonline.com/embed/widget.js`, {
    removeOnUnmount: false,
    id: 'mb-widget',
  })
}

export function useMindBodyLink() {
  return useScript(`https://widgets.mindbodyonline.com/javascripts/healcode.js`, {
    removeOnUnmount: false,
    id: 'mb-link',
  })
}