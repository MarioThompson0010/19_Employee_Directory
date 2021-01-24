import React, { Component } from "react";
import API from "../utils/API";
import EmpName from "./EmpName";
import NameFilter from "./NameFilter";

// this class is sort of the mother class. It controls the other components.
class EmpContainer extends Component {
    state = {
        originalResult: [],
        result: [],
        sortAscend: false
    };

    handleInputChange = event => {
        event.preventDefault();
        const emps = this.filterEmp(event.target.value);
    };

    // When this component mounts, search for employees
    componentDidMount() {
        this.searchEmployees();
    }

    // sort empoloyees
    sortEmp = (event) => {

        if (!this.state.sortAscend) {
            this.state.result.sort(function compareNumbers(a, b) {
                return a.dob.age - b.dob.age;
            });
        }
        else {
            this.state.result.sort(function compareNumbers(a, b) {
                return b.dob.age - a.dob.age;
            });
        }

        this.setState({ sortAscend: !this.state.sortAscend });
        this.setState({ result: this.state.result });
    }

    // filter employees
    filterEmp = (name) => {
        const emps = this.state.originalResult.filter(emp => {
            let nameEmp = emp.name.first + " " + emp.name.last;

            nameEmp = nameEmp.toUpperCase();
            const incl = nameEmp.includes(name.toUpperCase());
            return incl;
        });

        this.setState({ result: emps });
        return emps;
    };

    // grab employees from website and populate the list
    searchEmployees = () => {
        API.search()
            .then(res => this.setState({
                originalResult: res.data.results
            }))
            .then(() => (
                this.setState({
                    result: this.state.originalResult
                })
            ))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <NameFilter

                        handleInputChange={this.handleInputChange} // onChange, or key press
                    >
                    </NameFilter>
                </div>
                <div className="row">
                    <div className="col col-md-6">
                        <h3>Name</h3>
                    </div>
                    <div className="col col-md-6">
                        <button onClick={this.sortEmp} className="btn btn-success">Age (click to sort)</button>
                    </div>
                </div>
               {/* populate the name and age columns */}
                <EmpName
                    theName={this.state.result}>
                </EmpName>
            </div>
        );
    }
}

export default EmpContainer;
