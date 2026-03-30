// ===================================
// BLOG PAGE - Interactive Features
// ===================================

// ===== Blog Post Like/Heart Feature =====
function initBlogLikes() {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        // Load saved likes from localStorage
        const postId = button.getAttribute('data-post-id');
        const savedLikes = localStorage.getItem(`post-likes-${postId}`);
        const isLiked = localStorage.getItem(`post-liked-${postId}`);
        
        if (savedLikes) {
            button.setAttribute('data-likes', savedLikes);
            button.querySelector('.like-count').textContent = savedLikes;
        }
        
        if (isLiked === 'true') {
            button.classList.add('liked');
        }
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const isCurrentlyLiked = this.classList.contains('liked');
            let currentLikes = parseInt(this.getAttribute('data-likes')) || 0;
            
            if (isCurrentlyLiked) {
                currentLikes--;
                this.classList.remove('liked');
                localStorage.setItem(`post-liked-${postId}`, 'false');
            } else {
                currentLikes++;
                this.classList.add('liked');
                localStorage.setItem(`post-liked-${postId}`, 'true');
                
                // Show animation
                this.classList.add('bounce');
                setTimeout(() => this.classList.remove('bounce'), 600);
            }
            
            this.setAttribute('data-likes', currentLikes);
            this.querySelector('.like-count').textContent = currentLikes;
            localStorage.setItem(`post-likes-${postId}`, currentLikes);
        });
    });
}

// ===== Blog Search =====
function initBlogSearch() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = searchForm?.querySelector('input[type="text"]');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (!searchTerm) {
                showAllPosts();
                return;
            }
            
            filterPostsBySearch(searchTerm);
        });
    }
}

function filterPostsBySearch(searchTerm) {
    const blogPosts = document.querySelectorAll('.blog-post');
    let foundCount = 0;
    
    blogPosts.forEach(post => {
        const title = post.querySelector('h2, h3')?.textContent.toLowerCase() || '';
        const content = post.querySelector('p')?.textContent.toLowerCase() || '';
        const category = post.querySelector('.post-category')?.textContent.toLowerCase() || '';
        
        if (title.includes(searchTerm) || content.includes(searchTerm) || category.includes(searchTerm)) {
            post.style.display = 'block';
            post.classList.add('fade-in');
            foundCount++;
        } else {
            post.style.display = 'none';
            post.classList.remove('fade-in');
        }
    });
    
    // Show no results message
    const container = document.querySelector('.blog-posts');
    let noResultsMsg = document.getElementById('no-results');
    
    if (foundCount === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'no-results';
            noResultsMsg.className = 'no-results';
            noResultsMsg.innerHTML = `
                <i class="fas fa-search"></i>
                <h3>No posts found</h3>
                <p>Try searching for different keywords or browse our categories.</p>
            `;
            container.appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

function showAllPosts() {
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach(post => {
        post.style.display = 'block';
        post.classList.add('fade-in');
    });
    
    const noResultsMsg = document.getElementById('no-results');
    if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// ===== Category Filtering =====
function initCategoryFilter() {
    const categoryLinks = document.querySelectorAll('.categories-widget a, .sidebar-widget a[data-category]');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.querySelector('span')) {
                e.preventDefault();
                const category = this.textContent.split('(')[0].trim();
                filterPostsByCategory(category);
            }
        });
    });
}

function filterPostsByCategory(selectedCategory) {
    const blogPosts = document.querySelectorAll('.blog-post');
    let foundCount = 0;
    
    blogPosts.forEach(post => {
        const postCategory = post.querySelector('.post-category')?.textContent.trim();
        
        if (postCategory === selectedCategory) {
            post.style.display = 'block';
            post.classList.add('fade-in');
            foundCount++;
        } else {
            post.style.display = 'none';
        }
    });
    
    // Update active category
    document.querySelectorAll('.categories-widget a').forEach(link => {
        if (link.querySelector('span')) {
            const linkText = link.textContent.split('(')[0].trim();
            if (linkText === selectedCategory) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

// ===== Tag Filtering =====
function initTagFilter() {
    const tagLinks = document.querySelectorAll('.tags-widget a');
    
    tagLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tag = this.textContent.trim();
            
            // Toggle active state
            this.classList.toggle('active');
            
            // Here you can add tag filtering logic
            console.log('Tag selected:', tag);
        });
    });
}

// ===== Newsletter Subscription =====
function initNewsletterSubscription() {
    const newsletterForm = document.querySelector('.newsletter-form-inline');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('Please enter your email address', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate subscription
            showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
            emailInput.value = '';
            
            // Save to localStorage (for demo)
            let subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('subscribers', JSON.stringify(subscribers));
            }
        });
    }
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===== Read Time Estimation =====
function initReadTime() {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        const content = post.querySelector('p')?.textContent || '';
        const wordCount = content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Average 200 words per minute
        
        let readTimeElement = post.querySelector('.read-time');
        if (!readTimeElement) {
            readTimeElement = document.createElement('span');
            readTimeElement.className = 'read-time';
            readTimeElement.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} min read`;
            
            const postMeta = post.querySelector('.post-meta');
            if (postMeta) {
                postMeta.appendChild(readTimeElement);
            }
        }
    });
}

// ===== Social Share Buttons =====
function initSocialShare() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.getAttribute('data-platform');
            const postTitle = document.querySelector('h1, h2')?.textContent || 'Check out this post';
            const postUrl = window.location.href;
            
            let shareUrl = '';
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${encodeURIComponent(postTitle)}&body=${encodeURIComponent(postUrl)}`;
                    break;
            }
            
            if (shareUrl) {
                if (platform === 'email') {
                    window.location.href = shareUrl;
                } else {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            }
        });
    });
}

// ===== Post Hover Effects =====
function initPostHoverEffects() {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        post.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
}

// ===== Blog Comment Form =====
function initCommentForm() {
    const commentForms = document.querySelectorAll('.comment-form');
    
    commentForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[name="name"]')?.value.trim();
            const email = this.querySelector('input[name="email"]')?.value.trim();
            const comment = this.querySelector('textarea[name="comment"]')?.value.trim();
            
            // Validation
            if (!name || !email || !comment) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Add comment to list
            addComment(name, email, comment, this);
            
            // Reset form
            this.reset();
            showNotification('Thank you for your comment! It will appear after moderation.', 'success');
        });
    });
}

function addComment(name, email, comment, form) {
    const commentsList = form.parentElement.querySelector('.comments-list');
    
    if (!commentsList) return;
    
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <div class="comment-header">
            <h4>${escapeHtml(name)}</h4>
            <span class="comment-date">Just now</span>
        </div>
        <p class="comment-text">${escapeHtml(comment)}</p>
        <div class="comment-actions">
            <button class="comment-reply"><i class="fas fa-reply"></i> Reply</button>
            <button class="comment-like"><i class="far fa-heart"></i> Like</button>
        </div>
    `;
    
    commentsList.insertBefore(newComment, commentsList.firstChild);
    
    // Add animation
    newComment.classList.add('fade-in');
}

// ===== Helper: Escape HTML =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== Pagination (if needed) =====
function initPagination() {
    const paginationLinks = document.querySelectorAll('.pagination a');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.classList.contains('active')) {
                e.preventDefault();
                // Scroll to top of blog posts
                document.querySelector('.blog-posts')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===== Initialize All Blog Features =====
function initBlogFeatures() {
    initBlogLikes();
    initBlogSearch();
    initCategoryFilter();
    initTagFilter();
    initNewsletterSubscription();
    initReadTime();
    initSocialShare();
    initPostHoverEffects();
    initCommentForm();
    initPagination();
    
    console.log('Blog interactive features initialized!');
}

// Run on page load
if (document.body.classList.contains('blog-page') || document.querySelector('.blog-section')) {
    document.addEventListener('DOMContentLoaded', initBlogFeatures);
} else {
    // Fallback: Check if blog elements exist
    document.addEventListener('DOMContentLoaded', function() {
        if (document.querySelector('.blog-section')) {
            initBlogFeatures();
        }
    });
}
