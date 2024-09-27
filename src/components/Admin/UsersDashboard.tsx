import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../state/user/userActions";
import { Link, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import axios from "axios";
import * as settings from "../../settings";
import getHeaders from "../../hooks/getHeaders";
import { RootState } from "@/state/store";

export const UsersDashboard = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const admin = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers()(dispatch);
  }, []);

  const handleSwitch = async (id: number) => {
    await axios.put(`${settings.axiosURL}/users/${id}`, {}, getHeaders());
    fetchUsers()(dispatch);
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
                        user.id && handleSwitch(user.id);
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
