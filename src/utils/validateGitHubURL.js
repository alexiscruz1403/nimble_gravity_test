export const isValidGithubRepoUrl = (url) => {
    if (!url) return false;

    try {
        const parsed = new URL(url);

        // Debe ser https
        if (parsed.protocol !== "https:") return false;

        // Debe ser github.com
        if (parsed.hostname !== "github.com") return false;

        // Debe tener /usuario/repositorio
        const pathParts = parsed.pathname
        .split("/")
        .filter(Boolean);

        if (pathParts.length !== 2) return false;

        const [username, repo] = pathParts;

        // Validación básica de formato de username y repo
        const validPattern = /^[a-zA-Z0-9._-]+$/;

        if (!validPattern.test(username)) return false;
        if (!validPattern.test(repo)) return false;

        return true;
    } catch {
        return false;
    }
};