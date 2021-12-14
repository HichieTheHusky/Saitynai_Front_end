import { connect } from "react-redux";
import { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function ListTypes({ access_token }) {
    const [loadingData, setLoadingData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ item: [],  item2: [] });
    const location = useLocation()
    const { id } = useParams();
    const [name, setname] = useState("");
    const [version, setversion] = useState("");
    const [description, setdescription] = useState("");
    const [pre, setdpre] = useState("");
    const [post, setdpost] = useState("");
    const [area, setarea] = useState("");
    const [projectID, setprojectID] = useState("");
    const [reqID, setreqID] = useState("");

    let navigate = useNavigate();


    useEffect(() => {
        if(location.state != null){
            setprojectID(location.state.projectID)
            setreqID(location.state.reqID)
            setname(location.state.name)
            setversion(location.state.version)
            setdescription(location.state.description)
            setdpre(location.state.pre)
            setdpost(location.state.post)
            setarea(location.state.area)
        }
    }, [])

    function handleUpdate() {
        async function updateType() {
            setLoading(true);
            const response = await fetch(`https://pythonapisaitynas.azurewebsites.net/Testy/api/projects/` + projectID + '/reqs/' + reqID + '/tests/' + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'x-access-tokens': `${access_token}`,
                },
                body: JSON.stringify({
                    name: name,
                    Version: version,
                    Description: description,
                    pre: pre,
                    post: post,
                    area: area,
                    req: reqID
                }),
            });
            if (response.status === 200){
                alert("update happend")
            } else {
                alert("update failed")
            }
            navigate(`/projects/${projectID}/requirements/${reqID}/tests`)
            setLoading(false);
        }
        updateType();
    }

    function handleADD() {
        async function updateType() {
            setLoading(true);
            const response = await fetch(`https://pythonapisaitynas.azurewebsites.net/Testy/api/projects/` + projectID + '/reqs/' + reqID + '/tests', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'x-access-tokens': `${access_token}`,
                },
                body: JSON.stringify({
                    name: name,
                    Version: version,
                    Description: description,
                    pre: pre,
                    post: post,
                    area: area
                }),
            });
            if (response.status === 201){
                alert("create happend")
            } else {
                alert("create failed")
            }
            navigate(`/projects/${projectID}/requirements/${reqID}/tests`)
            setLoading(false);
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
            case "pre":
                setdpre(e.target.value)
                break;
            case "post":
                setdpost(e.target.value)
                break;
            case "area":
                setarea(e.target.value)
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
                    <label htmlFor="exampleInputPassword1">pre</label>
                    <textarea id='pre' onChange={handleChange}  className="form-control" required defaultValue={location.state === null ? '' : location.state.pre} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">post</label>
                    <textarea id='post' onChange={handleChange}  className="form-control" required defaultValue={location.state === null ? '' : location.state.post} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">area</label>
                    <textarea id='area' onChange={handleChange}  className="form-control" required defaultValue={location.state === null ? '' : location.state.area} />
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
