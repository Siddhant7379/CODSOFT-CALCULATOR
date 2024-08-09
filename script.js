document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('.btn'));
    let currentInput = '';
    let operator = '';
    let previousValue = '';

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.getAttribute('data-value');
            
            if (value === 'C') {
                // Clear the display
                currentInput = '';
                previousValue = '';
                operator = '';
                display.textContent = '0';
            } else if (value === '=') {
                // Calculate and display result
                if (currentInput && previousValue && operator) {
                    try {
                        const result = eval(`${previousValue} ${operator} ${currentInput}`);
                        display.textContent = result;
                        currentInput = result;
                        operator = '';
                        previousValue = '';
                    } catch (e) {
                        display.textContent = 'Error';
                        currentInput = '';
                        operator = '';
                        previousValue = '';
                    }
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                // Set operator and save current input
                if (currentInput) {
                    previousValue = currentInput;
                    currentInput = '';
                    operator = value;
                }
            } else {
                // Update current input
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });
});
