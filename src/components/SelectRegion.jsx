import { InputGroup, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function SelectRegion({ selectedRegion, handleSelectChange }) {
  return (
    <InputGroup>
      <InputGroup.Text>Region</InputGroup.Text>
      <Form.Select value={selectedRegion} onChange={handleSelectChange}>
        <option value="mx">Mexico</option>
        <option value="rs">Russia</option>
        <option value="us">United States</option>
        <option value="fr">France</option>
        <option value="nz">New Zealand</option>
      </Form.Select>
    </InputGroup>
  );
}
SelectRegion.propTypes = {
  selectedRegion: PropTypes.string.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
};
export default SelectRegion;
