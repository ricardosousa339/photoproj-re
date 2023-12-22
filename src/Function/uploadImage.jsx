// Função para enviar uma imagem para o servidor usando axios
import { API_BASE_URL } from "./apiConfig";
import axios from "axios";
import Cookies from 'js-cookie';

async function uploadImage(file) {
  // Criar um objeto FormData e adicionar o arquivo de imagem
  const formData = new FormData();
  formData.append('image', file);

  // Definir a URL da API e o token de acesso

  const accessToken = Cookies.get('access_token');

  // Tentar fazer uma requisição POST com o formData e o token de autorização
  try {
    const response = await axios.post(`${API_BASE_URL}/api/photo/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${accessToken}`,
      },
    });
    // Verificar se a resposta tem o status 200 (sucesso)
    if (response.status === 200) {
      console.log('Upload bem-sucedido');
    } else {
      console.log('Falha no upload');
    }
  } catch (error) {
    // Capturar e mostrar qualquer erro que ocorra
    console.error('Error:', error);
  }
}

// Exportar a função como exportação padrão
export default uploadImage;
