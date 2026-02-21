import api from "../api/api";

export const getAllJobs = async () => {
    const { data } = await api.get("/api/jobs/get-list")
    return data;
}  