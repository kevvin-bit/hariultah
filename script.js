 /* ==========================================
           1. LOGIK NAVIGASI PINDAH HALAMAN (LAYERS)
           ========================================== */
        let currentPage = 1;
        const totalPages = 7;

        function changePage(pageNumber) {
            if (pageNumber < 1 || pageNumber > totalPages) return;

            // Sembunyikan semua layer
            for (let i = 1; i <= totalPages; i++) {
                const layer = document.getElementById(`layer-${i}`);
                if (layer) {
                    layer.classList.remove('active');
                }
            }

            // Tampilkan layer tujuan
            const targetLayer = document.getElementById(`layer-${pageNumber}`);
            if (targetLayer) {
                targetLayer.classList.add('active');
            }

            currentPage = pageNumber;
            
            // Update teks indikator halaman
            document.getElementById('page-indicator').innerText = `Halaman ${currentPage} / ${totalPages}`;

            // Reset posisi tombol "Tidak" saat berpindah halaman
            resetEvasiveButtons();

            // Reset selebrasi jika kembali ke layer 7
            if (pageNumber === 7) {
                document.getElementById('final-question-container').classList.remove('hidden');
                document.getElementById('final-celebration-message').classList.add('hidden');
            }

            // Trigger animasi partikel & scroll reveal
            triggerParticleEffects(pageNumber);
            handleScrollReveal();

            // Scroll ke atas dengan halus
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        /* ==========================================
           2. LOGIK TOMBOL NO BERDAMPINGAN & PERPINDAHAN TANPA TINDIH
           ========================================== */
        function moveEvasiveButton(buttonId, containerId) {
            const btn = document.getElementById(buttonId);
            const container = document.getElementById(containerId);
            
            if (!btn || !container) return;

            // Ubah ke position absolute saat pertama kali kabur
            if (btn.style.position !== 'absolute') {
                btn.style.position = 'absolute';
            }

            const containerRect = container.getBoundingClientRect();
            const btnWidth = btn.offsetWidth || 120;
            const btnHeight = btn.offsetHeight || 45;

            // Rentang koordinat acak di dalam area container dengan margin aman
            const padding = 12;
            const maxX = containerRect.width - btnWidth - padding;
            const maxY = containerRect.height - btnHeight - padding;

            const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
            const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

            btn.style.left = `${randomX}px`;
            btn.style.top = `${randomY}px`;
        }

        // Mengembalikan tombol "Tidak" ke posisi Flexbox berdampingan saat awal
        function resetEvasiveButtons() {
            ['btn-no-1', 'btn-no-2'].forEach(id => {
                const btn = document.getElementById(id);
                if (btn) {
                    btn.style.position = 'relative';
                    btn.style.left = 'auto';
                    btn.style.top = 'auto';
                }
            });
        }

        /* ==========================================
           3. LOGIK PARTIKEL BERJATUHAN (BUNGA & LOVE)
           ========================================== */
        const particleContainer = document.getElementById('particle-container');

        function createParticle(symbol) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.innerText = symbol;
            
            const startX = Math.random() * window.innerWidth;
            const duration = Math.random() * 3 + 3;
            const fontSize = Math.random() * 15 + 18;

            particle.style.left = `${startX}px`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.fontSize = `${fontSize}px`;

            particleContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }

        let particleInterval;
        function triggerParticleEffects(page) {
            clearInterval(particleInterval);
            particleContainer.innerHTML = '';

            let symbols = ['🍃', '🌹', '🍵', '✨'];

            if (page === 4) {
                symbols = ['🌹', '🌸', '🥀', '🍃'];
            } else if (page === 5) {
                symbols = ['🌹', '❤️', '💕', '🍵', '🌸'];
            } else if (page === 6) {
                symbols = ['❤️', '💖', '💗', '💕', '🌹'];
            }

            particleInterval = setInterval(() => {
                const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                createParticle(randomSymbol);
            }, 350);
        }

        /* ==========================================
           4. SCROLL REVEAL ANIMATION (HALAMAN 6)
           ========================================== */
        function handleScrollReveal() {
            const reveals = document.querySelectorAll('.reveal');
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const elementVisible = 50;

                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add('active');
                }
            }
        }

        window.addEventListener('scroll', handleScrollReveal);

        /* ==========================================
           5. HALAMAN 7 FINAL CELEBRATION
           ========================================== */
        function showFinalCelebration() {
            document.getElementById('final-question-container').classList.add('hidden');
            document.getElementById('final-celebration-message').classList.remove('hidden');

            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const symbols = ['🎉', '💖', '🌹', '✨', '🍵', '💕'];
                    createParticle(symbols[Math.floor(Math.random() * symbols.length)]);
                }, i * 80);
            }
        }

        window.onload = function() {
            triggerParticleEffects(1);
        };