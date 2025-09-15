import { c as createComponent, m as maybeRenderHead, r as renderTemplate, a as createAstro, h as renderScript, e as addAttribute, b as renderComponent, F as Fragment, d as renderHead } from '../chunks/astro/server_glwSNO0I.mjs';
import 'kleur/colors';
import { $ as $$HeaderGrisha } from '../chunks/HeaderGrisha_BcwAkHIV.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$RaffleDetails = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="raffle-details-section" data-astro-cid-36heh6p3> <h2 data-astro-cid-36heh6p3>Detalles de la Rifa</h2> <p data-astro-cid-36heh6p3>
¡Participa en nuestra rifa para tener la oportunidad de ganar una
        increíble <strong data-astro-cid-36heh6p3>Guitarra de Concierto</strong>!
</p> <p data-astro-cid-36heh6p3>
El ganador será determinado por la coincidencia de los **últimos tres
        dígitos del número de tu boleto** con los últimos tres dígitos del
        **Primer Premio de la Lotería Nacional** en el sorteo que se anunciará el día del inicio de campaña.
</p> <p data-astro-cid-36heh6p3>¡Mucha suerte a todos los participantes!</p> </section> `;
}, "/home/jimp/develop/astro/rifa_grisha/src/components/RaffleDetails.astro", void 0);

const $$Astro$2 = createAstro();
const $$ImageGallery = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ImageGallery;
  const {
    images: manualImages = [],
    title = "Galer\xEDa de la Guitarra",
    autoplay = true,
    interval = 4e3
  } = Astro2.props;
  const defaultImages = [
    "/assets/carrousel/guitar-1.jpg",
    "/assets/carrousel/guitar-2.jpg",
    "/assets/carrousel/guitar-3.jpg",
    "/assets/carrousel/guitar-4.jpg"
  ];
  const images = manualImages.length > 0 ? manualImages : defaultImages;
  return renderTemplate`---
${images.length > 0 && renderTemplate`${maybeRenderHead()}<div class="image-gallery-container" data-astro-cid-gjhjmbi3><h3 class="gallery-title" data-astro-cid-gjhjmbi3>${title}</h3><div class="carousel-container" data-astro-cid-gjhjmbi3><div class="carousel-wrapper" id="carousel-wrapper" data-astro-cid-gjhjmbi3>${images.map((image, index) => renderTemplate`<div class="carousel-slide"${addAttribute(index, "data-slide")} data-astro-cid-gjhjmbi3><img${addAttribute(image, "src")}${addAttribute(`Imagen ${index + 1} de la guitarra`, "alt")}${addAttribute(index === 0 ? "eager" : "lazy", "loading")} data-astro-cid-gjhjmbi3></div>`)}</div>${images.length > 1 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-gjhjmbi3": true }, { "default": ($$result2) => renderTemplate`<button class="carousel-btn prev-btn" id="prev-btn" aria-label="Imagen anterior" data-astro-cid-gjhjmbi3>
&#10094;
</button><button class="carousel-btn next-btn" id="next-btn" aria-label="Imagen siguiente" data-astro-cid-gjhjmbi3>
&#10095;
</button><div class="carousel-indicators" data-astro-cid-gjhjmbi3>${images.map((_, index) => renderTemplate`<button class="indicator"${addAttribute(index, "data-slide")}${addAttribute(`Ir a imagen ${index + 1}`, "aria-label")} data-astro-cid-gjhjmbi3></button>`)}</div>` })}`}</div></div>`}${images.length === 0 && renderTemplate`<div class="gallery-error" data-astro-cid-gjhjmbi3><p data-astro-cid-gjhjmbi3>No hay imágenes disponibles para mostrar.</p></div>`}${renderScript($$result, "/home/jimp/develop/astro/rifa_grisha/src/components/ImageGallery.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/jimp/develop/astro/rifa_grisha/src/components/ImageGallery.astro", void 0);

const $$Astro$1 = createAstro();
const $$VideoEmbed = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$VideoEmbed;
  const { url, title = "Video de la Guitarra", width = "100%", height = "400px" } = Astro2.props;
  function getVideoEmbedInfo(url2) {
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url2.match(youtubeRegex);
    if (youtubeMatch) {
      return {
        platform: "youtube",
        videoId: youtubeMatch[1],
        embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`
      };
    }
    const instagramRegex = /instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/;
    const instagramMatch = url2.match(instagramRegex);
    if (instagramMatch) {
      return {
        platform: "instagram",
        videoId: instagramMatch[1],
        embedUrl: `https://www.instagram.com/p/${instagramMatch[1]}/embed/`
      };
    }
    const tiktokRegex = /tiktok\.com\/@[^\/]+\/video\/(\d+)/;
    const tiktokMatch = url2.match(tiktokRegex);
    if (tiktokMatch) {
      return {
        platform: "tiktok",
        videoId: tiktokMatch[1],
        embedUrl: `https://www.tiktok.com/embed/v2/${tiktokMatch[1]}`
      };
    }
    return null;
  }
  const videoInfo = getVideoEmbedInfo(url);
  return renderTemplate`${videoInfo && renderTemplate`${maybeRenderHead()}<div class="video-embed-container"${addAttribute(`width: ${width}; margin: 20px 0;`, "style")} data-astro-cid-mrk3q7f7><h3 class="video-title" style="text-align: center; color: #764ba2; margin-bottom: 15px; font-size: 1.4rem;" data-astro-cid-mrk3q7f7>${title}</h3>${videoInfo.platform === "youtube" && renderTemplate`<div class="video-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" data-astro-cid-mrk3q7f7><iframe${addAttribute(videoInfo.embedUrl, "src")} style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allowfullscreen${addAttribute(title, "title")} data-astro-cid-mrk3q7f7></iframe></div>`}${videoInfo.platform === "instagram" && renderTemplate`<div class="video-wrapper" style="display: flex; justify-content: center; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" data-astro-cid-mrk3q7f7><iframe${addAttribute(videoInfo.embedUrl, "src")}${addAttribute(`width: ${width}; height: ${height}; border: none; max-width: 540px;`, "style")} allowfullscreen${addAttribute(title, "title")} data-astro-cid-mrk3q7f7></iframe></div>`}${videoInfo.platform === "tiktok" && renderTemplate`<div class="video-wrapper" style="display: flex; justify-content: center; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" data-astro-cid-mrk3q7f7><iframe${addAttribute(videoInfo.embedUrl, "src")}${addAttribute(`width: ${width}; height: ${height}; border: none; max-width: 605px;`, "style")} allowfullscreen${addAttribute(title, "title")} data-astro-cid-mrk3q7f7></iframe></div>`}</div>`}${!videoInfo && renderTemplate`<div class="video-error" style="text-align: center; padding: 20px; background-color: #f8d7da; color: #721c24; border-radius: 8px; margin: 20px 0;" data-astro-cid-mrk3q7f7><p data-astro-cid-mrk3q7f7>❌ URL de video no válida. Solo se admiten enlaces de YouTube, Instagram y TikTok.</p><p style="font-size: 0.9rem; margin-top: 10px;" data-astro-cid-mrk3q7f7>URL proporcionada: ${url}</p></div>`}`;
}, "/home/jimp/develop/astro/rifa_grisha/src/components/VideoEmbed.astro", void 0);

const $$RafflePurchase = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="raffle-purchase-section" data-astro-cid-mh3h42so> <h2 data-astro-cid-mh3h42so>¡Participa en la Rifa!</h2> <p data-astro-cid-mh3h42so>Para adquirir tus números de rifa y participar por la guitarra de concierto, sigue estos sencillos pasos:</p> <div class="purchase-steps" data-astro-cid-mh3h42so> <div class="step" data-astro-cid-mh3h42so> <span class="step-number" data-astro-cid-mh3h42so>1</span> <h3 data-astro-cid-mh3h42so>Regístrate en la página principal</h3> <p data-astro-cid-mh3h42so>Asegúrate de haber registrado tu correo electrónico en la sección de registro para que podamos enviarte los detalles del depósito y tus números de rifa.</p> </div> <div class="step" data-astro-cid-mh3h42so> <span class="step-number" data-astro-cid-mh3h42so>2</span> <h3 data-astro-cid-mh3h42so>Realiza tu Depósito</h3> <p data-astro-cid-mh3h42so>Una vez registrado, te proporcionaremos los datos necesarios para que realices tu depósito de forma segura.</p> </div> <div class="step" data-astro-cid-mh3h42so> <span class="step-number" data-astro-cid-mh3h42so>3</span> <h3 data-astro-cid-mh3h42so>Confirmación y Números de Rifa</h3> <p data-astro-cid-mh3h42so>Tras confirmar tu depósito internamente, recibirás <strong data-astro-cid-mh3h42so>dos números de rifa únicos</strong> directamente en tu correo electrónico. ¡Mucha suerte!</p> </div> </div> <p class="data-storage-note" data-astro-cid-mh3h42so>Tus datos de contacto y números de rifa serán guardados de forma segura en una base de datos, usando el servidor de Vercel.</p> </section> `;
}, "/home/jimp/develop/astro/rifa_grisha/src/components/RafflePurchase.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-j7pv25f6> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.jpeg"><meta name="viewport" content="width=device-width"><meta name="generator"', "><title>Rifa Grisha - Reg\xEDstrate</title>", "</head> <body data-astro-cid-j7pv25f6> ", ' <main data-astro-cid-j7pv25f6> <!-- Development Warning Banner --> <div class="development-warning" data-astro-cid-j7pv25f6> <div class="warning-content" data-astro-cid-j7pv25f6> <span class="warning-icon" data-astro-cid-j7pv25f6>\u26A0\uFE0F</span> <strong data-astro-cid-j7pv25f6>AVISO IMPORTANTE:</strong> Esta es una versi\xF3n de desarrollo. La rifa oficial a\xFAn no est\xE1 disponible.\n<span class="warning-icon" data-astro-cid-j7pv25f6>\u26A0\uFE0F</span> </div> </div> ', " ", " ", " ", ' <section class="registration-section" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Reg\xEDstrate para Participar</h2> <p data-astro-cid-j7pv25f6>\nIngresa tu correo electr\xF3nico para recibir las instrucciones\n                    de pago y participar en la rifa.\n</p> <form id="registration-form" data-astro-cid-j7pv25f6> <input type="email" id="email" name="email" placeholder="tu@correo.com" required data-astro-cid-j7pv25f6> <div id="captcha-section" data-astro-cid-j7pv25f6> <label for="captcha" data-astro-cid-j7pv25f6>Resuelve esta suma para verificar: <span id="captcha-question" data-astro-cid-j7pv25f6></span></label> <input type="number" id="captcha" name="captcha" placeholder="Resultado" required data-astro-cid-j7pv25f6> </div> <button type="submit" data-astro-cid-j7pv25f6>Registrarme</button> <div id="form-message" class="message" style="display: none;" data-astro-cid-j7pv25f6></div> </form> </section> </main> <script>\n            // Generate captcha on page load\n            function generateCaptcha() {\n                const num1 = Math.floor(Math.random() * 10) + 1;\n                const num2 = Math.floor(Math.random() * 10) + 1;\n                const question = `${num1} + ${num2}`;\n                const answer = num1 + num2;\n                document.getElementById("captcha-question").textContent = question;\n                return answer;\n            }\n\n            let captchaAnswer = generateCaptcha();\n\n            document\n                .getElementById("registration-form")\n                .addEventListener("submit", async (e) => {\n                    e.preventDefault();\n                    const emailInput = document.getElementById("email");\n                    const captchaInput = document.getElementById("captcha");\n                    const formMessage = document.getElementById("form-message");\n                    const email = emailInput.value;\n                    const captchaValue = parseInt(captchaInput.value);\n\n                    formMessage.style.display = "none"; // Ocultar mensaje anterior\n\n                    // Check captcha\n                    if (captchaValue !== captchaAnswer) {\n                        formMessage.textContent = "Captcha incorrecto. Int\xE9ntalo de nuevo.";\n                        formMessage.className = "message error";\n                        formMessage.style.display = "block";\n                        captchaAnswer = generateCaptcha(); // Regenerate captcha\n                        captchaInput.value = "";\n                        return;\n                    }\n\n                    try {\n                        const response = await fetch("/api/register-email", {\n                            method: "POST",\n                            headers: {\n                                "Content-Type": "application/json",\n                            },\n                            body: JSON.stringify({ email }),\n                        });\n\n                        const data = await response.json();\n\n                        if (response.ok) {\n                            formMessage.textContent = data.message; // Mostrar mensaje de \xE9xito desde la API\n                            formMessage.className = "message success";\n                            emailInput.value = ""; // Limpiar campo\n                            captchaInput.value = ""; // Limpiar captcha\n                            captchaAnswer = generateCaptcha(); // Regenerate for next time\n                        } else {\n                            formMessage.textContent =\n                                data.message || "Hubo un error en el registro.";\n                            formMessage.className = "message error";\n                        }\n                    } catch (error) {\n                        console.error("Error al enviar el formulario:", error);\n                        formMessage.textContent =\n                            "Ocurri\xF3 un error de conexi\xF3n. Int\xE9ntalo de nuevo m\xE1s tarde.";\n                        formMessage.className = "message error";\n                    } finally {\n                        formMessage.style.display = "block"; // Mostrar el mensaje\n                    }\n                });\n        <\/script> </body> </html>'], ['<html lang="en" data-astro-cid-j7pv25f6> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.jpeg"><meta name="viewport" content="width=device-width"><meta name="generator"', "><title>Rifa Grisha - Reg\xEDstrate</title>", "</head> <body data-astro-cid-j7pv25f6> ", ' <main data-astro-cid-j7pv25f6> <!-- Development Warning Banner --> <div class="development-warning" data-astro-cid-j7pv25f6> <div class="warning-content" data-astro-cid-j7pv25f6> <span class="warning-icon" data-astro-cid-j7pv25f6>\u26A0\uFE0F</span> <strong data-astro-cid-j7pv25f6>AVISO IMPORTANTE:</strong> Esta es una versi\xF3n de desarrollo. La rifa oficial a\xFAn no est\xE1 disponible.\n<span class="warning-icon" data-astro-cid-j7pv25f6>\u26A0\uFE0F</span> </div> </div> ', " ", " ", " ", ' <section class="registration-section" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Reg\xEDstrate para Participar</h2> <p data-astro-cid-j7pv25f6>\nIngresa tu correo electr\xF3nico para recibir las instrucciones\n                    de pago y participar en la rifa.\n</p> <form id="registration-form" data-astro-cid-j7pv25f6> <input type="email" id="email" name="email" placeholder="tu@correo.com" required data-astro-cid-j7pv25f6> <div id="captcha-section" data-astro-cid-j7pv25f6> <label for="captcha" data-astro-cid-j7pv25f6>Resuelve esta suma para verificar: <span id="captcha-question" data-astro-cid-j7pv25f6></span></label> <input type="number" id="captcha" name="captcha" placeholder="Resultado" required data-astro-cid-j7pv25f6> </div> <button type="submit" data-astro-cid-j7pv25f6>Registrarme</button> <div id="form-message" class="message" style="display: none;" data-astro-cid-j7pv25f6></div> </form> </section> </main> <script>\n            // Generate captcha on page load\n            function generateCaptcha() {\n                const num1 = Math.floor(Math.random() * 10) + 1;\n                const num2 = Math.floor(Math.random() * 10) + 1;\n                const question = \\`\\${num1} + \\${num2}\\`;\n                const answer = num1 + num2;\n                document.getElementById("captcha-question").textContent = question;\n                return answer;\n            }\n\n            let captchaAnswer = generateCaptcha();\n\n            document\n                .getElementById("registration-form")\n                .addEventListener("submit", async (e) => {\n                    e.preventDefault();\n                    const emailInput = document.getElementById("email");\n                    const captchaInput = document.getElementById("captcha");\n                    const formMessage = document.getElementById("form-message");\n                    const email = emailInput.value;\n                    const captchaValue = parseInt(captchaInput.value);\n\n                    formMessage.style.display = "none"; // Ocultar mensaje anterior\n\n                    // Check captcha\n                    if (captchaValue !== captchaAnswer) {\n                        formMessage.textContent = "Captcha incorrecto. Int\xE9ntalo de nuevo.";\n                        formMessage.className = "message error";\n                        formMessage.style.display = "block";\n                        captchaAnswer = generateCaptcha(); // Regenerate captcha\n                        captchaInput.value = "";\n                        return;\n                    }\n\n                    try {\n                        const response = await fetch("/api/register-email", {\n                            method: "POST",\n                            headers: {\n                                "Content-Type": "application/json",\n                            },\n                            body: JSON.stringify({ email }),\n                        });\n\n                        const data = await response.json();\n\n                        if (response.ok) {\n                            formMessage.textContent = data.message; // Mostrar mensaje de \xE9xito desde la API\n                            formMessage.className = "message success";\n                            emailInput.value = ""; // Limpiar campo\n                            captchaInput.value = ""; // Limpiar captcha\n                            captchaAnswer = generateCaptcha(); // Regenerate for next time\n                        } else {\n                            formMessage.textContent =\n                                data.message || "Hubo un error en el registro.";\n                            formMessage.className = "message error";\n                        }\n                    } catch (error) {\n                        console.error("Error al enviar el formulario:", error);\n                        formMessage.textContent =\n                            "Ocurri\xF3 un error de conexi\xF3n. Int\xE9ntalo de nuevo m\xE1s tarde.";\n                        formMessage.className = "message error";\n                    } finally {\n                        formMessage.style.display = "block"; // Mostrar el mensaje\n                    }\n                });\n        <\/script> </body> </html>'])), addAttribute(Astro2.generator, "content"), renderHead(), renderComponent($$result, "HeaderGrisha", $$HeaderGrisha, { "data-astro-cid-j7pv25f6": true }), renderComponent($$result, "RaffleDetails", $$RaffleDetails, { "data-astro-cid-j7pv25f6": true }), renderComponent($$result, "ImageGallery", $$ImageGallery, { "title": "Galer\xEDa de la Guitarra Grisha", "data-astro-cid-j7pv25f6": true }), renderComponent($$result, "VideoEmbed", $$VideoEmbed, { "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "title": "Descubre las cualidades de esta incre\xEDble guitarra", "data-astro-cid-j7pv25f6": true }), renderComponent($$result, "RafflePurchase", $$RafflePurchase, { "data-astro-cid-j7pv25f6": true }));
}, "/home/jimp/develop/astro/rifa_grisha/src/pages/index.astro", void 0);

const $$file = "/home/jimp/develop/astro/rifa_grisha/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
