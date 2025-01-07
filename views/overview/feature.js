document.addEventListener('DOMContentLoaded', () => {
    const features = document.querySelectorAll('.feature');
  
    features.forEach(feature => {
      feature.addEventListener('mouseover', () => {
        feature.style.transform = 'translateY(-10px)';
        feature.style.boxShadow = '0 0 25px rgba(0, 0, 0, 0.2)';
        feature.style.backgroundColor = 'var(--span3-color)';
        feature.style.color = 'white';
      });
  
      feature.addEventListener('mouseout', () => {
        feature.style.transform = 'translateY(0)';
        feature.style.boxShadow = '0 0 25px rgba(0, 0, 0, 0.1)';
        feature.style.backgroundColor = 'var(--span1-color)';
        feature.style.color = '#333';
      });
    });
  });