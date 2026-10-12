import {readFile, writeFile, mkdir, copyFile, readdir} from 'node:fs/promises';
import {business as b} from './src/business.mjs';
const escape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let html = await readFile('src/page.html','utf8');
const maps = 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(b.address);
const schema = {'@context':'https://schema.org','@type':'Restaurant', name:b.name, telephone:'+5588999344206', servesCuisine:'Hambúrgueres',hasMenu:b.menu,address:{'@type':'PostalAddress',streetAddress:'Avenida Prefeito Jaques Nunes, 2350, vila salles, 12 - Rodoviaria',addressLocality:'Tianguá',addressRegion:'CE',postalCode:'62320-001',addressCountry:'BR'}};
const values = {...b, maps, schema:JSON.stringify(schema).replace(/</g,'\\u003c'), canonical:b.domain?`<link rel="canonical" href="${escape(b.domain)}"><meta property="og:url" content="${escape(b.domain)}"><meta property="og:image" content="${escape(new URL('/assets/burger-1440.webp',b.domain).href)}">`:'',reviews:b.reviews.map(r=>`<figure class="review"><span class="quote-mark" aria-hidden="true">“</span><blockquote>${escape(r.text)}</blockquote><figcaption><span class="avatar" aria-hidden="true">${escape(r.name[0])}</span><span>${escape(r.name)}<small>Depoimento fornecido para o projeto</small></span></figcaption></figure>`).join('')};
html=html.replace(/\{\{(\w+)\}\}/g,(_,k)=>['schema','reviews','canonical'].includes(k)?values[k]:escape(values[k]??''));
await mkdir('dist/assets',{recursive:true});
await writeFile('index.html',html); await writeFile('dist/index.html',html);
for(const f of ['styles.css','details.css','app.js']) await copyFile('src/'+f,'dist/'+f);
// A raiz também funciona por abertura direta do index.html.
for(const f of ['styles.css','details.css','app.js']) await copyFile('src/'+f,f);
for(const f of await readdir('assets')) await copyFile('assets/'+f,'dist/assets/'+f);
if(b.domain){await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(b.domain)}</loc></url></urlset>`);await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml',b.domain).href}\n`);}
console.log('Build concluído: dist/ e index.html.');

