import { c as createComponent, a as createAstro, r as renderTemplate, b as renderComponent, d as renderHead, e as addAttribute } from '../../chunks/astro/server_CDjB31Lh.mjs';
import 'kleur/colors';
import { $ as $$HeaderGrisha } from '../../chunks/HeaderGrisha_5DuKFRQu.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-rf56lckb> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"', "><title>Rifa Grisha - Acceso Administrador</title>", "</head> <body data-astro-cid-rf56lckb> ", ` <main data-astro-cid-rf56lckb> <h1 data-astro-cid-rf56lckb>Acceso al Panel de Administraci\xF3n</h1> <p data-astro-cid-rf56lckb>Por favor, ingresa tus credenciales.</p> <form id="login-form" data-astro-cid-rf56lckb> <div data-astro-cid-rf56lckb> <label for="username" data-astro-cid-rf56lckb>Usuario:</label> <input type="text" id="username" name="username" required autocomplete="username" data-astro-cid-rf56lckb> </div> <div data-astro-cid-rf56lckb> <label for="password" data-astro-cid-rf56lckb>Contrase\xF1a:</label> <input type="password" id="password" name="password" required autocomplete="current-password" data-astro-cid-rf56lckb> </div> <button type="submit" data-astro-cid-rf56lckb>Iniciar Sesi\xF3n</button> </form> <div id="form-message" class="message" data-astro-cid-rf56lckb></div> </main> <script>
            document.getElementById('login-form').addEventListener('submit', async (event) => {
                event.preventDefault();
                const usernameInput = document.getElementById('username');
                const passwordInput = document.getElementById('password');
                const formMessage = document.getElementById('form-message');

                const username = usernameInput.value;
                const password = passwordInput.value;

                formMessage.style.display = 'none';
                formMessage.classList.remove('success', 'error');
                formMessage.textContent = '';

                try {
                    const response = await fetch('/api/admin/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ username, password }),
                    });

                    const data = await response.json();

                    if (response.ok && data.success) {
                        formMessage.textContent = data.message || 'Inicio de sesi\xF3n exitoso.';
                        formMessage.className = 'message success';
                        // Redirigir al panel de administraci\xF3n
                        setTimeout(() => {
                            window.location.href = '/admin';
                        }, 1000); // Peque\xF1o retraso antes de redirigir
                    } else {
                        formMessage.textContent = data.message || 'Credenciales incorrectas.';
                        formMessage.className = 'message error';
                    }
                } catch (error) {
                    console.error("Error al iniciar sesi\xF3n:", error);
                    formMessage.textContent = "Ocurri\xF3 un error de conexi\xF3n. Int\xE9ntalo de nuevo m\xE1s tarde.";
                    formMessage.className = 'message error';
                } finally {
                    formMessage.style.display = 'block';
                }
            });
        <\/script> </body> </html>`])), addAttribute(Astro2.generator, "content"), renderHead(), renderComponent($$result, "HeaderGrisha", $$HeaderGrisha, { "data-astro-cid-rf56lckb": true }));
}, "/home/jimp/develop/astro/rifa_grisha/src/pages/admin/login.astro", void 0);

const $$file = "/home/jimp/develop/astro/rifa_grisha/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
