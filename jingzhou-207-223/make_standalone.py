import re, base64, os

BASE = '/workspace/jingzhou-207-223'
with open(os.path.join(BASE, 'jingzhou-207-223.html'), 'r', encoding='utf-8') as f:
    html = f.read()

# 1) PNG -> base64 内联
with open(os.path.join(BASE, 'assets', 'jingzhou_map.png'), 'rb') as f:
    b64 = base64.b64encode(f.read()).decode()
html = html.replace(
    'src="assets/jingzhou_map.png"',
    f'src="data:image/png;base64,{b64}"'
)

# 2) JS 文件内联（用 lambda 避免转义问题）
def inline_js(src_attr, code):
    pat = re.compile(rf'<script src="{re.escape(src_attr)}"></script>')
    return pat.sub(lambda m: f'<script>\n{code}\n</script>', html)

for jsfile in ['assets/data.js', 'assets/render.js']:
    with open(os.path.join(BASE, jsfile), 'r', encoding='utf-8') as f:
        code = f.read()
    html = inline_js(jsfile, code)

# echarts
with open(os.path.join(BASE, '_shared', 'js', 'echarts.min.js'), 'r', encoding='utf-8') as f:
    echarts_code = f.read()
html = inline_js('./_shared/js/echarts.min.js', echarts_code)

# 3) 移除 favicon（左上角裂图标的根源！）
html = re.sub(r'<link rel="icon"[^>]*>', '', html)

out_path = os.path.join(BASE, 'jingzhou-207-223-standalone.html')
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(html)
print(f"OK! Size: {os.path.getsize(out_path)/1024/1024:.2f} MB")
