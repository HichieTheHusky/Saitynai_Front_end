import * as React from "react";
import {useEffect, useState} from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function TransitionsModal(props) {
    const [updateInput, setUpdateInput] = useState("");
    const [open, setOpen] = React.useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        props.fetchData()
    };

    function handleUpdate(id) {
        async function handleUpdate() {
            setLoadingUpdate(true);
            console.log(props.token);
            let answer = false;
            if(updateInput === "0")
            {
                answer = false
            }
            if (updateInput === "1")
            {
                answer = true
            }
            console.log(answer);

            await fetch(`http://127.0.0.1:5000/Testy/api/projects/${props.id3}/reqs/${props.id2}/tests/${props.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-tokens": `${props.token}`,
                    "approving": answer
                },
            });
            setLoadingUpdate(false);
        }
        handleUpdate();
    }

    function handleUpdate2(id) {
        async function handleUpdate() {
            setLoadingUpdate(true);
            console.log(props.token);
            let answer = false;
            if(updateInput === "0")
            {
                answer = false
            }
            if (updateInput === "1")
            {
                answer = true
            }
            console.log(answer);

            await fetch(`http://127.0.0.1:5000/Testy/api/projects/${props.id2}/reqs/${props.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-tokens": `${props.token}`,
                    "approving": answer
                },
            });
            setLoadingUpdate(false);
        }
        handleUpdate();
    }

    useEffect(() => {
        setUpdateInput("0")
    }, [])


    return (
        <div>
            <button className={"btn btn-primary btn-sm btn-floating mx-2"} onClick={handleOpen}>Approve</button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className="col-lg">
                            <label>
                                Change approval status
                            </label>
                        </div>
                        <div className="form-floating">
                            <div className="col-lg select">
                                <select onChange={(e) => setUpdateInput(e.target.value)}>
                                    <option selected value="0">False</option>
                                    <option value="1">True</option>
                                </select>
                            </div>

                            <div className="col-lg">
                                <button onClick={() => props.type === "test" ? handleUpdate(props.id) : handleUpdate2(props.id)} className={"btn btn-primary  btn-floating mx-2"}>
                                    {loadingUpdate ? `Updating...` : `Update`}
                                </button>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}