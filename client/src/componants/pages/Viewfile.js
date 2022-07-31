import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import download from 'downloadjs';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
function Viewfile() {
    let navigate = useNavigate();
    const [Data, setData] = useState([])
    const [key, setkey] = useState({ "key": "" })
    const [id, setId] = useState("")
    const [path, setPath] = useState("")
    const [mimetype, setmimetype] = useState("")
    const [compare_key, setcompare_key] = useState("")


    //////////model////////////
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);




    /////////get all files uploaded by user/////////
    const fetch_files = () => {
        const config = {
            headers: {
                //   we are finding the token from localstorage
                Authorization: localStorage.getItem("token"),
            }
        };
        axios.get("http://localhost:5000/api/userfiles_uploaded", config).then((data) => {
            setData(data.data.data)
            if (data.data.message === "Does not exist files") {

                Swal.fire({
                    position: "center",
                    icon: 'success',
                    title: 'File not found',
                    showConfirmButton: false,
                    timer: 1500
                })

                navigate("/nofile")
            }

        })
    }
    useEffect(() => {
        fetch_files()

    }, [])

    ///////////delete the data///////
    const deleteData = (id) => {
        const config = {
            headers: {
                //   we are finding the token from localstorage
                Authorization: localStorage.getItem("token"),
            }
        };

        axios
            .delete("http://localhost:5000/api/delete/" + id, config)
            .then((data) => {
                console.log(data.data);
                if (data.data.message === "File has been deleted successfully") {

                    Swal.fire({
                        position: "center",
                        icon: 'success',
                        title: 'File has been deleted successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })


                }
            })
            .catch((err) => {
                console.log(err);
            });


    }
    useEffect(() => {
        deleteData();

    }, [])





    /////////download data/////////

    const downloadData = (id, path, mimetype) => {
        axios.get(
            "http://localhost:5000/api/downloadFile/" + id,
            {
                responseType: "blob",

            }
        ).then((data) => {
            const split = path.split("/");
            const filename = split[split.length - 1];
            const mimetype1 = mimetype.split("/");
            console.log(filename);
            console.log(mimetype1);
            return download(data.data, filename, mimetype);
        }).catch((err) => {
            console.log(err);
        });
    };

    ///////model download file/////
    const modeldata = (id, path, mimetype, security_key) => {
        var id = id;
        var path = path;
        var mimetype = mimetype;
        setId(id)
        setPath(path)
        setmimetype(mimetype)
        setcompare_key(security_key)
        setShow(true)
    }

    ///////compare key////////
    const downloadFile = () => {
        if (key === compare_key) {
            downloadData(id, path, mimetype);
            console.log("downloadFile")
        } else {
            window.alert("Incorrect key, please enter correct key")
        }

    }


    return (
        <div className="container-fluid">
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Downlod file</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className='mt-3'>
                            <label>please enter the key</label>
                            <input onChange={(e) => setkey(e.target.value)} type='text' className='form-control'
                            />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <button className='btn btn-primary' onClick={downloadFile} >Download Now</button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div>
                <Link className='mt-3 my-5' to="/home">Back to the homepage</Link>
            </div>
            <div className="row my-4 mt-3">
                <div className="col-lg-12">


                    <div className="table-responsive">

                        <table className="table table-lg text-center">
                            <thead>
                                <tr  >

                                    <th>FileName</th>
                                    <th>FilePath</th>
                                    <th>FileType</th>
                                    <th>FileSize</th>

                                    <th>user uploads</th>
                                    <th>Key</th>
                                    <th>Delete file</th>
                                    <th>Download File</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    Data.map((ele, ind) => {
                                        return <tr key={ele.id} >
                                            <td>{ele.fileName}</td>
                                            <td>{ele.filePath}</td>
                                            <td>{ele.fileType}</td>
                                            <td>{ele.fileSize}</td>
                                            <td>{ele.uploadedby.name}</td>
                                            <td>{ele.key}</td>
                                            <td>
                                                <button className='btn btn-sm mx-3' onClick={() => deleteData(ele._id)} >Delete</button>
                                            </td>
                                            <td>
                                                {/* <button className='btn btn-sm mx-3'type="download" onClick={()=>downloadData(ele._id, ele.filePath, ele.fileType)} >Download</button> */}
                                                <button className='btn btn-sm mx-3' variant="primary" onClick={() => modeldata(ele._id, ele.filePath, ele.fileType, ele.key)} >Download</button>
                                            </td>

                                        </tr>

                                    })
                                }

                            </tbody>
                        </table>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Viewfile