import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Table,
} from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import seedrandom from 'seedrandom';
import SelectRegion from './SelectRegion';

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

  // Random seed
  const handleSeedChange = (event) => {
    const seed = event.target.value;
    setFormData({
      ...formData,
      seed: seed,
      randomSeed: seedrandom(seed).int32(),
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

  // Errors
  const getRandomIndex = (length) => Math.floor(Math.random() * length);
  const getNonSpaceIndices = (str) => {
    return [...str]
      .map((char, index) => (char !== ' ' ? index : -1))
      .filter((index) => index !== -1);
  };
  // Delete
  const removeRandomCharacter = (str) => {
    const nonSpaceIndices = getNonSpaceIndices(str);
    if (nonSpaceIndices.length === 0) return str;

    const randomIndex = nonSpaceIndices[getRandomIndex(nonSpaceIndices.length)];
    return str.slice(0, randomIndex) + str.slice(randomIndex + 1);
  };
  // Add
  const addRandomCharacter = (str) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomChar = characters.charAt(getRandomIndex(characters.length));
    const randomIndex = getRandomIndex(str.length + 1);
    return str.slice(0, randomIndex) + randomChar + str.slice(randomIndex);
  };
  // Swap
  const swapRandomCharacter = (str) => {
    if (str.length < 2) return str;

    const nonSpaceIndices = getNonSpaceIndices(str);
    const randomIndex = nonSpaceIndices[getRandomIndex(nonSpaceIndices.length)];
    // swap with the previous or next character
    const swapIndex =
      randomIndex === 0
        ? 1 // start, swap with the next one
        : randomIndex === str.length - 1
        ? randomIndex - 1 // end, exchange with the previous one
        : Math.random() < 0.5 // middle, randomly swap with previous or next
        ? randomIndex - 1
        : randomIndex + 1;

    const charArray = [...str];
    // swap
    [charArray[randomIndex], charArray[swapIndex]] = [
      charArray[swapIndex],
      charArray[randomIndex],
    ];

    return charArray.join('');
  };

  // Random error multiple times
  const addErrors = (str, times) => {
    const integerPart = Math.floor(times);
    const fractionalPart = times - integerPart;

    // Select error
    const selectRandomError = () => {
      const errors = [
        removeRandomCharacter,
        addRandomCharacter,
        swapRandomCharacter,
      ];
      return errors[Math.floor(Math.random() * errors.length)];
    };

    let modifiedString = str;

    // Perform the whole number of times
    for (let i = 0; i < integerPart; i++) {
      const operation = selectRandomError();
      modifiedString = operation(modifiedString);
    }

    // Handling the fractional part
    if (Math.random() < fractionalPart) {
      const operation = selectRandomError();
      modifiedString = operation(modifiedString);
    }

    return modifiedString;
  };
  // API
  const fetchRandomUsers = useCallback(async () => {
    try {
      const response = await fetch(
        `https://randomuser.me/api/?page=1&results=20&seed=${formData.randomSeed}&nat=${formData.selectedRegion}&inc=name,location,phone`
      );
      const data = await response.json();
      setUsers(data.results);
    } catch (error) {
      console.error('Error to fetch users:', error);
    }
  }, [formData.selectedRegion, formData.randomSeed]);
  useEffect(() => {
    fetchRandomUsers();
  }, [
    formData.selectedRegion,
    formData.randomSeed,
    formData.seed,
    fetchRandomUsers,
  ]);
  return (
    <Container className="d-flex flex-column">
      <Row className="mb-3 mt-5 flex-column flex-md-row">
        <Col xs={12} md={6} lg={3} className="mb-3">
          <SelectRegion
            selectedRegion={formData.selectedRegion}
            handleSelectChange={handleSelectChange}
          />
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
          {users.map((user, index) => {
            const modifiedName = addErrors(
              `${user.name.first} ${user.name.last}`,
              formData.numberValue
            );
            const modifiedLocation = addErrors(
              `${user.location.state}, ${user.location.city}, ${user.location.street.name}, ${user.location.street.number}`,
              formData.numberValue
            );
            const modifiedPhone = addErrors(user.phone, formData.numberValue);

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{uuidv4()}</td>
                <td>{modifiedName}</td>
                <td>{modifiedLocation}</td>
                <td>{modifiedPhone}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default FakeData;
