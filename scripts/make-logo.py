"""Cuts the Two Roads logo (source-images/brand/two-roads-logo.webp) into web assets.

Run: python3 scripts/make-logo.py   (needs Pillow + numpy)

Writes to public/brand/:
  mark.png / mark-light.png         compass emblem only
  lockup.png / lockup-light.png     emblem + "TWO ROADS / TRAVEL SERVICE", side by side (nav)
  logo.png / logo-light.png         full stacked logo with tagline (footer)
and app/icon.png + app/apple-icon.png.
"-light" files recolour the navy to sand so they read on the dark ink background.
"""
from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "source-images/brand/two-roads-logo.webp"
OUT = ROOT / "public/brand"
OUT.mkdir(parents=True, exist_ok=True)

SAND = np.array([244, 239, 230], float)
SKY = np.array([150, 190, 218], float)  # light stand-in for the water blue on dark backgrounds


def unmatte(rgb):
    """White background -> transparency, keeping anti-aliased edges clean."""
    a = rgb.astype(float)
    dist = 255 - a.min(axis=2)
    alpha = np.clip((dist - 8) / 162, 0, 1)  # ignore faint compression noise in the white
    safe = np.where(alpha > 0, alpha, 1)[..., None]
    col = np.clip(255 - (255 - a) / safe, 0, 255)
    return np.dstack([col, alpha * 255])


def lighten(rgba):
    """Navy -> sand and water blue -> pale blue; gold stays gold."""
    out = rgba.copy()
    col = rgba[..., :3]
    blue = col[..., 0] < 110  # navy + water family (gold has a high red channel)
    t = np.clip((col[..., 1] - 50) / 30, 0, 1)[..., None]  # 0 = navy, 1 = water
    new = SAND * (1 - t) + SKY * t
    out[..., :3] = np.where(blue[..., None], new, col)
    return out


def save(arr, name):
    Image.fromarray(np.round(arr).astype(np.uint8), "RGBA").save(OUT / name, optimize=True)


def crop_rgba(rgba, top, bottom, left, right, pad=8):
    h, w = rgba.shape[:2]
    return rgba[max(0, top - pad):min(h, bottom + pad), max(0, left - pad):min(w, right + pad)]


def to_img(arr):
    return Image.fromarray(np.round(arr).astype(np.uint8), "RGBA")


src = np.asarray(Image.open(SRC).convert("RGB"))
rgba = unmatte(src)

# Bands measured from the 1254x1254 source.
mark = crop_rgba(rgba, 125, 723, 268, 987)
words = crop_rgba(rgba, 770, 961, 99, 1154)  # TWO ROADS + TRAVEL SERVICE
full = crop_rgba(rgba, 125, 1087, 99, 1154)

# Horizontal lockup: emblem twice the height of the text block, vertically centred.
wimg = to_img(words)
mh = int(wimg.height * 2.0)
mimg = to_img(mark)
mimg = mimg.resize((round(mimg.width * mh / mimg.height), mh), Image.LANCZOS)
gap = int(mh * 0.1)
canvas = Image.new("RGBA", (mimg.width + gap + wimg.width, mh), (0, 0, 0, 0))
canvas.alpha_composite(mimg, (0, 0))
canvas.alpha_composite(wimg, (mimg.width + gap, (mh - wimg.height) // 2))
lockup = np.asarray(canvas).astype(float)


def shrink(arr, max_w):
    img = to_img(arr)
    if img.width > max_w:
        img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
    return np.asarray(img).astype(float)


for name, arr, max_w in [("mark", mark, 480), ("lockup", lockup, 1000), ("logo", full, 900)]:
    arr = shrink(arr, max_w)
    save(arr, f"{name}.png")
    save(lighten(arr), f"{name}-light.png")
    h, w = arr.shape[:2]
    print(f"{name}: {w}x{h}")

# Favicon (transparent) and Apple touch icon (paper tile).
def square(arr, size, pad, bg=None):
    img = to_img(arr)
    inner = size - 2 * pad
    s = inner / max(img.size)
    img = img.resize((round(img.width * s), round(img.height * s)), Image.LANCZOS)
    tile = Image.new("RGBA", (size, size), bg or (0, 0, 0, 0))
    tile.alpha_composite(img, ((size - img.width) // 2, (size - img.height) // 2))
    return tile

square(mark, 256, 4).quantize(256, method=Image.Quantize.FASTOCTREE).save(ROOT / "app/icon.png", optimize=True)
square(mark, 180, 14, (251, 248, 243, 255)).convert("RGB").save(ROOT / "app/apple-icon.png", optimize=True)
print("icons written")
