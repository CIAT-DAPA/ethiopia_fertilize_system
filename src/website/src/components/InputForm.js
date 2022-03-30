import React, {useState, useEffect} from "react";
import { Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl, Alert, Stack, Container} from "react-bootstrap";

const InputForm = () => {

    const crops = ["maize", "sorghum", "wheat"];
    const objectives = ["performance", "economical"];
    const years = ["2022", "2021", "2020", "2019", "2018", "2017"];

    const initialFormValues = {
        crop: null,
        objective: null,
        year: null
    }

    const [formValues, setFormValues] = useState(initialFormValues);

    return(
        <Stack direction="horizontal" gap={3} key="Stackform" className="mt-4">
            <FloatingLabel controlId="floatingSelectInitialMonth" label="Crop">
                <Form.Select 
                    aria-label="Default select example"
                    onChange={e => setFormValues({ ...formValues, crop: e.target.value })}
                    key="Cropselect"
                    size="sm"
                    >
                        <option>Select a crop</option>
                    {
                        crops.map(crop => 
                            <option value="1">{crop}</option>
                        )
                    }
                
                </Form.Select>
            </FloatingLabel>

            <FloatingLabel controlId="floatingSelectInitialMonth" label="Objective">
                <Form.Select 
                    aria-label="Default select example"
                    onChange={e => setFormValues({ ...formValues, objective: e.target.value })}
                    key="Objselect"
                    size="sm"
                    >
                    <option>Select the objective</option>
                    {
                        objectives.map(obj => 
                            <option value="1">{obj}</option>
                        )
                    }
                </Form.Select>
            </FloatingLabel>

            <FloatingLabel controlId="floatingSelectInitialMonth" label="Year">
                <Form.Select 
                    aria-label="Default select example"
                    onChange={e => setFormValues({ ...formValues, year: e.target.value })}
                    key="Yearselect"
                    size="sm"
                >
                    <option>Select a year</option>
                    {
                        years.map(year => 
                            <option value="1">{year}</option>
                        )
                    }
                </Form.Select>
            </FloatingLabel>

        </Stack>

    );
}
export default InputForm;