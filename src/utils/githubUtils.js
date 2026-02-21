export const extractGithubRepoData = (url) => {
    try {
        const parsed = new URL(url);

        if (
            parsed.protocol !== "https:" ||
            !["github.com", "www.github.com"].includes(parsed.hostname)
        ) {
            return null;
        }

        const parts = parsed.pathname.split("/").filter(Boolean);

        if (parts.length !== 2) return null;

        return {
            owner: parts[0],
            repo: parts[1].replace(".git", ""),
        };

    } catch {
        return null;
    }
};