document.addEventListener('DOMContentLoaded', () => {
    // Mock Data logic for Public Ticket page

    const inputRef = document.getElementById('referenceCode');
    const btnTrack = document.getElementById('btnTrack');
    const ticketResult = document.getElementById('ticketResult');

    // Elements of the modal
    const btnRequestOtp = document.getElementById('btnRequestOtp');
    const modalOverlay = document.getElementById('otpModal');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const btnCancelOtp = document.getElementById('btnCancelOtp');
    const btnVerifyOtp = document.getElementById('btnVerifyOtp');

    // Elements inside Full view
    const fullView = document.querySelector('.full-view');

    // MOCK OTP code
    const MOCK_OTP = "123456";

    // Event: Track ticket
    btnTrack.addEventListener('click', () => {
        const code = inputRef.value.trim();
        if (code !== '') {
            // In a real scenario, fetch from DB. 
            // For now, simple mock reveal.
            ticketResult.style.display = 'grid';
            document.getElementById('workspaceBrand').innerText = 'Cafe Bistro Sol - TICKET PORTAL';
        } else {
            alert('Por favor ingrese un código de referencia.');
        }
    });

    // Event: Open OTP Modal
    btnRequestOtp.addEventListener('click', () => {
        modalOverlay.style.display = 'flex';
        // reset OTP inputs
        document.querySelectorAll('.otp-digit').forEach(input => input.value = '');
        document.querySelectorAll('.otp-digit')[0].focus();
    });

    // Close Modal Events
    const closeModal = () => {
        modalOverlay.style.display = 'none';
    };

    btnCloseModal.addEventListener('click', closeModal);
    btnCancelOtp.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // OTP Input Focus Management
    const otpInputs = document.querySelectorAll('.otp-digit');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

    // Verify OTP
    btnVerifyOtp.addEventListener('click', () => {
        let enteredOtp = '';
        otpInputs.forEach(input => enteredOtp += input.value);

        if (enteredOtp === MOCK_OTP || enteredOtp.length === 6) { // allow any 6 digits for testing
            closeModal();
            // Remove blur and skeleton, reveal actual content placeholder
            fullView.classList.remove('blurred');
            fullView.innerHTML = `
                <h3 class="card-title">Full Conversation</h3>
                <div style="padding: 1rem; background: var(--bg-light); border-radius: 8px; box-shadow: inset 2px 2px 5px var(--shadow-dark), inset -2px -2px 5px var(--shadow-light); margin-bottom: 10px;">
                    <strong>User:</strong> <br>
                    Hola, mi pedido aún no ha sido entregado.
                </div>
                <div style="padding: 1rem; background: var(--bg-light); border-radius: 8px; box-shadow: inset 2px 2px 5px var(--shadow-dark), inset -2px -2px 5px var(--shadow-light);">
                    <strong>Agent (Maria):</strong> <br>
                    Hola, estamos revisando el estado del envío con la mensajería, te avisaremos.
                </div>
            `;
            btnRequestOtp.style.display = 'none'; // hide request button
        } else {
            alert('OTP Inválido. Usa 123456 para probar.');
        }
    });
});
