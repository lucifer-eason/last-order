#!/usr/bin/env python3
"""Build a dependency-free single HTML game and a reviewable source ZIP."""
from pathlib import Path
import argparse
import base64
import re
import zipfile

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / 'dist'

def build(output_dir=None):
    output = Path(output_dir).resolve() if output_dir else ROOT
    output.mkdir(parents=True, exist_ok=True)
    html = (DIST / 'index.html').read_text(encoding='utf-8')
    cover = 'data:image/png;base64,' + base64.b64encode((DIST / 'cover.png').read_bytes()).decode()
    font = 'data:font/ttf;base64,' + base64.b64encode((DIST / 'fonts/Silkscreen-Regular.ttf').read_bytes()).decode()
    def inline_style(match):
        css = (DIST / match.group(1)).read_text(encoding='utf-8')
        css = css.replace("url('cover.png')", "url('" + cover + "')")
        css = css.replace("url('fonts/Silkscreen-Regular.ttf')", "url('" + font + "')")
        return '<style>\n' + css + '\n</style>'
    html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', inline_style, html)
    def inline_script(match):
        code = (DIST / match.group(1)).read_text(encoding='utf-8').replace('</script', '<\\/script')
        return '<script>\n' + code + '\n</script>'
    html = re.sub(r'<script src="([^"]+)">\s*</script>', inline_script, html)
    standalone = output / 'LAST-ORDER.html'
    standalone.write_text(html, encoding='utf-8')
    archive = (output if output_dir else ROOT.parent) / 'LAST-ORDER-project.zip'
    with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as z:
        for path in sorted(ROOT.rglob('*')):
            rel = path.relative_to(ROOT)
            if not path.is_file() or any(p in {'.git', 'node_modules', '__pycache__'} for p in rel.parts):
                continue
            if output != ROOT and output in path.parents:
                continue
            if path.name == 'LAST-ORDER.html':
                continue
            if path.suffix in {'.zip', '.gz'} or path.name.startswith('.env') or path.name == '.DS_Store':
                continue
            z.write(path, 'LAST-ORDER/' + str(rel))
        z.write(standalone, 'LAST-ORDER/LAST-ORDER.html')
    print('Standalone: ' + str(standalone))
    print('Project ZIP: ' + str(archive))

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output-dir', help='Separate delivery directory; preserves earlier downloads.')
    build(parser.parse_args().output_dir)
