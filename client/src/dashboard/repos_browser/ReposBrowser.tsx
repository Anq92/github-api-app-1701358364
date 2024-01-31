import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import './ReposBrowser.sass';
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteSelectEvent } from "primereact/autocomplete";
import { RepoData, ReposBrowserProps } from "../../types";
import { useEffect, useRef, useState } from "react";

function ReposBrowser({ reposData }: ReposBrowserProps) {

    const [selectedRepo, setSelectedRepo] = useState<RepoData | null>(null);
    const [displayedRepo, setDisplayedRepo] = useState<RepoData | null>(null);
    const [filteredRepos, setFilteredRepos] = useState<RepoData[] | null>(null);
    const [isShown, setIsShown] = useState(false);

    const matches = useRef<boolean | null>(null);
    const autoCompleteRef = useRef<AutoComplete>(null);
    const includedRepos = useRef<RepoData[]>([]);
    const excludedRepos = useRef<RepoData[]>([]);
    const excludedReposIds = useRef<Array<string>>([]);

    const searchRepo = (event: { query: string }) => {
        setTimeout(() => {
            let _filteredRepos;
            if (!event.query.trim().length) {
                _filteredRepos = [...includedRepos.current];
            }
            else {
                _filteredRepos = includedRepos.current.filter((repo: RepoData) => {
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

        excludedReposIds.current.push(displayedRepo!.id.toString());
        excludedRepos.current.push(displayedRepo!);
        includedRepos.current = includedRepos.current.filter((repo) => {
            return repo.id !== displayedRepo!.id
        });
        setDisplayedRepo(null);
        setSelectedRepo(null);
    }

    useEffect(() => {
        const excludedReposIdsString = localStorage.getItem("excluded-ids");

        if (excludedReposIdsString) {
            const excludedReposIdsArr = JSON.parse(excludedReposIdsString);
            excludedReposIds.current = excludedReposIdsArr;
            if (excludedReposIdsArr.length) {
                includedRepos.current = reposData.filter((repo) => {
                    return !excludedReposIdsArr.includes(`${repo.id}`);
                })
                excludedRepos.current = reposData.filter((repo) => {
                    return excludedReposIdsArr.includes(`${repo.id}`);
                })
            }
        } else {
            includedRepos.current = [...reposData];
        }
    }, [reposData]);

    useEffect(() => {
        if (isShown) {
            matches.current = !!filteredRepos!.length;
            const overlay = autoCompleteRef!.current!.getOverlay();
            const preventHighlight = (e: KeyboardEvent) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.stopImmediatePropagation();
                }
            }

            if (matches.current === false) {

                overlay.style.pointerEvents = "none";
                window.addEventListener("keydown", preventHighlight, true);
            }

            return () => {
                window.removeEventListener("keydown", preventHighlight, true);
                overlay.style.pointerEvents = "auto";
            };
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