import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
})

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

// Interceptor para lidar com respostas de erro
api.interceptors.response.use(
  (response) => response, // Retorna a resposta normalmente se não houver erro
  async (error) => {
    const originalRequest = error.config;

    // Verifica se o erro é 401 e a requisição não é para a rota de refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Se já houver um refresh em andamento, adiciona a requisição à fila
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        // Faz a requisição para o refresh token
        const refreshResponse = await api.post('/auth/refresh');

        if (refreshResponse.status === 200) {
          // Após o refresh, todas as requisições na fila são executadas
          processQueue(null);

          return api(originalRequest);
        }
      } catch (refreshError) {
        // Se o refresh falhar, rejeita as requisições na fila
        processQueue(refreshError, null);

        // Redireciona para a página de login ou toma outra ação apropriada
        console.error('Refresh token failed:', refreshError);
        // window.location.href = '/login'; // Redireciona para login, se necessário

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
