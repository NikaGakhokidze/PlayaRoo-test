document.addEventListener('DOMContentLoaded', function() {
    const listItems = document.querySelectorAll('.services-our-services-list-item');

    listItems.forEach(item => {
        item.addEventListener('click', function() {
            // Toggle the expanded class
            this.classList.toggle('expanded');
            
            // Update ARIA for accessibility
            const isExpanded = this.classList.contains('expanded');
            this.setAttribute('aria-expanded', isExpanded);
            
            // Optional: Close other items if you want accordion behavior (only one open at a time)
            // if (isExpanded) {
            //     listItems.forEach(otherItem => {
            //         if (otherItem !== this) {
            //             otherItem.classList.remove('expanded');
            //             otherItem.setAttribute('aria-expanded', 'false');
            //         }
            //     });
            // }
        });

        // Optional: Allow keyboard toggle (Enter/Space key) for accessibility
        item.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });
});