class Rect {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  show() {
    fill(this.c);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }

  hits(b) {
    return (
      this.x - this.w / 2 < b.x + b.w / 2 &&
      this.x + this.w / 2 > b.x - b.w / 2 &&
      this.y + this.h / 2 > b.y - b.h / 2 &&
      this.y - this.h / 2 < b.y + b.h / 2
    );
  }
}