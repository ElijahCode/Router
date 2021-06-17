export function urlFilter(el: HookListMember, url: string): boolean {
  switch (typeof el.url) {
    case "string":
      return el.url === url;
    case "object":
      return el.url.test(url);
    case "function":
      return el.url(url);
    default:
      return false;
  }
}
