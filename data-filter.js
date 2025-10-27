document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const categories = document.querySelectorAll('.data-category');
  const resultsInfo = document.getElementById('resultsInfo');

  let currentFilter = 'all';

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.getAttribute('data-filter');
      applyFilters();
    });
  });

  searchInput.addEventListener('input', function() {
    applyFilters();
  });

  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    categories.forEach(category => {
      const categoryType = category.getAttribute('data-category');
      const categoryText = category.textContent.toLowerCase();
      
      const matchesFilter = currentFilter === 'all' || categoryType === currentFilter;
      const matchesSearch = searchTerm === '' || categoryText.includes(searchTerm);

      if (matchesFilter && matchesSearch) {
        category.style.display = 'block';
        visibleCount++;
      } else {
        category.style.display = 'none';
      }
    });

    updateResultsInfo(visibleCount, searchTerm);
  }

  function updateResultsInfo(count, searchTerm) {
    let message = '';
    
    if (searchTerm) {
      message = `Found ${count} ${count === 1 ? 'category' : 'categories'} matching "${searchTerm}"`;
    } else if (currentFilter === 'all') {
      message = `Showing all ${count} categories`;
    } else {
      const filterName = document.querySelector(`[data-filter="${currentFilter}"]`).textContent;
      message = `Showing ${count} ${currentFilter} ${count === 1 ? 'category' : 'categories'}`;
    }

    if (count === 0) {
      message = 'No results found. Try a different search or filter.';
    }

    resultsInfo.textContent = message;
  }
});
