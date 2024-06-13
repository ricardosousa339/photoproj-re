

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [temFotoNova, setTemFotoNova] = useState(false);
  const [fotoADeletar, setFotoADeletar] = useState(null);

  const access_token = getAccessToken();


  if (!access_token) {
    // Redirecionar para a página de login se o token de acesso não estiver definido
    window.location.href = 'login';
  }

  //axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;
  const fetchPhotos = async (accessToken = access_token) => {

    try {
      const response = await axios.get(`${API_BASE_URL}api/photo/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );


      setPhotos(response.data)
      setTemFotoNova(false)

    }
    catch (error) {
      console.error(error, "://///////");
      const response = await axios.get(`${API_BASE_URL}api/photo/`,{
        headers: {
          Authorization: `Bearer ${refreshAccessToken()}`
        }
      });

      setPhotos(response.data);
      setTemFotoNova(false)
    }

  }

  const deletePhoto = async (photoId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/photo/${photoId}/delete_photo/`);
      console.log('Foto deletada com sucesso\n', response);
      setFotoADeletar(null)
    } catch (error) {
      console.error('Erro ao deletar a foto', error);
    }
  };


  useEffect(() => {
    fetchPhotos();

  }, [temFotoNova]);


  useEffect(() => {
    if (fotoADeletar)
      deletePhoto(fotoADeletar);

    console.log(fotoADeletar);

  }, [fotoADeletar])


  return (
    <div className='pagina'>
      <div className='photo-grid'>
        {photos.map((photo, index) => (

          <div key={index} className='photo-item'>
            {fotoADeletar == photo.id ? <div className='loader-container'><span className="loader"></span></div> :
              <div className='imagem' src={photo.imagem} style={{ backgroundColor: photo.main_color }}>

                <img className='miniatura' src={photo.imagem} alt={photo.titulo} />
              </div>
            }
            <div className='containerBotaoDeletar' >
              <button className='botao button-deletar' onClick={() => setFotoADeletar(photo.id)}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
          </div>
        ))}
        {temFotoNova && <div className='loader-container'><span className="loader"></span></div>}
      </div>

      <UploadForm temFotoNova={temFotoNova} setTemFotoNova={setTemFotoNova} />
    </div>
  );

}

export default Gallery;
