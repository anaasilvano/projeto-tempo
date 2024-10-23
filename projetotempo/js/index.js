document.getElementById('searchBtn').addEventListener('click', function() {
    const cidade = document.getElementById('cityInput').value;
    const apiKey = 'd67a852c3a1fb6f278247ae940205072';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Cidade não encontrada');
            }
            return response.json();
        })
        .then(data => {
            const resultadoContainer = document.getElementById('weatherResult');
            resultadoContainer.innerHTML = `<h2>Previsão do Tempo:</h2>`;

            // Mapeamento de ícones do clima (Imagens + SVGs animados)
           // Mapear ícones do clima (Imagens + SVGs animados)
// Mapear ícones do clima (Imagens + SVGs animados)
// Mapear ícones do clima (Imagens + SVGs animados)
const iconesClima = {
    'Clear': {
        img: '../imagens/66294a1b37e52.jpg',
        svg: 'C:/Users/Alunos/Documents/projetotempo/imagens/sunny512x512-01_icon-icons.com_65775.svg' // Caminho correto do SVG animado
    },
    'Clouds': {
        img: '../imagens/nublado.jpg',
        svg: 'C:/Users/Alunos/Documents/projetotempo/imagens/cloudy-havyrain_icon-icons.com_65781.svg' // Caminho correto do SVG animado
    },
    'Rain': {
        img: '../imagens/chuva-hoje-e-amanha.jpg',
        svg: 'C:/Users/Alunos/Documents/projetotempo/imagens/cloudy-havyrain_icon-icons.com_65781.svg' // Caminho correto do SVG animado
    },
    'Snow': {
        img: '../imagens/20020609_composicao.jpg',
        svg: 'C:/Users/Alunos/Documents/projetotempo/imagens/3856404-christmas-cold-snowflake-winter_112776.svg' // Caminho correto do SVG animado
    },
    'Thunderstorm': {
        img: '../imagens/pexels-guiirossi-1686296.jpg',
        svg: 'C:/Users/Alunos/Documents/projetotempo/imagens/thunderstorm-01_icon-icons.com_65779.svg' // Caminho correto do SVG animado
    },
    'Drizzle': {
        img: '../imagens/chuva-hoje-e-amanha.jpg',
        svg: 'C:/Users/Alunos/Documents/projetotempo/imagens/cloudy-havyrain_icon-icons.com_65781.svg' // Caminho correto do SVG animado
    },
    'Mist': {
        img: '../imagens/nublado.jpg',
        svg: 'C:/Users/Alunos/Documents/projetotempo/imagens/cloudy_weather_icon_150660.svg' // Caminho atualizado para o SVG enviado
    },
};



            const diasDaSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

            // Previsão do dia atual
            const dataAtual = new Date();
            const dataFormatadaAtual = `${diasDaSemana[dataAtual.getDay()]}, ${dataAtual.getDate()}/${dataAtual.getMonth() + 1}`;
            const climaAtual = data.list[0].weather[0].main;
            const tempAtual = data.list[0].main.temp;
            const humidityAtual = data.list[0].main.humidity;
            const iconDataAtual = iconesClima[climaAtual] || { img: '../imagens/default.jpg', svg: '../imagens/default.svg' };

            resultadoContainer.innerHTML += `
                <div class="forecast-day">
                    <h3>Hoje: ${dataFormatadaAtual}</h3>
                    <p>Temperatura: ${tempAtual} °C</p>
                    <p>Umidade: ${humidityAtual}%</p>
                    <div class="weather-icons">
                        <img src="${iconDataAtual.img}" alt="Imagem do clima" class="weather-image" />
                        <img src="${iconDataAtual.svg}" alt="Ícone SVG animado do clima" class="weather-svg" />
                    </div>
                </div>
            `;

            // Agrupar dados por dia para os próximos 5 dias
            const dadosPrevisao = {};
            data.list.forEach(item => {
                const dataPrevisao = new Date(item.dt * 1000);
                const diaSemana = diasDaSemana[dataPrevisao.getDay()];
                const dataFormatada = `${diaSemana}, ${dataPrevisao.getDate()}/${dataPrevisao.getMonth() + 1}`;

                if (!dadosPrevisao[dataFormatada]) {
                    dadosPrevisao[dataFormatada] = { temp: 0, humidity: 0, count: 0, descricao: item.weather[0].main };
                }
                dadosPrevisao[dataFormatada].temp += item.main.temp;
                dadosPrevisao[dataFormatada].humidity += item.main.humidity;
                dadosPrevisao[dataFormatada].count++;
            });

            // Calcular a média para cada dia e exibir
            resultadoContainer.innerHTML += `<h2>Previsão para os próximos 5 dias:</h2>`;
            const forecastContainer = document.createElement('div');
            forecastContainer.classList.add('forecast-container');

            for (const data in dadosPrevisao) {
                const tempMedia = (dadosPrevisao[data].temp / dadosPrevisao[data].count).toFixed(1);
                const umidadeMedia = (dadosPrevisao[data].humidity / dadosPrevisao[data].count).toFixed(1);
                const iconData = iconesClima[dadosPrevisao[data].descricao] || { img: '../imagens/default.jpg', svg: '../imagens/default.svg' };

                const forecastDay = document.createElement('div');
                forecastDay.classList.add('forecast-day');
                forecastDay.innerHTML = `
                    <h3>${data}</h3>
                    <p>Temperatura: ${tempMedia} °C</p>
                    <p>Umidade: ${umidadeMedia}%</p>
                    <div class="weather-icons">
                        <img src="${iconData.img}" alt="Imagem do clima" class="weather-image" />
                        <img src="${iconData.svg}" alt="Ícone SVG animado do clima" class="weather-svg" />
                    </div>
                `;

                forecastContainer.appendChild(forecastDay);
            }

            resultadoContainer.appendChild(forecastContainer);
            resultadoContainer.style.display = 'block';
        })
        .catch(error => {
            alert(error.message);
            document.getElementById('weatherResult').style.display = 'none'; // Oculta resultado em caso de erro
        });
});
