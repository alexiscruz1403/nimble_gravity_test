import { useState, useEffect } from 'react'
import { getCandidateDateByEmail } from '../services/candidateService'
import { JobList } from '../components/jobs/JobList';
import { Alert } from '../components/ui/Alert';
import { LoaderOverlay } from '../components/ui/Loader';
import { useLoader } from '../contexts/LoaderContext/useLoader';
import { LanguageSelector } from '../components/lang/LanguageSelector';
import { useTranslation } from "react-i18next";

export const Home = () => {
    const [error, setError] = useState(null);
    const [candidateData, setCandidateData] = useState(null);
    const { showLoader, hideLoader } = useLoader();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchCandidateData = async () => {
            showLoader(t("loaders.loading-candidate"));
            try {
                const candidate = await getCandidateDateByEmail(import.meta.env.VITE_PERSONAL_EMAIL);
                setCandidateData(candidate);
            } catch(error){
                console.error(error);
                setError(t("errors.candidate-error"));
            } finally {
                hideLoader();
            }
        }

        fetchCandidateData();
    }, []);

    return (
        <div className="min-h-screen w-full bg-slate-900 p-10 text-white box-border">
            <Alert />
            <LoaderOverlay />
            <LanguageSelector />
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-400 mb-8 text-center">
                {t("home.title")}
            </h1>
            <JobList candidate={candidateData} />
            {error && (
                <p className='text-xl md:text-2xl lg:text-3xl font-bold text-red-600 text-center'>{error}</p>
            )}
        </div>
    );
}