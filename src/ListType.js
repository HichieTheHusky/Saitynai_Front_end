import { connect } from "react-redux";
import { useState, useEffect } from "react";
import {useLocation, useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function ListTypes({ access_token }) {
    const location = useLocation()
    const { id } = useParams();
    const [name, setname] = useState("");
    const [version, setversion] = useState("");

    let navigate = useNavigate();


    useEffect(() => {
        if(location.state != null){
            setname(location.state.name)
            setversion(location.state.version)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function handleUpdate() {
        console.log(id)
        async function updateType() {
            const response = await fetch(`https://pythonapisaitynas.azurewebsites.net/Testy/api/projects/` + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'x-access-tokens': `${access_token}`,
                },
                body: JSON.stringify({
                    name: name,
                    version: version,
                }),
            });
            if (response.status === 200){
                alert("update happend")
            } else {
                alert("update failed")
            }
            navigate('/projects')
        }
        updateType();
    }

    function handleADD() {
        console.log(id)
        async function updateType() {
            const response = await fetch(`https://pythonapisaitynas.azurewebsites.net/Testy/api/projects`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'x-access-tokens': `${access_token}`,
                },
                body: JSON.stringify({
                    name: name,
                    version: version,
                }),
            });
            if (response.status === 201){
                alert("create happend")
            } else {
                alert("create failed")
            }
            navigate('/projects')
        }
        updateType();
    }

    const handleChange = (e) => {
        e.target.id === "name"
            ? setname(e.target.value)
            : setversion(e.target.value);
    };

    return (
        <>
            <div className=".p-3">
                <h1 className="display-4 text-center first_name">
                    Project form
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
                {location.state === null ? (
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
