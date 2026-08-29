export const isNavLink = (link: any) => {
  return link && (link.url || link.page || link.mboLink)
}