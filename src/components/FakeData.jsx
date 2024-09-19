import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Table,
} from 'react-bootstrap';
import { useState } from 'react';
function FakeData() {
  const [formData, setFormData] = useState({
    selectedRegion: '0',
    sliderValue: 0,
    numberValue: 0,
    seed: '',
  });

  // Select
  const handleSelectChange = (event) => {
    setFormData({
      ...formData,
      selectedRegion: event.target.value,
    });
  };

  // Slider
  const handleSliderChange = (event) => {
    const sliderValue = event.target.value;
    setFormData({
      ...formData,
      sliderValue: sliderValue,
      numberValue: sliderValue,
    });
  };
  // Number Input
  const handleNumberChange = (event) => {
    const numberValue = event.target.value;
    setFormData({
      ...formData,
      numberValue: numberValue,
    });
    // Update Slider with Number Input
    if (numberValue >= 0 && numberValue <= 1000) {
      setFormData({
        ...formData,
        sliderValue: numberValue / 100,
        numberValue: numberValue,
      });
    }
  };

  // Seed
  const handleSeedChange = (event) => {
    setFormData({
      ...formData,
      seed: event.target.value,
    });
  };
  const generateRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 100000);
    setFormData({
      ...formData,
      seed: randomSeed.toString(),
    });
  };

  return (
    <Container className="d-flex flex-column">
      <Row className="mb-3 mt-5 flex-column flex-md-row">
        <Col xs={12} md={6} lg={3} className="mb-3">
          <InputGroup>
            <InputGroup.Text>Region</InputGroup.Text>
            <Form.Select
              aria-label="Select region"
              value={formData.selectedRegion}
              onChange={handleSelectChange}
            >
              <option value="0">Region 1</option>
              <option value="1">Region 2</option>
              <option value="2">Region 3</option>
            </Form.Select>
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-3">
          <InputGroup>
            <InputGroup.Text>Slider</InputGroup.Text>
            <Form.Control
              type="range"
              min="0"
              max="10"
              value={formData.sliderValue}
              onChange={handleSliderChange}
            />
            <Form.Control
              type="number"
              min="0"
              value={formData.numberValue}
              onChange={handleNumberChange}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-3">
          <InputGroup>
            <InputGroup.Text id="basic-addon1">Seed</InputGroup.Text>
            <Form.Control
              placeholder="Enter seed"
              value={formData.seed}
              onChange={handleSeedChange}
              aria-describedby="basic-addon1"
            />
            <Button variant="warning" onClick={generateRandomSeed}>
              Random
            </Button>
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-3">
          <Button variant="secondary" className="w-100">
            Export
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>Index 1,2,3...</td>
            <td>Random identifier</td>
            <td>Name + middle name + last name</td>
            <td>Address city + street + building + apartment</td>
            <td>Phone +58</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default FakeData;
