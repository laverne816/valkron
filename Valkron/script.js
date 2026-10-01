const products=[
{id:1,cat:'Dishwashers & Kitchen Care',brand:'LEXICON PRO',badge:'BESTSELLER',title:'LEXICON PureAqua Zeolith Built-In Dishwasher 60L',desc:'AutoDose PowerDisk cartridge, 38 dB silent cleaning.',price:8999,old:10499,rating:4.9,stock:'14 in stock',img:'assets/products/integrated-sink-dishwasher.jpg'},
{id:2,cat:'Cooking & Ovens',brand:'Miele',badge:'AWARD WINNER',title:'Miele Generation 7000 DGC Smart Combi-Steam',desc:'Precision moisture injection with M Touch controls.',price:36499,old:39999,rating:5,stock:'6 in stock',img:'assets/products/combi-steam-oven-drawer.jpg'},
{id:3,cat:'Refrigeration & Wine',brand:'Samsung Bespoke',badge:'DEAL OF THE DAY',title:'Samsung Bespoke 4-Door Flex with AI Family Hub+',desc:'32-inch vertical bezel-less screen with smart cooling.',price:48999,old:53999,rating:4.8,stock:'8 in stock',img:'assets/products/smart-french-door-fridge.jpg'},
{id:4,cat:'Smart Laundry',brand:'Miele',badge:'AWARD WINNER',title:'Miele WWR 980 Passion 9kg Washing Machine',desc:'TwinDos automated 2-phase detergent dosing.',price:24999,old:28999,rating:5,stock:'5 in stock',img:'assets/products/front-load-washing-machine.jpg'},
{id:5,cat:'Dishwashers & Kitchen Care',brand:'LEXICON PRO',badge:'BESTSELLER',title:'LEXICON EcoGrind 1.25 HP SoundSeal Food Waste Disposer',desc:'Multi-grind continuous feed waste disposer.',price:8999,old:10499,rating:4.9,stock:'22 in stock',img:'assets/products/food-waste-disposer.jpg'},
{id:6,cat:'Dishwashers & Kitchen Care',brand:'Miele',badge:'AWARD WINNER',title:'Miele G 7110 SC AutoDos Freestanding Dishwasher',desc:'PowerDisk automatic detergent cartridge system.',price:36999,old:39999,rating:4.9,stock:'8 in stock',img:'assets/products/freestanding-dishwasher.jpg'},
{id:7,cat:'Cooking & Ovens',brand:'Smeg',badge:'STAFF PICK',title:'Smeg Portofino 90cm Dual Fuel Range Cooker',desc:'Triple-fan cavity oven with high-efficiency burners.',price:69999,old:74999,rating:4.9,stock:'Only 5 left',img:'assets/products/dual-fuel-range-cooker.jpg'},
{id:8,cat:'Refrigeration & Wine',brand:'LEXICON PRO',badge:'STAFF PICK',title:'LEXICON Sommerlier Dual-Zone Smart Wine Column 128-Bottle',desc:'Active vibration dampening with UV smoked glass.',price:34999,old:37999,rating:4.9,stock:'7 in stock',img:'assets/products/wine-column.jpg'},
{id:9,cat:'Cooking & Ovens',brand:'LG Signature',badge:'STAFF PICK',title:'LG Signature InstaView 76L ProBake Convection Oven',desc:'Premium convection with precision heat control.',price:45999,old:49999,rating:4.8,stock:'7 in stock',img:'assets/products/built-in-ovens.jpg'},
{id:10,cat:'Refrigeration & Wine',brand:'LEXICON PRO',badge:'NEW',title:'LEXICON SubZero Matching Column Freezer with Ice Maker 30L',desc:'All-freezer architectural column with smart temperature.',price:27999,old:31999,rating:4.8,stock:'Only 5 left',img:'assets/products/ice-maker.jpg'},
{id:11,cat:'Refrigeration & Wine',brand:'Bosch',badge:'BESTSELLER',title:'Bosch Series 6 French Door 540L Counter-Depth',desc:'Integrated ice and chilled water dispenser.',price:32999,old:36999,rating:4.7,stock:'14 in stock',img:'assets/products/smart-french-door-fridge.jpg'},
{id:12,cat:'Smart Laundry',brand:'Samsung Bespoke',badge:'INVERTER READY',title:'Samsung Bespoke 12kg Front-Loader with AI Ecobubble',desc:'Turns detergent into bubbles for efficient cleaning.',price:18499,old:21999,rating:4.8,stock:'22 in stock',img:'assets/products/front-load-washing-machine.jpg'},
{id:13,cat:'Coffee & Beverage',brand:'Smeg',badge:'BESTSELLER',title:'Smeg EGF03 Manual Espresso Machine with Dual Thermoblocks',desc:'Built-in conical burr grinder with 58mm portafilter.',price:19999,old:23499,rating:4.7,stock:'18 in stock',img:'assets/products/espresso-machine.jpg'},
{id:14,cat:'Coffee & Beverage',brand:'De’Longhi',badge:'NEW',title:'De’Longhi La Specialista Maestro Dual-Boiler Espresso',desc:'Sensor Grinding Technology with smart extraction.',price:24999,old:27999,rating:4.7,stock:'14 in stock',img:'assets/products/espresso-machine.jpg'},
{id:15,cat:'Coffee & Beverage',brand:'LEXICON',badge:'BESTSELLER',title:'LEXICON Sparkle Craft Carbonator & Infuser',desc:'Directly fizz wine, cocktails, cold brew and more.',price:3999,old:4799,rating:4.8,stock:'28 in stock',img:'assets/products/carbonator.jpg'},
{id:16,cat:'Dishwashers & Kitchen Care',brand:'Smeg',badge:'INVERTER READY',title:'Smeg 50s Retro Style Freestanding Dishwasher 13-Place',desc:'Iconic curved 1950s aesthetic with modern cleaning.',price:28999,old:31999,rating:4.7,stock:'12 in stock',img:'assets/products/retro-dishwasher.jpg'}
];

const money=n=>'R'+Number(n||0).toLocaleString('en-ZA');
let filtered=[...products];
let cart=[];
let wishlist=[];
let activeCategory='All';
let checkoutStep=1;
let paymentMethod='card';
let deliveryValidated=false;
let orderNumber='';

const $=id=>document.getElementById(id);
const grid=$('productGrid');
const cartTotal=()=>cart.reduce((sum,item)=>sum+(item.price*item.qty),0);
const cartUnits=()=>cart.reduce((sum,item)=>sum+item.qty,0);
const productById=id=>products.find(p=>p.id===Number(id));

function render(){
  grid.innerHTML='';
  filtered.forEach(p=>{
    const isWish=wishlist.includes(p.id);
    const c=document.createElement('article'); c.className='product-card';
    c.innerHTML=`<div class="product-image"><img src="${p.img}" alt="${p.title}"><span class="badge">${p.badge}</span><span class="brand-badge">${p.brand}</span><button class="heart ${isWish?'is-favourite':''}" aria-label="${isWish?'Remove from':'Add to'} favourites" data-wish="${p.id}">${isWish?'♥':'♡'}</button><span class="stock">⚡ ${p.stock}</span></div><div class="product-info"><div class="category-line"><span>${p.cat.toUpperCase()}</span><span class="rating">★ ${p.rating}</span></div><h3>${p.title}</h3><p>${p.desc}</p><div class="spec-mini"><span>Cap: ${p.id%2?'12kg / 60L':'650 Litres'}</span><span>Power: ${p.id%2?'2000W':'3650W'}</span></div><div class="location">⌾ Gauteng (Sandton) <span class="warranty-mini">5y Warranty</span></div><div class="price-actions"><div><del>${money(p.old)}</del><strong>${money(p.price)}</strong></div><span class="spacer"></span><button class="spec-btn" data-view="${p.id}">Specs</button><button class="add-btn" aria-label="Add ${p.title} to cart" data-add="${p.id}">🛒</button></div></div>`;
    grid.appendChild(c);
  });
  $('resultsCount').textContent=`${filtered.length*6+4} items`;
  $('noResults').hidden=filtered.length>0;
  updateHeader();
}

function updateHeader(){
  $('cartCount').textContent=money(cartTotal());
  $('cartBadge').textContent=cartUnits();
  $('wishCount').textContent=wishlist.length;
  $('cartBadge').classList.toggle('has-items',cartUnits()>0);
  $('wishCount').classList.toggle('has-items',wishlist.length>0);
}

function setCategory(cat){
  activeCategory=cat;
  document.querySelectorAll('.nav-cat').forEach(b=>b.classList.toggle('active',b.dataset.category===cat));
  applyFilters();
  $('catalog').scrollIntoView({behavior:'smooth',block:'start'});
}

function applyFilters(){
  const q=$('searchInput').value.toLowerCase().trim();
  filtered=products.filter(p=>activeCategory==='All'||p.cat===activeCategory).filter(p=>!q||`${p.title} ${p.cat} ${p.brand} ${p.desc}`.toLowerCase().includes(q));
  render();
}

function openProduct(p){
  $('modalImage').src=p.img; $('modalImage').alt=p.title; $('modalCategory').textContent=p.cat.toUpperCase(); $('modalTitle').textContent=p.title; $('modalDesc').textContent=p.desc; $('modalPrice').textContent=money(p.price);
  $('modalSpecs').innerHTML=`Capacity: ${p.id%2?'12kg / 60L':'650L'} &nbsp; • &nbsp; Power: ${p.id%2?'2000W':'3650W'} &nbsp; • &nbsp; Location: Gauteng (Sandton) &nbsp; • &nbsp; Warranty: 5 years`;
  $('modalAdd').onclick=()=>{addToCart(p);closeModals();openCart()}; $('productModal').classList.add('show');
}

function addToCart(p){
  const existing=cart.find(item=>item.id===p.id);
  if(existing) existing.qty+=1; else cart.push({...p,qty:1});
  updateHeader(); renderCart();
}
function changeQty(id,delta){
  const item=cart.find(p=>p.id===Number(id)); if(!item)return;
  item.qty+=delta; if(item.qty<=0) cart=cart.filter(p=>p.id!==Number(id));
  updateHeader(); renderCart(); renderCheckoutReview();
}
function removeFromCart(id){cart=cart.filter(p=>p.id!==Number(id));updateHeader();renderCart();renderCheckoutReview();}

function renderCart(){
  const box=$('cartItems');
  $('cartItemSummary').textContent=`${cartUnits()} ${cartUnits()===1?'item':'items'}`;
  $('cartTotal').textContent=money(cartTotal());
  if(!cart.length){box.innerHTML='<div class="drawer-items-empty"><strong>Your cart is empty.</strong><span>Add an appliance and it will appear here instantly.</span></div>';$('checkoutBtn').disabled=true;return;}
  $('checkoutBtn').disabled=false;
  box.innerHTML=cart.map(p=>`<div class="cart-line"><img src="${p.img}" alt="${p.title}"><div class="cart-line-main"><h4>${p.title}</h4><p>${money(p.price)} each</p><div class="qty-control"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><b>${p.qty}</b><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button><button class="remove-item" data-remove="${p.id}">Remove</button></div></div><strong class="line-total">${money(p.price*p.qty)}</strong></div>`).join('');
}

function renderWishlist(){
  const box=$('wishlistItems');
  if(!wishlist.length){box.innerHTML='<div class="drawer-items-empty"><strong>No favourites yet.</strong><span>Tap ♡ on any appliance to save it here.</span></div>';return;}
  box.innerHTML=wishlist.map(id=>{const p=productById(id);return `<div class="wishlist-line"><img src="${p.img}" alt="${p.title}"><div><h4>${p.title}</h4><p>${money(p.price)}</p><div><button class="mini-action" data-wish-cart="${p.id}">Add to Cart</button><button class="mini-action danger" data-unwish="${p.id}">Remove</button></div></div></div>`}).join('');
}

function openCart(){closeDrawers();$('cartDrawer').classList.add('open');$('cartDrawer').setAttribute('aria-hidden','false');$('overlay').classList.add('show');renderCart()}
function openWishlist(){closeDrawers();$('wishlistDrawer').classList.add('open');$('wishlistDrawer').setAttribute('aria-hidden','false');$('overlay').classList.add('show');renderWishlist()}
function closeDrawers(){document.querySelectorAll('.drawer').forEach(d=>{d.classList.remove('open');d.setAttribute('aria-hidden','true')});$('overlay').classList.remove('show')}
function closeModals(){document.querySelectorAll('.modal').forEach(m=>m.classList.remove('show'))}
function toggleAi(){$('aiPanel').classList.toggle('open')}

function renderCheckoutReview(){
  const box=$('checkoutCartReview');
  $('checkoutReviewTotal').textContent=money(cartTotal()); $('paymentTotal').textContent=money(cartTotal());
  if(!cart.length){box.innerHTML='<div class="checkout-empty">Your cart is empty.</div>';return;}
  box.innerHTML=cart.map(p=>`<div class="review-line"><img src="${p.img}" alt=""><div><strong>${p.title}</strong><span>${p.qty} × ${money(p.price)}</span></div><b>${money(p.price*p.qty)}</b></div>`).join('');
}
function showCheckoutStep(step,force=false){
  if(step===3&&!deliveryValidated){showCheckoutStep(2,true);return;}
  checkoutStep=step;
  document.querySelectorAll('.checkout-step').forEach(btn=>{const n=Number(btn.dataset.step);btn.classList.toggle('active',n===step);btn.classList.toggle('done',n<step);});
  document.querySelectorAll('.checkout-panel').forEach(panel=>panel.classList.remove('active'));
  $('checkoutStep'+step).classList.add('active');
  if(step===1)renderCheckoutReview();
  if(step===3)$('paymentTotal').textContent=money(cartTotal());
}
function openCheckout(){
  if(!cart.length){openCart();return;}
  closeDrawers(); closeModals(); $('checkoutModal').classList.add('show'); $('checkoutModal').setAttribute('aria-hidden','false');
  deliveryValidated=false; checkoutStep=1; renderCheckoutReview(); showCheckoutStep(1,true);
  $('checkoutSuccess').hidden=true; document.querySelectorAll('#deliveryForm input').forEach(i=>i.classList.remove('invalid')); document.querySelectorAll('.field-error').forEach(e=>e.textContent='');
}
function closeCheckout(){ $('checkoutModal').classList.remove('show'); $('checkoutModal').setAttribute('aria-hidden','true'); }

function setFieldError(id,message){const el=$(id),err=document.querySelector(`[data-error-for="${id}"]`);if(el)el.classList.add('invalid');if(err)err.textContent=message;return false;}
function clearFieldError(id){const el=$(id),err=document.querySelector(`[data-error-for="${id}"]`);if(el)el.classList.remove('invalid');if(err)err.textContent='';}
function validateDelivery(){
  let valid=true;
  const values={name:$('deliveryName').value.trim(),email:$('deliveryEmail').value.trim(),phone:$('deliveryPhone').value.trim(),address:$('deliveryAddress').value.trim(),city:$('deliveryCity').value.trim(),postal:$('deliveryPostal').value.trim()};
  Object.keys(values).forEach(k=>clearFieldError({name:'deliveryName',email:'deliveryEmail',phone:'deliveryPhone',address:'deliveryAddress',city:'deliveryCity',postal:'deliveryPostal'}[k]));
  if(values.name.length<3){setFieldError('deliveryName','Full Name must be at least 3 characters.');valid=false;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)){setFieldError('deliveryEmail','Enter a valid email address.');valid=false;}
  const digits=values.phone.replace(/\D/g,''); if(!/^(?:27\d{9}|0\d{9})$/.test(digits)&&!(digits.length>=9&&digits.length<=10)){setFieldError('deliveryPhone','Enter a valid South African contact number (9–10 digits minimum).');valid=false;}
  if(values.address.length<5){setFieldError('deliveryAddress','Enter your physical street address and complex/unit.');valid=false;}
  if(values.city.length<2){setFieldError('deliveryCity','Enter your city or suburb.');valid=false;}
  if(!/^\d{4}$/.test(values.postal)){setFieldError('deliveryPostal','Postal Code must contain exactly 4 digits.');valid=false;}
  deliveryValidated=valid;
  return valid;
}
function validatePayment(){
  let valid=true;
  if(paymentMethod==='card'){
    const cardName=$('cardName').value.trim(), digits=$('cardNumber').value.replace(/\D/g,''), expiry=$('cardExpiry').value.trim(),cvv=$('cardCvv').value.replace(/\D/g,''),postal=$('cardPostal').value.trim();
    ['cardName','cardNumber','cardExpiry','cardCvv','cardPostal'].forEach(clearFieldError);
    if(cardName.length<3){setFieldError('cardName','Enter the cardholder name.');valid=false;}
    if(!/^\d{16}$/.test(digits)){setFieldError('cardNumber','Enter a valid 16-digit card number.');valid=false;}
    if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)){setFieldError('cardExpiry','Use MM/YY format.');valid=false;}
    if(!/^\d{3,4}$/.test(cvv)){setFieldError('cardCvv','Enter a 3–4 digit CVV.');valid=false;}
    if(!/^\d{4}$/.test(postal)){setFieldError('cardPostal','Enter a 4-digit postal code.');valid=false;}
  }
  if(!$('paymentTerms').checked){valid=false; alert('Please confirm the secure payment/order terms before placing your order.');}
  return valid;
}
function placeOrder(){
  orderNumber='VKR-'+new Date().getFullYear()+'-'+Math.random().toString(36).slice(2,8).toUpperCase();
  const total=money(cartTotal()); cart=[]; updateHeader(); renderCart();
  $('checkoutSuccess').hidden=false; $('checkoutStep1').classList.remove('active'); $('checkoutStep2').classList.remove('active'); $('checkoutStep3').classList.remove('active'); document.querySelector('.checkout-steps').style.display='none'; document.querySelector('.mandatory-notice').style.display='none';
  $('successMessage').textContent=`Order ${orderNumber} has been created for ${total}. Your delivery details have been validated and your selected payment method has been recorded for this checkout session.`;
}

// Product interactions
['aiTopBtn','askBtn','floatingAi'].forEach(id=>$(id).onclick=toggleAi); $('closeAi').onclick=toggleAi;
document.querySelectorAll('.nav-cat').forEach(b=>b.addEventListener('click',()=>setCategory(b.dataset.category)));
document.querySelectorAll('[data-category-link]').forEach(a=>a.addEventListener('click',()=>setCategory(a.dataset.categoryLink)));
$('exploreBtn').onclick=()=>$('catalog').scrollIntoView({behavior:'smooth'});
$('dealsBtn').onclick=()=>{activeCategory='All';filtered=products.filter(p=>p.old>p.price);render();$('catalog').scrollIntoView({behavior:'smooth'})};
$('searchBtn').onclick=()=>{applyFilters();$('catalog').scrollIntoView({behavior:'smooth'})};
$('searchInput').addEventListener('keydown',e=>{if(e.key==='Enter')$('searchBtn').click()});
$('sortSelect').onchange=e=>{const v=e.target.value;if(v==='price-low')filtered.sort((a,b)=>a.price-b.price);if(v==='price-high')filtered.sort((a,b)=>b.price-a.price);if(v==='rating')filtered.sort((a,b)=>b.rating-a.rating);render()};
$('filterBtn').onclick=()=>{const cats=['All',...new Set(products.map(p=>p.cat))];const pick=prompt('Enter category:\n'+cats.join('\n'),'All');if(pick&&cats.includes(pick))setCategory(pick)};
grid.addEventListener('click',e=>{const view=e.target.closest('[data-view]'),add=e.target.closest('[data-add]'),wish=e.target.closest('[data-wish]');if(view)openProduct(productById(view.dataset.view));if(add){addToCart(productById(add.dataset.add));add.textContent='✓';setTimeout(()=>add.textContent='🛒',700)}if(wish){const id=Number(wish.dataset.wish);wishlist.includes(id)?wishlist=wishlist.filter(x=>x!==id):wishlist.push(id);renderWishlist();render();}});
$('wishlistBtn').onclick=openWishlist;
$('closeWishlist').onclick=closeDrawers;
$('cartBtn').onclick=openCart;
$('closeCart').onclick=closeDrawers;
$('overlay').onclick=()=>{closeDrawers();closeModals()};
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=closeModals);
$('cartItems').addEventListener('click',e=>{const q=e.target.closest('[data-qty]'),r=e.target.closest('[data-remove]');if(q)changeQty(q.dataset.qty,Number(q.dataset.delta));if(r)removeFromCart(r.dataset.remove)});
$('wishlistItems').addEventListener('click',e=>{const add=e.target.closest('[data-wish-cart]'),remove=e.target.closest('[data-unwish]');if(add){addToCart(productById(add.dataset.wishCart));openCart()}if(remove){wishlist=wishlist.filter(id=>id!==Number(remove.dataset.unwish));renderWishlist();updateHeader();render();}});
$('specHero').onclick=()=>openProduct(products[2]);
$('modalAdd').onclick=()=>{};
$('quoteBtn').onclick=()=>$('contactModal').classList.add('show'); $('callbackBtn').onclick=()=>alert('VALKRON Helpline: 0800 539 426');
$('contactForm').onsubmit=e=>{e.preventDefault();$('formSuccess').hidden=false;e.target.reset()};
document.querySelectorAll('.quick-prompts button').forEach(b=>b.onclick=()=>{$('aiInput').value=b.textContent;$('aiForm').dispatchEvent(new Event('submit'))});
$('aiForm').onsubmit=e=>{e.preventDefault();const input=$('aiInput'),q=input.value.trim();if(!q)return;const box=$('aiMessages');box.innerHTML+=`<div class="ai-message user">${q}</div>`;let answer='I can help with categories, product specifications, warranties, installation and inverter compatibility.';const l=q.toLowerCase();if(l.includes('cook'))answer='Cooking & Ovens includes smart combi-steam ovens, pyrolytic ovens and premium range cookers.';else if(l.includes('coffee'))answer='Coffee & Beverage includes espresso machines, dual-boiler systems and carbonators.';else if(l.includes('warranty'))answer='Valkron listings include 5-year warranty coverage, with selected appliances carrying extended 5–10 year in-home coverage.';else if(l.includes('inverter'))answer='Look for the Inverter Ready label for products positioned for load-shedding-aware South African homes.';box.innerHTML+=`<div class="ai-message">${answer}</div>`;box.scrollTop=box.scrollHeight;input.value=''};

// Cart and strict checkout
$('checkoutBtn').onclick=openCheckout;
$('closeCheckout').onclick=closeCheckout;
$('reviewToDelivery').onclick=()=>showCheckoutStep(2);
$('deliveryBack').onclick=()=>showCheckoutStep(1);
$('paymentBack').onclick=()=>showCheckoutStep(2);
$('deliveryForm').addEventListener('submit',e=>{e.preventDefault();if(validateDelivery())showCheckoutStep(3);else{showCheckoutStep(2,true);const first=document.querySelector('#deliveryForm .invalid');if(first)first.focus()}});
document.querySelectorAll('.checkout-step').forEach(btn=>btn.addEventListener('click',()=>{const n=Number(btn.dataset.step);if(n===1)showCheckoutStep(1);else if(n===2)showCheckoutStep(2);else showCheckoutStep(3)}));
document.querySelectorAll('#deliveryForm input').forEach(input=>input.addEventListener('input',()=>clearFieldError(input.id)));
document.querySelectorAll('.payment-method').forEach(btn=>btn.onclick=()=>{paymentMethod=btn.dataset.payment;document.querySelectorAll('.payment-method').forEach(x=>x.classList.toggle('active',x===btn));$('cardFields').hidden=paymentMethod!=='card';$('eftFields').hidden=paymentMethod!=='eft';$('codFields').hidden=paymentMethod!=='cod';});
$('paymentForm').addEventListener('submit',e=>{e.preventDefault();if(!deliveryValidated){showCheckoutStep(2,true);return;}if(validatePayment())placeOrder()});
$('finishCheckout').onclick=()=>{closeCheckout();document.querySelector('.checkout-steps').style.display='flex';document.querySelector('.mandatory-notice').style.display='flex';render()};
$('cardNumber').addEventListener('input',e=>{let d=e.target.value.replace(/\D/g,'').slice(0,16);e.target.value=d.replace(/(.{4})/g,'$1 ').trim();});
$('cardExpiry').addEventListener('input',e=>{let d=e.target.value.replace(/\D/g,'').slice(0,4);e.target.value=d.length>2?d.slice(0,2)+'/'+d.slice(2):d;});
$('cardCvv').addEventListener('input',e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,4));
$('cardPostal').addEventListener('input',e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,4));
$('deliveryPostal').addEventListener('input',e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,4));

render(); renderCart(); renderWishlist();
