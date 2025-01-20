document.addEventListener("DOMContentLoaded", () => {
  const scrollFooter = document.getElementById("scroll-footer");

  let scrollTimeout; // To track the scroll timeout
  let lastScrollPosition = 0; // To track the last scroll position
  let isAtBottom = false;

  const checkIfAtBottom = () => {
    // Check if the user is at the bottom of the page
    return (
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    );
  };

  const showFooter = () => {
    scrollFooter.classList.add("visible");
  };

  const hideFooter = () => {
    scrollFooter.classList.remove("visible");
  };

  const handleScroll = () => {
    clearTimeout(scrollTimeout); // Clear any existing timeout

    const currentScrollPosition = window.scrollY;
    isAtBottom = checkIfAtBottom();

    if (currentScrollPosition > lastScrollPosition && !isAtBottom) {
      // User is scrolling down and not at the bottom
      showFooter();
      scrollTimeout = setTimeout(hideFooter, 1000); // Hide after 2 seconds of inactivity
    } else if (currentScrollPosition < lastScrollPosition) {
      // User is scrolling up
      hideFooter();
    } else if (isAtBottom) {
      // Keep the footer visible if at the bottom of the page
      showFooter();
    }

    lastScrollPosition = currentScrollPosition; // Update the last scroll position
  };

  // Attach the scroll event listener
  window.addEventListener("scroll", handleScroll);

  // Initial check in case the user loads the page at the bottom
  handleScroll();
});


// Get the dark mode toggle checkbox
const darkModeToggle = document.querySelector(".input");

// Function to enable dark mode
function enableDarkMode() {
  document.body.classList.add("dark-mode");
  localStorage.setItem("theme", "dark"); // Save preference
}

// Function to disable dark mode
function disableDarkMode() {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("theme", "light"); // Save preference
}

// Toggle dark mode based on checkbox
darkModeToggle.addEventListener("change", () => {
  if (darkModeToggle.checked) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

// Load theme preference from localStorage
if (localStorage.getItem("theme") === "dark") {
  darkModeToggle.checked = true;
  enableDarkMode();
} else {
  disableDarkMode();
}


// Skill Data
const skills = {
  html: {
    progress: 60,
    text: "Au cours de ce premier semestre j'ai pu découvrir les commandes et la programation système à travers le système d'exploitation linux. J'ai également pu découvrir le fonctionement d'un système d'exploitation.",
  },
  css: {
    progress: 80,
    text: "Grâce à ma première et terminale NSI j'ai découvert la programation python, ce qui a été renforcé par la suite par nos cours de programation durant ce semestre. J'ai également pu étudier la programation web (html et css) depuis la première jusqu'à actuellement.",
  },
  javascript: {
    progress: 70,
    text: "Lors de ce premier semestre j'ai pu apréhender différents aspects de la configuration réseau. Tout d'abord j'ai pu aquérir des compétences pour administrer des réseaux informatiques grâce au logiciel packet tracer qui permet leurs modélisations. Egalement, j'ai pu apprendre à installer des machines virtuelles avec VMWARE.",
  },
  nodejs: {
    progress: 50,
    text: "Au cours de nos différents tp, j'ai pu apprendre à manipuler différents appareils comme l'osciloscope (appareil de mesure et de visualisation) et le GBF (appareil de génération de fonctions).",
  },
};

// Elements
const skillButtons = document.querySelectorAll(".skill-button");
const gauge = document.getElementById("gauge");
const skillText = document.getElementById("skill-text");

// Function to Update Content
function updateSkillDisplay(skillKey) {
  const skill = skills[skillKey];

  // Reset Gauge
  gauge.style.background = `conic-gradient(
    var(--primary-color) 0%,
    #e0e0e0 0%
  )`;

  // Ensure White Circle Appears Instantly
  gauge.innerHTML = `
    <div class="inner-circle">
      <span id="percentage-text">${skill.progress}%</span>
    </div>
  `;

  // Animate Gauge Fill
  let progress = 0;
  const targetProgress = skill.progress;
  const step = 2; // Adjust for speed of animation
  const interval = setInterval(() => {
    progress += step;
    if (progress >= targetProgress) {
      progress = targetProgress; // Stop at target
      clearInterval(interval);
    }
    gauge.style.background = `conic-gradient(
      var(--primary-color) ${progress}%,
      #e0e0e0 ${progress}%
    )`;
  }, 16); // Smooth animation at ~60fps

  // Animate Percentage Text Inside Gauge
  const percentageText = document.getElementById("percentage-text");
  percentageText.style.opacity = "0"; // Start with hidden text
  setTimeout(() => {
    percentageText.classList.add("fade-in");
  }, 100); // Slight delay for fade-in

  // Animate Text
  skillText.classList.remove("fade-in");
  setTimeout(() => {
    skillText.textContent = skill.text;
    skillText.classList.add("fade-in");
  }, 200); // Slight delay for smoother transition

  // Update Active Button
  skillButtons.forEach((button) => button.classList.remove("active"));
  document.querySelector(`.skill-button[data-skill="${skillKey}"]`).classList.add("active");
}

// Attach Event Listeners to Buttons
skillButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const skillKey = button.getAttribute("data-skill");
    updateSkillDisplay(skillKey);
  });
});

// Load Default Skill
updateSkillDisplay("html");





document.addEventListener("DOMContentLoaded", () => {
  const phoneNumberElement = document.getElementById("phone-number");

  phoneNumberElement.addEventListener("click", () => {
    // Get the phone number text
    const phoneNumber = phoneNumberElement.textContent;

    // Use the Clipboard API to copy it to the clipboard
    navigator.clipboard.writeText(phoneNumber).then(() => {
      alert("Phone number copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy phone number: ", err);
    });
  });
});