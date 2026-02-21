import api from "../api/api";

export const getCandidateDateByEmail = async (email) => {
    const { data } = await api.get("/api/candidate/get-by-email", {
        params: { email }
    });
    return data;
}

export const applyToJob = async (payload) => {
    const { data } = await api.post("/api/candidate/apply-to-job", payload)
    return data;
} 