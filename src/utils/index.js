export const isMobile = () => window.innerWidth <= 800;

export const scrollToElem = (element, to, duration) => {
  if (duration <= 0) return;
  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;

  setTimeout(() => {
    // eslint-disable-next-line operator-assignment
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollToElem(element, to, duration - 10);
  }, 10);
};
