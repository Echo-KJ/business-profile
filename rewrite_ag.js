const fs = require('fs');

let html = fs.readFileSync('C:/Users/kiran/Documents/Demo-sites/clone-H/agriculture.html', 'utf8');

// Phase 1: Metadata
html = html.replace(
  /<meta name="description" content="Explore our agriculture solutions at The Habitainer.*?">/,
  '<meta name="description" content="Explore our complete range of tractor-mounted agriculture equipment — soil preparation, planting, irrigation, harvesting and utility tools available across India.">'
);

html = html.replace(
  /<title>Agriculture Equipment & Farm Cabins India \| The Habitainer<\/title>/,
  '<title>Tractor Equipment for Agriculture | The Habitainer</title>'
);

// Phase 2: Hero Section
html = html.replace(/<p class="ag-hero-subtitle">AGRICULTURE SOLUTIONS<\/p>/, '<p class="ag-hero-subtitle">TRACTOR EQUIPMENT</p>');
html = html.replace(/<h1 class="ag-hero-title">Built for the Field<\/h1>/, '<h1 class="ag-hero-title">The Right Tool for Every Field</h1>');
html = html.replace(/<p class="section-body mb-28">Portable cabins, storage sheds and farm infrastructure — engineered for Indian agriculture.<\/p>/, '<p class="section-body mb-28">Complete range of tractor-mounted equipment for soil preparation, planting, irrigation, crop care, harvesting and heavy utility work — available across India.</p>');
html = html.replace(/<a href="#products" class="btn btn-white">View Products<\/a>/, '<a href="#products" class="btn btn-white">Browse Equipment</a>');

html = html.replace(/<section class="ag-hero">/, '<section class="ag-hero" style="background-image: url(\\'assets/images/tractor-equipment/Tractor_rotavator_on_202603251810.jpeg\\');">');


// Phase 3: Intro Strip
const introStrip = \
<section class="intro-strip">
  <div class="intro-stats fade-up">
    <div class="stat-item">
      <h3>24+</h3>
      <p>Equipment Types</p>
    </div>
    <div class="stat-item">
      <h3>6</h3>
      <p>Work Categories</p>
    </div>
    <div class="stat-item">
      <h3>Pan India</h3>
      <p>Availability</p>
    </div>
    <div class="stat-item">
      <h3>Expert</h3>
      <p>Support Included</p>
    </div>
  </div>
</section>
\;
// Replace from <section class="intro-strip"> to </section>
html = html.replace(/<section class="intro-strip">[\\s\\S]*?<\\/section>/, introStrip.trim());

// Phase 4 & 5: Tabs & Product Grid
const newTabs = \
  <div class="tabs fade-up">
    <button class="tab-btn active" data-target="all">All Equipment</button>
    <button class="tab-btn" data-target="soil-preparation">Soil Preparation</button>
    <button class="tab-btn" data-target="planting-seeding">Planting & Seeding</button>
    <button class="tab-btn" data-target="irrigation-water">Irrigation & Water</button>
    <button class="tab-btn" data-target="crop-care">Crop Care</button>
    <button class="tab-btn" data-target="harvesting">Harvesting</button>
    <button class="tab-btn" data-target="heavy-utility">Heavy & Utility</button>
  </div>
\;

// Helper for card
function c(cat, emoji, tabName, file, name, desc, tags) {
  let imgStr = file.includes('(') || file.includes('solated') ? \<!-- Missing image for \, using \ temporarily -->\\n        <img src="assets/images/tractor-equipment/\" alt="\">\ : \<img src="assets/images/tractor-equipment/\" alt="\">\;
  let tagsHtml = tags.map(t => \<span class="spec-tag">\</span>\).join('\\n          ');
  return \
    <div class="product-card" data-category="\">
      <div class="product-img" style="position:relative;">
        <div style="position: absolute; top: 10px; left: 10px; background: var(--white); color: var(--black); font-size: 11px; font-weight: 500; padding: 4px 10px; border-radius: 20px; z-index: 1;">\ \</div>
        \
      </div>
      <div class="product-info">
        <h3 class="product-name">\</h3>
        <p class="product-desc" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="\">\</p>
        <div class="product-specs">\\n          \\\n        </div>
        <p class="product-price" style="color: var(--accent);">Price on Request</p>
        <div class="product-actions" style="margin-top:10px;">
          <a href="#contact" class="btn btn-dark btn-quote-prefill" data-product-name="\" style="width:100%;text-align:center;">Get Quote</a>
        </div>
      </div>
    </div>\;
}

let pg = '<div class="product-grid fade-up">';
pg += c('soil-preparation', '??', 'Soil Preparation', 'Heavy-duty_tractor_cultivator_202603251810.jpeg', 'Cultivator', 'Loosens soil and removes weeds between crop rows', ['Wheat', 'Rice', 'Cotton', 'All Crops']);
pg += c('soil-preparation', '??', 'Soil Preparation', 'Tractor_rotavator_on_202603251810.jpeg', 'Rotavator (Rotary Tiller)', 'Breaks and mixes soil finely for perfect seedbed preparation', ['Rice', 'Wheat', 'All Crops']);
pg += c('soil-preparation', '??', 'Soil Preparation', 'Mouldboard_plough_frame_202603251810.jpeg', 'Plough (Mouldboard / Disc)', 'Turns soil deeply for primary tillage before planting', ['Hard Soil', 'All Crops']);
pg += c('soil-preparation', '??', 'Soil Preparation', 'Tractor_harrow_isolated_202603251811.jpeg', 'Harrow', 'Smoothens and levels soil surface after ploughing', ['Wheat', 'Cotton']);
pg += c('soil-preparation', '??', 'Soil Preparation', 'Tractor_subsoiler_on_202603251811.jpeg', 'Subsoiler', 'Breaks hard compacted soil layers through deep tilling', ['Deep Tillage', 'All Crops']);

pg += c('planting-seeding', '??', 'Planting & Seeding', 'Tractor-mounted_seed_drill_202603251814.jpeg', 'Seed Drill', 'Plants seeds at uniform depth and spacing for even germination', ['Maize', 'Paddy', 'Cotton', 'Vegetables']);
pg += c('planting-seeding', '??', 'Planting & Seeding', 'Row_crop_planter_202603251814.jpeg', 'Planter', 'Precision planting for crops like maize and cotton', ['Maize', 'Vegetables']);
pg += c('planting-seeding', '??', 'Planting & Seeding', 'Rice_transplanter_machine_202603251814.jpeg', 'Transplanter', 'Mechanized paddy (rice) transplanting for large fields', ['Paddy', 'Rice']);

pg += c('irrigation-water', '??', 'Irrigation & Water', 'Agricultural_water_tanker_202603251816.jpeg', 'Water Tanker', 'Transports and sprays water across farm land efficiently', ['All Crops', 'Large Fields']);
pg += c('irrigation-water', '??', 'Irrigation & Water', 'Agricultural_sprayer_machine_202603251816.jpeg', 'Sprayer', 'Applies pesticides and liquid fertilizers to crops', ['Pesticide Use', 'All Crops']);
pg += c('irrigation-water', '??', 'Irrigation & Water', 'Tractor_boom_sprayer_202603251816.jpeg', 'Boom Sprayer', 'Covers large field areas quickly with wide spray boom', ['Large Fields', 'Pesticide Use']);

pg += c('crop-care', '??', 'Crop Care', 'Tractor_harrow_isolated_202603251811.jpeg', 'Weeder', 'Removes unwanted weeds without damaging crops', ['Weed Control', 'Nutrition']);
pg += c('crop-care', '??', 'Crop Care', 'Agricultural_sprayer_machine_202603251816.jpeg', 'Fertilizer Spreader', 'Spreads granular nutrients evenly across the field', ['Nutrition', 'Residue Management']);
pg += c('crop-care', '??', 'Crop Care', 'Tractor_rotavator_on_202603251810.jpeg', 'Mulcher', 'Cuts and shreds crop residue and weeds into the soil', ['Residue Management', 'Weed Control']);

pg += c('harvesting', '??', 'Harvesting', 'Indian_crop_reaper_202603251852.jpeg', 'Reaper', 'Cuts standing crops cleanly at harvest time', ['Wheat', 'Rice']);
pg += c('harvesting', '??', 'Harvesting', 'Indian_thresher_machine_202603251853.jpeg', 'Thresher', 'Separates grain from harvested crop efficiently', ['Wheat', 'Straw']);
pg += c('harvesting', '??', 'Harvesting', 'Tractor_straw_baler_202603251853.jpeg', 'Baler', 'Compresses and bundles straw into manageable bales', ['Straw', 'Transport']);
pg += c('harvesting', '??', 'Harvesting', 'Indian_tractor_trolley_202603251853.jpeg', 'Trailer / Trolley', 'Transports harvested crops from field to storage', ['Transport', 'Wheat']);

pg += c('heavy-utility', '???', 'Heavy & Utility', 'Tractor_front_loader_202603251858.jpeg', 'Front Loader', 'Lifts and moves soil, sand and manure with ease', ['Land Leveling', 'Excavation']);
pg += c('heavy-utility', '???', 'Heavy & Utility', 'Tractor_front_loader_202603251858(1).jpeg', 'Backhoe', 'Digs trenches and pits — functions like a mini excavator', ['Excavation', 'Fencing']);
pg += c('heavy-utility', '???', 'Heavy & Utility', 'Tractor_front_loader_202603251858(2).jpeg', 'Dozer Blade', 'Levels and grades land surfaces for field preparation', ['Land Leveling', 'Excavation']);
pg += c('heavy-utility', '???', 'Heavy & Utility', 'Tractor_post_hole_202603251858.jpeg', 'Post Hole Digger', 'Digs precise holes for fencing posts and infrastructure', ['Fencing', 'Land Leveling']);
pg += '\\n  </div>';


html = html.replace(/<div class="tabs fade-up">[\\s\\S]*?<\\/div>/, newTabs.trim());
html = html.replace(/<div class="product-grid fade-up">[\\s\\S]*?<\\/div>[\\s]*<\\/section>/, pg + '\\n</section>');

// Phase 6: Why Choose
const whySection = \
<section class="ag-why">
  <p class="section-tag text-center" style="color:var(--sand)">The Advantage</p>
  <h2 class="display fade-up">Farm Ready Engineering</h2>
  <div class="ag-why-grid fade-up">
    <div class="ag-why-card">
      <div style="font-size:32px;margin-bottom:15px;">??</div>
      <h3>Tractor Compatible</h3>
      <p>All equipment designed for standard tractor PTO and 3-point hitch systems</p>
    </div>
    <div class="ag-why-card">
      <div style="font-size:32px;margin-bottom:15px;">???</div>
      <h3>Durable Build</h3>
      <p>Heavy-duty steel construction for Indian field conditions and rough terrain</p>
    </div>
    <div class="ag-why-card">
      <div style="font-size:32px;margin-bottom:15px;">??</div>
      <h3>Pan India Delivery</h3>
      <p>Equipment delivered and set up at your farm location anywhere in India</p>
    </div>
    <div class="ag-why-card">
      <div style="font-size:32px;margin-bottom:15px;">??</div>
      <h3>After-Sales Support</h3>
      <p>Technical support and spare parts availability across our service network</p>
    </div>
  </div>
</section>
\;
html = html.replace(/<section class="ag-why">[\\s\\S]*?<\\/section>/, whySection.trim());

// Phase 7: Projects
const projectSection = \
<section class="ag-projects">
  <p class="section-tag">OUR WORK</p>
  <h2 class="display fade-up">Equipment In Action</h2>
  <div class="ag-projects-grid fade-up">
    <div class="ag-project">
      <img src="assets/images/tractor-equipment/Heavy-duty_tractor_cultivator_202603251810.jpeg" alt="Cultivator - Karnataka">
      <div class="ag-project-overlay">Cultivator — Karnataka</div>
    </div>
    <div class="ag-project">
      <img src="assets/images/tractor-equipment/Indian_crop_reaper_202603251852.jpeg" alt="Reaper - Maharashtra">
      <div class="ag-project-overlay">Reaper — Maharashtra</div>
    </div>
    <div class="ag-project">
      <img src="assets/images/tractor-equipment/Tractor_front_loader_202603251858.jpeg" alt="Front Loader - Andhra Pradesh">
      <div class="ag-project-overlay">Front Loader — Andhra Pradesh</div>
    </div>
  </div>
  <p class="section-body" style="margin: 0 auto 30px; text-align: center;">Deployed across farms in Karnataka, Maharashtra, Andhra Pradesh and beyond</p>
  <a href="javascript:void(0)" class="btn btn-outline">See All Projects</a>
</section>
\;
html = html.replace(/<section class="ag-projects">[\\s\\S]*?<\\/section>/, projectSection.trim());

// Phase 8: Inquiry Form
const formSection = \
<section class="ag-form-section" id="contact">
  <p class="section-tag text-center">ENQUIRE NOW</p>
  <h2 class="display fade-up text-center mb-40">Get Equipment for Your Farm</h2>
  <form id="agForm" class="ag-form fade-up">
    <div class="ag-form-grid">
      <div class="form-group">
        <label for="fname">Full Name *</label>
        <input type="text" id="fname" placeholder="Your full name" required>
      </div>
      <div class="form-group">
        <label for="femail">Email *</label>
        <input type="email" id="femail" placeholder="your@email.com" required>
      </div>
      <div class="form-group">
        <label for="fphone">Phone Number *</label>
        <input type="tel" id="fphone" placeholder="+91 00000 00000" required>
      </div>
      <div class="form-group">
        <label for="fstate">State</label>
        <input type="text" id="fstate" placeholder="Which state is your farm in">
      </div>
      <div class="form-group">
        <label for="fdistrict">District / Taluk</label>
        <input type="text" id="fdistrict" placeholder="Specific location">
      </div>
      <div class="form-group">
        <label for="farea">Farm Size (Acres)</label>
        <input type="number" id="farea" placeholder="Approximate farm size">
      </div>
      <div class="form-group">
        <label for="fproduct">Equipment Interest</label>
        <select id="fproduct">
          <option value="">Choose a product</option>
          <option>Cultivator</option>
          <option>Rotavator (Rotary Tiller)</option>
          <option>Plough (Mouldboard / Disc)</option>
          <option>Harrow</option>
          <option>Subsoiler</option>
          <option>Seed Drill</option>
          <option>Planter</option>
          <option>Transplanter</option>
          <option>Water Tanker</option>
          <option>Sprayer</option>
          <option>Boom Sprayer</option>
          <option>Weeder</option>
          <option>Fertilizer Spreader</option>
          <option>Mulcher</option>
          <option>Reaper</option>
          <option>Thresher</option>
          <option>Baler</option>
          <option>Trailer / Trolley</option>
          <option>Front Loader</option>
          <option>Backhoe</option>
          <option>Dozer Blade</option>
          <option>Post Hole Digger</option>
        </select>
      </div>
      <div class="form-group">
        <label for="fpurpose">Purpose</label>
        <select id="fpurpose">
          <option value="">Select purpose</option>
          <option>Purchase</option>
          <option>Rental</option>
          <option>Bulk Order</option>
          <option>Dealership Enquiry</option>
        </select>
      </div>
      <div class="form-group">
        <label for="ftractor">Tractor Brand You Own</label>
        <select id="ftractor">
          <option value="">Select brand</option>
          <option>Mahindra</option>
          <option>John Deere</option>
          <option>TAFE</option>
          <option>Sonalika</option>
          <option>Kubota</option>
          <option>New Holland</option>
          <option>Other</option>
          <option>Don't Own a Tractor</option>
        </select>
      </div>
      <div class="form-group">
        <label for="fbudget">Budget Range</label>
        <select id="fbudget">
          <option value="">Select budget</option>
          <option>Under ?50K</option>
          <option>?50K–?2L</option>
          <option>?2L–?5L</option>
          <option>?5L+</option>
          <option>Need Rental Quote</option>
        </select>
      </div>
      <div class="form-group ag-form-full">
        <label for="fmessage">Message</label>
        <textarea id="fmessage" placeholder="Tell us your requirement..."></textarea>
      </div>
      <div class="ag-form-full">
        <button type="submit" class="submit-btn" style="width: 100%; padding: 15px; background: var(--black); color: var(--white); border: none; font-size: 16px; cursor: pointer;">Send Equipment Enquiry</button>
      </div>
    </div>
  </form>
  <div class="form-success" id="formSuccess" style="display: none; margin-top: 20px; padding: 15px; background: #e6f4ea; color: #1e8e3e; border: 1px solid #ceead6; border-radius: 4px; text-align: center;">
    Thank you! Our agriculture solutions team will contact you within 24 hours.
  </div>
</section>
\;
html = html.replace(/<section class="ag-form-section" id="contact">[\\s\\S]*?<\\/section>/, formSection.trim());

// Phase 9: FAQ Section
const faqSection = \
<section class="faq-section faq-section-full">
  <div class="faq-inner">
    <p class="section-tag">Common Queries</p>
    <h2 class="display fade-up mb-40">Agriculture FAQ</h2>

    <div class="faq-item">
      <div class="faq-q">
        <span>Which tractor horsepower is compatible with your equipment?</span>
        <span class="toggle">+</span>
      </div>
      <div class="faq-a">Most of our equipment is compatible with tractors ranging from 35 HP to 75 HP. Specific HP requirements are mentioned in each product's specification. Our team will help you match the right implement to your tractor.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">
        <span>Do you offer equipment on rental or only for purchase?</span>
        <span class="toggle">+</span>
      </div>
      <div class="faq-a">We offer both purchase and rental options depending on availability in your region. Rental is ideal for seasonal use while purchase suits regular farming operations. Contact us for current rental availability in your area.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">
        <span>Can equipment be delivered to remote farm locations?</span>
        <span class="toggle">+</span>
      </div>
      <div class="faq-a">Yes, we deliver pan India including rural and remote areas. Delivery charges vary by location and equipment size. Contact us with your district and pincode for a delivery quote.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">
        <span>Is installation and demonstration included?</span>
        <span class="toggle">+</span>
      </div>
      <div class="faq-a">Yes, for purchases above a certain value, our technician will visit your farm for installation, calibration and a live demonstration. For smaller equipment, detailed instructions and video support are provided.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">
        <span>What warranty do you provide on equipment?</span>
        <span class="toggle">+</span>
      </div>
      <div class="faq-a">All equipment comes with a minimum 1-year manufacturer warranty on structural parts. Wear parts like blades, tines and bearings are covered for 6 months under normal use conditions.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">
        <span>Do you supply spare parts after purchase?</span>
        <span class="toggle">+</span>
      </div>
      <div class="faq-a">Yes, spare parts are available for all equipment we sell. We maintain stock at our Bangalore facility and can courier parts within 2–3 business days to most locations in India.</div>
    </div>
  </div>
</section>
\;
html = html.replace(/<section class="faq-section faq-section-full">[\\s\\S]*?<\\/section>/, faqSection.trim());

fs.writeFileSync('C:/Users/kiran/Documents/Demo-sites/clone-H/agriculture.html', html);
