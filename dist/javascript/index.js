const tabs = document.querySelectorAll('.tab-content');
document.getElementById('tab-content-1').style.maxHeight = document.getElementById('tab-content-1').scrollHeight + 'px';

function handleAboutSectionClick(element) {
    tabs.forEach(tab => {
        tab.style.maxHeight = '0';
    });
    
    const tabContent = element.querySelector('.tab-content');
    tabContent.style.maxHeight = tabContent.scrollHeight + 'px';
}