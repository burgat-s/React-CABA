import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  Container,
  Image,
  Spinner,
} from "react-bootstrap";
import Swal from "sweetalert2";
import SwalReact from "sweetalert2-react-content";

const MySwal = SwalReact(Swal);
const apiUrl = import.meta.env.VITE_API_URL;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    password: "",
    admin: false,
    avatar: "",
  });
  const [loading, setLoading] = useState(true);

  // Cargar usuarios
  const fetchUsers = async () => {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar usuarios", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await MySwal.fire({
      title: "¿Eliminar usuario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
    });

    if (confirm.isConfirmed) {
      await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u.id !== id));
      MySwal.fire("Eliminado", "Usuario eliminado correctamente", "success");
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditedUser({ ...user });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedUser({});
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${apiUrl}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedUser),
      });

      if (!res.ok) throw new Error("Error al guardar");

      setUsers((prev) =>
        prev.map((u) => (u.id === editingId ? editedUser : u))
      );
      setEditingId(null);
      MySwal.fire(
        "Actualizado",
        "Usuario actualizado correctamente",
        "success"
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e, isNew = false) => {
    const { name, value, type, checked } = e.target;
    const updater = isNew ? setNewUser : setEditedUser;
    const data = isNew ? newUser : editedUser;

    updater({ ...data, [name]: type === "checkbox" ? checked : value });
  };

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.password) {
      MySwal.fire(
        "Campos obligatorios",
        "Usuario y contraseña son obligatorios",
        "warning"
      );
      return;
    }

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const createdUser = await res.json();
      setUsers((prev) => [...prev, createdUser]);
      setNewUser({
        name: "",
        username: "",
        password: "",
        admin: false,
        avatar: "",
      });

      MySwal.fire("Agregado", "Usuario creado correctamente", "success");
    } catch (err) {
      console.error(err);
      MySwal.fire("Error", "No se pudo crear el usuario", "error");
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Gestión de Usuarios</h3>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Contraseña</th>
              <th>Admin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No hay usuarios.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.avatar !== "avatar" ? (
                      <Image
                        src={user.avatar}
                        roundedCircle
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "Sin avatar"
                    )}
                  </td>
                  <td>
                    {editingId === user.id ? (
                      <Form.Control
                        name="name"
                        value={editedUser.name}
                        onChange={handleChange}
                        size="sm"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {editingId === user.id ? (
                      <Form.Control
                        name="username"
                        value={editedUser.username}
                        onChange={handleChange}
                        size="sm"
                      />
                    ) : (
                      user.username
                    )}
                  </td>
                  <td>
                    {editingId === user.id ? (
                      <Form.Control
                        name="password"
                        value={editedUser.password}
                        onChange={handleChange}
                        size="sm"
                      />
                    ) : (
                      user.password
                    )}
                  </td>
                  <td className="text-center">
                    {editingId === user.id ? (
                      <Form.Check
                        name="admin"
                        checked={editedUser.admin}
                        onChange={handleChange}
                      />
                    ) : user.admin ? (
                      "✅"
                    ) : (
                      "❌"
                    )}
                  </td>
                  <td>
                    {editingId === user.id ? (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={handleSave}
                          className="me-2"
                        >
                          Guardar
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={handleCancel}
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(user)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                        >
                          Borrar
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}

            {/* Fila para agregar nuevo usuario */}
            <tr>
              <td>
                <Form.Control
                  name="avatar"
                  placeholder="URL"
                  value={newUser.avatar}
                  onChange={(e) => handleChange(e, true)}
                  size="sm"
                />
              </td>
              <td>
                <Form.Control
                  name="name"
                  placeholder="Nombre"
                  value={newUser.name}
                  onChange={(e) => handleChange(e, true)}
                  size="sm"
                />
              </td>
              <td>
                <Form.Control
                  name="username"
                  placeholder="Usuario *"
                  value={newUser.username}
                  onChange={(e) => handleChange(e, true)}
                  size="sm"
                />
              </td>
              <td>
                <Form.Control
                  name="password"
                  placeholder="Contraseña *"
                  value={newUser.password}
                  onChange={(e) => handleChange(e, true)}
                  size="sm"
                />
              </td>
              <td className="text-center">
                <Form.Check
                  type="checkbox"
                  checked={newUser.admin}
                  onChange={(e) => handleChange(e, true)}
                />
              </td>
              <td>
                <Button variant="primary" size="sm" onClick={handleAddUser}>
                  Agregar
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserList;

