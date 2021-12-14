import { connect } from "react-redux";
import { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import Modal from "./Modal";

function ListTypes({ access_token }) {
    const [loadingData, setLoadingData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ reqs: [], type: [], type2: []});
    const { id, id2 } = useParams();

    function handleDelete(id_t) {
        console.log(id);
        async function deleteType() {
            setLoading(true);
            const response = await fetch("https://pythonapisaitynas.azurewebsites.net/Testy/api/projects/" + id + "/reqs/" + id2 + '/tests/' + id_t, {
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
            setLoading(false);
            fetchData();
        }
        deleteType();
    }

    async function fetchData() {
        const repsonse = await fetch("https://pythonapisaitynas.azurewebsites.net/Testy/api/projects/" + id + "/reqs/" + id2 + '/tests', {
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

    useEffect(() => {
        setLoadingData(true);
        console.log(access_token)
        console.log(id)
        console.log(id2)
        fetchData();
        console.log(data.reqs);
        console.log(data.type);
        console.log(data.type);
        // console.log(data.type[0]);
    }, []);

    const handleCloseUpdate = () => {
        fetchData();
    };

    return (
        <>
            <div className=".p-3">
                <h1 className="display-4 text-center first_name">
                    Project
                </h1>
            </div>

            <Link to={`/test/create`}
                  state={{ projectID:data.type.id, reqID:data.type2.id, function: "add"}} >>
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
                        console.log(element.approval);
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
                                        {element.approval === true ? "Approved" : "Not approved"}
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

                                        <Link to={`/test/update/${element.id}`}
                                              state={{ projectID:data.type.id, reqID:data.type2.id, name: element.name, version: element.Version, description: element.Description, pre: element.pre, post: element.post, area: element.area}} >
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

                                        <Modal type="test" id={element.id} id2={data.type2.id} id3={data.type.id} token={access_token} fetchData={fetchData}  />
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
