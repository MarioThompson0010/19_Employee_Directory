import React from "react";

function NameFilter(props) {
    return (
        <form>
            <input type="text" placeholder="Filter by name"
                onChange={props.handleInputChange}
                id="searcher">
            </input>
        </form>
    );
}

export default NameFilter;
