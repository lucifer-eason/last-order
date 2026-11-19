#!/usr/bin/env python3
"""Build a dependency-free single HTML game and a reviewable source ZIP."""
from pathlib import Path
import base64
import re
import zipfile

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / 'dist'

def build():
    html = (DIST / 'index.html').read_text()
    css = (DIST / 'style.css').read_text()
    cover = 'data:image/png;base64,' + base64.b64encode((DIST / 'cover.png').read_bytes()).decode()
    css = css.replace("url('cover.png')", "url('" + cover + "')")
    html = html.replace('<link rel="stylesheet" href="style.css">', '<style>\n' + css + '\n</style>')
    def inline_script(match):
        code = (DIST / match.group(1)).read_text().replace('</script', '<\\/script')
        return '<script>\n' + code + '\n</script>'
    html = re.sub(r'<script src="([^"]+)"></script>', inline_script, html)
    standalone = ROOT / 'LAST-ORDER.html'
    standalone.write_text(html)
    archive = ROOT.parent / 'LAST-ORDER-project.zip'
    with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as z:
        for path in sorted(ROOT.rglob('*')):
            rel = path.relative_to(ROOT)
            if not path.is_file() or any(p in {'.git', 'node_modules', '__pycache__'} for p in rel.parts):
                continue
            if path.suffix in {'.zip', '.gz'} or path.name.startswith('.env') or path.name == '.DS_Store':
                continue
            z.write(path, 'LAST-ORDER/' + str(rel))
    print('Standalone: ' + str(standalone))
    print('Project ZIP: ' + str(archive))

if __name__ == '__main__':
    build()
