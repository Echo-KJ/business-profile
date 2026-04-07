import re
import os

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

base_dir = r"C:\Users\kiran\Documents\Demo-sites\clone-H"

css_path = os.path.join(base_dir, "assets", "css", "global.css")
js_path = os.path.join(base_dir, "assets", "js", "global.js")
index_path = os.path.join(base_dir, "index.html")

css_content = read_file(css_path)

# Fix 1: Header to position: relative
css_content = css_content.replace(
"""header {
  background: var(--white);
  border-bottom: 1px solid var(--border);
}""", 
"""header {
  position: relative;
  background: var(--white);
  border-bottom: 1px solid var(--border);
}""")

# Fix 3: Announcement Bar Mobile
css_content = css_content.replace(
"""@media (max-width: 600px) {""",
"""@media (max-width: 600px) {
  .announcement-bar {
    font-size: 10px;
    letter-spacing: 0;
    padding: 8px 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
""")

# Fix 5: Hero Slider Two Slides Visible
css_content = css_content.replace(
""".slides-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 100vw;
  transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
}""",
""".slides-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  flex-wrap: nowrap;
  transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
}""")

# Fix 6: Hero Slider Content Clipping Mobile
css_content = css_content.replace(
"""  .slide-content {
    left: 7%;
    right: 7%;
    bottom: 8%;
    max-width: none; /* Clear desktop max width */
    width: auto;     /* Flow fully between left/right boundaries without clipping */
  }
  
  .slide-title {
    font-size: clamp(28px, 8vw, 42px);
  }
  
  .slide-subtitle {
    letter-spacing: 1.5px;
  }""",
"""  .slide-content {
    left: 5%;
    right: 5%;
    bottom: 18%;
    max-width: none;
    width: auto;
  }
  
  .slide-title {
    font-size: clamp(24px, 7vw, 36px);
  }
  
  .slide-subtitle {
    font-size: 10px;
    letter-spacing: 1px;
  }""")

css_content = css_content.replace(
"""  .experience-img img {
    min-height: auto; /* Neutralize desktop stretching defaults */
    aspect-ratio: 4 / 3;
    object-fit: cover;
    object-position: center 30%; /* Re-center focal point from top 1/3 layout */
  }""",
"""  .experience-img {
    min-height: 280px;
  }
  .experience-img img {
    min-height: auto;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    object-position: center 30%;
  }""")

write_file(css_path, css_content)

print("CSS replacements applied correctly.")
