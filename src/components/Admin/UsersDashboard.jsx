import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../state/user/userActions";
import { Link, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import axios from "axios";
import * as settings from "../../settings";

export const UsersDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const admin = useSelector((state) => state.user.userData);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSwitch = async (id) => {
    await axios.put(`${settings.axiosURL}/admin/users/${id}`);
    dispatch(fetchUsers());
  };

  return (
    <div>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Privileges</Th>
          </Tr>
        </Thead>

        <Tbody>
          {users.map((user) => {
            return (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>
                  {user.is_admin ? "Admin " : "User "}
                  {admin.id != user.id && (
                    <Link
                      onClick={() => {
                        handleSwitch(user.id);
                      }}
                      fontSize="xs"
                    >
                      (Switch)
                    </Link>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
};
