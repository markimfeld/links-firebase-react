import React, { useState, useEffect } from "react";
import db from "../firebase";

const LinksForm = ({ addOrEditLink, currentLinkId, links, notify }) => {
  const initValues = {
    url: "",
    name: "",
    description: "",
  };

  const [values, setValues] = useState({ ...initValues });

  const validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validURL(values.url)) {
      return notify("Invalid URL, try again!", "warning", 1000);
    }

    addOrEditLink(values);
    setValues({ ...initValues });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("links").doc(id).get();
    setValues({ ...doc.data() });
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

      <button className="btn btn-primary btn-block">
        {currentLinkId === "" ? "Save" : "Update"}
      </button>
    </form>
  );
};

export default LinksForm;
