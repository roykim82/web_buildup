const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            htmlEl.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlEl.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}


(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
        if (themeToggle) {
            themeToggle.checked = savedTheme === 'dark';
        }
    } else if (prefersDark) {
        htmlEl.setAttribute('data-theme', 'dark');
        if (themeToggle) {
            themeToggle.checked = true;
        }
    }
})();
