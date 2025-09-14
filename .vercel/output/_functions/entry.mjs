import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_BKxprnJp.mjs';
import { manifest } from './manifest_BKdOwOFL.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/login.astro.mjs');
const _page2 = () => import('./pages/admin.astro.mjs');
const _page3 = () => import('./pages/api/admin/assign-raffle-numbers.astro.mjs');
const _page4 = () => import('./pages/api/admin/confirm-payment.astro.mjs');
const _page5 = () => import('./pages/api/admin/login.astro.mjs');
const _page6 = () => import('./pages/api/admin/logout.astro.mjs');
const _page7 = () => import('./pages/api/admin/save-raffle-numbers.astro.mjs');
const _page8 = () => import('./pages/api/admin/send-raffles.astro.mjs');
const _page9 = () => import('./pages/api/admin/users.astro.mjs');
const _page10 = () => import('./pages/api/check-raffle-number.astro.mjs');
const _page11 = () => import('./pages/api/register-email.astro.mjs');
const _page12 = () => import('./pages/api/save=raffle-numbers.astro.mjs');
const _page13 = () => import('./pages/api/verify-email.astro.mjs');
const _page14 = () => import('./pages/payment-instructions.astro.mjs');
const _page15 = () => import('./pages/seleccionar-rifas.astro.mjs');
const _page16 = () => import('./pages/verify-email.astro.mjs');
const _page17 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/login.astro", _page1],
    ["src/pages/admin/index.astro", _page2],
    ["src/pages/api/admin/assign-raffle-numbers.ts", _page3],
    ["src/pages/api/admin/confirm-payment.ts", _page4],
    ["src/pages/api/admin/login.ts", _page5],
    ["src/pages/api/admin/logout.ts", _page6],
    ["src/pages/api/admin/save-raffle-numbers.ts", _page7],
    ["src/pages/api/admin/send-raffles.ts", _page8],
    ["src/pages/api/admin/users.ts", _page9],
    ["src/pages/api/check-raffle-number.ts", _page10],
    ["src/pages/api/register-email.ts", _page11],
    ["src/pages/api/save=raffle-numbers.ts", _page12],
    ["src/pages/api/verify-email.ts", _page13],
    ["src/pages/payment-instructions.astro", _page14],
    ["src/pages/seleccionar-rifas.astro", _page15],
    ["src/pages/verify-email.astro", _page16],
    ["src/pages/index.astro", _page17]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "d421ad28-e1b9-44e5-a6b7-7aa34e8ce3b8",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
