import { InputGroup, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function SliderError({
  sliderValue,
  numberValue,
  handleSliderChange,
  handleNumberChange,
}) {
  return (
    <InputGroup>
      <InputGroup.Text>Errors</InputGroup.Text>
      <Form.Control
        type="range"
        min="0"
        max="10"
        value={sliderValue}
        onChange={handleSliderChange}
      />
      <Form.Control
        type="number"
        min="0"
        value={numberValue}
        onChange={handleNumberChange}
      />
    </InputGroup>
  );
}

SliderError.propTypes = {
  sliderValue: PropTypes.number.isRequired,
  numberValue: PropTypes.number.isRequired,
  handleSliderChange: PropTypes.func.isRequired,
  handleNumberChange: PropTypes.func.isRequired,
};
export default SliderError;
