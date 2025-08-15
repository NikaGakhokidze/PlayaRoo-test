document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching Logic
    const tabs = document.querySelectorAll('.services-our-services-content-item');
    const tabContents = document.querySelectorAll('.tab-content');
    let isTransitioning = false;
    let pendingTimeout = null;

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetContent = document.getElementById(this.dataset.tab);
            if (!targetContent) return;

            if (this.classList.contains('active')) return;

            if (isTransitioning && pendingTimeout) {
                clearTimeout(pendingTimeout);
                tabContents.forEach(content => {
                    content.classList.remove('active', 'fade-in');
                });
            }

            isTransitioning = true;

            tabs.forEach(t => t.classList.remove('active'));
            
            const currentActiveContent = document.querySelector('.tab-content.active');
            if (currentActiveContent && currentActiveContent !== targetContent) {
                currentActiveContent.classList.remove('fade-in');
                
                pendingTimeout = setTimeout(() => {
                    tabContents.forEach(content => {
                        content.classList.remove('active', 'fade-in');
                    });
                    
                    targetContent.classList.add('active');
                    
                    targetContent.offsetHeight;
                    
                    targetContent.classList.add('fade-in');
                    
                    isTransitioning = false;
                    pendingTimeout = null;
                }, 400); 
            } else {
                tabContents.forEach(content => {
                    content.classList.remove('active', 'fade-in');
                });
                
                targetContent.classList.add('active');
                pendingTimeout = setTimeout(() => {
                    targetContent.classList.add('fade-in');
                    isTransitioning = false;
                    pendingTimeout = null;
                }, 10);
            }

            this.classList.add('active');
        });

        tab.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });

    const listItems = document.querySelectorAll('.services-our-services-list-item');

    listItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
            const isExpanded = this.classList.contains('expanded');
            this.setAttribute('aria-expanded', isExpanded);

        });

        item.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });
});

function toggleCountryDropdown() {
    const dropdown = document.getElementById('country-dropdown');
    const dropdownBtn = document.querySelector('.country-code-dropdown');
    
    dropdown.classList.toggle('show');
    dropdownBtn.classList.toggle('open');
}

function selectCountry(flag, code, name) {
    document.getElementById('selected-flag').textContent = flag;
    document.getElementById('selected-code').textContent = code;
    
    const dropdown = document.getElementById('country-dropdown');
    const dropdownBtn = document.querySelector('.country-code-dropdown');
    dropdown.classList.remove('show');
    dropdownBtn.classList.remove('open');
}

document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('country-dropdown');
    const dropdownBtn = document.querySelector('.country-code-dropdown');
    
    if (dropdown && dropdownBtn && !dropdownBtn.contains(event.target)) {
        dropdown.classList.remove('show');
        dropdownBtn.classList.remove('open');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('fade-in');
    
    const navLinks = document.querySelectorAll('a[href$=".html"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.4s ease-in-out';
            
            setTimeout(() => {
                window.location.href = href;
            }, );
        });
    });
});

window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        document.body.style.opacity = '1';
    }
});