import { Button, Container, Form } from "react-bootstrap/";
import { useState } from "react";
import "./StudentAdd.css";


function UploadFiles(props) {
  const [selectedPic, cSelectedPic] = useState();
  const [selectedCV, cSelectedCV] = useState();

  const upload = (e) => {
    console.log(e);

    console.log("uploading");
    e.preventDefault();
  };

  const cCVHandler = (event) => {
    cSelectedCV(event.target.files[0]);
  };
  const cPicHandler = (event) => {
    cSelectedPic(event.target.files[0]);
  };

  const submitPic = (e) => {
    let fileExtention = selectedPic.name.split(".");
    console.log(e.target.parentElement.parentElement);
    props.cAvatar(
      `${props.username}_${e.target.parentElement.parentElement.id}.${
        fileExtention[fileExtention.length - 1]
      }`
    );
    props.client.postFile(
      `${props.username}_${e.target.parentElement.parentElement.id}`,
      selectedPic
    );
  };

  const submitCV = (e) => {
    let fileExtention = selectedCV.name.split(".");
    props.cCV(
      `${props.username}_${e.target.parentElement.parentElement.id}.${
        fileExtention[fileExtention.length - 1]
      }`
    );
    props.client.postFile(
      `${props.username}_${e.target.parentElement.parentElement.id}`,
      selectedCV
    );
  };

  const deleteCV = () => {
    props.cCV("CV_placeholder_1.pdf");
  };

  const deletePic = () => {
    props.cAvatar("avatar_placeholder_1.jpg");
  };

  const id = [
    {
      key: "1",
      formId: "avatar",
      formLabel: "Upload a Profile Picture",
      uploadFunction: submitPic,
      deleteFunction: deletePic,
      changeHandler: cPicHandler,
    },
    {
      key: "2",
      formId: "CV",
      formLabel: "Upload your CV",
      uploadFunction: submitCV,
      deleteFunction: deleteCV,
      changeHandler: cCVHandler,
    },
  ];

  return id.map((id) => {
    return (
      <Container
        key={id.key}
        id={id.formId}
        onSubmit={upload}
        style={{ margin: "0", padding: "0" }}
      >
        <Form.Group
          action="/user/new"
          method="POST"
          encType="multipart/form-data"
          controlId="formFile"
          className="mb-3"
        >
          <Form.Label className="upload">{id.formLabel}</Form.Label>
          <Form.Control type="file" name="myfile" onChange={id.changeHandler} />
        </Form.Group>
        <span>
          <Button type="submit" onClick={(e) => id.uploadFunction(e)}>
            Upload
          </Button>
          &nbsp;&nbsp;
          <Button type="submit" onClick={id.deleteFunction}>
            Delete
          </Button>
        </span>
      </Container>
    );
  });
}
export default UploadFiles;
