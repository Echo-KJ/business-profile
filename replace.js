const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Header nav (has-dropdown)
content = content.replace('<a href="javascript:void(0)">Categories</a>', '<a href="#categories">Categories</a>');
content = content.replace('<a href="javascript:void(0)">Hospitality</a>', '<a href="#categories">Hospitality</a>');
content = content.replace('<a href="javascript:void(0)">Offices</a>', '<a href="#categories">Offices</a>');
content = content.replace('<a href="javascript:void(0)">Cafes</a>', '<a href="#categories">Cafes</a>');

// Header About menu
content = content.replace('<a href="javascript:void(0)">About</a>', '<a href="#about">About</a>');
content = content.replace('<a href="javascript:void(0)">About Us</a>', '<a href="#about">About Us</a>');
content = content.replace('<a href="javascript:void(0)">Our Process</a>', '<a href="#process">Our Process</a>');
content = content.replace('<a href="javascript:void(0)">Careers</a>', '<a href="#contact">Careers</a>');
content = content.replace('<a href="javascript:void(0)">Blogs</a>', '<a href="#contact">Blogs</a>');

// Header More menu
content = content.replace('<a href="javascript:void(0)">More</a>', '<a href="#projects">More</a>');
content = content.replace('<a href="javascript:void(0)">Resale and Rentals</a>', '<a href="#contact">Resale and Rentals</a>');
content = content.replace('<a href="javascript:void(0)">Developers & Investors</a>', '<a href="#contact">Developers & Investors</a>');

// Logo
content = content.replace('<a href="javascript:void(0)" class="logo">', '<a href="index.html" class="logo">');

// Mobile Nav
content = content.replace('<a href="javascript:void(0)">Hospitality</a>', '<a href="#categories">Hospitality</a>');
content = content.replace('<a href="javascript:void(0)">Offices</a>', '<a href="#categories">Offices</a>');
content = content.replace('<a href="javascript:void(0)">Cafes</a>', '<a href="#categories">Cafes</a>');

content = content.replace('<a href="javascript:void(0)">About Us</a>', '<a href="#about">About Us</a>');
content = content.replace('<a href="javascript:void(0)">Our Process</a>', '<a href="#about">Our Process</a>'); // wait, lets keep it #process
content = content.replace('<a href="javascript:void(0)">Blogs</a>', '<a href="#contact">Blogs</a>');
content = content.replace('<a href="javascript:void(0)">Resale and Rentals</a>', '<a href="#contact">Resale and Rentals</a>');
content = content.replace('<a href="javascript:void(0)">Developers & Investors</a>', '<a href="#contact">Developers & Investors</a>');

// Categories Section
// Actually the previous replacements by string matching will replace the first occurrences.
// For the Categories boxes (cat-item) we have:
content = content.replace('<a href="javascript:void(0)" class="cat-item">\\n      <img src="assets/images/IMG_20230607_120141.jpg"', '<a href="#categories" class="cat-item">\\n      <img src="assets/images/IMG_20230607_120141.jpg"');
content = content.replace('<a href="javascript:void(0)" class="cat-item">\\n      <img src="assets/images/SNF7878.jpg"', '<a href="#categories" class="cat-item">\\n      <img src="assets/images/SNF7878.jpg"');
content = content.replace('<a href="javascript:void(0)" class="cat-item">\\n      <img src="assets/images/categories/CAFE.png"', '<a href="#categories" class="cat-item">\\n      <img src="assets/images/categories/CAFE.png"');

content = content.replace('<a href="javascript:void(0)" class="btn btn-white">Projects</a>', '<a href="#projects" class="btn btn-white">Projects</a>');
content = content.replace('<a href="javascript:void(0)" class="btn-ghost-projects">Architecture</a>', '<a href="#services" class="btn-ghost-projects">Architecture</a>');

content = content.replace('<a href="javascript:void(0)" class="btn btn-sand">Our Process</a>', '<a href="#process" class="btn btn-sand">Our Process</a>');
content = content.replace('<a href="javascript:void(0)" class="btn-ghost-someday">Resale &amp; Rental</a>', '<a href="#contact" class="btn-ghost-someday">Resale &amp; Rental</a>');
content = content.replace('<a href="javascript:void(0)" class="btn-ghost-someday">Developers &amp; Investors</a>', '<a href="#contact" class="btn-ghost-someday">Developers &amp; Investors</a>');

// Footer
content = content.replace('<a href="javascript:void(0)">About Us</a>', '<a href="#about">About Us</a>');
content = content.replace('<a href="javascript:void(0)">Our Process</a>', '<a href="#process">Our Process</a>');
content = content.replace('<a href="javascript:void(0)">Careers</a>', '<a href="#contact">Careers</a>');
content = content.replace('<a href="javascript:void(0)">Blogs</a>', '<a href="#contact">Blogs</a>');
content = content.replace('<a href="javascript:void(0)">Hospitality</a>', '<a href="#categories">Hospitality</a>');
content = content.replace('<a href="javascript:void(0)">Offices</a>', '<a href="#categories">Offices</a>');
content = content.replace('<a href="javascript:void(0)">Cafes</a>', '<a href="#categories">Cafes</a>');
content = content.replace('<a href="javascript:void(0)">Resale and Rentals</a>', '<a href="#contact">Resale and Rentals</a>');
content = content.replace('<a href="javascript:void(0)">Developers &amp; Investors</a>', '<a href="#contact">Developers &amp; Investors</a>');
content = content.replace('<a href="javascript:void(0)">Privacy Policy</a>', '<a href="#contact">Privacy Policy</a>');
content = content.replace('<a href="javascript:void(0)">Terms of Service</a>', '<a href="#contact">Terms of Service</a>');
content = content.replace('<a href="javascript:void(0)">Privacy Policy</a>', '<a href="#contact">Privacy Policy</a>');
content = content.replace('<a href="javascript:void(0)">Terms of Service</a>', '<a href="#contact">Terms of Service</a>');
content = content.replace('<a href="javascript:void(0)">Contact Information</a>', '<a href="#contact">Contact Information</a>');

// Global replace the rest
content = content.split('javascript:void(0)').join('#categories');

// Sections missing IDs
content = content.replace('<section class="services-section">', '<section class="services-section" id="services">');
content = content.replace('<section class="projects-section">', '<section class="projects-section" id="projects">');
content = content.replace('<section class="someday-section">', '<section class="someday-section" id="about">');
// Instead of attaching process id to h3, let's just make it id="process" on that specific service
content = content.replace('<h3>Architectural Design Services</h3>', '<h3 id="process">Architectural Design Services</h3>');

fs.writeFileSync('index.html', content);
console.log("Done");
