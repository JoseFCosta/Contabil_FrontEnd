import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const cadastrarITEM_ORDEM_DE_COMPRAR = async (dados) => {
  try {
    const response = await api.post('/ITEM_ORDEM_DE_COMPRAR/cadastrar', dados);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar plano de contas:', error);
    throw error; // Lança o erro para ser tratado no componente React
  }
};

export const visualizarItemOrdemComprar = async () => {
  try {
    const response = await api.get('/ITEM_ORDEM_DE_COMPRAR/visualizar');
    return response.data;
  } catch (error) {
    console.error('Erro ao visualizar planos de contas:', error);
    throw error;
  }
};

export const visualizarITEM_ORDEM_DE_COMPRARporId = async (id) => {
  try {
    const response = await api.get(`/ITEM_ORDEM_DE_COMPRAR/visualizar/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao visualizar plano de contas:', error);
    throw error;
  }
};

export const atualizarITEM_ORDEM_DE_COMPRAR = async (id, dados) => {
  try {
    const response = await api.put(`/ITEM_ORDEM_DE_COMPRAR/atualizar/${id}`, dados);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar plano de contas:', error);
    throw error;
  }
};

export const deletarITEM_ORDEM_DE_COMPRAR = async (id) => {
  try {
    const response = await api.delete(`/ITEM_ORDEM_DE_COMPRAR/deletar/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar plano de contas:', error);
    throw error;
  }
};
