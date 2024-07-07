const data = {
    "version": "1.7.0",
    "autor": "mindicador.cl",
    "fecha": "2022-08-04T20:00:00.000Z",
    "uf": { "codigo": "uf", "nombre": "Unidad de fomento (UF)", "unidad_medida": "Pesos", "fecha": "2022-08-04T04:00:00.000Z", "valor": 33455.92 },
    "ivp": { "codigo": "ivp", "nombre": "Indice de valor promedio (IVP)", "unidad_medida": "Pesos", "fecha": "2022-08-04T04:00:00.000Z", "valor": 34000.48 },
    "dolar": { "codigo": "dolar", "nombre": "Dólar observado", "unidad_medida": "Pesos", "fecha": "2022-08-04T04:00:00.000Z", "valor": 907.82 },
    "dolar_intercambio": { "codigo": "dolar_intercambio", "nombre": "Dólar acuerdo", "unidad_medida": "Pesos", "fecha": "2014-11-13T03:00:00.000Z", "valor": 758.87 },
    "euro": { "codigo": "euro", "nombre": "Euro", "unidad_medida": "Pesos", "fecha": "2022-08-04T04:00:00.000Z", "valor": 922.21 }
};
async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const currency = document.getElementById('currency').value;
    const result = document.getElementById('result');
    const error = document.getElementById('error');
    const chartElement = document.getElementById('chart').getContext('2d');
    result.innerHTML = '';
    error.innerHTML = '';

    try {
        const response = await fetch('https://mindicador.cl/api');
        const data = await response.json();
        const rate = data[currency].valor;
        const convertedAmount = (amount / rate).toFixed(2);
        result.innerHTML = `${amount} CLP son ${convertedAmount} ${currency.toUpperCase()}`;

        const historyResponse = await fetch(`https://mindicador.cl/api/${currency}`);
        const historyData = await historyResponse.json();

        const labels = historyData.serie.slice(0, 10).map(item => new Date(item.fecha).toLocaleDateString());
        const values = historyData.serie.slice(0, 10).map(item => item.valor);

        new Chart(chartElement, {
            type: 'line',
            data: {
                labels: labels.reverse(),
                datasets: [{
                    label: `Historial de ${currency.toUpperCase()}`,
                    data: values.reverse(),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });

    } catch (err) {
        error.innerHTML = 'Hubo un problema al realizar la conversión. Por favor, inténtelo de nuevo más tarde.';
    }
}
