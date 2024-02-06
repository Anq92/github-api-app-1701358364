import { useState } from "react";
import { ExcludedReposListProps, RepoData } from "../../types";
import "./ExcludedReposList.sass"

function ExcludedReposList({ data, includedRepos, excludedReposIds, setIsVisible }: ExcludedReposListProps) {

    const [listData, setListData] = useState(data.current);

    const handleIncludeButtonOnClick = (currentRepo: RepoData) => {
        return () => {
            includedRepos.current.push(currentRepo);
            excludedReposIds.current = excludedReposIds.current.filter((id: string) => {
                return id !== `${currentRepo.id}`;
            });
            const _data = data.current.filter((repo) => {
                return repo.id !== currentRepo.id;
            });
            setListData(_data);
            data.current = _data;
            localStorage.setItem("excluded-ids", JSON.stringify(excludedReposIds.current));
        }
    }

    const list = listData.map((repo) => {
        return <li key={repo.id}><p className="list-item"><span>{repo.name}</span><button className="include-button" onClick={handleIncludeButtonOnClick(repo)}>Include</button></p></li>
    })
    return (
        <>
            <h3>Repos excluded from search:</h3>
            <ul className="list">{list}</ul>
            <button className="return-button" onClick={() => setIsVisible(false)}>Return</button>
        </>
    )
}

export default ExcludedReposList;