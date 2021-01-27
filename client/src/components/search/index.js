import React from "react";
import { MDBCol } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.css';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from 'react-bootstrap'

export class Search extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            value: '',
        };
    }

    populateFilteredResults = async (event) => {
        event.preventDefault()
        const response = await fetch(`http://localhost:8081/filter?q=${this.state.value}`);
        const results = await response.json();
        if (response.status !== 200) throw Error(results.message);
        this.props.onSearch(results)
    };

    onChange = (event) => {
        this.state.value = event.target.value
    }

    render() {
        const style = {
            margin: "0 auto"
        }
        return (
            <MDBCol md="6" className="search" style={style}>
                <Form onSubmit={this.populateFilteredResults}>
                    <div className="input-group md-form form-sm form-1 pl-0">
                        <div className="input-group-prepend">
                            <span className="input-group-text purple lighten-3" id="basic-text1">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </div>
                        <Form.Control 
                            type="text"
                            placeholder="search for"
                            className="form-control my-0 py-1" 
                            aria-label="Search"
                            onChange={this.onChange}
                        />
                    </div>
                    <button variant="primary" type="submit">
                        Search
                    </button>
                </Form>
            </MDBCol>
        )
    }
}