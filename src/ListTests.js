import { connect } from "react-redux";
import { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";

function ListTypes({ access_token }) {
    const [loadingData, setLoadingData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ reqs: [], type: [], type2: []});
    const { id, id2 } = useParams();

    function handleDelete(id) {
        console.log(id);
        async function deleteType() {
            setLoading(true);
            const response = await fetch(`http://localhost:98/api/types/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'x-access-tokens': `${access_token}`,
                },
            });
            const result = await response.json();
            setLoading(false);
            console.log(result);
        }
        deleteType();
    }

    useEffect(() => {
        setLoadingData(true);
        console.log(access_token)
        console.log(id)
        console.log(id2)
        async function fetchData() {
            const repsonse = await fetch("http://127.0.0.1:5000/Testy/api/projects/" + id + "/reqs/" + id2 + '/tests', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'x-access-tokens': `${access_token}`,
                },
            });
            const result = await repsonse.json();
            setData({ reqs: result.data,
                            type: result.reference[0],
                            type2: result.reference[1]
            });
            setLoadingData(false);
        }
        fetchData();
        console.log(data.reqs);
        console.log(data.type);
        console.log(data.type);
        // console.log(data.type[0]);
    }, []);

    return (
        <>
            <div className=".p-3">
                <h1 className="display-4 text-center first_name">
                    Project
                </h1>
            </div>

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Version</th>
                </tr>
                </thead>
                <tr>
                    <td>
                        {data.type.name}
                    </td>
                    <td>
                        {data.type.version}
                    </td>
                </tr>
            </table>

            <div className=".p-3">
                <h1 className="display-4 text-center">
                    Requirement
                </h1>
            </div>

            <table>
                <thead>
                <tr>
                    <th>name</th>
                    <th>Description</th>
                    <th>MagicDrawID</th>
                    <th>Version</th>
                    <th>approval</th>
                </tr>
                </thead>
                <tbody className="labels">
                    <tr>
                        <td>
                            {data.type2.name}
                        </td>
                        <td>
                            {data.type2.Description}
                        </td>
                        <td>
                            {data.type2.MagicDrawID}
                        </td>
                        <td>
                            {data.type2.Version}
                        </td>
                        <td>
                            {data.type2.approval = true ? "Approved" : "Not approved"}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className=".p-3">
                <h1 className="display-4 text-center">
                    Tests
                </h1>
            </div>

            <table>
                <thead>
                <tr>
                    <th>name</th>
                    <th>Description</th>
                    <th>area</th>
                    <th>Version</th>
                    <th>approval</th>
                    <th>post</th>
                    <th>pre</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody className="labels">
                {loadingData
                    ? "Loading..."
                    : data.reqs.map((element) => {
                        console.log(element.name);
                        return (
                            <tr key={element.id}>
                                <>
                                    <td>
                                        {element.name}
                                    </td>

                                    <td>
                                        {element.Description}
                                    </td>

                                    <td>
                                        {element.area}
                                    </td>
                                    <td>
                                        {element.Version}
                                    </td>
                                    <td>
                                        {element.approval = true ? "Approved" : "Not approved"}
                                    </td>
                                    <td>
                                        {element.post}
                                    </td>
                                    <td>
                                        {element.pre}
                                    </td>
                                    <td>
                                        <Link to={`/types/${element.id}/requirements`}>
                                            <button
                                                id={element.id}
                                                class="btn btn-primary btn-sm btn-floating mx-2">
                                                Open </button>
                                        </Link>

                                        <button class="btn btn-primary btn-sm btn-floating mx-2"
                                                gugugaga={element.id}
                                                onClick={() => handleDelete(element.id)}>
                                            {loading ? `Deleting...` : `Delete ${element.name}`}
                                        </button>
                                    </td>
                                </>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

const mapStateToProps = (state) => {
    console.log(state);
    const { access_token } = state;
    return { access_token };
};

export default connect(mapStateToProps, null)(ListTypes);
