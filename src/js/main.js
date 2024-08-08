document.addEventListener("DOMContentLoaded", function () {
    console.log('carregado')
    fetch('../components/Sidebar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;

            const btn = document.getElementById('sidebar-btn');
            const sidebar = document.getElementById('sidebar');

            if (btn && sidebar) {
                btn.addEventListener('click', () => {
                    sidebar.classList.toggle('-translate-x-full');
                });
            }

        })
        .catch(error => console.error('Error loading Sidebar:', error));

    fetch('../components/Header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header-container').innerHTML = data;

            const btn = document.getElementById('menu-btn');
            const sidebar = document.getElementById('sidebar');

            if (btn && sidebar) {
                btn.addEventListener('click', () => {
                    sidebar.classList.toggle('-translate-x-full');
                });
            }
        })
        .catch(error => console.error('Error loading Header:', error));
});

document.getElementById('cpf-btn').addEventListener('click', function () {
    const resultField = document.getElementById('result');
    const format = document.getElementById('format-checkbox').checked;
    resultField.value = gerarCPF(format);
});

document.getElementById('cnpj-btn').addEventListener('click', function () {
    const resultField = document.getElementById('result');
    const format = document.getElementById('format-checkbox').checked;
    resultField.value = gerarCNPJ(format);
});

document.getElementById('copy-btn').addEventListener('click', function() {
    const resultField = document.getElementById('result');
    const copyMessage = document.getElementById('copy-message');

    resultField.select();
    resultField.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(resultField.value)
        .then(() => {
            // Show success message
            copyMessage.classList.remove('hidden');
            copyMessage.textContent = "Copied to clipboard!";

            // Hide the message after 2 seconds
            setTimeout(() => {
                copyMessage.classList.add('hidden');
            }, 2000);
        })
        .catch(err => {
            console.error("Failed to copy: ", err);
            copyMessage.classList.remove('hidden');
            copyMessage.textContent = "Failed to copy!";
            
            setTimeout(() => {
                copyMessage.classList.add('hidden');
            }, 2000);
        });
});

function formatarCNPJ(cnpj) {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

function gerarDigitoCNPJ(cnpj) {
    let peso = cnpj.length - 7;
    let soma = 0;

    for (let i = 0; i < cnpj.length; i++) {
        soma += parseInt(cnpj[i]) * peso;
        peso = peso === 2 ? 9 : peso - 1;
    }

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

function gerarCNPJ(format = true) {
    let cnpj = '';

    for (let i = 0; i < 8; i++) {
        cnpj += Math.floor(Math.random() * 10);
    }

    cnpj += '0001';

    cnpj += gerarDigitoCNPJ(cnpj);

    cnpj += gerarDigitoCNPJ(cnpj);
    if (format) {
        return formatarCNPJ(cnpj)
    }
    return cnpj;
}

function gerarCPF(format = true) {
    let cpf = '';
    for (let i = 0; i < 9; i++) {
        cpf += Math.floor(Math.random() * 10).toString();
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let primeiroDigito = (soma * 10) % 11;
    primeiroDigito = primeiroDigito >= 10 ? 0 : primeiroDigito;
    cpf += primeiroDigito;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    let segundoDigito = (soma * 10) % 11;
    segundoDigito = segundoDigito >= 10 ? 0 : segundoDigito;
    cpf += segundoDigito;

    if (format)
        return cpf.replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{2})$/, '$1-$2');

    return cpf;
}
