import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const cadastrarMovimentoContabil = async (dados) => {
  try {
    const response = await api.post("/MovimentoContabil/cadastrar", dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar plano de contas:", error);
    throw error; // Lança o erro para ser tratado no componente React
  }
};

export const visualizarMovimentoContabil = async () => {
  try {
    const response = await api.get("/MovimentoContabil/visualizar");
    return response.data;
  } catch (error) {
    console.error("Erro ao visualizar planos de contas:", error);
    throw error;
  }
};

export const visualizarMovimentoContabilporId = async (id) => {
  try {
    const response = await api.get(`/MovimentoContabil/visualizar/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao visualizar plano de contas:", error);
    throw error;
  }
};

export const atualizarMovimentoContabil = async (id, dados) => {
  try {
    const response = await api.put(`/MovimentoContabil/atualizar/${id}`, dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar plano de contas:", error);
    throw error;
  }
};

export const deletarMovimentoContabil = async (id) => {
  try {
    const response = await api.delete(
      `/MovimentoContabil/deletar/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar plano de contas:", error);
    throw error;
  }
};

