import { Button, Form } from "react-bootstrap/";
import { useState } from "react";

function UploadFiles(props) {
  const [selectedFile, cSelectedFile] = useState();

  const upload = (e) => {
    console.log(e);
    console.log("uploading");
    e.preventDefault();
  };

  const changeHandler = (event) => {
    cSelectedFile(event.target.files[0]);
  };

  const submitFile = (e) => {
    props.client.postFile(`${props.username}_${e.target.parentElement.id}`, selectedFile);
  };

  return (
    <>
      <Form id="avatar" onSubmit={upload}>
        <Form.Group action="/user/new" method="POST" enctype="multipart/form-data" controlId="formFile" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" name="myfile" onChange={changeHandler} />
        </Form.Group>
        <Button onClick={submitFile}>upload</Button>
      </Form>
    </>
  );
}
export default UploadFiles;
