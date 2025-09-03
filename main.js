		const animElements = document.querySelectorAll('.animate-fade, .animate-slide, .animate-pop, .animate-bounce');
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if(entry.isIntersecting) {
					entry.target.classList.add('visible');
				}
			});
		}, { threshold: 0.2 });
		animElements.forEach(el => observer.observe(el));

		document.querySelectorAll('.scroll-link').forEach(link => {
			link.addEventListener('click', function(e) {
				e.preventDefault();
				const href = this.getAttribute('href');
				document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
			});
		});

		const parallaxBg = document.querySelector('.parallax-bg');
		window.addEventListener('scroll', () => {
			if(parallaxBg) {
				let offset = window.scrollY * 0.3;
				parallaxBg.style.transform = `translateY(${offset}px)`;
			}
		});

		function animateNumber(el, target, duration = 1200) {
			let start = 0;
			let startTime = null;
			function update(currentTime) {
				if (!startTime) startTime = currentTime;
				const progress = Math.min((currentTime - startTime) / duration, 1);
				el.textContent = Math.floor(progress * (target - start) + start);
				if (progress < 1) {
					requestAnimationFrame(update);
				} else {
					el.textContent = target;
				}
			}
			requestAnimationFrame(update);
		}
		const statNumbers = document.querySelectorAll('.stat-number');
		const statsSection = document.querySelector('.stats');
		let statsAnimated = false;
		function triggerStatsAnimation() {
			if(statsAnimated) return;
			const rect = statsSection.getBoundingClientRect();
			if(rect.top < window.innerHeight) {
				statNumbers.forEach(el => {
					animateNumber(el, parseInt(el.dataset.target));
				});
				statsAnimated = true;
			}
		}
		window.addEventListener('scroll', triggerStatsAnimation);
		window.addEventListener('load', triggerStatsAnimation);

		document.querySelectorAll('.highlight-on-hover').forEach(item => {
			item.addEventListener('mouseenter', () => {
				item.classList.add('active-highlight');
			});
			item.addEventListener('mouseleave', () => {
				item.classList.remove('active-highlight');
			});
		});