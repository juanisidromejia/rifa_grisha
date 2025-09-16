import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CtxswEsi.mjs';
import { manifest } from './manifest_Bc7pFh1M.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/login.astro.mjs');
const _page2 = () => import('./pages/admin.astro.mjs');
const _page3 = () => import('./pages/api/admin/assign-raffle-numbers.astro.mjs');
const _page4 = () => import('./pages/api/admin/confirm-payment.astro.mjs');
const _page5 = () => import('./pages/api/admin/congratulate-winner.astro.mjs');
const _page6 = () => import('./pages/api/admin/login.astro.mjs');
const _page7 = () => import('./pages/api/admin/logout.astro.mjs');
const _page8 = () => import('./pages/api/admin/save-raffle-numbers.astro.mjs');
const _page9 = () => import('./pages/api/admin/send-raffles.astro.mjs');
const _page10 = () => import('./pages/api/admin/users.astro.mjs');
const _page11 = () => import('./pages/api/check-raffle-number.astro.mjs');
const _page12 = () => import('./pages/api/register-email.astro.mjs');
const _page13 = () => import('./pages/api/save=raffle-numbers.astro.mjs');
const _page14 = () => import('./pages/api/send-payment-data.astro.mjs');
const _page15 = () => import('./pages/api/test.astro.mjs');
const _page16 = () => import('./pages/api/verify-email.astro.mjs');
const _page17 = () => import('./pages/payment-instructions.astro.mjs');
const _page18 = () => import('./pages/seleccionar-rifas.astro.mjs');
const _page19 = () => import('./pages/verify-email.astro.mjs');
const _page20 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/login.astro", _page1],
    ["src/pages/admin/index.astro", _page2],
    ["src/pages/api/admin/assign-raffle-numbers.ts", _page3],
    ["src/pages/api/admin/confirm-payment.ts", _page4],
    ["src/pages/api/admin/congratulate-winner.ts", _page5],
    ["src/pages/api/admin/login.ts", _page6],
    ["src/pages/api/admin/logout.ts", _page7],
    ["src/pages/api/admin/save-raffle-numbers.ts", _page8],
    ["src/pages/api/admin/send-raffles.ts", _page9],
    ["src/pages/api/admin/users.ts", _page10],
    ["src/pages/api/check-raffle-number.ts", _page11],
    ["src/pages/api/register-email.ts", _page12],
    ["src/pages/api/save=raffle-numbers.ts", _page13],
    ["src/pages/api/send-payment-data.ts", _page14],
    ["src/pages/api/test.ts", _page15],
    ["src/pages/api/verify-email.ts", _page16],
    ["src/pages/payment-instructions.astro", _page17],
    ["src/pages/seleccionar-rifas.astro", _page18],
    ["src/pages/verify-email.astro", _page19],
    ["src/pages/index.astro", _page20]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "ece3d061-bdbd-4b6b-9d8a-d80b99ada04a",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
