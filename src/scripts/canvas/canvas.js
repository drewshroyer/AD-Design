import { SHAPES } from "../util/constants";
import paper, { Project, tool, Tool, Rectangle, Point } from 'paper';
import Konva from 'konva';
import { Group, Layer, Stage, Circle } from 'konva';

const boundsIdentifierObj = {
  1: 'topLeft', 2: 'topRight', 3: 'bottomRight', 0: 'bottomLeft'
}

const boundsCenterIdentifierObj = {
  1: 'topCenter', 2: 'rightCenter', 3: 'bottomCenter', 0: 'leftCenter'
}
const LINE = 'line'; 

class MyCanvas {
  constructor(canvasElement) {
    this.canvasElement =  canvasElement;
    this.centerPosition = this.getCenterPosition();
    this.strokeColor = 'black';
    this.fillColor = "white";
    this.defaultSize = [100,100];
    this.currentActiveItem = null;
    this.strokeWidth = 2;

    // sets up paper js on canvas
    paper.setup(canvasElement);
    //creates new project in paper
    this.project = new Project(canvasElement)
    //canvas scale value
    this.canvasScaleValue = 1;
    //creating tool
    this.tool = new Tool();
    // has moved at least 10 points:
    tool.minDistance = 2;


    //shapes method binding
    this.drawShapes = this.drawShapes.bind(this);
    // furniture elements binding
    this.drawQueen = this.drawQueen.bind(this);
    this.drawTwin = this.drawTwin.bind(this);
    this.drawRug = this.drawRug.bind(this);
    this.drawRoundRug = this.drawRoundRug.bind(this);
    this.drawDining = this.drawDining.bind(this);
    this.drawOffice = this.drawOffice.bind(this);
    this.drawTVCabinent = this.drawTVCabinent.bind(this);
    this.drawArmChair = this.drawArmChair.bind(this);
    this.drawUpholstered = this.drawUpholstered.bind(this);
    this.drawEndTable = this.drawEndTable.bind(this);
    this.drawRoundTable = this.drawRoundTable.bind(this);
    this.drawLoveSeat = this.drawLoveSeat.bind(this);
    this.drawCoffeeTable = this.drawCoffeeTable.bind(this);
    this.drawFirePlace = this.drawFirePlace.bind(this);
    this.drawStairs = this.drawStairs.bind(this);

    //general method binding
    this.getCenterPosition = this.getCenterPosition.bind(this);

    // anchor binding
    this.addAnchor = this.addAnchor.bind(this);
    this.update = this.update.bind(this);
    // this.createAnchors = this.createAnchors.bind(this);

     //add double click listener on canvas because tool have no double click listener
    this.canvasElement.addEventListener("dblclick", this.onToolDoubleClick);

    //set right menu liteners
    this.setMenuClickListener = this.setMenuClickListener.bind(this);

    this.setMenuClickListener();
  }

  setMenuClickListener(){
    const downloadFileElement = document.getElementById('download-file');
    downloadFileElement.addEventListener('click', this.downloadAsSVG.bind(this));
  }

  openFile(){
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = false;
    input.accept = 'image/svg+xml';
    input.onchange = () => {
            this.project.importSVG(URL.createObjectURL(input.files[0]),(group, svg)=>{
              this.project.clear();
              const that = this;
              while(group.children[1].children.length > 0){
                that.project.activeLayer.addChild(group.children[1].children[0]);
              }
            })
    };
    input.click();
  }

  downloadAsSVG() {
    if(this.project.activeLayer.children.length == 0) return;
    const fileName = `ad_design_${Date.now()}.svg`;
    let url = "data:image/svg+xml;utf8," + encodeURIComponent(this.project.exportSVG({asString:true}));
    let downloadLinkElement = document.createElement("a");
    downloadLinkElement.download = fileName;
    downloadLinkElement.href = url;
    downloadLinkElement.click();
 }

  drawShapes(shapeName){
 
    switch (shapeName) {  
      case SHAPES.QUEEN:
        this.drawQueen();
        break;
      case SHAPES.TWIN:
        this.drawTwin();
        break;
      case SHAPES.RUG:
        this.drawRug();
        break;
      case SHAPES.ROUNDRUG:
        this.drawRoundRug();
        break;
      case SHAPES.DINING:
        this.drawDining();
        break;
      case SHAPES.OFFICE:
        this.drawOffice();
        break;
      case SHAPES.TVCABINENT:
        this.drawTVCabinent();
        break;
      case SHAPES.ARMCHAIR:
        this.drawArmChair();
        break;
         case SHAPES.UPHOLSTERED:
        this.drawUpholstered();
        break;
      case SHAPES.ENDTABLE:
        this.drawEndTable();
        break;
      case SHAPES.ROUNDTABLE:
        this.drawRoundTable();
        break;
      case SHAPES.LOVESEAT:
        this.drawLoveSeat();
        break;
      case SHAPES.COFFEETABLE:
        this.drawCoffeeTable();
        break;
      case SHAPES.FIREPLACE:
        this.drawFirePlace();
        break;
      case SHAPES.STAIRS:
        this.drawStairs();
      default:
        break;
    }
  }

  drawQueen() {
    let queenImg = new Image();
    const canvasElement = document.getElementById('myCanvas');
    const ctx = canvasElement.getContext("2d");
    queenImg.onload = function() {
      ctx.drawImage(queenImg, 300, 300);
    }
    queenImg.src = "src/images/queen-bed.svg";
  }

  drawTwin() {
    let twinImg = new Image();
    const canvasElement = document.getElementById('myCanvas');
    const ctx = canvasElement.getContext("2d");
    twinImg.onload = function() {
      ctx.drawImage(twinImg, 300, 200);
    }
    twinImg.src = "src/images/twin-bed.svg";
  }

  drawRug() {
    let rugImg = new Image();
    const canvasElement = document.getElementById('myCanvas');
    const ctx = canvasElement.getContext("2d");
    rugImg.onload = function() {
      ctx.drawImage(rugImg, 300, 200);
    }
    rugImg.src = "src/images/rug.svg";
  }

   drawRoundRug() {
    let roundRugImg = new Image();
    const canvasElement = document.getElementById('myCanvas');
    const ctx = canvasElement.getContext("2d");
    roundRugImg.onload = function() {
      ctx.drawImage(roundRugImg, 300, 200);
    }
    roundRugImg.src = "src/images/round-rug.svg";
  }

   drawDining() {
    let diningImg = new Image();
    const canvasElement = document.getElementById('myCanvas');
    const ctx = canvasElement.getContext("2d");
    diningImg.onload = function() {
      ctx.drawImage(diningImg, 300, 300);
    }
    diningImg.src = "src/images/dining-table.svg";
  }

  drawOffice() {
    let officeImg = new Image();
    const canvasElement = document.getElementById('myCanvas');
    const ctx = canvasElement.getContext("2d");
    officeImg.onload = function() {
      ctx.drawImage(officeImg, 300, 200);
    }
    officeImg.src = "src/images/office-desk.svg";
  }

  drawTVCabinent() {
    let tvImg = new Image();
    const canvasElement = document.getElementById('myCanvas');
    const ctx = canvasElement.getContext("2d");
    tvImg.onload = function() {
      ctx.drawImage(tvImg, 300, 200);
    }
    tvImg.src = "src/images/tv-cabinent.svg";
  }

   drawArmChair() {
    let armChairImg = new Image();
    const canvasElement = document.getElementById('myCanvas');
    const ctx = canvasElement.getContext("2d");
    armChairImg.onload = function() {
      ctx.drawImage(armChairImg, 300, 200);
    }
    armChairImg.src = "src/images/arm-chair.svg";
  }
  drawUpholstered() {
    let upImg = new Image();
    const canvasElement = document.getElementById('myCanvas');
    const ctx = canvasElement.getContext("2d");
    upImg.onload = function() {
      ctx.drawImage(upImg, 300, 200);
    }
    upImg.src = "src/images/upholstered-chair.svg";
  }

    drawEndTable() {
    let endImg = new Image();
    const canvasElement = document.getElementById('myCanvas');
    const ctx = canvasElement.getContext("2d");
    endImg.onload = function() {
      ctx.drawImage(endImg, 300, 200);
    }
    endImg.src = "src/images/end-table.svg";
  }

   drawRoundTable() {
    let roundImg = new Image();
    const canvasElement = document.getElementById('myCanvas');
    const ctx = canvasElement.getContext("2d");
    roundImg.onload = function() {
      ctx.drawImage(roundImg, 300, 200);
    }
    roundImg.src = "src/images/round-table.svg";
  }

   drawLoveSeat() {
    let loveImg = new Image();
    const canvasElement = document.getElementById('myCanvas');
    const ctx = canvasElement.getContext("2d");
    loveImg.onload = function() {
      ctx.drawImage(loveImg, 300, 300);
    }
    loveImg.src = "src/images/love-seat.svg";
  }

  drawCoffeeTable() {
    let coffeeImg = new Image();
    const canvasElement = document.getElementById('myCanvas');
    const ctx = canvasElement.getContext("2d");
    coffeeImg.onload = function() {
      ctx.drawImage(coffeeImg, 300, 200);
    }
    coffeeImg.src = "src/images/coffee-table.svg";
  }

  drawFirePlace() {
    let fireImg = new Image();
    const canvasElement = document.getElementById('myCanvas');
    const ctx = canvasElement.getContext("2d");
    fireImg.onload = function() {
      ctx.drawImage(fireImg, 300, 200);
    }
    fireImg.src = "src/images/fire-place.svg";
  }

   drawStairs() {
    // const canvasElement = document.getElementById('myCanvas');
    // const ctx = canvasElement.getContext("Konva");
     let stairImg = new Image();
      let yodaImg = new Konva.Image({
        width: 42.8456376,
        height: 80,
      });

    let group = new Group({
        x: 300,
        y: 200,
        draggable: true,
    });
        // debugger
        let layer = new Layer();
        debugger
        let stage = new Stage({
          container: 'myCanvas',
          width: window.innerWidth,
          height: window.innerHeight,
        });
        //  debugger    
        stage.add(layer);
        layer.add(group);
        group.add(yodaImg);
        // debugger
        this.addAnchor(group, 0, 0, 'topLeft');
        this.addAnchor(group, 42.8456376, 0, 'topRight');
        this.addAnchor(group, 42.8456376, 80, 'bottomRight');
        this.addAnchor(group, 0, 80, 'bottomLeft');

    stairImg.onload = function() {
      yodaImg.image(stairImg)
      layer.draw();
    }
    stairImg.src = "src/images/stairs.svg";
    console.log(true);
  
   ctx.drawImage(yodaImg, 300, 200);
  }


    // createAnchors(image) {
    //   debugger
      
    // }
  
      update(activeAnchor) {
        debugger
        let group = activeAnchor.getParent();

        let topLeft = group.get('.topLeft')[0];
        let topRight = group.get('.topRight')[0];
        let bottomRight = group.get('.bottomRight')[0];
        let bottomLeft = group.get('.bottomLeft')[0];
        let image = group.get('Image')[0];

        let anchorX = activeAnchor.getX();
        let anchorY = activeAnchor.getY();

        // update anchor positions
        switch (activeAnchor.getName()) {
          case 'topLeft':
            topRight.y(anchorY);
            bottomLeft.x(anchorX);
            break;
          case 'topRight':
            topLeft.y(anchorY);
            bottomRight.x(anchorX);
            break;
          case 'bottomRight':
            bottomLeft.y(anchorY);
            topRight.x(anchorX);
            break;
          case 'bottomLeft':
            bottomRight.y(anchorY);
            topLeft.x(anchorX);
            break;
        }
        image.position(topLeft.position());

        let width = topRight.getX() - topLeft.getX();
        let height = bottomLeft.getY() - topLeft.getY();
        if (width && height) {
          image.width(width);
          image.height(height);
        }
      }
      
      addAnchor(group, x, y, name) {
        let stage = group.getStage();
        let layer = group.getLayer();
        let anchor = new Circle({
          x: x,
          y: y,
          stroke: '#000',
          fill: 'blue',
          strokeWidth: 1,
          radius: 2,
          name: name,
          draggable: true,
          dragOnTop: false,
        });

        anchor.on('dragmove', function () {
          update(this);
          layer.draw();
        });
        anchor.on('mousedown touchstart', function () {
          group.draggable(false);
          this.moveToTop();
        });
        anchor.on('dragend', function () {
          group.draggable(true);
          layer.draw();
        });
        // add hover styling
        anchor.on('mouseover', function () {
          let layer = this.getLayer();
          document.body.style.cursor = 'pointer';
          this.strokeWidth(2);
          layer.draw();
        });

        anchor.on('mouseout', function () {
          let layer = this.getLayer();
          document.body.style.cursor = 'default';
          this.strokeWidth(2);
          layer.draw();
        });
        group.add(anchor);
      }
  
  //----------------------- general methods --------------------------------------
  // return center position of canvas
  getCenterPosition(){
    return new Point({x: this.canvasElement.clientWidth/2, y:this.canvasElement.clientHeight/2});
  }

  // helper to set stroke and fill
  setStrokeAndFill(item){
    item.strokeWidth = this.strokeWidth;
    item.strokeColor = this.strokeColor;
    item.fillColor = this.fillColor;
  }
}

export default MyCanvas;