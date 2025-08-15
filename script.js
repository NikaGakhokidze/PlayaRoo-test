document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching Logic
    const tabs = document.querySelectorAll('.services-our-services-content-item');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(this.dataset.tab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
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