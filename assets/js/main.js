(() => {
    console.log("Ok!");
    function criaCalculadora() {
        return {
            display: document.querySelector('.display'),
            parenteses: 0,
            ponto: false,
            igual: false,

            inicia() {
                this.cliqueBotoes();
                this.entradaTeclado();
            },

            cliqueBotoes() {
                document.addEventListener('click', (e) => {
                    const el = e.target;

                    if (el.classList.contains('btn-num'))
                        this.paraDisplay(el.innerText);

                    if (el.classList.contains('btn-clear'))
                        this.clearDisplay();

                    if (el.classList.contains('btn-del'))
                        this.apagaUm();

                    if (el.classList.contains('btn-eq'))
                        this.realizaConta();

                    if (el.classList.contains('btn-operator'))
                        this.operadorDisplay(el.innerText);

                    if (el.classList.contains('btn-open'))
                        this.parentesesAberto(el.innerText);

                    if (el.classList.contains('btn-close') && this.parenteses)
                        this.parentesesFechado(el.innerText);

                    if (el.classList.contains('btn-dot'))
                        this.dotDisplay(el.innerText);

                });
            },

            entradaTeclado() {
                this.display.addEventListener('keypress', (e) => {
                    e.preventDefault();

                    if (e.key === 'Escape' || e.key === "Delete")
                        this.clearDisplay();

                    else if (e.key === 'Backspace') this.apagaUm();

                    else if (e.key === 'Enter') this.realizaConta();

                    else if (e.key === '/' || e.key === '*'
                        || e.key === '-' || e.key === '+')
                        this.operadorDisplay(e.key);

                    else if (e.key === '(') this.parentesesAberto(e.key);

                    else if (e.key === ')' && this.parenteses)
                        this.parentesesFechado(e.key);

                    else if (e.key === '.') this.dotDisplay(e.key);

                    else this.paraDisplay(e.key);
                });
            },

            paraDisplay(valor) {
                if (this.igual) {
                    this.display.value = '';
                    this.igual = false;
                }

                if (this.testaConta(valor))
                    this.display.value += valor;

            },

            parentesesAberto(valor) {
                if (!this.ultimoENumero() && this.ponto)
                    return;

                if (this.ultimoENumero()
                    && !this.displayIsEmpty()
                    && !this.igual)
                    this.paraDisplay('*')

                this.paraDisplay(valor);
                this.parenteses++;
            },

            parentesesFechado(valor) {
                if (this.ultimoENumero() || this.ultimoEParentesesFechado()) {
                    this.paraDisplay(valor);
                    this.parenteses--;
                }
            },

            dotDisplay(valor) {
                if (this.ultimoEParentesesFechado() || this.ponto)
                    return;

                if (!this.ultimoENumero()
                    || this.ultimoEParentesesAberto()
                    || this.displayIsEmpty()) {
                    this.paraDisplay('0')
                }

                this.paraDisplay(valor);
                this.ponto = true;
            },

            operadorDisplay(valor) {
                if (this.ultimoEParentesesAberto())
                    this.display.value = this.display.value.slice(0, -1);

                if (!this.ultimoENumero() && !this.ultimoEParentesesFechado())
                    this.display.value = this.display.value.slice(0, -1);


                if (this.displayIsEmpty())
                    return;

                this.paraDisplay(valor);
                this.ponto = false;
            },

            ultimoENumero() {
                const lastDigit = Number(this.display.value.slice(-1));
                return Number.isInteger(lastDigit);
            },

            ultimoEParentesesAberto() {
                const lastDigit = this.display.value.slice(-1);
                return lastDigit === '(';
            },

            ultimoEParentesesFechado() {
                const lastDigit = this.display.value.slice(-1);
                return lastDigit === ')';
            },

            displayIsEmpty() {
                if (this.display.value.length === 0)
                    return true;
            },

            clearDisplay() {
                this.display.value = '';
                this.ponto = false;
                this.parenteses = 0;
                this.igual = false;
            },

            apagaUm() {
                const lastDigit = this.display.value.slice(-1);
                if (lastDigit === '(')
                    this.parenteses--;

                if (lastDigit === ')')
                    this.parenteses++;

                if (lastDigit === '.')
                    this.ponto = false;

                this.display.value = this.display.value.slice(0, -1);
            },

            testaConta(conta) {
                let pattern = /[0-9\.\-\/\+\*\(\)]+$/g;
                return pattern.test(conta);
            },

            realizaConta() {
                try {
                    const conta = eval(this.display.value);
                    this.display.value = conta;
                    this.igual = true;
                } catch (error) {
                    alert('Conta inválida!');
                    return;
                }
            }

        };
    }

    const calculadora = criaCalculadora();

    calculadora.inicia();

})();