import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

export default function App() {
  return (
    <MDBFooter backgroundColor="light" className="text-center text-lg-left">
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-dark" href="https://www.winshot.net/">
          https://www.winshot.net/
        </a>
      </div>
    </MDBFooter>
  );
}
