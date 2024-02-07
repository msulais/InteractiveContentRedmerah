(() => {

const navigation = {
    'home': $('[href="#home"]'),
    'about': $('[href="#about"]'),
    'services': $('[href="#services"]'),
    'portofolio': $('[href="#portofolio"]'),
};

const observer = new IntersectionObserver(entries =>
    entries.forEach(entry =>
    navigation[entry.target.id].toggleAttribute(
        'data-selected',
        entry.isIntersecting
    )
), { threshold: 0.5 });

for (const section of $$('body > section'))
    observer.observe(section);

})();