import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const cadastrarEscrituraFiscal = async (dados) => {
  try {
    const response = await api.post("/EscrituraFiscal/cadastrar", dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar plano de contas:", error);
    throw error; // Lança o erro para ser tratado no componente React
  }
};

export const visualizarEscrituraFiscal = async () => {
  try {
    const response = await api.get("/EscrituraFiscal/visualizar");
    return response.data;
  } catch (error) {
    console.error("Erro ao visualizar planos de contas:", error);
    throw error;
  }
};

export const visualizarEscrituraFiscalporId = async (id) => {
  try {
    const response = await api.get(`/EscrituraFiscal/visualizar/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao visualizar plano de contas:", error);
    throw error;
  }
};

export const atualizarEscrituraFiscal = async (id, dados) => {
  try {
    const response = await api.put(`/EscrituraFiscal/atualizar/${id}`, dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar plano de contas:", error);
    throw error;
  }
};

export const deletarEscrituraFiscal = async (id) => {
  try {
    const response = await api.delete(
      `/EscrituraFiscal/deletar/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar plano de contas:", error);
    throw error;
  }
};

