import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getFromApi } from "../../utils";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setusers] = useState([]);

  const getUsers = async () => {
    const response = await getFromApi(`http://192.168.8.153:3400/api/users`);
    if (response) setusers(response);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <h1>Users</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <th>
                        {user.first_name} {user.last_name}
                      </th>
                      <th>{user.email}</th>
                      <th>{user.role}</th>
                      <th>
                        <button className="btn btn-sm btn-outline-success">
                          edit
                        </button>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
}
