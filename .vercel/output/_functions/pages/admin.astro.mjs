import { c as createComponent, a as createAstro, r as renderTemplate, b as renderComponent, d as renderHead, e as addAttribute } from '../chunks/astro/server_glwSNO0I.mjs';
import 'kleur/colors';
import { $ as $$HeaderGrisha } from '../chunks/HeaderGrisha_BcwAkHIV.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const isAuthenticated = Astro2.cookies.has("admin_session");
  if (!isAuthenticated && Astro2.request.url.includes("/admin") && !Astro2.request.url.includes("/admin/login")) {
    return Astro2.redirect("/admin/login");
  }
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-u2h3djql> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"', "><title>Rifa Grisha - Panel de Administraci\xF3n</title>", "</head> <body data-astro-cid-u2h3djql> ", ` <main data-astro-cid-u2h3djql> <button id="logout-button" class="logout-button" data-astro-cid-u2h3djql>Cerrar Sesi\xF3n</button> <h1 data-astro-cid-u2h3djql>Panel de Administraci\xF3n Rifa Grisha</h1> <section class="dashboard-section" data-astro-cid-u2h3djql> <h2 data-astro-cid-u2h3djql>Resumen de Registros</h2> <p data-astro-cid-u2h3djql>
Aqu\xED se mostrar\xE1 un resumen de los usuarios registrados y su
                    estado.
</p> <table class="data-table" data-astro-cid-u2h3djql> <thead data-astro-cid-u2h3djql> <tr data-astro-cid-u2h3djql> <th data-astro-cid-u2h3djql>ID</th> <th data-astro-cid-u2h3djql>Correo</th> <th data-astro-cid-u2h3djql>Estado</th> <th data-astro-cid-u2h3djql>N\xFAmeros Rifa</th> <th data-astro-cid-u2h3djql>Registro</th> <th data-astro-cid-u2h3djql>Acciones</th> </tr> </thead> <tbody id="user-list" data-astro-cid-u2h3djql> <!-- Los datos de los usuarios se cargar\xE1n aqu\xED --> </tbody> </table> </section> <section class="dashboard-section" data-astro-cid-u2h3djql> <h2 data-astro-cid-u2h3djql>Asignar N\xFAmeros de Rifa</h2> <form id="assign-raffle-numbers-form" data-astro-cid-u2h3djql> <label for="user-select" data-astro-cid-u2h3djql>Seleccionar Usuario:</label> <select id="user-select" name="userId" required data-astro-cid-u2h3djql> <option value="" data-astro-cid-u2h3djql>Selecciona un usuario</option> <!-- Los usuarios se cargar\xE1n aqu\xED --> </select> <div data-astro-cid-u2h3djql> <label data-astro-cid-u2h3djql> <input type="radio" name="assignmentType" value="random" checked data-astro-cid-u2h3djql> Asignaci\xF3n Aleatoria
</label> <label data-astro-cid-u2h3djql> <input type="radio" name="assignmentType" value="manual" data-astro-cid-u2h3djql> Asignaci\xF3n Manual
</label> </div> <div id="random-options" data-astro-cid-u2h3djql> <label for="cantidadRifas" data-astro-cid-u2h3djql>Cantidad de Rifas:</label> <input type="number" id="cantidadRifas" name="cantidadRifas" min="1" placeholder="Ej: 2" required data-astro-cid-u2h3djql> </div> <div id="manual-options" style="display: none;" data-astro-cid-u2h3djql> <label for="raffleNumbers" data-astro-cid-u2h3djql>N\xFAmeros de Rifa (separados por coma):</label> <input type="text" id="raffleNumbers" name="raffleNumbers" placeholder="Ej: 001,002,003" data-astro-cid-u2h3djql> </div> <button type="submit" id="submit-btn" data-astro-cid-u2h3djql>Asignar N\xFAmeros de Rifa</button> </form> <div id="assign-message" class="message" style="display:none;" data-astro-cid-u2h3djql></div> </section> <section class="dashboard-section" data-astro-cid-u2h3djql> <h2 data-astro-cid-u2h3djql>Felicitar Ganador</h2> <form id="congratulate-winner-form" data-astro-cid-u2h3djql> <label for="winning-number" data-astro-cid-u2h3djql>N\xFAmero Ganador de Loter\xEDa Nacional:</label> <input type="text" id="winning-number" name="winningNumber" placeholder="Ej: 1234567890" required data-astro-cid-u2h3djql> <label for="publication-link" data-astro-cid-u2h3djql>Enlace a la Publicaci\xF3n:</label> <input type="url" id="publication-link" name="publicationLink" placeholder="https://ejemplo.com/publicacion" required data-astro-cid-u2h3djql> <button type="submit" id="congratulate-btn" data-astro-cid-u2h3djql>Felicitar Ganador</button> </form> <div id="congratulate-message" class="message" style="display:none;" data-astro-cid-u2h3djql></div> </section> </main> <!-- Message Modal --> <div id="message-modal" class="modal" data-astro-cid-u2h3djql> <div class="modal-content" data-astro-cid-u2h3djql> <span class="close-button" data-astro-cid-u2h3djql>&times;</span> <h3 id="modal-title" data-astro-cid-u2h3djql>Mensaje</h3> <p id="modal-message" data-astro-cid-u2h3djql></p> <button id="modal-close-btn" class="modal-close-btn" data-astro-cid-u2h3djql>Aceptar</button> </div> </div> <script client:load> // Aseg\xFArate de que el script se ejecuta en el cliente
            const userListBody = document.getElementById('user-list');
            const userSelect = document.getElementById('user-select');
            const assignRaffleForm = document.getElementById('assign-raffle-numbers-form');
            const assignMessage = document.getElementById('assign-message');
            const submitBtn = document.getElementById('submit-btn');
            const congratulateWinnerForm = document.getElementById('congratulate-winner-form');
            const congratulateBtn = document.getElementById('congratulate-btn');
            const congratulateMessage = document.getElementById('congratulate-message');
            let isSubmitting = false;
            const messageModal = document.getElementById('message-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalMessage = document.getElementById('modal-message');
            const modalCloseBtn = document.getElementById('modal-close-btn');
            const closeButton = document.querySelector('.close-button');
            const randomOptions = document.getElementById('random-options');
            const manualOptions = document.getElementById('manual-options');
            const cantidadRifasInput = document.getElementById('cantidadRifas');
            const raffleNumbersInput = document.getElementById('raffleNumbers');
            const assignmentTypeRadios = document.querySelectorAll('input[name="assignmentType"]');

            // Modal functions
            function showModal(message, type = 'error') {
                modalMessage.textContent = message;
                modalTitle.textContent = type === 'success' ? '\xA1Excelente!' : type === 'info' ? 'Informaci\xF3n' : 'Error';
                modalTitle.className = type === 'success' ? 'success-title' : type === 'info' ? 'info-title' : 'error-title';
                messageModal.style.display = 'block';
            }

            function hideModal() {
                messageModal.style.display = 'none';
            }

            // Modal event listeners
            modalCloseBtn.addEventListener('click', hideModal);
            closeButton.addEventListener('click', hideModal);
            window.addEventListener('click', (event) => {
                if (event.target === messageModal) {
                    hideModal();
                }
            });

            // Handle radio button changes
            assignmentTypeRadios.forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const value = e.target.value;
                    if (value === 'random') {
                        randomOptions.style.display = 'block';
                        manualOptions.style.display = 'none';
                        cantidadRifasInput.required = true;
                        raffleNumbersInput.required = false;
                    } else {
                        randomOptions.style.display = 'none';
                        manualOptions.style.display = 'block';
                        cantidadRifasInput.required = false;
                        raffleNumbersInput.required = true;
                    }
                });
            });

            // Function to load users from API
            async function loadUsers() {
                try {
                    const response = await fetch("/api/admin/users");
                    if (!response.ok) {
                        if (response.status === 401) {
                            window.location.href = "/admin/login"; // Redirect to login if unauthorized
                            return;
                        }
                        throw new Error(
                            \`HTTP error! status: \${response.status}\`,
                        );
                    }
                    const users = await response.json();

                    userListBody.innerHTML = ""; // Clear existing rows
                    userSelect.innerHTML = '<option value="">Selecciona un usuario</option>'; // Reset user select

                    users.forEach((user) => {
                        const row = userListBody.insertRow();
                        row.insertCell().textContent =
                            user.id.substring(0, 8) + "..."; // Truncate ID
                        row.insertCell().textContent = user.email;
                        row.insertCell().textContent = user.status
                            .replace(/_/g, " ")
                            .toUpperCase(); // Format status
                        row.insertCell().textContent =
                            user.raffleNumbers.length > 0
                                ? user.raffleNumbers.join(", ")
                                : "N/A";
                        row.insertCell().textContent = new Date(
                            user.createdAt,
                        ).toLocaleString();

                        const actionsCell = row.insertCell();
                        actionsCell.className = "action-buttons";

                        // Confirm Payment Button
                        const confirmButton = document.createElement("button");
                        confirmButton.textContent = "Confirmar Pago";
                        confirmButton.className = "confirm";
                        confirmButton.addEventListener("click", () => {
                            confirmPayment(user.id); // Call confirmPayment function
                        });
                        actionsCell.appendChild(confirmButton);

                        // Assign Raffle Button
                        const assignRaffleButton =
                            document.createElement("button");
                        assignRaffleButton.textContent = "Asignar Rifas";
                        assignRaffleButton.className = "send";
                        assignRaffleButton.dataset.userId = user.id;
                        assignRaffleButton.addEventListener("click", () => {
                            userSelect.value = user.id;
                            assignRaffleForm.style.display = 'block'; // Show the form
                        });
                        actionsCell.appendChild(assignRaffleButton);

                        // Add option to user select
                        const option = document.createElement('option');
                        option.value = user.id;
                        option.textContent = user.email;
                        userSelect.appendChild(option);
                    });
                } catch (error) {
                    console.error("Error al cargar usuarios:", error);
                    userListBody.innerHTML =
                        '<tr><td colspan="6">Error al cargar usuarios. Por favor, aseg\xFArate de haber iniciado sesi\xF3n.</td></tr>';
                }
            }

            // Function to confirm payment
            async function confirmPayment(userId) {
                try {
                    const response = await fetch("/api/admin/confirm-payment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userId }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        showModal("Pago confirmado con \xE9xito.", "success");
                        // Refresh user list after confirming payment.
                        loadUsers();
                    } else {
                        showModal("Error al confirmar el pago.", "error");
                    }
                } catch (error) {
                    console.error("Error confirming payment:", error);
                    showModal("Ocurri\xF3 un error al confirmar el pago.", "error");
                }
            }

            // Function to send raffle numbers
            async function sendRaffleNumbers(userId, cantidadRifas) {
                try {
                    const response = await fetch("/api/admin/send-raffles", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userId, cantidadRifas: parseInt(cantidadRifas, 10) }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        showModal("N\xFAmeros de rifa enviados con \xE9xito.", "success");
                        loadUsers();
                        return { success: true };
                    } else {
                        return { success: false, message: data.message || "Error al enviar los n\xFAmeros de rifa." };
                    }
                } catch (error) {
                    console.error("Error sending raffle numbers:", error);
                    return { success: false, message: "Error de conexi\xF3n al enviar los n\xFAmeros de rifa." };
                }
            }

            // Function to send manual raffle numbers
            async function sendRaffleNumbersManual(userId, raffleNumbers) {
                try {
                    const response = await fetch("/api/admin/send-raffles", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userId, raffleNumbers }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        showModal("N\xFAmeros de rifa asignados con \xE9xito.", "success");
                        loadUsers();
                        return { success: true };
                    } else {
                        return { success: false, message: data.message || "Error al asignar los n\xFAmeros de rifa." };
                    }
                } catch (error) {
                    console.error("Error sending manual raffle numbers:", error);
                    return { success: false, message: "Error de conexi\xF3n al asignar los n\xFAmeros de rifa." };
                }
            }

            // Handle assign raffle form submission
            assignRaffleForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                if (isSubmitting) return;
                isSubmitting = true;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Asignando...';
                const userId = userSelect.value;
                const assignmentType = document.querySelector('input[name="assignmentType"]:checked').value;
                if (!userId) {
                    showModal("Por favor, selecciona un usuario.", "error");
                    isSubmitting = false;
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Asignar N\xFAmeros de Rifa';
                    return;
                }
                try {
                    if (assignmentType === 'random') {
                        const cantidadRifas = cantidadRifasInput.value;
                        if (cantidadRifas) {
                            const result = await sendRaffleNumbers(userId, cantidadRifas);
                            if (!result.success) {
                                showModal(result.message, "error");
                            }
                        } else {
                            showModal("Por favor, ingresa la cantidad de rifas.", "error");
                        }
                    } else {
                        const raffleNumbersStr = raffleNumbersInput.value;
                        if (raffleNumbersStr) {
                            const raffleNumbers = raffleNumbersStr.split(',').map(num => num.trim().padStart(3, '0'));
                            const result = await sendRaffleNumbersManual(userId, raffleNumbers);
                            if (!result.success) {
                                showModal(result.message, "error");
                            }
                        } else {
                            showModal("Por favor, ingresa los n\xFAmeros de rifa.", "error");
                        }
                    }
                } catch (error) {
                    console.error("Error in form submission:", error);
                    showModal("Ocurri\xF3 un error inesperado.", "error");
                } finally {
                    isSubmitting = false;
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Asignar N\xFAmeros de Rifa';
                }
            });

            // Handle congratulate winner form submission
            congratulateWinnerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                if (isSubmitting) return;
                isSubmitting = true;
                congratulateBtn.disabled = true;
                congratulateBtn.textContent = 'Felicitando...';
                const winningNumber = document.getElementById('winning-number').value.trim();
                const publicationLink = document.getElementById('publication-link').value.trim();
                if (!winningNumber || !publicationLink) {
                    showModal("Por favor, ingresa el n\xFAmero ganador y el enlace.", "error");
                    isSubmitting = false;
                    congratulateBtn.disabled = false;
                    congratulateBtn.textContent = 'Felicitar Ganador';
                    return;
                }
                try {
                    const response = await fetch("/api/admin/congratulate-winner", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ winningNumber, publicationLink }),
                    });
                    const data = await response.json();
                    if (response.ok) {
                        showModal("Ganador felicitado con \xE9xito.", "success");
                    } else {
                        showModal(data.message || "Error al felicitar al ganador.", "error");
                    }
                } catch (error) {
                    console.error("Error congratulating winner:", error);
                    showModal("Ocurri\xF3 un error al felicitar al ganador.", "error");
                } finally {
                    isSubmitting = false;
                    congratulateBtn.disabled = false;
                    congratulateBtn.textContent = 'Felicitar Ganador';
                }
            });

            // Logout function
            document.getElementById('logout-button').addEventListener('click', async () => {
                try {
                    const response = await fetch("/api/admin/logout", {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const data = await response.json();

                    if (response.ok && data.success) {
                        showModal(data.message || "Sesi\xF3n cerrada.", "success");
                        window.location.href = "/admin/login";
                    } else {
                        showModal(data.message || "Error al cerrar sesi\xF3n.", "error");
                    }
                } catch (error) {
                    console.error("Error al cerrar sesi\xF3n:", error);
                    showModal("Error al cerrar sesi\xF3n.", "error");
                }
            });

            // Load users on page load
            document.addEventListener('DOMContentLoaded', loadUsers);
        <\/script> </body> </html>`], ['<html lang="en" data-astro-cid-u2h3djql> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"', "><title>Rifa Grisha - Panel de Administraci\xF3n</title>", "</head> <body data-astro-cid-u2h3djql> ", ` <main data-astro-cid-u2h3djql> <button id="logout-button" class="logout-button" data-astro-cid-u2h3djql>Cerrar Sesi\xF3n</button> <h1 data-astro-cid-u2h3djql>Panel de Administraci\xF3n Rifa Grisha</h1> <section class="dashboard-section" data-astro-cid-u2h3djql> <h2 data-astro-cid-u2h3djql>Resumen de Registros</h2> <p data-astro-cid-u2h3djql>
Aqu\xED se mostrar\xE1 un resumen de los usuarios registrados y su
                    estado.
</p> <table class="data-table" data-astro-cid-u2h3djql> <thead data-astro-cid-u2h3djql> <tr data-astro-cid-u2h3djql> <th data-astro-cid-u2h3djql>ID</th> <th data-astro-cid-u2h3djql>Correo</th> <th data-astro-cid-u2h3djql>Estado</th> <th data-astro-cid-u2h3djql>N\xFAmeros Rifa</th> <th data-astro-cid-u2h3djql>Registro</th> <th data-astro-cid-u2h3djql>Acciones</th> </tr> </thead> <tbody id="user-list" data-astro-cid-u2h3djql> <!-- Los datos de los usuarios se cargar\xE1n aqu\xED --> </tbody> </table> </section> <section class="dashboard-section" data-astro-cid-u2h3djql> <h2 data-astro-cid-u2h3djql>Asignar N\xFAmeros de Rifa</h2> <form id="assign-raffle-numbers-form" data-astro-cid-u2h3djql> <label for="user-select" data-astro-cid-u2h3djql>Seleccionar Usuario:</label> <select id="user-select" name="userId" required data-astro-cid-u2h3djql> <option value="" data-astro-cid-u2h3djql>Selecciona un usuario</option> <!-- Los usuarios se cargar\xE1n aqu\xED --> </select> <div data-astro-cid-u2h3djql> <label data-astro-cid-u2h3djql> <input type="radio" name="assignmentType" value="random" checked data-astro-cid-u2h3djql> Asignaci\xF3n Aleatoria
</label> <label data-astro-cid-u2h3djql> <input type="radio" name="assignmentType" value="manual" data-astro-cid-u2h3djql> Asignaci\xF3n Manual
</label> </div> <div id="random-options" data-astro-cid-u2h3djql> <label for="cantidadRifas" data-astro-cid-u2h3djql>Cantidad de Rifas:</label> <input type="number" id="cantidadRifas" name="cantidadRifas" min="1" placeholder="Ej: 2" required data-astro-cid-u2h3djql> </div> <div id="manual-options" style="display: none;" data-astro-cid-u2h3djql> <label for="raffleNumbers" data-astro-cid-u2h3djql>N\xFAmeros de Rifa (separados por coma):</label> <input type="text" id="raffleNumbers" name="raffleNumbers" placeholder="Ej: 001,002,003" data-astro-cid-u2h3djql> </div> <button type="submit" id="submit-btn" data-astro-cid-u2h3djql>Asignar N\xFAmeros de Rifa</button> </form> <div id="assign-message" class="message" style="display:none;" data-astro-cid-u2h3djql></div> </section> <section class="dashboard-section" data-astro-cid-u2h3djql> <h2 data-astro-cid-u2h3djql>Felicitar Ganador</h2> <form id="congratulate-winner-form" data-astro-cid-u2h3djql> <label for="winning-number" data-astro-cid-u2h3djql>N\xFAmero Ganador de Loter\xEDa Nacional:</label> <input type="text" id="winning-number" name="winningNumber" placeholder="Ej: 1234567890" required data-astro-cid-u2h3djql> <label for="publication-link" data-astro-cid-u2h3djql>Enlace a la Publicaci\xF3n:</label> <input type="url" id="publication-link" name="publicationLink" placeholder="https://ejemplo.com/publicacion" required data-astro-cid-u2h3djql> <button type="submit" id="congratulate-btn" data-astro-cid-u2h3djql>Felicitar Ganador</button> </form> <div id="congratulate-message" class="message" style="display:none;" data-astro-cid-u2h3djql></div> </section> </main> <!-- Message Modal --> <div id="message-modal" class="modal" data-astro-cid-u2h3djql> <div class="modal-content" data-astro-cid-u2h3djql> <span class="close-button" data-astro-cid-u2h3djql>&times;</span> <h3 id="modal-title" data-astro-cid-u2h3djql>Mensaje</h3> <p id="modal-message" data-astro-cid-u2h3djql></p> <button id="modal-close-btn" class="modal-close-btn" data-astro-cid-u2h3djql>Aceptar</button> </div> </div> <script client:load> // Aseg\xFArate de que el script se ejecuta en el cliente
            const userListBody = document.getElementById('user-list');
            const userSelect = document.getElementById('user-select');
            const assignRaffleForm = document.getElementById('assign-raffle-numbers-form');
            const assignMessage = document.getElementById('assign-message');
            const submitBtn = document.getElementById('submit-btn');
            const congratulateWinnerForm = document.getElementById('congratulate-winner-form');
            const congratulateBtn = document.getElementById('congratulate-btn');
            const congratulateMessage = document.getElementById('congratulate-message');
            let isSubmitting = false;
            const messageModal = document.getElementById('message-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalMessage = document.getElementById('modal-message');
            const modalCloseBtn = document.getElementById('modal-close-btn');
            const closeButton = document.querySelector('.close-button');
            const randomOptions = document.getElementById('random-options');
            const manualOptions = document.getElementById('manual-options');
            const cantidadRifasInput = document.getElementById('cantidadRifas');
            const raffleNumbersInput = document.getElementById('raffleNumbers');
            const assignmentTypeRadios = document.querySelectorAll('input[name="assignmentType"]');

            // Modal functions
            function showModal(message, type = 'error') {
                modalMessage.textContent = message;
                modalTitle.textContent = type === 'success' ? '\xA1Excelente!' : type === 'info' ? 'Informaci\xF3n' : 'Error';
                modalTitle.className = type === 'success' ? 'success-title' : type === 'info' ? 'info-title' : 'error-title';
                messageModal.style.display = 'block';
            }

            function hideModal() {
                messageModal.style.display = 'none';
            }

            // Modal event listeners
            modalCloseBtn.addEventListener('click', hideModal);
            closeButton.addEventListener('click', hideModal);
            window.addEventListener('click', (event) => {
                if (event.target === messageModal) {
                    hideModal();
                }
            });

            // Handle radio button changes
            assignmentTypeRadios.forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const value = e.target.value;
                    if (value === 'random') {
                        randomOptions.style.display = 'block';
                        manualOptions.style.display = 'none';
                        cantidadRifasInput.required = true;
                        raffleNumbersInput.required = false;
                    } else {
                        randomOptions.style.display = 'none';
                        manualOptions.style.display = 'block';
                        cantidadRifasInput.required = false;
                        raffleNumbersInput.required = true;
                    }
                });
            });

            // Function to load users from API
            async function loadUsers() {
                try {
                    const response = await fetch("/api/admin/users");
                    if (!response.ok) {
                        if (response.status === 401) {
                            window.location.href = "/admin/login"; // Redirect to login if unauthorized
                            return;
                        }
                        throw new Error(
                            \\\`HTTP error! status: \\\${response.status}\\\`,
                        );
                    }
                    const users = await response.json();

                    userListBody.innerHTML = ""; // Clear existing rows
                    userSelect.innerHTML = '<option value="">Selecciona un usuario</option>'; // Reset user select

                    users.forEach((user) => {
                        const row = userListBody.insertRow();
                        row.insertCell().textContent =
                            user.id.substring(0, 8) + "..."; // Truncate ID
                        row.insertCell().textContent = user.email;
                        row.insertCell().textContent = user.status
                            .replace(/_/g, " ")
                            .toUpperCase(); // Format status
                        row.insertCell().textContent =
                            user.raffleNumbers.length > 0
                                ? user.raffleNumbers.join(", ")
                                : "N/A";
                        row.insertCell().textContent = new Date(
                            user.createdAt,
                        ).toLocaleString();

                        const actionsCell = row.insertCell();
                        actionsCell.className = "action-buttons";

                        // Confirm Payment Button
                        const confirmButton = document.createElement("button");
                        confirmButton.textContent = "Confirmar Pago";
                        confirmButton.className = "confirm";
                        confirmButton.addEventListener("click", () => {
                            confirmPayment(user.id); // Call confirmPayment function
                        });
                        actionsCell.appendChild(confirmButton);

                        // Assign Raffle Button
                        const assignRaffleButton =
                            document.createElement("button");
                        assignRaffleButton.textContent = "Asignar Rifas";
                        assignRaffleButton.className = "send";
                        assignRaffleButton.dataset.userId = user.id;
                        assignRaffleButton.addEventListener("click", () => {
                            userSelect.value = user.id;
                            assignRaffleForm.style.display = 'block'; // Show the form
                        });
                        actionsCell.appendChild(assignRaffleButton);

                        // Add option to user select
                        const option = document.createElement('option');
                        option.value = user.id;
                        option.textContent = user.email;
                        userSelect.appendChild(option);
                    });
                } catch (error) {
                    console.error("Error al cargar usuarios:", error);
                    userListBody.innerHTML =
                        '<tr><td colspan="6">Error al cargar usuarios. Por favor, aseg\xFArate de haber iniciado sesi\xF3n.</td></tr>';
                }
            }

            // Function to confirm payment
            async function confirmPayment(userId) {
                try {
                    const response = await fetch("/api/admin/confirm-payment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userId }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        showModal("Pago confirmado con \xE9xito.", "success");
                        // Refresh user list after confirming payment.
                        loadUsers();
                    } else {
                        showModal("Error al confirmar el pago.", "error");
                    }
                } catch (error) {
                    console.error("Error confirming payment:", error);
                    showModal("Ocurri\xF3 un error al confirmar el pago.", "error");
                }
            }

            // Function to send raffle numbers
            async function sendRaffleNumbers(userId, cantidadRifas) {
                try {
                    const response = await fetch("/api/admin/send-raffles", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userId, cantidadRifas: parseInt(cantidadRifas, 10) }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        showModal("N\xFAmeros de rifa enviados con \xE9xito.", "success");
                        loadUsers();
                        return { success: true };
                    } else {
                        return { success: false, message: data.message || "Error al enviar los n\xFAmeros de rifa." };
                    }
                } catch (error) {
                    console.error("Error sending raffle numbers:", error);
                    return { success: false, message: "Error de conexi\xF3n al enviar los n\xFAmeros de rifa." };
                }
            }

            // Function to send manual raffle numbers
            async function sendRaffleNumbersManual(userId, raffleNumbers) {
                try {
                    const response = await fetch("/api/admin/send-raffles", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userId, raffleNumbers }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        showModal("N\xFAmeros de rifa asignados con \xE9xito.", "success");
                        loadUsers();
                        return { success: true };
                    } else {
                        return { success: false, message: data.message || "Error al asignar los n\xFAmeros de rifa." };
                    }
                } catch (error) {
                    console.error("Error sending manual raffle numbers:", error);
                    return { success: false, message: "Error de conexi\xF3n al asignar los n\xFAmeros de rifa." };
                }
            }

            // Handle assign raffle form submission
            assignRaffleForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                if (isSubmitting) return;
                isSubmitting = true;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Asignando...';
                const userId = userSelect.value;
                const assignmentType = document.querySelector('input[name="assignmentType"]:checked').value;
                if (!userId) {
                    showModal("Por favor, selecciona un usuario.", "error");
                    isSubmitting = false;
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Asignar N\xFAmeros de Rifa';
                    return;
                }
                try {
                    if (assignmentType === 'random') {
                        const cantidadRifas = cantidadRifasInput.value;
                        if (cantidadRifas) {
                            const result = await sendRaffleNumbers(userId, cantidadRifas);
                            if (!result.success) {
                                showModal(result.message, "error");
                            }
                        } else {
                            showModal("Por favor, ingresa la cantidad de rifas.", "error");
                        }
                    } else {
                        const raffleNumbersStr = raffleNumbersInput.value;
                        if (raffleNumbersStr) {
                            const raffleNumbers = raffleNumbersStr.split(',').map(num => num.trim().padStart(3, '0'));
                            const result = await sendRaffleNumbersManual(userId, raffleNumbers);
                            if (!result.success) {
                                showModal(result.message, "error");
                            }
                        } else {
                            showModal("Por favor, ingresa los n\xFAmeros de rifa.", "error");
                        }
                    }
                } catch (error) {
                    console.error("Error in form submission:", error);
                    showModal("Ocurri\xF3 un error inesperado.", "error");
                } finally {
                    isSubmitting = false;
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Asignar N\xFAmeros de Rifa';
                }
            });

            // Handle congratulate winner form submission
            congratulateWinnerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                if (isSubmitting) return;
                isSubmitting = true;
                congratulateBtn.disabled = true;
                congratulateBtn.textContent = 'Felicitando...';
                const winningNumber = document.getElementById('winning-number').value.trim();
                const publicationLink = document.getElementById('publication-link').value.trim();
                if (!winningNumber || !publicationLink) {
                    showModal("Por favor, ingresa el n\xFAmero ganador y el enlace.", "error");
                    isSubmitting = false;
                    congratulateBtn.disabled = false;
                    congratulateBtn.textContent = 'Felicitar Ganador';
                    return;
                }
                try {
                    const response = await fetch("/api/admin/congratulate-winner", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ winningNumber, publicationLink }),
                    });
                    const data = await response.json();
                    if (response.ok) {
                        showModal("Ganador felicitado con \xE9xito.", "success");
                    } else {
                        showModal(data.message || "Error al felicitar al ganador.", "error");
                    }
                } catch (error) {
                    console.error("Error congratulating winner:", error);
                    showModal("Ocurri\xF3 un error al felicitar al ganador.", "error");
                } finally {
                    isSubmitting = false;
                    congratulateBtn.disabled = false;
                    congratulateBtn.textContent = 'Felicitar Ganador';
                }
            });

            // Logout function
            document.getElementById('logout-button').addEventListener('click', async () => {
                try {
                    const response = await fetch("/api/admin/logout", {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const data = await response.json();

                    if (response.ok && data.success) {
                        showModal(data.message || "Sesi\xF3n cerrada.", "success");
                        window.location.href = "/admin/login";
                    } else {
                        showModal(data.message || "Error al cerrar sesi\xF3n.", "error");
                    }
                } catch (error) {
                    console.error("Error al cerrar sesi\xF3n:", error);
                    showModal("Error al cerrar sesi\xF3n.", "error");
                }
            });

            // Load users on page load
            document.addEventListener('DOMContentLoaded', loadUsers);
        <\/script> </body> </html>`])), addAttribute(Astro2.generator, "content"), renderHead(), renderComponent($$result, "HeaderGrisha", $$HeaderGrisha, { "data-astro-cid-u2h3djql": true }));
}, "/home/jimp/develop/astro/rifa_grisha/src/pages/admin/index.astro", void 0);

const $$file = "/home/jimp/develop/astro/rifa_grisha/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
