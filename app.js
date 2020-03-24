// Guardar inputs em variáveis
const btnSubmit = document.getElementById('loan-form');

const inputAmount = document.getElementById('amount');
const inputInterest = document.getElementById('interest');
const inputYears = document.getElementById('years');

const outputMonthlyPayment = document.getElementById('monthly-payment');
const outputTotalPayment = document.getElementById('total-payment');
const outputTotalInterest = document.getElementById('total-interest');

// Listener para o botão de calcular
btnSubmit.addEventListener('submit', calculateResults)

// Calcular os resultados
function calculateResults(e){
        
    const principal = parseFloat(inputAmount.value); // Pega o valor da variável e converte para o tipo float
    const calculatedInterest = parseFloat(inputInterest.value) / 100 / 12; // Converte a porcentagem em decimais e divide pelos meses
    const calculatedPayments = parseFloat(inputYears.value) * 12; // Converte a quantidade de anos em meses

    // Calcular os pagamentos mensais
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest) / (x-1);

    // Verifica se os resultados são números    
    if(isFinite(monthly)) {
        outputMonthlyPayment.value = monthly.toFixed(2);        
        outputTotalPayment.value = (monthly * calculatedPayments).toFixed(2);
        outputTotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    } else {        
        showError('Preencha todos os valores')
    }
    e.preventDefault();
}

// Mostrar erro
function showError(error){
    const errorDiv = document.createElement('div');

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errorDiv, heading);
    setTimeout(clearError, 1000);
}

// Apagar mensagem de erro
function clearError(){
    document.querySelector('.alert').remove();
}