import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import './ReposBrowser.sass';
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteSelectEvent } from "primereact/autocomplete";
import { RepoData } from "../../types";
import { useEffect, useRef, useState } from "react";

function ReposBrowser({ ...props }) {

    const reposData = props.reposData;

    const [selectedRepo, setSelectedRepo] = useState<RepoData | null>(null);
    const [displayedRepo, setDisplayedRepo] = useState<RepoData | null>(null);
    const [filteredRepos, setFilteredRepos] = useState<RepoData[] | null>(null);
    const [isShown, setIsShown] = useState(false);

    const matches = useRef<boolean | null>(null);
    const autoCompleteRef = useRef<AutoComplete>(null);

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

    const handleOnClear = () => {
        setDisplayedRepo(null);
    }

    const handleOnSelect = (e: AutoCompleteSelectEvent) => {
        if (e.value !== noMatchesObj) {
            setSelectedRepo(e.value);
            setDisplayedRepo(e.value);
        } else {
            setSelectedRepo(null);
        }
    }

    const handleOnShow = () => {
        setIsShown(true);
    }

    const handleOnHide = () => {
        setIsShown(false);
    }

    const noMatchesObj = {
        name: "no matches found..."
    }

    const handleExcludeButtonOnClick = () => {
        setDisplayedRepo(null);
        setSelectedRepo(null);
    }

    useEffect(() => {
        if (isShown) {
            matches.current = !!filteredRepos!.length;

            const preventHighlight = (e: KeyboardEvent) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.stopImmediatePropagation();
                }
            }

            if (matches.current === false) {
                const overlay = autoCompleteRef!.current!.getOverlay();
                overlay.style.pointerEvents = "none";
                window.addEventListener("keydown", preventHighlight, true);
            }

            return () => { window.removeEventListener("keydown", preventHighlight, true) };
        }

    }, [isShown, filteredRepos])


    return (
        <div className='browser-container'>
            <h3>Search for repositories...</h3>
            <AutoComplete
                ref={autoCompleteRef}
                forceSelection
                value={selectedRepo}
                suggestions={filteredRepos?.length ? filteredRepos : [noMatchesObj]}
                completeMethod={searchRepo}
                field="name"
                onChange={handleOnChange}
                onClear={handleOnClear}
                onHide={handleOnHide}
                onSelect={handleOnSelect}
                onShow={handleOnShow}
                placeholder="repository name"
            />
            {displayedRepo &&
                <div className='search-result'>
                    <span><b>Name:</b> {displayedRepo.name}</span>
                    <span><b>Stars:</b> {displayedRepo.stargazers_count}</span>
                    <button id="exclude" onClick={handleExcludeButtonOnClick}>Exclude</button>
                </div>}
        </div>
    );
}

export default ReposBrowser;