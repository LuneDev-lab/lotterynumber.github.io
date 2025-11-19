document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os elementos interativos da página
    const gameCards = document.querySelectorAll('.game-card');
    const configPanel = document.getElementById('config-panel');
    const resultsPanel = document.getElementById('results-panel');
    const generateButton = document.getElementById('generate-button');
    const quantityInput = document.getElementById('quantity');
    const gameNameDisplay = document.getElementById('game-name-display');
    const resultsContainer = document.getElementById('results-container');

    let selectedGame = null;

    // Adiciona um "ouvinte" de clique para cada card de jogo
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            // Desmarca o card que estava selecionado antes
            gameCards.forEach(c => c.classList.remove('selected'));
            
            // Marca o novo card clicado
            card.classList.add('selected');

            // Pega as informações do jogo guardadas nos atributos data-*
            const gameName = card.textContent;
            const totalNumbers = parseInt(card.dataset.totalNumbers);
            const picks = parseInt(card.dataset.picks);
            const isSpecial = card.dataset.special === 'true';

            selectedGame = { name: gameName, total: totalNumbers, picks: picks };

            // Lógica para jogos especiais que não geram números
            if (isSpecial) {
                configPanel.classList.add('hidden');
                resultsPanel.classList.add('hidden');
                alert(`O gerador ainda não suporta jogos como ${gameName}, que têm regras diferentes. Por favor, escolha outro jogo.`);
                return;
            }

            // Mostra o painel de configuração e atualiza as informações
            gameNameDisplay.textContent = gameName;
            quantityInput.value = picks; // Define o valor padrão de números
            quantityInput.max = totalNumbers;
            configPanel.classList.remove('hidden');
            resultsPanel.classList.add('hidden'); // Esconde resultados antigos
        });
    });

    // Adiciona um "ouvinte" de clique para o botão de gerar
    generateButton.addEventListener('click', () => {
        if (!selectedGame) return;

        const quantity = parseInt(quantityInput.value);

        // Validação simples
        if (quantity < 1 || quantity > selectedGame.total) {
            alert(`Por favor, escolha uma quantidade de números entre 1 e ${selectedGame.total}.`);
            return;
        }

        // Gera os números e os exibe
        const generatedNumbers = generateUniqueRandomNumbers(quantity, selectedGame.total);
        displayNumbers(generatedNumbers);
        resultsPanel.classList.remove('hidden');
    });

    /**
     * Gera um conjunto de números aleatórios únicos.
     * Em uma aplicação real, aqui entraria a lógica de análise estatística.
     * Por enquanto, ele gera números aleatórios, mas de forma inteligente.
     */
    function generateUniqueRandomNumbers(quantity, maxNumber) {
        // Usar um Set garante que os números sejam sempre únicos
        const numbers = new Set();
        
        // TODO: Aqui é o lugar para a mágica!
        // A lógica de "números mais frequentes" seria implementada aqui.
        // Você poderia ter um array com pesos e usar um sorteio ponderado.
        // Por simplicidade, estamos usando aleatoriedade pura por enquanto.
        
        while (numbers.size < quantity) {
            const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
            numbers.add(randomNumber);
        }

        // Converte o Set para Array e ordena os números
        return Array.from(numbers).sort((a, b) => a - b);
    }

    /**
     * Mostra os números gerados na tela em formato de cards.
     */
    function displayNumbers(numbers) {
        // Limpa resultados anteriores
        resultsContainer.innerHTML = '';

        // Cria um card para cada número e o adiciona na tela
        numbers.forEach(number => {
            const numberCard = document.createElement('div');
            numberCard.className = 'number-card';
            numberCard.textContent = number;
            resultsContainer.appendChild(numberCard);
        });
    }
});