import React, { useState, useEffect } from "react";
import {
  cadastrarPlanoContas,
  visualizarPlanoContas,
  atualizarPlanoConta,
  deletarPlanoConta,
} from "./components/planoContasService";
import { Form, Button, Modal } from "react-bootstrap";
import "./planoContas.css"

const PlanoContas = () => {
  const [planos, setPlanos] = useState([]);
  const [dados, setDados] = useState({
    idPlanoContas: "",
    CodigoPlano: "",
    Descricao: "",
    Tipo: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await visualizarPlanoContas();
      setPlanos(data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await atualizarPlanoConta(dados.idPlanoContas, {
        CodigoPlano: dados.CodigoPlano,
        Descricao: dados.Descricao,
        Tipo: dados.Tipo,
      });
    } else {
      await cadastrarPlanoContas({
        CodigoPlano: dados.CodigoPlano,
        Descricao: dados.Descricao,
        Tipo: dados.Tipo,
      });
    }
    const data = await visualizarPlanoContas();
    setPlanos(data);
    setDados({ idPlanoContas: "", CodigoPlano: "", Descricao: "", Tipo: "" });
    setIsEditing(false);
    setShowModal(false);
  };

  const handleEdit = (plano) => {
    setDados(plano);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (idPlanoContas) => {
    await deletarPlanoConta(idPlanoContas);
    const data = await visualizarPlanoContas();
    setPlanos(data);
  };

  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setDados({ idPlanoContas: "", CodigoPlano: "", Descricao: "", Tipo: "" });
  };

  return (
    <div className="container mt-5">
      <h1>Planos de Contas</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Cadastrar Novo Plano
      </Button>
      <ul className="list-group mt-4">
        {planos.map((plano) => (
          <li key={plano.idPlanoContas} className="list-group-item d-flex justify-content-between align-items-center">
            {plano.idPlanoContas} // {plano.CodigoPlano} - {plano.Descricao} - {plano.Tipo}
            <div>
              <Button variant="warning" className="mr-2" onClick={() => handleEdit(plano)}>Editar</Button>
              <Button variant="danger" onClick={() => handleDelete(plano.idPlanoContas)}>Deletar</Button>
            </div>
          </li>
        ))}
      </ul>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Atualizar Plano de Contas" : "Cadastrar Plano de Contas"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCodigoPlano">
              <Form.Label>Código do Plano</Form.Label>
              <Form.Control
                type="text"
                value={dados.CodigoPlano}
                onChange={(e) => setDados({ ...dados, CodigoPlano: e.target.value })}
                placeholder="Digite o código do plano"
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                value={dados.Descricao}
                onChange={(e) => setDados({ ...dados, Descricao: e.target.value })}
                placeholder="Digite a descrição"
                required
              />
            </Form.Group>
            <Form.Group controlId="formTipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                value={dados.Tipo}
                onChange={(e) => setDados({ ...dados, Tipo: e.target.value })}
                placeholder="Digite o tipo"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditing ? "Atualizar" : "Cadastrar"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PlanoContas;
