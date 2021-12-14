import { connect } from "react-redux";
import { useState, useEffect } from "react";
import {useLocation, useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function ListTypes({ access_token }) {
    const location = useLocation()
    const { id } = useParams();
    const [name, setname] = useState("");
    const [version, setversion] = useState("");
    const [description, setdescription] = useState("");
    const [magicd, setmagic] = useState("");
    const [projectID, setprojectID] = useState("");

    let navigate = useNavigate();


    useEffect(() => {
        if(location.state != null){
            setprojectID(location.state.projectID)
            setname(location.state.name)
            setversion(location.state.version)
            setdescription(location.state.description)
            setmagic(location.state.magicd)
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    function handleUpdate() {
        async function updateType() {
            const response = await fetch(`http://127.0.0.1:5000/Testy/api/projects/` + projectID + '/reqs/' + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'x-access-tokens': `${access_token}`,
                },
                body: JSON.stringify({
                    name: name,
                    Version: version,
                    Description: description,
                    MagicDrawID: magicd,
                    project: projectID
                }),
            });
            if (response.status === 200){
                alert("update happend")
            } else {
                alert("update failed")
            }
            navigate(`/projects/${projectID}/requirements/`)
        }
        updateType();
    }

    function handleADD() {
        async function updateType() {
            const response = await fetch(`http://127.0.0.1:5000/Testy/api/projects/` + projectID + '/reqs', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'x-access-tokens': `${access_token}`,
                },
                body: JSON.stringify({
                    name: name,
                    Version: version,
                    Description: description,
                    MagicDrawID: magicd,
                }),
            });
            if (response.status === 201){
                alert("create happend")
            } else {
                alert("create failed")
            }
            navigate(`/projects/${projectID}/requirements/`)
        }
        updateType();
    }

    const handleChange = (e) => {
        switch (e.target.id) {
            case "name":
                setname(e.target.value)
                break;
            case "version":
                setversion(e.target.value)
                break;
            case "description":
                setdescription(e.target.value)
                break;
            case "magic":
                setmagic(e.target.value)
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div className=".p-3">
                <h1 className="display-4 text-center first_name">
                    Requirement form
                </h1>
            </div>
            <div className={"form"}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <textarea id='name' onChange={handleChange} className="form-control" required defaultValue={location.state === null ? '' : location.state.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Version</label>
                    <textarea id='version' onChange={handleChange}  className="form-control" required defaultValue={location.state === null ? '' : location.state.version} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <textarea id='description' onChange={handleChange}  className="form-control" required defaultValue={location.state === null ? '' : location.state.description} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">MagicDrawID</label>
                    <textarea id='magic' onChange={handleChange}  className="form-control" required defaultValue={location.state === null ? '' : location.state.magicd} />
                </div>
                {location.state.function === "add" ? (
                    <button onClick={handleADD} className="btn btn-primary">Submit</button>
                ) : (
                    <button onClick={handleUpdate} className="btn btn-primary">Submit</button>
                )}
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    console.log(state);
    const { access_token } = state;
    return { access_token };
};

export default connect(mapStateToProps, null)(ListTypes);
