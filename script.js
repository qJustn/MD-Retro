const $ = (sel) => document.querySelector(sel);

const toast = (msg) => {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  window.clearTimeout(toast._t);
  toast._t = window.setTimeout(() => el.classList.remove("show"), 1600);
};

const copyApplication = async () => {
  const text = $("#applicationText").value.trim();
  try {
    await navigator.clipboard.writeText(text);
    toast("Bewerbung kopiert ✅");
  } catch {
    // Fallback
    $("#applicationText").select();
    document.execCommand("copy");
    toast("Bewerbung kopiert ✅");
  }
};

const downloadTxt = () => {
  const text = $("#applicationText").value.trim();
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "LSMD_Bewerbung_Jeff_Jeremain.txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast("TXT gespeichert ⬇");
};

const setTheme = (theme) => {
  if (theme) document.documentElement.setAttribute("data-theme", theme);
  else document.documentElement.removeAttribute("data-theme");
  localStorage.setItem("md_theme", theme || "dark");
};

const toggleTheme = () => {
  const current = document.documentElement.getAttribute("data-theme");
  if (current === "light") {
    setTheme("dark");
    $("#themeToggle .btn__icon").textContent = "☾";
    $("#themeToggle .btn__label").textContent = "Night Shift";
  } else {
    setTheme("light");
    $("#themeToggle .btn__icon").textContent = "☀";
    $("#themeToggle .btn__label").textContent = "Day Shift";
  }
  toast("Theme geändert ✨");
};

(() => {
  // Year
  $("#year").textContent = new Date().getFullYear();

  // Restore theme
  const stored = localStorage.getItem("md_theme");
  if (stored === "light") {
    setTheme("light");
    $("#themeToggle .btn__icon").textContent = "☀";
    $("#themeToggle .btn__label").textContent = "Day Shift";
  }

  // Buttons
  $("#copyBtn").addEventListener("click", copyApplication);
  $("#copyBtn2").addEventListener("click", copyApplication);
  $("#downloadBtn").addEventListener("click", downloadTxt);
  $("#themeToggle").addEventListener("click", toggleTheme);

  $("#scrollTop").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
