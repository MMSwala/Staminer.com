 // ─── CONFIG ───────────────────────────────────────────────
        const SHEET_URL = "https://script.google.com/macros/s/AKfycbxfvlHq2UdJV1ou2UrJkdAKdOiD0Ivnmy65gIBTMYS8wnXOwGh0gsLDxS34Vq6T943pZQ/exec";

        // ─── PRODUCTS DATA ────────────────────────────────────────
        // images[] = 4 images per product slider mein dikhenge
        // Aap "c1.png" ki jagah apni actual image file names dal sakte ho
        const products = [
            {
                id: 1,
                name: "Staminer Power Oil",
                type: "Ayurvedic Massage Oil",
                badge: "Best Seller 🔥",
                images: ["a1.png", "a2.png", "a3.png"],
                originalPrice: 1800, finalPrice: 1050, discount: 42,
                desc: "Hamara signature ayurvedic massage oil — ashwagandha, shilajit, aur 12+ powerful jadibootiyon se bana. Regular use se stamina aur strength mein noticeable difference aata hai.",
                features: ["Ashwagandha + Shilajit + Safed Musli blend", "Daily use safe — koi irritation nahi", "30 din mein results ya paise wapas", "Discrete packaging — privacy guaranteed", "COD Available | Fast Delivery"]
            },
            {
                id: 2,
                name: "Staminer Power Capsule",
                type: "Ayurvedic Capsule",
                badge: "Most Effective ⭐",
                images: ["c4.png", "c2.png", "c3.png", "c4.png"],
                originalPrice: 1199, finalPrice: 699, discount: 42,
                desc: "60 capsules ki power-packed bottle. Kaunch beej, gokshura, safed musli — in jadibootiyon ka best combination jo andar se taqat deta hai.",
                features: ["60 Capsules — 2 mahine ki supply", "Testosterone naturally boost karta hai", "2 hafte mein energy aur stamina mein fark", "Sperm count aur quality improve kare", "100% natural — koi side effect nahi"]
            },
            {
                id: 3,
                name: "Staminer Shakti Majun",
                type: "Ayurvedic Majun / Herbal Jam",
                badge: "Tasty & Powerful 🍯",
               images: ["b1.png", "b2.png", "b3.png"],
                originalPrice: 1800, finalPrice: 1170, discount: 35,
                desc: "Bilkul chawanprash jaisa — khane mein bhi achha, kaam mein bhi zabardast. Har roz 1 chammach subah khaiye aur body ki taqat feel kariye.",
                features: ["Chawanprash jaisa taste — easy to eat", "Ashwagandha + Shatavari + Akarkara blend", "Subah khali pet ya doodh ke saath lein", "Premature ejaculation control karta hai", "250g jar — 45–60 din ki supply"]
            },
            {
                id: 4,
                name: "Staminer Ultimate Combo",
                type: "Oil + Capsule + Majun Combo",
                badge: "🏆 Best Value",
              images: ["d1.png"],
                originalPrice: 5700, finalPrice: 2000, discount: 65,
                desc: "Teeno products ek saath — sabse powerful combination! Oil + Capsule + Majun milke andar-bahar dono taraf se kaam karte hain. Maximum results ke liye yahi best option hai.",
                features: ["Oil + Capsule + Majun — complete package", "52% OFF — sabse bada discount", "Teeno saath lena 3x effective hota hai", "Free WhatsApp consultation support", "Results guarantee ya paise wapas"]
            }
        ];

        let currentProduct = null;
        // Current slide index per product
        const idx = {};
        products.forEach(p => idx[p.id] = 0);

        // ─── RENDER PRODUCT CARDS ─────────────────────────────────
        function renderProducts() {
            document.getElementById('productsGrid').innerHTML = products.map(p => {
                const total = p.images.length;
                const slidesHTML = p.images.map(img =>
                    `<div class="slide slide-img"><img src="${img}" alt="${p.name}" loading="lazy"></div>`
                ).join('');
                const dotsHTML = p.images.map((_, i) =>
                    `<div class="dot ${i === 0 ? 'active' : ''}" id="dot-${p.id}-${i}" onclick="event.stopPropagation();goToSlide(${p.id},${i})"></div>`
                ).join('');

                return `
                <article class="product-card" onclick="openModal(${p.id})" aria-label="${p.name}">
                    <div class="card-badge">${p.badge}</div>
                    <div class="img-slider">
                        <div class="slides-container" id="slider-${p.id}">${slidesHTML}</div>
                        <button class="slider-btn prev" onclick="event.stopPropagation();slideImg(${p.id},-1)" aria-label="Previous">&#8249;</button>
                        <button class="slider-btn next" onclick="event.stopPropagation();slideImg(${p.id},1)" aria-label="Next">&#8250;</button>
                        <div class="slide-nav">${dotsHTML}</div>
                    </div>
                    <div class="card-body">
                        <div class="product-type">${p.type}</div>
                        <div class="product-name">${p.name}</div>
                        <div class="price-row">
                            <span class="price-original">₹${p.originalPrice}</span>
                            <span class="price-final">₹${p.finalPrice}</span>
                            <span class="discount-tag">${p.discount}% OFF</span>
                        </div>
                        <div class="savings-line">Save ₹${p.originalPrice - p.finalPrice}!</div>
                        <button class="btn-buy">Order Karo — COD 🛒</button>
                    </div>
                </article>`;
            }).join('');
        }

        // ─── SLIDER LOGIC ─────────────────────────────────────────
        function slideImg(id, dir) {
            const p = products.find(x => x.id === id);
            idx[id] = (idx[id] + dir + p.images.length) % p.images.length;
            updateSlider(id);
        }

        function goToSlide(id, i) {
            idx[id] = i;
            updateSlider(id);
        }

        function updateSlider(id) {
            const container = document.getElementById(`slider-${id}`);
            if (!container) return;
            container.style.transform = `translateX(-${idx[id] * 100}%)`;
            const p = products.find(x => x.id === id);
            p.images.forEach((_, i) => {
                const d = document.getElementById(`dot-${id}-${i}`);
                if (d) d.className = `dot ${i === idx[id] ? 'active' : ''}`;
            });
        }

        // Auto slide every 3.8 seconds
        setInterval(() => products.forEach(p => slideImg(p.id, 1)), 3800);

        // ─── MODAL ────────────────────────────────────────────────
        function openModal(id) {
            const p = products.find(x => x.id === id);
            currentProduct = p;

            document.getElementById('modalType').textContent = p.type;
            document.getElementById('modalName').textContent = p.name;
            document.getElementById('modalDesc').textContent = p.desc;
            document.getElementById('modalOrig').textContent = `₹${p.originalPrice}`;
            document.getElementById('modalFinal').textContent = `₹${p.finalPrice}`;
            document.getElementById('modalDisc').textContent = `${p.discount}% OFF`;
            document.getElementById('modalSave').textContent = `Save ₹${p.originalPrice - p.finalPrice}!`;

            // Main image
            const mainImg = document.getElementById('modalProductImg');
            mainImg.src = p.images[0];
            mainImg.alt = p.name;

            // Thumbnail images
            document.getElementById('modalThumbs').innerHTML = p.images.map((img, i) => `
                <div class="modal-thumb ${i === 0 ? 'active' : ''}" onclick="setModalImg('${img}', this)">
                    <img src="${img}" alt="${p.name} view ${i + 1}" loading="lazy">
                </div>`
            ).join('');

            document.getElementById('modalFeatures').innerHTML = p.features.map(f => `<li>${f}</li>`).join('');

            // Reset form
            ['custName', 'custPhone', 'custAddress', 'custCity', 'custPincode'].forEach(fid => {
                const el = document.getElementById(fid);
                el.value = '';
                el.classList.remove('input-error');
            });
            ['errName', 'errPhone', 'errAddress', 'errCity', 'errPincode'].forEach(eid =>
                document.getElementById(eid).classList.remove('show')
            );
            document.getElementById('custQty').value = '1';
            document.getElementById('orderBtn').disabled = false;
            document.getElementById('orderBtn').innerHTML = '🛒 Order Karo — COD Available';
            document.getElementById('orderForm').style.display = 'flex';
            document.getElementById('formSuccess').style.display = 'none';
            document.getElementById('productModal').classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function setModalImg(src, el) {
            document.getElementById('modalProductImg').src = src;
            document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
        }

        function closeModal() {
            document.getElementById('productModal').classList.remove('open');
            document.body.style.overflow = '';
        }

        document.getElementById('productModal').addEventListener('click', e => {
            if (e.target === document.getElementById('productModal')) closeModal();
        });

        // Escape key closes modal
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

        // ─── PHONE & PINCODE ──────────────────────────────────────
        document.getElementById('custPhone').addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '').slice(0, 10);
        });
        document.getElementById('custPincode').addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '').slice(0, 6);
        });

        // ─── VALIDATION ───────────────────────────────────────────
        function showErr(inputId, errId, show) {
            const inp = document.getElementById(inputId);
            const err = document.getElementById(errId);
            if (show) { inp.classList.add('input-error'); err.classList.add('show'); }
            else { inp.classList.remove('input-error'); err.classList.remove('show'); }
            return !show;
        }

        function validateForm() {
            const name = document.getElementById('custName').value.trim();
            const phone = document.getElementById('custPhone').value.trim();
            const address = document.getElementById('custAddress').value.trim();
            const city = document.getElementById('custCity').value.trim();
            const pincode = document.getElementById('custPincode').value.trim();
            let valid = true;
            valid = showErr('custName', 'errName', !name) && valid;
            valid = showErr('custPhone', 'errPhone', phone.length !== 10) && valid;
            valid = showErr('custAddress', 'errAddress', !address) && valid;
            valid = showErr('custCity', 'errCity', !city) && valid;
            valid = showErr('custPincode', 'errPincode', pincode.length !== 6) && valid;
            return valid;
        }

        // ─── PLACE ORDER ──────────────────────────────────────────
        async function placeOrder() {
            if (!validateForm()) return;
            const btn = document.getElementById('orderBtn');
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner"></span> Bhej rahe hain...';

            const orderData = {
                timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                name: document.getElementById('custName').value.trim(),
                phone: document.getElementById('custPhone').value.trim(),
                address: document.getElementById('custAddress').value.trim(),
                city: document.getElementById('custCity').value.trim(),
                pincode: document.getElementById('custPincode').value.trim(),
                product: currentProduct.name,
                qty: document.getElementById('custQty').value,
                total: currentProduct.finalPrice * parseInt(document.getElementById('custQty').value)
            };

            try {
                await fetch(SHEET_URL, {
                    method: 'POST', mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });
            } catch (err) { console.warn('Sheet error:', err); }

            document.getElementById('orderForm').style.display = 'none';
            document.getElementById('formSuccess').style.display = 'block';
            const t = document.getElementById('toast');
            t.style.display = 'block';
            setTimeout(() => { t.style.display = 'none'; }, 4500);
        }

        // ─── FAQ TOGGLE ───────────────────────────────────────────
        function toggleFaq(el) {
            const ans = el.nextElementSibling;
            const isOpen = ans.classList.contains('open');
            document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
            document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));
            if (!isOpen) { ans.classList.add('open'); el.classList.add('open'); }
        }

        // ─── INIT ─────────────────────────────────────────────────
        renderProducts();
