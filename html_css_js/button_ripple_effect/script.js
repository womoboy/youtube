const allBtn = [...document.getElementsByClassName("btn")];

const handleClick = (e) => {
  const btn = e.currentTarget;
  const span = document.createElement("span");
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;

  span.style.width = span.style.height = `${diameter}px`;
  span.style.left = `${e.clientX - btn.offsetLeft - radius}px`;
  span.style.top = `${e.clientY - btn.offsetTop - radius}px`;
  span.classList.add("ripple");

  const rippleEle = document.getElementsByClassName("ripple")[0];
  rippleEle ? rippleEle.remove() : null;

  btn.appendChild(span);
};

allBtn.map((item) => (item.onclick = handleClick));
