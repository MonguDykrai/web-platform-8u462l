class Rectangle {
  constructor(xpoint, ypoint, width, height, color, context) {
    this.xpoint = xpoint;
    this.ypoint = ypoint;
    this.width = width;
    this.height = height;
    this.color = color;
    this.path2DInstance = null;
    this.context = context;
  }

  draw() {
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath
    // https://www.rgraph.net/blog/path-objects.html
    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
    this.path2DInstance = new Path2D();
    this.path2DInstance.rect(this.xpoint, this.ypoint, this.width, this.height);
    this.context.strokeStyle = 'red'; // 路径颜色
    this.context.lineWidth = 3; // 路径宽度
    this.context.fillStyle = this.color; // 填充的颜色
    this.context.stroke(this.path2DInstance); // 绘制路径
    this.context.fill(this.path2DInstance); // 填色
  }

  changeColor(newColor) {
    this.color = newColor;
    this.draw();
  }

  clickRectangle(xmouse, ymouse) {
    if (this.context.isPointInPath(this.path2DInstance, xmouse, ymouse)) {
    } else {
    }
  }
}

class Canvas {
  constructor({ width, height, canvasId, backgroundColor = '#bbf' }) {
    this.width = width || window.innerWidth;
    this.height = height || window.innerHeight;
    this.backgroundColor = backgroundColor;
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.addClickEventListener();
    this.eles = [];
  }

  addRect({ x, y, width, height, color }) {
    const rect = new Rectangle(x, y, width, height, color, this.context);
    this.eles.push(rect);
    rect.draw();
  }

  addClickEventListener() {
    console.log(this.canvas);
    this.canvas.addEventListener('click', (event) => {
      this.eles.forEach((ele) => {
        ele.clickRectangle(event.layerX, event.layerY);
      });
    });
  }
}

const canvas = new Canvas({
  canvasId: 'canvas',
});

canvas.addRect({
  x: 100,
  y: 100,
  width: 40,
  height: 60,
  color: 'orange',
});

canvas.addRect({
  x: 120,
  y: 120,
  width: 40,
  height: 60,
  color: 'purple',
});
