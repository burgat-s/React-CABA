import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4 text-center">Iniciar Sesión</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu usuario"
            {...register("username", {
              required: "El usuario es obligatorio",
            })}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "Debe tener al menos 6 caracteres",
              },
            })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Iniciar Sesión
        </Button>
      </Form>
    </Container>
  );
}

