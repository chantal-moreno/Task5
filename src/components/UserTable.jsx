import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef } from 'react';

function UserTable({ users, addErrors, numberValue, loadMoreUsers }) {
  const tableContainerRef = useRef(null);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      loadMoreUsers();
    }
  }, [loadMoreUsers]);

  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    tableContainer.addEventListener('scroll', handleScroll);
    return () => tableContainer.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  return (
    <div
      ref={tableContainerRef}
      style={{ maxHeight: '80vh', overflowY: 'auto' }}
    >
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
              <tr key={user.uuid}>
                <td>{index + 1}</td>
                <td>{user.uuid}</td>
                <td>{modifiedName}</td>
                <td>{modifiedLocation}</td>
                <td>{modifiedPhone}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  addErrors: PropTypes.func.isRequired,
  numberValue: PropTypes.number.isRequired,
  loadMoreUsers: PropTypes.func.isRequired,
};
export default UserTable;
