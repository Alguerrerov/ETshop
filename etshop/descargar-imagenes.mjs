// Descarga las imágenes del catálogo (public/data/dispositivos.json) y las guarda dentro de la app.
// Uso (desde la carpeta etshop/):  node descargar-imagenes.mjs
// - Las imágenes quedan en public/img/dispositivos/ y el JSON pasa a apuntar a ellas.
// - Es seguro repetirlo: solo intenta descargar las URLs que sigan siendo remotas.
// - Si alguna falla, se deja su URL original y se indica cómo ponerla a mano.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const RUTA_JSON = 'public/data/dispositivos.json';
const CARPETA = 'public/img/dispositivos';
const PREFIJO_APP = 'img/dispositivos'; // ruta relativa que usará la app

const EXTENSIONES = {
  'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/png': 'png',
  'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif',
};

const esRemota = (valor) => /^https?:\/\//i.test(valor);

async function descargar(url, rutaSinExtension) {
  const respuesta = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36',
      'Accept': 'image/avif,image/webp,image/*,*/*;q=0.8',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(20000),
  });
  if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

  const tipo = (respuesta.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  const extension = EXTENSIONES[tipo];
  if (!extension) throw new Error(`no es una imagen (${tipo || 'sin tipo'})`);

  const datos = Buffer.from(await respuesta.arrayBuffer());
  if (datos.length < 1000) throw new Error('archivo demasiado pequeño, probablemente no es la imagen');

  writeFileSync(`${rutaSinExtension}.${extension}`, datos);
  return extension;
}

const dispositivos = JSON.parse(readFileSync(RUTA_JSON, 'utf8'));
mkdirSync(CARPETA, { recursive: true });

const yaDescargadas = new Map(); // URL -> ruta local (misma imagen usada dos veces)
const fallos = [];
let correctas = 0;

async function procesar(url, nombreBase, descripcion) {
  if (!esRemota(url)) return url; // ya es local
  if (yaDescargadas.has(url)) return yaDescargadas.get(url);
  try {
    const extension = await descargar(url, `${CARPETA}/${nombreBase}`);
    const rutaApp = `${PREFIJO_APP}/${nombreBase}.${extension}`;
    yaDescargadas.set(url, rutaApp);
    correctas++;
    console.log(`  ✔ ${descripcion} -> ${rutaApp}`);
    return rutaApp;
  } catch (error) {
    fallos.push({ descripcion, url, nombreBase, motivo: error.message });
    console.log(`  ✘ ${descripcion}: ${error.message}`);
    return url; // se conserva la URL remota
  }
}

for (const d of dispositivos) {
  d.imagenPrincipal = await procesar(d.imagenPrincipal, `${d.id}-0`, `${d.nombre} (principal)`);
  for (let i = 0; i < d.galeria.length; i++) {
    d.galeria[i] = await procesar(d.galeria[i], `${d.id}-${i + 1}`, `${d.nombre} (galería ${i + 1})`);
  }
}

writeFileSync(RUTA_JSON, JSON.stringify(dispositivos, null, 2) + '\n');

console.log(`\nDescargadas: ${correctas}. Con error: ${fallos.length}.`);
if (fallos.length > 0) {
  console.log('\nLas que fallaron siguen apuntando a su URL original (en la app se verá la imagen de reemplazo');
  console.log('si no hay conexión). Para ponerlas a mano: descarga la imagen, guárdala en public/img/dispositivos/');
  console.log('y cambia su ruta en public/data/dispositivos.json por "img/dispositivos/<archivo>". Pendientes:');
  for (const f of fallos) console.log(`  - ${f.descripcion}  (guárdala como ${f.nombreBase}.jpg)\n    ${f.url}\n    motivo: ${f.motivo}`);
}
