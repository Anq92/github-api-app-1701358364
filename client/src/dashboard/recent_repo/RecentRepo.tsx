import { useEffect, useState } from "react";
import { RepoData } from "../../types.tsx";

const accessToken = localStorage.getItem("accessToken");
function RecentRepo() {
    const [recentRepo, setRecentRepo] = useState<RepoData>();
    const [loading, setLoading] = useState(false);
    

    useEffect( () => {
        const getRepo = async () => {
            setLoading(true);
            const response = await fetch("https://api.github.com/user/repos?sort=updated", {
                method: "GET",
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: "Bearer " + accessToken,
                }
            })
            const data = await response.json();
            setLoading(false);
            setRecentRepo(data[0]);
        }

        getRepo();
    }, []);

    return (
        <>
            <h2>Lately you've been working on:</h2>
            {loading && 
            <p>Loading...</p>}
            <p>{recentRepo?.name}</p>
            <h3>Number of stars:</h3>
            <p>{recentRepo?.stargazers_count}</p>
        </>

    );
}

export default RecentRepo