import { Table } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

function UserTable({ users, addErrors, numberValue }) {
  return (
    <Table striped bordered hover>
      <tbody>
        {users.map((user, index) => {
          const modifiedName = addErrors(
            `${user.name.first} ${user.name.last}`,
            numberValue
          );
          const modifiedLocation = addErrors(
            `${user.location.state}, ${user.location.city}, ${user.location.street.name}, ${user.location.street.number}`,
            numberValue
          );
          const modifiedPhone = addErrors(user.phone, numberValue);

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
  );
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  addErrors: PropTypes.func.isRequired,
  numberValue: PropTypes.number.isRequired,
};
export default UserTable;
