document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching Logic
    const tabs = document.querySelectorAll('.services-our-services-content-item');
    const tabContents = document.querySelectorAll('.tab-content');
    let isTransitioning = false;
    let pendingTimeout = null;

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get the target content
            const targetContent = document.getElementById(this.dataset.tab);
            if (!targetContent) return;

            // If this tab is already active, do nothing
            if (this.classList.contains('active')) return;

            // If a transition is in progress, clear it and reset all states
            if (isTransitioning && pendingTimeout) {
                clearTimeout(pendingTimeout);
                // Immediately hide all content and reset states
                tabContents.forEach(content => {
                    content.classList.remove('active', 'fade-in');
                });
            }

            // Set transition flag
            isTransitioning = true;

            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Find currently active content and fade it out
            const currentActiveContent = document.querySelector('.tab-content.active');
            if (currentActiveContent && currentActiveContent !== targetContent) {
                // Start fade out by removing fade-in class
                currentActiveContent.classList.remove('fade-in');
                
                // After fade out completes, hide current and show new
                pendingTimeout = setTimeout(() => {
                    // Hide all content first to ensure clean state
                    tabContents.forEach(content => {
                        content.classList.remove('active', 'fade-in');
                    });
                    
                    // Show and fade in new content
                    targetContent.classList.add('active');
                    
                    // Force reflow to ensure display:block is applied
                    targetContent.offsetHeight;
                    
                    // Start fade in
                    targetContent.classList.add('fade-in');
                    
                    // Clear transition flag
                    isTransitioning = false;
                    pendingTimeout = null;
                }, 400); // Match the CSS transition duration
            } else {
                // No current content or same content, just show new content immediately
                tabContents.forEach(content => {
                    content.classList.remove('active', 'fade-in');
                });
                
                targetContent.classList.add('active');
                // Small delay to ensure smooth transition
                pendingTimeout = setTimeout(() => {
                    targetContent.classList.add('fade-in');
                    isTransitioning = false;
                    pendingTimeout = null;
                }, 10);
            }

            // Add active to clicked tab
            this.classList.add('active');
        });

        // Keyboard support for tabs (Enter/Space)
        tab.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });

    // Expandable List Items Logic (from previous, applies to all tabs)
    const listItems = document.querySelectorAll('.services-our-services-list-item');

    listItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
            const isExpanded = this.classList.contains('expanded');
            this.setAttribute('aria-expanded', isExpanded);

            // Optional: Accordion mode (uncomment if only one expandable open at a time per tab)
            // if (isExpanded) {
            //     const siblings = this.closest('.services-our-services-list').querySelectorAll('.services-our-services-list-item');
            //     siblings.forEach(otherItem => {
            //         if (otherItem !== this) {
            //             otherItem.classList.remove('expanded');
            //             otherItem.setAttribute('aria-expanded', 'false');
            //         }
            //     });
            // }
        });

        // Keyboard support for expandables
        item.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });
});

// Country Code Dropdown Functionality
function toggleCountryDropdown() {
    const dropdown = document.getElementById('country-dropdown');
    const dropdownBtn = document.querySelector('.country-code-dropdown');
    
    dropdown.classList.toggle('show');
    dropdownBtn.classList.toggle('open');
}

function selectCountry(flag, code, name) {
    document.getElementById('selected-flag').textContent = flag;
    document.getElementById('selected-code').textContent = code;
    
    // Close dropdown
    const dropdown = document.getElementById('country-dropdown');
    const dropdownBtn = document.querySelector('.country-code-dropdown');
    dropdown.classList.remove('show');
    dropdownBtn.classList.remove('open');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('country-dropdown');
    const dropdownBtn = document.querySelector('.country-code-dropdown');
    
    if (dropdown && dropdownBtn && !dropdownBtn.contains(event.target)) {
        dropdown.classList.remove('show');
        dropdownBtn.classList.remove('open');
    }
});

// Page Transition Effect
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in class to body when page loads
    document.body.classList.add('fade-in');
    
    // Handle navigation links with fade transition
    const navLinks = document.querySelectorAll('a[href$=".html"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Start fade out
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.4s ease-in-out';
            
            // Navigate after fade out completes
            setTimeout(() => {
                window.location.href = href;
            }, );
        });
    });
});

// Smooth fade in when coming from another page
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Page was loaded from cache (back/forward button)
        document.body.style.opacity = '1';
    }
});