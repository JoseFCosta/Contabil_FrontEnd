import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const cadastrarItens_da_Venda = async (dados) => {
  try {
    const response = await api.post("/Itens_da_Venda/cadastrar", dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar plano de contas:", error);
    throw error; // Lança o erro para ser tratado no componente React
  }
};

export const visualizarItensVenda = async () => {
  try {
    const response = await api.get("/Itens_da_Venda/visualizar");
    return response.data;
  } catch (error) {
    console.error("Erro ao visualizar planos de contas:", error);
    throw error;
  }
};

export const visualizarItens_da_VendaporId = async (id) => {
  try {
    const response = await api.get(`/Itens_da_Venda/visualizar/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao visualizar plano de contas:", error);
    throw error;
  }
};

export const atualizarItens_da_Venda = async (id, dados) => {
  try {
    const response = await api.put(`/Itens_da_Venda/atualizar/${id}`, dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar plano de contas:", error);
    throw error;
  }
};

export const deletarItens_da_Venda = async (id) => {
  try {
    const response = await api.delete(
      `/Itens_da_Venda/deletar/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar plano de contas:", error);
    throw error;
  }
};

