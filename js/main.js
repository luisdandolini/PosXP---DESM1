function getData(countryInput, dateInput) {
  try {
    const country = countryInput.value;
    const date = dateInput.value;

    if (!country || !date) {
      console.error('Por favor, preencha todos os campos.');
      return;
    }

    const apiUrl = `https://covid-api.com/api/reports/total?date=${date}&iso=${country}`;
    axios.get(apiUrl)
      .then(response => {
        console.log(response)
        handleApiResponse(response.data);
      })
      .catch(error => {
        handleError(error);
      });
  } catch (error) {
    handleError(error);
  }
}

function handleApiResponse(data) {
  if (data && data.data) {
    console.log(data);
    displayData(data.data);
  } else {
    console.error('Resposta da API malformatada:', data);
  }
}

function handleError(error) {
  console.error('Erro ao obter dados da API:', error.message);
}

function displayData(data) {
  const resultElement = document.getElementById('result');

  const ctx = document.createElement('canvas').getContext('2d');
  resultElement.innerHTML = '';
  resultElement.appendChild(ctx.canvas);

  const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Casos confirmados', 'Mortes', 'Recuperados'],
      datasets: [{
        label: 'Estatísticas da COVID-19',
        data: [data.confirmed, data.deaths, data.recovered],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      },
      legend: {
        display: true,
        position: 'right', // Ajusta a posição da legenda
        labels: {
          boxWidth: 12, // Ajusta a largura da caixa da legenda
        },
      },
    },
  });
  
}
