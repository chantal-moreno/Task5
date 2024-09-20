import { InputGroup, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Seed({ seed, handleSeedChange, generateRandomSeed }) {
  return (
    <InputGroup>
      <InputGroup.Text>Seed</InputGroup.Text>
      <Form.Control
        placeholder="Enter seed"
        value={seed}
        onChange={handleSeedChange}
      />
      <Button variant="warning" onClick={generateRandomSeed}>
        <i className="bi bi-shuffle"></i>
      </Button>
    </InputGroup>
  );
}

Seed.propTypes = {
  seed: PropTypes.string.isRequired,
  handleSeedChange: PropTypes.func.isRequired,
  generateRandomSeed: PropTypes.func.isRequired,
};
export default Seed;
