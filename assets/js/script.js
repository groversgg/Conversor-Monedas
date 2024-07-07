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

async function convert() {
    const amount = document.getElementById('amount').value;
    const currency = document.getElementById('currency').value;
    const divResult = document.getElementById('result');

    if (!amount) {
        divResult.innerHTML = "Ingresa una cantidad, por favor.";
        return;
    }

    try {
        const rate = data[currency].valor;
        const convertedAmount = (amount / rate).toFixed(2);
        divResult.innerHTML = `${amount} CLP = ${convertedAmount} ${data[currency].nombre}`;

        const labels = ['10 días atrás', '9 días atrás', '8 días atrás', '7 días atrás', '6 días atrás', '5 días atrás', '4 días atrás', '3 días atrás', '2 días atrás', '1 día atrás'];
        const values = Array.from({ length: 10 }, () => (Math.random() * (rate + 100 - rate - 100) + rate - 100).toFixed(2));

        renderChart(labels, values, data[currency].nombre);
    } catch (error) {
        divResult.innerHTML = `Error al convertir: ${error.message}`;
    }
}

function renderChart(labels, values, currencyName) {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Historial de: ${currencyName}`,
                data: values,
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
}