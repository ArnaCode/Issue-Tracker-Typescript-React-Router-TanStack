let darkModeToggle =
  document.querySelector<HTMLDivElement>("#dark-mode-toggle")!;
let sunIcon = document.querySelector<HTMLElement>(".fa-sun")!;
let moonIcon = document.querySelector<HTMLElement>(".fa-moon")!;

function setupDarkModeToggle(): void {
  const updateIcons = () => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    sunIcon.style.display = isDarkMode ? "block" : "none";
    moonIcon.style.display = isDarkMode ? "none" : "block";
  };

  updateIcons();

  darkModeToggle.addEventListener("click", () => {
    const htmlElement = document.documentElement;

    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    updateIcons();
  });
}

function allThemePreference(): void {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export { setupDarkModeToggle, allThemePreference };
