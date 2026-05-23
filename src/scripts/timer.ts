export const countdown = (
  until: Date,
  element: HTMLElement,
  done: Function | null = null,
) => {
  const _second = 1000;
  const _minute = _second * 60;
  const _hour = _minute * 60;

  showRemaining();
  const timer = setInterval(showRemaining, 1000);

  function showRemaining() {
    const now = new Date();
    const distance = until.getTime() - now.getTime();
    if (distance < 0) {
      clearInterval(timer);
      done && done();
      return;
    }

    const hours = Math.floor(distance / _hour);
    const minutes = Math.floor((distance % _hour) / _minute);
    const seconds = Math.floor((distance % _minute) / _second);

    element.innerText = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
};
