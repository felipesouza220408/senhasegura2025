document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const calculateBtn = document.getElementById('calculate-btn');
    const passwordResult = document.getElementById('password-result');
    const entropyResult = document.getElementById('entropy-result');

    // Gerador de Senhas
    generateBtn.addEventListener('click', function() {
        const length = parseInt(document.getElementById('length').value);
        const uppercase = document.getElementById('uppercase').checked;
        const lowercase = document.getElementById('lowercase').checked;
        const numbers = document.getElementById('numbers').checked;
        const symbols = document.getElementById('symbols').checked;

        const password = generatePassword(length, uppercase, lowercase, numbers, symbols);
        passwordResult.value = password;
    });

    // Copiar Senha
    copyBtn.addEventListener('click', function() {
        passwordResult.select();
        document.execCommand('copy');
        alert('Senha copiada!');
    });

    // Calculadora de Entropia
    calculateBtn.addEventListener('click', function() {
        const password = document.getElementById('entropy-password').value;
        const entropy = calculateEntropy(password);
        entropyResult.innerHTML = `<strong>Entropia:</strong> ${entropy.toFixed(2)} bits<br>
                                  <strong>Segurança:</strong> ${getSecurityLevel(entropy)}`;
    });

    // Função para gerar senha aleatória
    function generatePassword(length, uppercase, lowercase, numbers, symbols) {
        let chars = '';
        if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (numbers) chars += '0123456789';
        if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (!chars) return 'Selecione pelo menos um tipo de caractere.';

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        return password;
    }

    // Função para calcular entropia
    function calculateEntropy(password) {
        let poolSize = 0;
        if (/[a-z]/.test(password)) poolSize += 26;
        if (/[A-Z]/.test(password)) poolSize += 26;
        if (/[0-9]/.test(password)) poolSize += 10;
        if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32; // Símbolos comuns

        return Math.log2(poolSize) * password.length;
    }

    // Classificação de segurança baseada na entropia
    function getSecurityLevel(entropy) {
        if (entropy < 28) return 'Muito Fraca';
        if (entropy < 36) return 'Fraca';
        if (entropy < 48) return 'Moderada';
        if (entropy < 60) return 'Forte';
        return 'Muito Forte';
    }
});