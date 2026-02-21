import { useEffect, useState } from "react";
import { getAllJobs } from "../../services/jobService";
import { JobItem } from "./JobItem";
import { useLoader } from "../../contexts/LoaderContext/useLoader";
import { t } from "i18next";

export const JobList = ({ candidate }) => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        const fetchJobs = async () => {
            showLoader(t("loaders.loading-jobs"))
            try {
                const data = await getAllJobs();
                setJobs(data);
            } catch (error) {
                console.error(error);
                setError(t("errors.jobs-error"));
            } finally {
                hideLoader();
            }
        };

        fetchJobs();
    }, []);

    if (error) return <p className="text-red-400">{error}</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
            {jobs.map((job) => (
                <JobItem key={job.id} job={job} candidate={candidate} />
            ))}
        </div>
    );
};
