document.addEventListener("DOMContentLoaded", function () {
  // Wait a small bit so styles are fully parsed
  setTimeout(() => {
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 50,
          "density": { "enable": true, "value_area": 800 }
        },
        "color": { "value": ["#00c6ff", "#8a2be2", "#ffffff"] },
        "shape": {
          "type": "circle"
        },
        "opacity": {
          "value": 0.4,
          "random": true,
          "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
        },
        "size": {
          "value": 4,
          "random": true,
          "anim": { "enable": false }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#8a2be2",
          "opacity": 0.3,
          "width": 1.5
        },
        "move": {
          "enable": true,
          "speed": 1.2,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": { "enable": false }
        }
      },
      "interactivity": {
        "detect_on": "window",
        "events": {
          "onhover": { "enable": true, "mode": "grab" },
          "onclick": { "enable": true, "mode": "push" },
          "resize": true
        },
        "modes": {
          "grab": { "distance": 140, "line_linked": { "opacity": 0.8, "color": "#00c6ff" } },
          "push": { "particles_nb": 4 }
        }
      },
      "retina_detect": true
    });
  }, 100);
});
