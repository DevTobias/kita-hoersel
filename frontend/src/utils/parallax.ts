export const listenForParallax = (className: string) => {
  const parallaxElements = document.querySelectorAll<HTMLElement>(className);

  parallaxElements.forEach((element) => {
    if (
      element.dataset.parallaxMedia &&
      window.innerWidth < parseInt(element.dataset.parallaxMedia, 10)
    ) {
      element.style.transform = `translate(0, 0)`;
      return;
    }

    const scrollFactor = parseInt(element.dataset.parallaxRate, 10);
    const offset = parseInt(element.dataset.parallaxOffset ?? '0', 10);
    const scrollRate = window.scrollY * (-scrollFactor / 10);
    element.style.transform = `translate(0, ${scrollRate - offset}px)`;
  });
};

export const addInitialParallaxOffset = (className: string) => {
  const parallaxElements = document.querySelectorAll<HTMLElement>(className);
  parallaxElements.forEach((element) => {
    const offset = parseInt(element.dataset.parallaxOffset, 10);
    element.style.transform = `translate(0, ${-offset}px)`;
  });
};
