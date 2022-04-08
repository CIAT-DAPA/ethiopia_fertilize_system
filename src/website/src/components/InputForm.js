import React, {useState, useEffect} from "react";
import { Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl, Alert, Stack, Container} from "react-bootstrap";

const crops = ["maize", "sorghum", "wheat"];
const objectives = ["performance", "economical"];
const years = ["2022", "2021", "2020", "2019", "2018", "2017"];

const initialFormValues = {
    crop: "",
    objective: "",
    year: ""
}
const InputForm = () => {


    const [formValues, setFormValues] = useState(initialFormValues);

    useEffect(() => {
        console.log(formValues);
    }, [formValues]);

    const handleSend = (e) => {

        return(formValues["crop"]+"_"+formValues["objective"])

    }

    return(
        <>
        <h6 className="mt-4">Selects a crop, objective and a year </h6>
        <Stack direction="horizontal" gap={4} className="mt-2">
            
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
                            <option value= {crop}>{crop}</option>
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
                            <option value={obj}>{obj}</option>
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
                            <option value={year}>{year}</option>
                        )
                    }
                </Form.Select>
            </FloatingLabel>
            <Button 
                variant="secondary" 
                id="button-addon1"
                // onClick={() => handleSearch()}
                size="lg"        
                >
                    Send
            </Button>

        </Stack>
        </>

    );
}
export default InputForm;