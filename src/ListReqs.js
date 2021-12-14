import { connect } from "react-redux";
import { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

function ListTypes({ access_token }) {
    const [loadingData, setLoadingData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ reqs: [], type: []});
    const { id } = useParams();

    function handleDelete(did) {
        console.log(id);
        async function deleteType() {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:5000/Testy/api/projects/${id}/reqs/${did}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'x-access-tokens': `${access_token}`,
                },
            });
            if (response.status === 204){
                alert("delete happened")
            } else {
                alert("delete failed")
            }
            setLoadingData(true);
            fetchData();
        }
        deleteType();
    }
    async function fetchData() {
        const repsonse = await fetch("http://127.0.0.1:5000/Testy/api/projects/" + id + "/reqs", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'x-access-tokens': `${access_token}`,
            },
        });
        const result = await repsonse.json();
        setData({ reqs: result.data,
            type: result.reference});
        setLoadingData(false);
    }

    useEffect(() => {
        setLoadingData(true);
        fetchData();
    }, []);

    return (
        <>
            <div className=".p-3">
                <h1 className="display-4 text-center first_name">
                    Project
                </h1>
            </div>

            <Link to={`/requirements/create`}
                  state={{ projectID:data.type.id, function: "add"}} >>
                <button
                    className="center btn btn-primary">
                    ADD </button>
            </Link>

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
                    Requirements
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
                                        {element.MagicDrawID}
                                    </td>
                                    <td>
                                        {element.Version}
                                    </td>
                                    <td>
                                        {element.approval === true ? "Approved" : "Not approved"}
                                    </td>
                                    <td>
                                        <Link to={`/projects/${id}/requirements/${element.id}/tests`}>
                                            <button
                                                id={element.id}
                                                class="btn btn-primary btn-sm btn-floating mx-2">
                                                Open </button>
                                        </Link>

                                        <Link to={`/requirements/update/${element.id}`}
                                              state={{ projectID:data.type.id, name: element.name, version: element.Version, description: element.Description, magicd: element.MagicDrawID}} >
                                            <button
                                                id={element.id}
                                                class="btn btn-primary btn-sm btn-floating mx-2">
                                                Update </button>
                                        </Link>

                                        <button class="btn btn-primary btn-sm btn-floating mx-2"
                                                gugugaga={element.id}
                                                onClick={() => handleDelete(element.id)}>
                                            {loading ? `Deleting...` : `Delete`}
                                        </button>

                                        <Modal type="req" id={element.id} id2={data.type.id} token={access_token} fetchData={fetchData}  />
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
