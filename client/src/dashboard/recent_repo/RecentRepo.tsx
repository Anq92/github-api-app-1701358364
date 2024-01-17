import { useEffect, useState } from "react";
import { RepoData } from "../../types.tsx";

const accessToken = localStorage.getItem("accessToken");
function RecentRepo() {
    const [recentRepo, setRecentRepo] = useState<RepoData | null>();
    const [loading, setLoading] = useState(false);
    

    useEffect( () => {
        const getRepo = async () => {
            setLoading(true);
            const response = await fetch("https://api.github.com/user/repos?sort=created", {
                method: "GET",
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: "Bearer " + accessToken,
                }
            })
            const data : RepoData[] = await response.json();
            if (data.length === 0) {
                setRecentRepo(null)
            } else {
                setRecentRepo(data[0]);
            }
            setLoading(false);
        }

        getRepo();
    }, []);

    let content = <></>

    if (loading) {
        content = <p>Loading...</p>
    }
    else if (!recentRepo) {
        content = <p>No repositories found</p>
    } else {
        content =
            <>
                <p>{recentRepo.name}</p>
                <h3>Number of stars:</h3>
                <p>{recentRepo.stargazers_count}</p>
            </>
    }

    return (
        <>
            <h2>Lately you've been working on:</h2>
            {content}
        </>

    );
}

export default RecentRepo