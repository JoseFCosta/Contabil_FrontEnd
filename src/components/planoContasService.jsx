import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const cadastrarPlanoContas = async (dados) => {
  try {
    const response = await api.post('/PlanoContas/cadastrar', dados);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar plano de contas:', error);
  }
};

export const visualizarPlanoContas = async () => {
  try {
    const response = await api.get('/PlanoContas/visualizar');
    console.log("Visualização carregada")
    return response.data;
  } catch (error) {
    console.error('Erro ao visualizar planos de contas:', error);
  }
};

export const visualizarPlanoConta = async (id) => {
  try {
    const response = await api.get(`/PlanoContas/visualizar/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao visualizar plano de contas:', error);
  }
};

export const atualizarPlanoConta = async (id, dados) => {
  try {
    const response = await api.put(`/PlanoContas/atualizar/${id}`, dados);
    console.log("Atualização Realizada com sucesso")
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar plano de contas:', error);
  }
};

export const deletarPlanoConta = async (id) => {
  try {
    const response = await api.delete(`/PlanoContas/deletar/${id}`);
    console.log("Parabens, você conseguiu deletar :))")
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar plano de contas:', error);
  }
};
