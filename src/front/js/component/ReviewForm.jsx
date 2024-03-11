import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Context } from '../store/appContext'; 

const ReviewForm = ({ productId, submitReview }) => {
  const { store } = useContext(Context);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (store.access_token) {
      const username = store.user?.name; 
      submitReview({ username, rating, text });
      setRating(0);
      setText("");
    } else {
      alert("Porfavor Inicia Sesion para dejar Una Review!");
    }
  };

  if (!store.access_token) {
    return <p>Porfavor Inicia Sesion para dejar Una Review!</p>;
  }

  return (
    <Form onSubmit={handleSubmit} className="my-4">
      <FormGroup>
        <Label for="rating">Puntaje</Label>
        <Input
          type="select"
          name="rating"
          id="rating"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          required
          className="mb-3"
        >
          <option value="">Elige un Puntaje para el Producto</option>
          <option value="1">1 Estrella</option>
          <option value="2">2 Estrellas</option>
          <option value="3">3 Estrellas</option>
          <option value="4">4 Estrellas</option>
          <option value="5">5 Estrellas</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="review">Reseña</Label>
        <Input
          type="textarea"
          name="text"
          id="review"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          placeholder="Escribe tu reseña aqui"
          className="mb-3"
        />
      </FormGroup>
      <Button color="primary" type="submit">Enviar Reseña</Button>
    </Form>
  );
};

export default ReviewForm;
