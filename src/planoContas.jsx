import React, { useState, useEffect } from "react";
import {
  cadastrarPlanoContas,
  visualizarPlanoContas,
  atualizarPlanoConta,
  deletarPlanoConta,
} from "./components/planoContasService";
import { Button, Modal, Form } from "react-bootstrap";

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
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await visualizarPlanoContas();
        setPlanos(data);
      } catch (error) {
        setFetchError(true);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Erro ao salvar os dados."
      );
      setShowErrorModal(true);
    }
  };

  const handleEdit = (plano) => {
    setDados(plano);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (idPlanoContas) => {
    try {
      await deletarPlanoConta(idPlanoContas);
      const data = await visualizarPlanoContas();
      setPlanos(data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Erro ao deletar o plano de contas.");
      }
      setShowErrorModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setDados({ idPlanoContas: "", CodigoPlano: "", Descricao: "", Tipo: "" });
  };

  const handleErrorModalClose = () => setShowErrorModal(false);

  if (fetchError) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Não foi possível acessar o banco de dados.
        </div>
        <Button variant="primary" /*onClick={() => history.push("/")  } */>
          Ir para a página inicial
        </Button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>Planos de Contas</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Cadastrar Novo Plano
      </Button>
      <ul className="list-group mt-4">
        {planos.map((plano) => (
          <li
            key={plano.idPlanoContas}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {plano.idPlanoContas} // {plano.CodigoPlano} - {plano.Descricao} -{" "}
            {plano.Tipo}
            <div>
              <Button
                variant="warning"
                className="mr-2"
                onClick={() => handleEdit(plano)}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(plano.idPlanoContas)}
              >
                Deletar
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing
              ? "Atualizar Plano de Contas"
              : "Cadastrar Plano de Contas"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCodigoPlano">
              <Form.Label>Código do Plano</Form.Label>
              <Form.Control
                type="text"
                value={dados.CodigoPlano}
                onChange={(e) =>
                  setDados({ ...dados, CodigoPlano: e.target.value })
                }
                placeholder="Digite o código do plano"
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                value={dados.Descricao}
                onChange={(e) =>
                  setDados({ ...dados, Descricao: e.target.value })
                }
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

      <Modal show={showErrorModal} onHide={handleErrorModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Erro</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleErrorModalClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlanoContas;
