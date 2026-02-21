export const checkGithubRepoExists = async (owner, repo) => {
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`
    );

    if (response.status === 200) return true;
    if (response.status === 404) return false;
};