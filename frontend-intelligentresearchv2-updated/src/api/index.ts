import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Verifica se o erro é 401 e se a requisição não é para a rota de refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Tenta obter um novo accessToken
        const refreshResponse = await api.post('/auth/refresh');
        
        if (refreshResponse.status === 200) {
          // Atualiza o token no originalRequest e tenta novamente
          axios.defaults.headers.common['Authorization'] = `Bearer ${refreshResponse.data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Se o refresh falhar, redireciona para o login ou toma outra ação
        console.error('Refresh token failed:', refreshError);
        // Redirecionar para login ou mostrar mensagem de erro
      }
    }

    // Se não for um erro de autenticação, rejeita a promessa
    return Promise.reject(error);
  }
);
