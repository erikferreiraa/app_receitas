import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  timeout: 15000,
});

// Lista receitas. A busca com texto vazio retorna várias receitas;
// se vier vazia, usa a busca pela letra "a" como alternativa.
export async function buscarReceitas() {
  const { data } = await api.get('/search.php', { params: { s: '' } });
  if (data && Array.isArray(data.meals) && data.meals.length > 0) {
    return data.meals;
  }
  const fallback = await api.get('/search.php', { params: { f: 'a' } });
  return fallback.data?.meals ?? [];
}

export default api;
