const faqs = document.querySelectorAll('.faq-content');

faqs.forEach(faqcontent => {
    faqcontent.addEventListener('click', () => {
        const answer = faqcontent.querySelector('.answer');
        if (faqcontent.classList.contains('active')) {
            // Close
            answer.style.maxHeight = null;
        } else {
            // Open
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
        faqcontent.classList.toggle('active');
    });
});
