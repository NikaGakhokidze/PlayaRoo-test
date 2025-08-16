document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.services-our-services-content-item');
    const tabContents = document.querySelectorAll('.tab-content');
    let isTransitioning = false;
    let pendingTimeout = null;
    let autoTabCycleInterval = null;
    let userInteracted = false;

    function restartProgressBar(activeTab) {
        activeTab.classList.remove('active');
        activeTab.offsetHeight;
        activeTab.classList.add('active');
    }

    function switchToTab(tab) {
        const targetContent = document.getElementById(tab.dataset.tab);
        if (!targetContent) return;
        
        if (tab.classList.contains('active')) return;

        if (isTransitioning && pendingTimeout) {
            clearTimeout(pendingTimeout);
            tabContents.forEach(content => {
                content.classList.remove('active', 'fade-in');
            });
        }

        isTransitioning = true;

        tabs.forEach(t => {
            t.classList.remove('active');
            t.classList.remove('paused');
        });
        
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

        tab.classList.add('active');
        
        if (userInteracted) {
            tab.classList.add('paused');
        } else {
            setTimeout(() => {
                restartProgressBar(tab);
            }, 50);
        }
    }

    function cycleToNextTab() {
        if (userInteracted || isTransitioning) return;
        
        const currentActiveTab = document.querySelector('.services-our-services-content-item.active');
        const currentIndex = Array.from(tabs).indexOf(currentActiveTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        const nextTab = tabs[nextIndex];
        
        switchToTab(nextTab);
    }

    function startAutoTabCycle() {
        if (autoTabCycleInterval) {
            clearInterval(autoTabCycleInterval);
        }
        autoTabCycleInterval = setInterval(cycleToNextTab, 5000);
    }

    function stopAutoTabCycle() {
        if (autoTabCycleInterval) {
            clearInterval(autoTabCycleInterval);
            autoTabCycleInterval = null;
        }
        userInteracted = true;
        
        const activeTabWhenStopped = document.querySelector('.services-our-services-content-item.active');
        if (activeTabWhenStopped) {
            activeTabWhenStopped.classList.add('paused');
        }
        
        setTimeout(() => {
            userInteracted = false;
            const currentActiveTab = document.querySelector('.services-our-services-content-item.active');
            if (currentActiveTab) {
                currentActiveTab.classList.remove('paused');
                restartProgressBar(currentActiveTab);
            }
            startAutoTabCycle();
        }, 10000);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            stopAutoTabCycle(); 
            switchToTab(this);
        });

        tab.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                stopAutoTabCycle(); 
                this.click();
            }
        });
    });

    if (tabs.length > 0) {
        const initialActiveTab = document.querySelector('.services-our-services-content-item.active');
        if (initialActiveTab) {
            setTimeout(() => {
                restartProgressBar(initialActiveTab);
            }, 100);
        }
        
        startAutoTabCycle();
    }

    const listItems = document.querySelectorAll('.services-our-services-list-item');

    listItems.forEach(item => {
        item.addEventListener('click', function() {
            const expandableContent = this.nextElementSibling;
            const isExpanded = this.classList.contains('expanded');
            
            if (isExpanded) {
                expandableContent.style.opacity = '0';
                
                    expandableContent.style.maxHeight = '0';
                    expandableContent.style.padding = '0 1rem';
                
                this.classList.remove('expanded');
                this.setAttribute('aria-expanded', 'false');
            } else {
                this.classList.add('expanded');
                this.setAttribute('aria-expanded', 'true');
                
                const scrollHeight = expandableContent.scrollHeight;
                expandableContent.style.maxHeight = scrollHeight + 'px';
                expandableContent.style.padding = '1rem';
                
                    expandableContent.style.opacity = '1';
            }
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
            });
        });
    });
});

window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        document.body.style.opacity = '1';
    }
});

function toggleMobileMenu() {
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('mobile-sidebar-overlay');
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    
    if (sidebar && overlay && toggleButton) {
        const isOpen = sidebar.classList.contains('open');
        
        if (isOpen) {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
            toggleButton.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            sidebar.classList.add('open');
            overlay.classList.add('show');
            toggleButton.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item, .mobile-contact-button');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            const sidebar = document.getElementById('mobile-sidebar');
            const overlay = document.getElementById('mobile-sidebar-overlay');
            const toggleButton = document.querySelector('.mobile-menu-toggle');
            
            if (sidebar && overlay && toggleButton) {
                sidebar.classList.remove('open');
                overlay.classList.remove('show');
                toggleButton.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const sidebar = document.getElementById('mobile-sidebar');
        const overlay = document.getElementById('mobile-sidebar-overlay');
        const toggleButton = document.querySelector('.mobile-menu-toggle');
        
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
            toggleButton.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const sidebar = document.getElementById('mobile-sidebar');
        const overlay = document.getElementById('mobile-sidebar-overlay');
        const toggleButton = document.querySelector('.mobile-menu-toggle');
        
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
            toggleButton.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});