export default (element: HTMLElement) => element.offsetWidth > 0
      || element.offsetHeight > 0
      || element.getClientRects().length > 0;
