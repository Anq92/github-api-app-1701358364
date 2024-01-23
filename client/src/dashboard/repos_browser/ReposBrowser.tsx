import { AutoComplete } from "primereact/autocomplete";
import { RepoData } from "../../types";
import { useState } from "react";

function ReposBrowser({ ...props }) {

    const reposData = props.reposData;
    const [selectedRepo, setSelectedRepo] = useState<RepoData | null>(null)
    const [filteredRepos, setFilteredRepos] = useState<RepoData[]>([]);

    const searchRepo = (event: { query: string }) => {
        setTimeout(() => {
            let _filteredRepos;
            if (!event.query.trim().length) {
                _filteredRepos = [...reposData];
            }
            else {
                _filteredRepos = reposData.filter((repo: RepoData) => {
                    return repo.name.toLowerCase().includes(event.query.toLowerCase());
                });
            }

            setFilteredRepos(_filteredRepos);
        }, 250);
    }

    const repoList = reposData.map((repo: RepoData) => {
        return <li>{repo.name}</li>
    })
    return (
        <>
            <h3>Search for repositories...</h3>
            <AutoComplete value={selectedRepo} suggestions={filteredRepos} completeMethod={searchRepo} field="name" onChange={(e) => setSelectedRepo(e.value)} />
            <ul>{repoList}</ul>
        </>
    )
}

export default ReposBrowser