import React from "react";
import Link from "./components/Links";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const notify = (msg, type) => toast(msg, { type: type });

  return (
    <div className="container p-4">
      <div className="row">
        <Link notify={notify} />
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
