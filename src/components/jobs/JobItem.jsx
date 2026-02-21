import { useState, useEffect } from "react";
import { applyToJob } from "../../services/candidateService";
import { useAlert } from "../../contexts/AlertContext/useAlert";
import { useLoader } from "../../contexts/LoaderContext/useLoader";
import { isValidGithubRepoUrl } from "../../utils/validateGitHubURL";
import { extractGithubRepoData } from "../../utils/githubUtils";
import { checkGithubRepoExists } from "../../services/githubService";
import { useTranslation } from "react-i18next";

export const JobItem = ({ job, candidate }) => {
    const [repoUrl, setRepoUrl] = useState("");
    const [validUrl, setValidUrl] = useState(false);
    const [error, setError] = useState(null);
    const { showAlert } = useAlert();
    const { showLoader, hideLoader } = useLoader()
    const { t } = useTranslation()

    const getReponseErrors = (error) => {
        const details = error.response.data.details.fieldErrors;

        if(!details) return null;

        const message = [];

        const keys = Object.keys(details);
        for(const key of keys){
            message.push(details[key]);
        }

        return message.join(",");
    }

    const handleSubmit = async () => {
        if (!repoUrl) {
            setError(t("errors.required-repo"));
            return;
        }

        try {
            showLoader(t("loaders.sending-application"))
            setError(null);

            const { owner, repo } = extractGithubRepoData(repoUrl);
            if(!owner || !repo){
                showAlert({
                    title: t("alerts.application-error-title"),
                    message: t("alerts.application-repo-dn-exists-message"),
                    type: "error"
                })
                return;
            }

            const repoExists = await checkGithubRepoExists(owner, repo);
            if(!repoExists){
                showAlert({
                    title: t("alerts.application-error-title"),
                    message: t("alerts.application-repo-dn-exists-message"),
                    type: "error"
                })
                return;
            }

            const response = await applyToJob({
                uuid: candidate.uuid,
                candidateId: candidate.candidateId,
                applicationId: candidate.applicationId,
                jobId: job.id,
                repoUrl,
            });
            console.log(response)

            if(response.ok && response.ok){
                showAlert({
                    title: t("alerts.application-success-title"),
                    message: t("alerts.application-success-message", { jobTitle: job.title }),
                    type: "success"
                })
            } else {
                showAlert({
                    title: t("alerts.application-error-title"),
                    message: t("alerts.application-general-error-message", { jobTitle: job.title, error: error.message }),
                    type: "error"
                })
            }
        } catch (error) {
            console.error(error.response.data.details)
            showAlert({
                title: t("alerts.application-error-title"),
                message: t("alerts.application-general-error-message", { jobTitle: job.title, error: getReponseErrors(error) }),
                type: "error"
            })
        } finally {
            hideLoader();
        }
    };

    useEffect(() => {
        const validURL = isValidGithubRepoUrl(repoUrl);
        setValidUrl(validURL);
    },[repoUrl]);

    return (
        <div className="bg-slate-800 p-6 rounded-xl shadow-md border border-slate-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-4 text-center">
                {job.title}
            </h3>

            <input
                type="text"
                placeholder={t("jobs.repo_placeholder")}
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full mb-3 p-2 rounded bg-slate-900 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-400 mt-2 text-center">{error}</p>}

            <div className="w-full flex justify-center items-center">
                <button
                    onClick={handleSubmit}
                    disabled={!validUrl}
                    className="bg-blue-900 hover:bg-blue-800 transition px-4 py-2 rounded text-white font-medium disabled:bg-gray-500 cursor-pointer disabled:cursor-not-allowed"
                >
                    {t("common.submit")}
                </button>
            </div>
        </div>
    );
};