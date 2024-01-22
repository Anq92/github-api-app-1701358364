import {
    RepoData
} from "../../types";
import "./RecentRepo.sass";

function RecentRepo(props: RepoData) {

    return (
        <div >
            <h2>Lately you've been working on:</h2>
            <div className="recent-repo">
                <h3>{props.name}</h3>
                <p>Stars: {props.stargazers_count}</p>
            </div>
        </div>
    );
}

export default RecentRepo