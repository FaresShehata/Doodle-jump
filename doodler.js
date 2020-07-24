class Doodler extends Rect {
  constructor(x, y) {
    super(x, y, 20, 30, color(91, 168, 15));

    this.xspeedMax = 10;
    this.xspeed = 0;
    this.xaccel = 1;

    this.yspeed = -20;
    this.gravity = 0.5;
    this.moving = false;
    this.movingRight = true;
  }

  moveY() {
    this.yspeed += this.gravity;
    this.yspeed *= 0.99;
    this.y += this.yspeed;
  }

  moveX() {
    if (this.moving) {
      if (this.movingRight) {
        this.xspeed += this.xaccel;
        this.xspeed = constrain(this.xspeed, 0, this.xspeedMax);
      } else {
        this.xspeed -= this.xaccel;
        this.xspeed = constrain(this.xspeed, -this.xspeedMax, 0);
      }
    } else {
      if (this.xspeed > 0) {
        this.xspeed -= this.xaccel;
        this.xspeed = constrain(this.xspeed, 0, this.xspeedMax);
      } else if (this.xspeed < 0) {
        this.xspeed += this.xaccel;
        this.xspeed = constrain(this.xspeed, -this.xspeedMax, 0);
      }
    }
    this.x += this.xspeed;

    if (this.x - this.w / 2 > width) this.x = 0 - this.w / 2;
    else if (this.x + this.w / 2 < 0) this.x = width + this.w / 2;
  }

  jump() {
    this.yspeed = -20;
  }

  // show() {
  //   if (this.movingRight) image(doodlerRight, this.x, this.y, this.w, this.h);
  //   else image(doodlerLeft, this.x, this.y, this.w, this.h);
  // }

  render() {
    this.show();
    this.moveY();
    this.moveX();
  }
}