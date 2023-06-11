import React, { useRef, useEffect, useState } from 'react';
import StylePanel from './StylePanel';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function PanelGroup() {
  const [randomImages, setRandomImages] = useState([]);
  const panelsRef = useRef([]);
  const [musicaFestival, setmusicaFestival] = useState('');
  const token = localStorage.getItem('token');
  // Decodifica el token para obtener los datos
  const decodedToken = jwt_decode(token);

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        // Peticion a la API
        const userFestivalsResponse = await axios.get(`http://localhost:3001/user_festivals/${decodedToken.user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Creamos un array con los datos de la API
        const userFestivals = userFestivalsResponse.data.festivals;
        console.log(userFestivals[0].tipo_musica);
        // Almacenamos los datos en el estado
        setmusicaFestival(userFestivals[0].tipo_musica);

      } catch (error) {
        console.error(error);
      }
    };

    fetchFestivals();

  }, []);

  useEffect(() => {
    const images = {
      latina: [
        { url: 'https://akamai.sscdn.co/uploadfile/letras/fotos/4/d/e/6/4de6db8b610a2dacb6b4e44af96bd143.jpg', artist: 'Zion', lastName: 'Lennox' },
        { url: 'https://los40es00.epimg.net/los40/imagenes/2022/07/08/videoclips/1657286144_431334_1657287004_noticia_normal_amp.jpg', artist: '', lastName: 'Feid' },
        { url: 'https://los40es00.epimg.net/los40/imagenes/2022/11/14/los40urban/1668421143_312746_1668421299_noticia_normal_amp.jpg', artist: '', lastName: 'Mora' },
        { url: 'https://www.billboard.com/wp-content/uploads/2022/12/Bad-Bunny-Oakland-Californa-2022-billboard-espanol-1548.jpg?w=942&h=623&crop=1' , artist: 'Bad', lastName: 'Bunny' },
        { url: 'https://assets.dev-filo.dift.io/img/2022/03/22/jhay-cortez_2_sq.jpg' , artist: 'Jhay', lastName: 'Cortez' },
        { url: 'https://cdn0.celebritax.com/sites/default/files/styles/watermark_100/public/1647452724-wisin-yandel-dicen-adios-escenarios-duo-dinamico-cierra-20-anos-carrera-ultima-gira.jpg', artist: 'Wisin', lastName: 'Yandel' },
        // Agrega más imágenes de rock si es necesario
      ],
      electronica: [
        { url: 'https://beatdigital.mx/wp-content/uploads/2022/11/martin-garrix.jpg', artist: 'Martin ', lastName:'Garrix' },
        { url: 'https://www.beatportal.com/wp-content/uploads/2021/01/fatima-hajji-aotm-live.jpg',artist: 'Fatima', lastName: 'Hajji' },
        { url: 'http://legaragetv.com/wp-content/uploads/2020/05/Blue-Tiesto.jpg', artist: 'DJ', lastName: 'Tiesto' },
        { url: 'https://www.allfest.es/wp-content/uploads/2022/06/Dj-Nano-A-Summer-Story-1.jpg', artist: 'DJ', lastName: 'Nano' },
        { url: 'https://viciousmagazine.com/wp-content/uploads/2022/06/wade_criterio_03.jpg', artist: 'Dj', lastName: 'Wade' },
        { url: 'https://thumbs.dreamstime.com/b/dj-party-night-club-music-rave-techno-una-fiesta-con-un-tocando-tu-propia-m%C3%BAsica-173366469.jpg', artist: 'Wade', lastName: 'Wadee' },
        // Agrega más URL de imágenes si es necesario
      ],
      pop: [
        { url: 'https://www.pronto.es/files/main_image/uploads/2020/05/08/62aa66a7e26dd.jpeg', artist: 'Andy ', lastName:'Lucas' },
        { url: 'https://img.bekia.es/galeria/24000/24230_lodvg-rock-rio-madrid-2012.jpg',artist: 'Oreja', lastName: 'Vangoh' },
        { url: 'https://images.ecestaticos.com/tD9gQ0UALbcc1KhZ6PF2dqd0yQU=/0x0:2272x1515/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F24f%2Fb52%2F20d%2F24fb5220d0f859bd4c7de442ac61866c.jpg', artist: 'David', lastName: 'Bisbal' },
        { url: 'https://es.rollingstone.com/wp-content/uploads/2022/07/Imagine-Dragons-aun-sabe-como-hacer-retumbar-estadios-y-convertirlos-en-escombros.jpg', artist: ' Imagine', lastName: 'Dragons' },
        { url: 'https://cdn.milenio.com/uploads/media/2016/07/28/katy-perry-interpreto-rise.jpeg', artist: 'Katy', lastName: 'Perry' },
        { url: 'https://imgcuore3.elperiodico.com/1f/d6/21/bruno-mars-gorro-escenario-600.jpg', artist: 'Bruno ', lastName: 'Mars' },
      ]
   
      // Agrega arrays para otros géneros musicales
    };

    const getRandomIndex = (length) => {
      return Math.floor(Math.random() * length);
    };

    const generateRandomImages = (imagesArray, count) => {
      const randomImages = [];

      while (randomImages.length < count) {
        const randomIndex = getRandomIndex(imagesArray.length);
        const randomImage = imagesArray[randomIndex];

        if (!randomImages.includes(randomImage)) {
          randomImages.push(randomImage);
        }
      }

      return randomImages;
    };

    let selectedImages = [];

    if (musicaFestival === 'Electronica') {
      selectedImages = generateRandomImages(images.electronica, 5);
    } else if (musicaFestival === 'Latina') {
      selectedImages = generateRandomImages(images.latina, 5);
    }else if (musicaFestival === 'Pop'){
      selectedImages = generateRandomImages(images.pop, 5);
    }
    // Agrega condiciones para otros géneros musicales

    setRandomImages(selectedImages);
  }, [musicaFestival]);

  function handleClick(index) {
    panelsRef.current[index].classList.toggle('open');
  }

  function handleTransitionEnd(index, e) {
    if (e.propertyName.includes('flex')) {
      panelsRef.current[index].classList.toggle('open-active');
    }
  }

  return (
    <div className="panels" id="panels">
      <style>{StylePanel}</style>
      {randomImages.map((image, index) => (
        <div
          className={`panel panel${index + 1}`}
          key={index}
          ref={(el) => (panelsRef.current[index] = el)}
          onClick={() => handleClick(index)}
          onTransitionEnd={(e) => handleTransitionEnd(index, e)}
          style={{ backgroundImage: `url(${image.url})` }}
        >
          <p className="artist-name">{image.artist}</p>
          <p className="artist-lastname">{image.lastName}</p>
        </div>
      ))}
    </div>
  );
}

export default PanelGroup;
