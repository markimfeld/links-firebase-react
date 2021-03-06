import React, { useEffect, useState } from "react";
import LinksForm from "./LinksForm";
import db from "../firebase";

const Link = ({ notify }) => {
  const [links, setLinks] = useState([]);
  const [currentLinkId, setCurrentLinkId] = useState("");

  const getLinks = async () => {
    await db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setLinks(docs);
    });
  };

  const addOrEditLink = async (linkObject) => {
    try {
      if (currentLinkId === "") {
        await db.collection("links").doc().set(linkObject);
        notify("Link created successfully.", "success", 2000);
      } else {
        await db.collection("links").doc(currentLinkId).update(linkObject);
        notify("Link updated successfully.", "info", 2000);
        setCurrentLinkId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteLink = async (id) => {
    let yes = window.confirm("Are you sure to delete?");

    if (yes) {
      await db.collection("links").doc(id).delete();
      notify("Deleted successfully.", "error", 2000);
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <div className="col-md-4 p-2">
        <LinksForm {...{ addOrEditLink, currentLinkId, links, notify }} />
      </div>
      <div className="col-md-8 p-2">
        {links.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i
                    onClick={() => onDeleteLink(link.id)}
                    className="material-icons text-danger"
                  >
                    close
                  </i>
                  <i
                    onClick={() => setCurrentLinkId(link.id)}
                    className="material-icons"
                  >
                    create
                  </i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                Go to Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Link;
