import React, { useState, useEffect } from "react";
import db from "../firebase";

const LinksForm = ({ addOrEditLink, currentLinkId, links }) => {
  const initValues = {
    url: "",
    name: "",
    description: "",
  };

  const [values, setValues] = useState({ ...initValues });

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEditLink(values);
    setValues({ ...initValues });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("links").doc(id).get();
    console.log(doc.data());
  };

  useEffect(() => {
    if (currentLinkId === "") {
      setValues({ ...initValues });
    } else {
      getLinkById(currentLinkId);
    }
  }, [currentLinkId]);

  return (
    <form onSubmit={handleSubmit} className="card card-body border-primary">
      <div className="form-group input-group mb-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="https://someurl.xyz"
          value={values.url}
          name="url"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group mb-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          value={values.name}
          name="name"
          placeholder="Website Name"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group mb-2">
        <textarea
          rows="3"
          className="form-control"
          placeholder="Write a Description"
          name="description"
          value={values.description}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <button className="btn btn-primary btn-block">Save</button>
    </form>
  );
};

export default LinksForm;
