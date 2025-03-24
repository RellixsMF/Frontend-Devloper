const blob = document.querySelector(".blob");

window.document.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  const { offsetWidth: center } = blob;

  blob.animate({
    left: `${clientX - center}px`,
    top: `${clientY - center}px`
  }, { duration: 500, fill: "forwards" });
});