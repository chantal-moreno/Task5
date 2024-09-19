import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Table,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import seedrandom from 'seedrandom';

function FakeData() {
  const [formData, setFormData] = useState({
    selectedRegion: 'mx',
    sliderValue: 0,
    numberValue: 0,
    seed: '808',
    randomSeed: seedrandom('808').int32(),
  });
  const [users, setUsers] = useState([]);

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

  // Randomseed
  const handleSeedChange = (event) => {
    setFormData({
      ...formData,
      seed: event.target.value,
    });
  };
  const generateRandomSeed = () => {
    const seed = Math.floor(Math.random() * 100000).toString();
    const rng = seedrandom(seed);
    setFormData({
      ...formData,
      seed: seed,
      randomSeed: rng.int32(),
    });
  };

  // API
  const fetchRandomUsers = async () => {
    try {
      const response = await fetch(
        `https://randomuser.me/api/?page=1&results=20&seed=${formData.seed}&nat=${formData.selectedRegion}&inc=name,location,phone`
      );
      const data = await response.json();
      setUsers(data.results);
    } catch (error) {
      console.error('Error to fetch users:', error);
    }
  };
  useEffect(() => {
    fetchRandomUsers();
  }, [formData.selectedRegion, formData.randomSeed, formData.seed]);

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
              <option value="mx">Mexico</option>
              <option value="rs">Russia</option>
              <option value="us">United States</option>
              <option value="fr">France</option>
              <option value="nz">New Zealand</option>
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
              <i className="bi bi-shuffle"></i>
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
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{uuidv4()}</td>
              <td>{`${user.name.first} ${user.name.last}`}</td>
              <td>{`${user.location.state}, ${user.location.city}, ${user.location.street.name}, ${user.location.street.number}`}</td>
              <td>{`${user.phone}`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default FakeData;
