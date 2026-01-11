// script.js - variant-aware product rendering with modal design view

// Products: each product has multiple "designs" (variants). Each design has its own affiliate link.
const products = [
  {id:1,name:"Stylish Kurti Set",category:"Fashion",rating:4.4,trending:true,designs:[
    {designId:101,designName:"Red Floral",price:799,platform:"Meesho",image:"https://picsum.photos/seed/kurti-red/800/800",affiliateLink:"https://meesho.com/product/12345?ref=aff_red"},
    {designId:102,designName:"Blue Printed",price:899,platform:"Amazon",image:"https://picsum.photos/seed/kurti-blue/800/800",affiliateLink:"https://www.amazon.in/dp/B08KURTI?tag=yourtag-21"}
  ]},
  {id:2,name:"Elegant Saree",category:"Fashion",rating:4.6,trending:false,designs:[
    {designId:201,designName:"Peach Elegance",price:1299,platform:"Amazon",image:"https://picsum.photos/seed/saree-peach/800/800",affiliateLink:"https://www.amazon.in/dp/B08SAREE?tag=yourtag-21"},
    {designId:202,designName:"Green Charm",price:1399,platform:"Meesho",image:"https://picsum.photos/seed/saree-green/800/800",affiliateLink:"https://meesho.com/product/22222?ref=aff_green"}
  ]},
  {id:3,name:"Hydrating Face Serum",category:"Beauty",rating:4.2,trending:true,designs:[
    {designId:301,designName:"30ml",price:499,platform:"Meesho",image:"https://picsum.photos/seed/serum-30/800/800",affiliateLink:"https://meesho.com/product/23456?ref=aff_30ml"},
    {designId:302,designName:"50ml",price:699,platform:"Amazon",image:"https://picsum.photos/seed/serum-50/800/800",affiliateLink:"https://www.amazon.in/dp/B08SERUM?tag=yourtag-21"}
  ]},
  {id:4,name:"Non-stick Cookware Set",category:"Home & Kitchen",rating:4.5,trending:false,designs:[
    {designId:401,designName:"6-piece",price:2499,platform:"Amazon",image:"https://picsum.photos/seed/cookware-6/800/800",affiliateLink:"https://www.amazon.in/dp/B07COOKSET?tag=yourtag-21"},
    {designId:402,designName:"8-piece Deluxe",price:3499,platform:"Meesho",image:"https://picsum.photos/seed/cookware-8/800/800",affiliateLink:"https://meesho.com/product/44444?ref=aff_deluxe"}
  ]},
  {id:5,name:"Blender & Mixer",category:"Home & Kitchen",rating:4.1,trending:true,designs:[
    {designId:501,designName:"600W Mixer",price:1999,platform:"Meesho",image:"https://picsum.photos/seed/blender-600/800/800",affiliateLink:"https://meesho.com/product/34567?ref=aff_600w"},
    {designId:502,designName:"800W Pro",price:2799,platform:"Amazon",image:"https://picsum.photos/seed/blender-800/800/800",affiliateLink:"https://www.amazon.in/dp/B08BLEND?tag=yourtag-21"}
  ]},
  {id:6,name:"Wireless Earbuds",category:"Electronics",rating:4.0,trending:true,designs:[
    {designId:601,designName:"Black",price:1499,platform:"Amazon",image:"https://picsum.photos/seed/earbuds-black/800/800",affiliateLink:"https://www.amazon.in/dp/B07EARBUDS?tag=yourtag-21"},
    {designId:602,designName:"White",price:1599,platform:"Meesho",image:"https://picsum.photos/seed/earbuds-white/800/800",affiliateLink:"https://meesho.com/product/66666?ref=aff_white"}
  ]},
  {id:7,name:"Smartwatch Classic",category:"Electronics",rating:4.3,trending:false,designs:[
    {designId:701,designName:"Leather Band",price:3499,platform:"Meesho",image:"https://picsum.photos/seed/watch-leather/800/800",affiliateLink:"https://meesho.com/product/45678?ref=aff_leather"},
    {designId:702,designName:"Sport Band",price:3799,platform:"Amazon",image:"https://picsum.photos/seed/watch-sport/800/800",affiliateLink:"https://www.amazon.in/dp/B08WATCH?tag=yourtag-21"}
  ]},
  {id:8,name:"Designer Handbag",category:"Accessories",rating:4.5,trending:true,designs:[
    {designId:801,designName:"Small",price:2199,platform:"Amazon",image:"https://picsum.photos/seed/handbag-small/800/800",affiliateLink:"https://www.amazon.in/dp/B08HANDBAG?tag=yourtag-21"},
    {designId:802,designName:"Large",price:2799,platform:"Meesho",image:"https://picsum.photos/seed/handbag-large/800/800",affiliateLink:"https://meesho.com/product/77777?ref=aff_large"}
  ]},
  {id:9,name:"Silk Pillow Covers (2)",category:"Home & Kitchen",rating:4.7,trending:false,designs:[
    {designId:901,designName:"Standard",price:699,platform:"Amazon",image:"https://picsum.photos/seed/pillow-std/800/800",affiliateLink:"https://www.amazon.in/dp/B08PILLOW?tag=yourtag-21"},
    {designId:902,designName:"Queen",price:799,platform:"Meesho",image:"https://picsum.photos/seed/pillow-queen/800/800",affiliateLink:"https://meesho.com/product/88888?ref=aff_queen"}
  ]},
  {id:10,name:"Matte Lipstick Set",category:"Beauty",rating:4.2,trending:true,designs:[
    {designId:1001,designName:"3-Shade Pack",price:599,platform:"Meesho",image:"https://picsum.photos/seed/lipstick-3/800/800",affiliateLink:"https://meesho.com/product/56789?ref=aff_3pack"},
    {designId:1002,designName:"5-Shade Gift",price:999,platform:"Amazon",image:"https://picsum.photos/seed/lipstick-5/800/800",affiliateLink:"https://www.amazon.in/dp/B08LIPSTICK?tag=yourtag-21"}
  ]}
];

// derive categories from products
const categories = [{key:'All',emoji:'🛍️'}];
const categoryIcons = { 'Fashion':'👗','Beauty':'💄','Home & Kitchen':'🏡','Electronics':'🔌','Accessories':'👜' };
products.forEach(p=>{ if(!categories.find(c=>c.key===p.category)){ categories.push({key:p.category,emoji:categoryIcons[p.category]||'🛍️'}); } });

// State
let state = {
  category: 'All',
  query: '',
  sort: 'default',
  platform: 'All',
  selectedProduct: null,
  selectedDesign: null
};

// Helpers
const el = (sel)=>document.querySelector(sel);
const formatPrice = p => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(p);

// Render categories
function renderCategories(){
  const wrap = el('#category-list');
  wrap.innerHTML = '';
  categories.forEach(c=>{
    const card = document.createElement('button');
    card.className = 'category-card';
    card.innerHTML = `<div class="cat-emoji">${c.emoji}</div><div class="cat-name">${c.key}</div>`;
    card.setAttribute('aria-pressed','false');
    card.addEventListener('click',()=>{ state.category = c.key; filterAndRender(); card.focus(); });
    wrap.appendChild(card);
  });
  // populate category dropdown
  const catSelect = el('#category-filter'); if(catSelect){ catSelect.innerHTML = ''; categories.forEach(c=>{ const op=document.createElement('option'); op.value=c.key; op.textContent=c.key; catSelect.appendChild(op); }); }
}

// Apply filters and sorting
function getFiltered(){
  let list = products.slice();
  if(state.category !== 'All') list = list.filter(p=>p.category === state.category);
  if(state.platform && state.platform !== 'All') list = list.filter(p=> p.designs.some(d=>d.platform === state.platform));
  if(state.query) list = list.filter(p=>p.name.toLowerCase().includes(state.query.toLowerCase()));
  const priceOf = p => Math.min(...p.designs.map(d=>d.price));
  if(state.sort === 'low') list.sort((a,b)=> priceOf(a)-priceOf(b));
  else if(state.sort === 'high') list.sort((a,b)=> priceOf(b)-priceOf(a));
  else if(state.sort === 'trending') list.sort((a,b)=> (b.trending?1:0)-(a.trending?1:0));
  return list;
}

function renderProducts(){
  const grid = el('#product-grid');
  grid.innerHTML = '';
  const list = getFiltered();
  if(list.length === 0){ grid.innerHTML = '<p>No products found.</p>'; return; }
  list.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'product-card';
    const thumbSrc = p.designs && p.designs.length ? p.designs[0].image : '';
    const img = document.createElement('img'); img.src=thumbSrc; img.alt=p.name; img.className='product-thumb'; img.loading='lazy'; img.decoding='async'; img.width=96; img.height=96;
    const info = document.createElement('div'); info.className='product-info';
    const title = document.createElement('h3'); title.className='product-title'; title.textContent = p.name;
    // compute starting price
    const minPrice = Math.min(...p.designs.map(d=>d.price));
    const priceRow = document.createElement('div'); priceRow.className='price-row';
    const price = document.createElement('div'); price.className='price'; price.textContent = `From ${formatPrice(minPrice)}`;
    const rating = document.createElement('div'); rating.className='rating'; rating.textContent = `⭐ ${p.rating}`;
    priceRow.append(price, rating);

    const ctas = document.createElement('div'); ctas.className='card-ctas';
    const viewBtn = document.createElement('button'); viewBtn.className='small btn outline'; viewBtn.textContent='View Designs';
    viewBtn.addEventListener('click', ()=> openDesignModal(p.id));
    ctas.append(viewBtn);

    info.append(title, priceRow, ctas);
    card.append(img, info);
    grid.appendChild(card);
  });
}

function renderDeals(){
  const wrap = el('#deals-grid'); wrap.innerHTML = '';
  const dealDesigns = [];
  products.forEach(p=>{
    p.designs.forEach(d=>{ if(d.originalPrice && d.originalPrice > d.price){ dealDesigns.push({product:p,design:d}); } });
  });
  dealDesigns.slice(0,6).forEach(item=>{
    const p=item.product; const d=item.design;
    const card=document.createElement('div'); card.className='deal-card';
    const img=document.createElement('img'); img.src=d.image; img.alt=d.designName; img.className='product-thumb'; img.loading='lazy'; img.decoding='async'; img.width=96; img.height=96;
    const info=document.createElement('div'); info.style.flex='1';
    const title=document.createElement('h4'); title.textContent=`${p.name} — ${d.designName}`; title.style.margin='0 0 6px';
    const percent = Math.round((1 - d.price/d.originalPrice)*100);
    const badge=document.createElement('div'); badge.className='discount-badge'; badge.textContent = `🔥 ${percent}% OFF`;
    const pj=document.createElement('div'); pj.style.display='flex'; pj.style.gap='8px'; pj.style.alignItems='center';
    const price=document.createElement('div'); price.className='price'; price.textContent=formatPrice(d.price);
    const btn=document.createElement('a'); btn.className='small btn primary'; btn.textContent=`Buy on ${d.platform}`; btn.href=d.affiliateLink; btn.target='_blank'; btn.rel='noopener noreferrer';
    pj.append(price, btn);
    info.append(title, badge, pj);
    card.append(img, info);
    wrap.appendChild(card);
  });
}

// Combined render
function filterAndRender(){ renderProducts(); renderDeals(); highlightActiveCategory(); }

// UI wiring
function setup(){
  renderCategories(); filterAndRender();
  // Search
  el('#search').addEventListener('input', (e)=>{ state.query = e.target.value; filterAndRender(); });
  // Category select
  const catSel = el('#category-filter'); if(catSel) catSel.addEventListener('change',(e)=>{ state.category = e.target.value; filterAndRender(); });
  // Platform filter
  const platSel = el('#platform-filter'); if(platSel) platSel.addEventListener('change',(e)=>{ state.platform = e.target.value; filterAndRender(); });
  // Sort
  el('#sort').addEventListener('change', (e)=>{ state.sort = e.target.value; filterAndRender(); });
  // Hero CTAs
  el('#shop-trending').addEventListener('click', ()=>{ state.sort='trending'; filterAndRender(); window.scrollTo({top:document.querySelector('#products').offsetTop-60,behavior:'smooth'}); });
  el('#explore-deals').addEventListener('click', ()=>{ window.location.hash='#deals'; document.querySelector('#deals').scrollIntoView({behavior:'smooth'}); });
  // Sticky bar
  el('#sticky-trending').addEventListener('click', ()=>{ state.sort='trending'; filterAndRender(); window.scrollTo({top:document.querySelector('#products').offsetTop-60,behavior:'smooth'}); });
  el('#sticky-deals').addEventListener('click', ()=>{ window.location.hash='#deals'; document.querySelector('#deals').scrollIntoView({behavior:'smooth'}); });
  // Nav toggle for mobile
  el('#nav-toggle').addEventListener('click', ()=>{ document.querySelector('.top-nav').classList.toggle('hidden'); });
  // Modal events
  el('#modal-close').addEventListener('click', closeDesignModal);
  el('#modal-backdrop').addEventListener('click', closeDesignModal);
}

function highlightActiveCategory(){
  const buttons = document.querySelectorAll('.category-card');
  buttons.forEach(btn=>{
    const name = btn.querySelector('.cat-name').textContent;
    if(name === state.category){ btn.style.boxShadow = '0 12px 30px rgba(255,107,129,0.12)'; btn.setAttribute('aria-pressed','true'); btn.setAttribute('aria-current','true'); }
    else{ btn.style.boxShadow = ''; btn.setAttribute('aria-pressed','false'); btn.removeAttribute('aria-current'); }
  });
}

// Modal and design view
function openDesignModal(productId){
  const modal = el('#design-modal'); const grid = el('#designs-grid');
  const product = products.find(p=>p.id===productId); if(!product) return;
  state.selectedProduct = product; state.selectedDesign = null;
  el('#modal-title').textContent = product.name + ' — Designs';
  grid.innerHTML = '';
  product.designs.forEach(d=>{
    const card = document.createElement('div'); card.className='design-card';
    const img = document.createElement('img'); img.src=d.image; img.alt=d.designName; img.className='design-thumb'; img.loading='lazy';
    const name = document.createElement('div'); name.className='design-name'; name.textContent = d.designName;
    const meta = document.createElement('div'); meta.className='design-meta';
    const price = document.createElement('div'); price.className='price'; price.textContent = formatPrice(d.price);
    const badge = document.createElement('div'); badge.className='source-badge'; badge.textContent = d.platform;
    meta.append(price,badge);
    const buy = document.createElement('a'); buy.className='btn primary small'; buy.textContent = 'Buy This Design'; buy.href = d.affiliateLink; buy.target='_blank'; buy.rel='noopener noreferrer';
    card.append(img,name,meta,buy);
    card.addEventListener('click', ()=> selectDesign(d, card));
    grid.appendChild(card);
  });
  modal.classList.remove('hidden'); modal.setAttribute('aria-hidden','false'); updateSelectedInfo();
}

function closeDesignModal(){ const modal = el('#design-modal'); modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true'); state.selectedProduct=null; state.selectedDesign=null; }

function selectDesign(design, cardEl){ document.querySelectorAll('.design-card').forEach(c=>c.classList.remove('design-selected')); cardEl.classList.add('design-selected'); state.selectedDesign = design; updateSelectedInfo(); }

function updateSelectedInfo(){ const info = el('#selected-info'); const buy = el('#selected-buy'); if(state.selectedDesign){ info.textContent = `${state.selectedProduct.name} — ${state.selectedDesign.designName} • ${formatPrice(state.selectedDesign.price)}`; buy.href = state.selectedDesign.affiliateLink; buy.removeAttribute('disabled'); buy.style.pointerEvents='auto'; } else { info.textContent = 'Select a design to buy'; buy.href = '#'; buy.setAttribute('disabled','true'); buy.style.pointerEvents='none'; } }

// Initialize
document.addEventListener('DOMContentLoaded', setup);

// Analytics & Consent handling
function loadAnalytics(){
  if(window._analyticsLoaded) return;
  const GA_ID = 'G-XXXXXXX'; // replace with your real ID
  const s = document.createElement('script'); s.async=true; s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);} window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
  window._analyticsLoaded = true;
}

function showConsentBanner(){
  const banner = el('#consent-banner');
  const stored = localStorage.getItem('cookie_consent');
  if(stored === null){ banner.hidden = false; }
  else{ banner.hidden = true; if(stored === 'granted') loadAnalytics(); }
  el('#consent-accept').addEventListener('click', ()=>{ localStorage.setItem('cookie_consent','granted'); banner.hidden=true; loadAnalytics(); });
  el('#consent-decline').addEventListener('click', ()=>{ localStorage.setItem('cookie_consent','denied'); banner.hidden=true; });
}

showConsentBanner();
