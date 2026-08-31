document.addEventListener('DOMContentLoaded', () => {
    
    const wppLink = `https://wa.me/${mangluData.empresa.telefonoWhatsApp}`;

    
    const navList = document.getElementById('navList');
    if (navList) {
        navList.innerHTML = mangluData.navegacion.map(item => `
            <li><a href="${item.link}">${item.label}</a></li>
        `).join('');
    }

    
    const heroContainer = document.getElementById('heroContainer');
    if (heroContainer) {
        const h = mangluData.hero;
        heroContainer.innerHTML = `
            <div class="hero-left">
                <span class="hero-badge">${h.badge}</span>
                <h1 class="hero-title">
                    <span class="italic">${h.tituloItalic}</span> <span class="bold">${h.tituloBold}</span>
                </h1>
                <p class="hero-description">${h.descripcion}</p>
                <div class="hero-actions">
                    <a href="${wppLink}" target="_blank" class="btn btn-primary btn-wpp">${h.btnPrincipal}</a>
                    <a href="#menu" class="btn btn-secondary">${h.btnSecundario}</a>
                </div>
                <div class="hero-features">
                    ${h.caracteristicas.map(f => `<span>${f}</span>`).join('')}
                </div>
            </div>
            <div class="hero-right">
                <div class="hero-card">
                    <img src="${h.cardDestacada.imagen}" alt="${h.cardDestacada.titulo}">
                    <div class="card-floating-price">
                        <h3>${h.cardDestacada.titulo}</h3>
                        <p>${h.cardDestacada.precio}</p>
                    </div>
                    <div class="card-badge-rating">
                        <div class="stars">${h.cardDestacada.rating}</div>
                        <small>${h.cardDestacada.pedidos}</small>
                    </div>
                </div>
            </div>
        `;
    }

    
    const menuHeader = document.getElementById('menuHeader');
    if (menuHeader) {
        const m = mangluData.seccionMenu;
        menuHeader.innerHTML = `
            <span class="sub-label">${m.subtitulo}</span>
            <h2>${m.titulo}</h2>
            <p>${m.descripcion}</p>
        `;
    }

    
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        productsGrid.innerHTML = mangluData.productos.map(prod => `
            <article class="product-card">
                <div class="product-img-wrapper">
                    <span class="tag tag-${prod.tagColor}">${prod.tag}</span>
                    <img src="${prod.imagen}" alt="${prod.nombre}">
                </div>
                <div class="product-info">
                    <div class="product-title-price">
                        <h3>${prod.nombre}</h3>
                        <span class="price">${prod.precio}</span>
                    </div>
                    <p>${prod.descripcion}</p>
                    <a href="${wppLink}?text=Hola!%20Quiero%20pedir%20un%20${encodeURIComponent(prod.nombre)}" 
                       target="_blank" class="btn btn-outline">Pedir este 🍧</a>
                </div>
            </article>
        `).join('');
    }

    
    const aboutContainer = document.getElementById('aboutContainer');
    if (aboutContainer) {
        const ab = mangluData.historia;
        aboutContainer.innerHTML = `
            <div class="about-left">
                <img src="${ab.imagenHistoria}" alt="Historia Manglü">
                <span class="about-card-badge">${ab.badgeCard}</span>
            </div>
            <div class="about-content">
                <span class="sub-label" style="color: var(--bg-yellow);">${ab.subtitulo}</span>
                <h2>${ab.titulo}</h2>
                <p>${ab.parrafo1}</p>
                <p>${ab.parrafo2}</p>
                <div class="stats-grid">
                    ${ab.stats.map(s => `
                        <div class="stat-item">
                            <h3>${s.cifra}</h3>
                            <p>${s.label}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    
    const galleryHeader = document.getElementById('galleryHeader');
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryFooter = document.getElementById('galleryFooter');
    if (galleryHeader && galleryGrid && galleryFooter) {
        const g = mangluData.galeria;
        galleryHeader.innerHTML = `
            <span class="sub-label">${g.subtitulo}</span>
            <h2>${g.titulo}</h2>
            <p style="margin-top:0.5rem;">Síguenos en Instagram <span class="instagram-pill">${mangluData.empresa.instagram}</span></p>
        `;
        galleryGrid.innerHTML = g.imagenes.map(img => `
            <div class="gallery-item">
                <img src="${img}" alt="Galería Manglü">
            </div>
        `).join('');
        galleryFooter.innerHTML = `
            <a href="https://instagram.com/${mangluData.empresa.instagram.replace('@', '')}" target="_blank" class="btn btn-secondary">${g.btnInstagram}</a>
        `;
    }

    
    const ctaContainer = document.getElementById('ctaContainer');
    if (ctaContainer) {
        const c = mangluData.cta;
        ctaContainer.innerHTML = `
            <div class="emoji-header">${c.emoji}</div>
            <h2>${c.titulo}</h2>
            <p>${c.descripcion1}</p>
            <p>${c.descripcion2}</p>
            <div style="margin-top: 1.5rem;">
                <a href="${wppLink}" target="_blank" class="btn btn-whatsapp">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                    ${c.btnTexto}
                </a>
            </div>
            <div>
                <span class="phone-badge">📞 ${mangluData.empresa.telefonoFormateado}</span>
            </div>
        `;
    }

    const footerContainer = document.getElementById('footerContainer');
    if (footerContainer) {
        footerContainer.innerHTML = `
            <div class="footer-container">
                <div class="footer-col">
                    <div class="logo-badge" style="display:inline-block; margin-bottom:1rem;">MANGLÜ</div>
                    <p style="opacity:0.8; font-size:0.9rem;">Granizados artesanales con frutas tropicales colombianas. Frescura, dulzura y sabor en cada sorbo.</p>
                </div>
                <div class="footer-col">
                    <h4>Navegación</h4>
                    <ul>
                        ${mangluData.navegacion.map(n => `<li><a href="${n.link}">${n.label}</a></li>`).join('')}
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Contáctanos</h4>
                    <ul>
                        <li>📷 ${mangluData.empresa.instagram}</li>
                        <li>📱 ${mangluData.empresa.telefonoFormateado}</li>
                        <li>🇨🇴 ${mangluData.empresa.pais}</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>${mangluData.empresa.copyright}</p>
                <p>Hecho con ❤️ en Colombia</p>
            </div>
        `;
    }

    
    document.querySelectorAll('.btn-wpp').forEach(btn => {
        btn.href = wppLink;
        btn.target = "_blank";
    });

    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

       
        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});
