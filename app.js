/* Jardín de Niños Azul y Rosa: contacto, precios, navegación por secciones y calendario.
   Depende de js/config.js (KINDER y EVENTOS). */
/* ---------- Contact links ---------- */
const telHref = "tel:+52" + KINDER.telefono;
const waHref = "https://wa.me/" + KINDER.whatsapp + "?text=" + encodeURIComponent(KINDER.mensajeWhatsapp);
document.querySelectorAll("[data-tel]").forEach(a => a.href = telHref);
document.querySelectorAll("[data-wa]").forEach(a => a.href = waHref);
document.getElementById("telText").textContent = "Tel. " + KINDER.telefonoTexto;
document.getElementById("waText").textContent = KINDER.whatsappTexto;
document.getElementById("telLegal").textContent = KINDER.telefonoTexto;
document.getElementById("gmaps").href = "https://www.google.com/maps/search/?api=1&query=" + KINDER.lat + "," + KINDER.lng;
document.getElementById("waze").href = "https://waze.com/ul?ll=" + KINDER.lat + "," + KINDER.lng + "&navigate=yes";
const fb = document.getElementById("fbLink");
if (KINDER.facebook) fb.href = KINDER.facebook; else { fb.removeAttribute("target"); fb.removeAttribute("href"); fb.style.cursor = "default"; }

/* ---------- Prices ---------- */
const money = n => "$" + n.toLocaleString("es-MX");
const lista = arr => arr.map(p =>
  `<li><div class="what">${p.concepto}<small>${p.detalle}</small></div><span class="dots"></span>` +
  (p.precio == null ? `<span class="tbd">Por confirmar</span>` : `<span class="amt">${money(p.precio)}</span>`) + `</li>`
).join("");
document.getElementById("priceInsc").innerHTML = lista(KINDER.inscripcion);
document.getElementById("priceMes").innerHTML = lista(KINDER.mensual);
document.getElementById("totalInsc").textContent = money(KINDER.inscripcion.reduce((s,p) => s + (p.precio || 0), 0));
/* ---------- Router: buttons + JS (works inside embedded viewers), back button via history when allowed ---------- */
const ROUTES = ["inicio","servicios","costos","calendario","visitanos","privacidad"];
function show(r){
  if (!ROUTES.includes(r)) r = "inicio";
  document.querySelectorAll(".page").forEach(p => p.classList.toggle("on", p.id === "p-" + r));
  document.querySelectorAll(".nav button").forEach(b => {
    const cur = b.dataset.r === r || (r === "privacidad" && b.dataset.r === "visitanos");
    cur ? b.setAttribute("aria-current","page") : b.removeAttribute("aria-current");
  });
  window.scrollTo(0,0);
}
function go(r){
  show(r);
  try { history.pushState({ r }, "", "#" + r); } catch (e) {}
}
document.addEventListener("click", e => {
  const el = e.target.closest("[data-go]");
  if (!el) return;
  e.preventDefault();
  go(el.dataset.go);
});
addEventListener("popstate", e => {
  let r = e.state && e.state.r;
  if (!r) { try { r = location.hash.slice(1); } catch (err) {} }
  show(r);
});
let inicial = "inicio";
try { inicial = location.hash.slice(1) || "inicio"; history.replaceState({ r: inicial }, ""); } catch (e) {}
show(inicial);

/* ---------- Calendar ---------- */
const MES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const MES3 = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
const DIA = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
const P = s => { const [y,m,d] = s.split("-").map(Number); return new Date(y, m-1, d); };
const EV = EVENTOS.map(x => ({...x, s:P(x.d), f:P(x.e || x.d)}));
const hoy = new Date(); hoy.setHours(0,0,0,0);
const PRIORITY = { vac:1, kinder:2, aviso:3, sin:4 };

function rango(ev){
  const a = ev.s, b = ev.f;
  if (+a === +b) return `${DIA[a.getDay()]} ${a.getDate()} de ${MES[a.getMonth()]}`;
  if (a.getMonth() === b.getMonth()) return `Del ${a.getDate()} al ${b.getDate()} de ${MES[a.getMonth()]}`;
  return `Del ${a.getDate()} de ${MES[a.getMonth()]} al ${b.getDate()} de ${MES[b.getMonth()]}`;
}
function cuando(ev){
  if (ev.s <= hoy && ev.f >= hoy) return "Hoy";
  const n = Math.round((ev.s - hoy) / 864e5);
  if (n === 1) return "Mañana";
  if (n < 7) return `En ${n} días`;
  if (n < 14) return "La próxima semana";
  return "";
}
const nota = ev => ev.tentativo ? ' <span class="tbd">Fecha por confirmar</span>' : "";

// "Lo que viene"
const prox = EV.filter(e => e.f >= hoy).sort((a,b) => a.s - b.s).slice(0,4);
document.getElementById("nextList").innerHTML = prox.length ? prox.map(e => {
  const w = cuando(e);
  return `<li><div class="dchip k-${e.k}"><b>${e.s.getDate()}</b><small>${MES3[e.s.getMonth()]}</small></div>
    <div class="txt"><b>${e.t}</b><span>${w ? w + ". " : ""}${rango(e)}</span>${nota(e)}</div></li>`;
}).join("") : `<li class="empty">El ciclo escolar terminó. Pronto publicaremos el calendario del siguiente ciclo.</li>`;

// Month view
const FIRST = new Date(2026,7,1), LAST = new Date(2027,6,1);
let cur = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
if (cur < FIRST) cur = new Date(FIRST); if (cur > LAST) cur = new Date(LAST);

function pinta(){
  const y = cur.getFullYear(), m = cur.getMonth();
  document.getElementById("mTitle").textContent = `${MES[m]} ${y}`;
  document.getElementById("prevM").disabled = +cur <= +FIRST;
  document.getElementById("nextM").disabled = +cur >= +LAST;
  let h = ["L","M","M","J","V","S","D"].map(d => `<div class="dow" aria-hidden="true">${d}</div>`).join("");
  const off = (new Date(y,m,1).getDay() + 6) % 7, dias = new Date(y,m+1,0).getDate();
  for (let i=0;i<off;i++) h += `<div class="cell blank"></div>`;
  for (let d=1; d<=dias; d++){
    const f = new Date(y,m,d), dw = f.getDay();
    const hit = EV.filter(e => e.s <= f && e.f >= f).sort((a,b) => PRIORITY[b.k] - PRIORITY[a.k])[0];
    let c = "cell";
    if (hit && !(hit.k === "vac" && (dw === 0 || dw === 6))) c += " k-" + hit.k;
    else if (dw === 0 || dw === 6) c += " we";
    if (+f === +hoy) c += " today"; else if (f < hoy) c += " past";
    h += `<div class="${c}" ${hit ? `title="${hit.t}"` : ""}>${d}</div>`;
  }
  document.getElementById("mGrid").innerHTML = h;
  const ini = new Date(y,m,1), fin = new Date(y,m+1,0);
  const lst = EV.filter(e => e.s <= fin && e.f >= ini);
  document.getElementById("mList").innerHTML = lst.length ? lst.map(e =>
    `<li><span class="bar k-${e.k}"></span><div class="what"><b>${e.t}</b>${nota(e)}<small>${rango(e)}</small></div></li>`
  ).join("") : `<li class="empty">Mes sin días festivos. Clases normales de lunes a viernes.</li>`;
}
document.getElementById("prevM").onclick = () => { cur = new Date(cur.getFullYear(), cur.getMonth()-1, 1); pinta(); };
document.getElementById("nextM").onclick = () => { cur = new Date(cur.getFullYear(), cur.getMonth()+1, 1); pinta(); };
pinta();
