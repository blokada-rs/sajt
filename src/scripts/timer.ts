export const countdown = (until: Date, element: HTMLElement) => {
  const _second = 1000;
  const _minute = _second * 60;
  const _hour = _minute * 60;
  const _day = _hour * 24;

  const timer = setInterval(showRemaining, 1000);

  function showRemaining() {
    const now = new Date();
    const distance = until.getTime() - now.getTime();
    if (distance < 0) {
      clearInterval(timer);
      element.innerHTML = "Славија!";

      return;
    }

    const days = Math.floor(distance / _day);
    const hours = Math.floor((distance % _day) / _hour);
    const minutes = Math.floor((distance % _hour) / _minute);
    const seconds = Math.floor((distance % _minute) / _second);

    element.innerText = `${String(days * 24 + hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
};
