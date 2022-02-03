import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Footer() {
    return (
        <div>
            <header
                className="bg-blue-400  p-2 items-center flex justify-around  "
                style={{ position: "fixed", bottom: "0", width: "100%" }}
            >
                <h1>2022 © MiBrary</h1>
            </header>
        </div>
    );
}

export default Footer;
