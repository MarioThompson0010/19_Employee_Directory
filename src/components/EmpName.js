import React from "react";

// This returns both name AND age
function EmpName(props) {
    return (
        <div className="row">
            <div className="col col-md-6">
                {props.theName.map((emp) => (
                    <React.Fragment key={emp.dob.date + emp.id.value}>
                        <p> { emp.name.first + " " + emp.name.last} </p>
                        <hr />
                    </React.Fragment>
                ))}
            </div>

            <div className="col col-md-6">
                {
                    props.theName.map(element => (
                        <React.Fragment key={element.dob.date + element.id.value}>
                            <p>{element.dob.age} </p>
                            <hr />
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    );
}

export default EmpName;
