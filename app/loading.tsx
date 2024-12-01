import React from "react";
import Loader from "./components/Loader";

// export default function loading() {
//     return <div className="fixed top-0 left-0 w-full h-full"></div>;
// }
export default function loading() {
    return (
        <div className="fixed top-0 left-0 w-full h-full grid place-items-center">
            <div className="flex flex-col justify-center items-center">
                <Loader />
                <div>Loading</div>
            </div>
        </div>
    );
}
