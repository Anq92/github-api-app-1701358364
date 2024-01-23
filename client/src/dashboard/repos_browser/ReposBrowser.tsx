import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import './ReposBrowser.sass';
import { AutoComplete, AutoCompleteChangeEvent } from "primereact/autocomplete";
import { RepoData } from "../../types";
import { useState } from "react";

function ReposBrowser({ ...props }) {

    const reposData = props.reposData;

    const [selectedRepo, setSelectedRepo] = useState<RepoData | null>(null);
    const [displayedRepo, setDisplayedRepo] = useState<RepoData | null>(null);
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

    const handleOnChange = (e: AutoCompleteChangeEvent) => {
        setSelectedRepo(e.value);
    }

    return (
        <div className='browser-container'>
            <h3>Search for repositories...</h3>
            <AutoComplete
                value={selectedRepo}
                suggestions={filteredRepos}
                completeMethod={searchRepo}
                field="name"
                onChange={handleOnChange}
                onClear={() => setDisplayedRepo(null)}
                onSelect={(e) => setDisplayedRepo(e.value)}
                placeholder="repository name"
            />
            {displayedRepo &&
                <div className='search-result'>
                    <span><b>Name:</b> {displayedRepo.name}</span>
                    <span><b>Stars:</b> {displayedRepo.stargazers_count}</span>
                </div>}
        </div>
    );
}

export default ReposBrowser;