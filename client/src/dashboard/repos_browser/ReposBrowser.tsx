import { AutoComplete } from "primereact/autocomplete";
import { RepoData } from "../../types";

function ReposBrowser({ ...props }) {

    const repoList = props.reposData.map((repo: RepoData) => {
        return <li>{repo.name}</li>
    })
    return (
        <>
            <h3>Search for repositories...</h3>
            <AutoComplete />
            <ul>{repoList}</ul>
        </>
    )
}

export default ReposBrowser