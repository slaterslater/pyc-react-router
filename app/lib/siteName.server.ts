export function getSiteName(url: URL) {
  const hostname = url.hostname;

  let site = null
  switch (hostname) {
    case process.env.HOSTNAME_COLLECTIVE:
      site = "collective";
      break;
    case process.env.HOSTNAME_CANADA:
      site = "canada";
      break;
    case process.env.HOSTNAME_USA:
      site = "usa";
      break;
  }

  if (!site) {
    throw new Error("Invalid hostname");
  }

  return site as "collective" | "canada" | "usa";
}