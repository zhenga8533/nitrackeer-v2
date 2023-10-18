import React from "react";
import { useEffect, useState } from "react";

export const TopButton = () => {
    const [topButton, setTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100)
                setTopButton(true);
            else
                setTopButton(false);
        })
    }, [])

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavoir: "smooth"
        })
    }

    return (<div>
        { topButton && (
            <button className="top" onClick={ scrollTop }>^</button>
        )}
    </div>);
}
