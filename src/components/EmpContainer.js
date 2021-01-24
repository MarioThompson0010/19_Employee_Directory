import React, { Component } from "react";
import API from "../utils/API";
import EmpName from "./EmpName";
import NameFilter from "./NameFilter";

class EmpContainer extends Component {
    state = {
        originalResult: [],
        result: [],
        search: "",
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

                        handleInputChange={this.handleInputChange}
                        searcher={this.state.search}
                        resulter={this.state.result}
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

                <EmpName
                    theName={this.state.result}>
                </EmpName>
            </div>
        );
    }
}

export default EmpContainer;
