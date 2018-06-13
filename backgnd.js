var res=100;
var rows;
var cols;
var array;
var narray;
var whites;
var blacks;
var aud;
function setup() {
  var can=createCanvas(windowWidth,windowHeight);
  can.position(0,res);
  can.style('z-index','-1');
  background(0);
  rows=Math.floor(windowWidth/res);
  cols=Math.floor(windowHeight/res);
  array=setvalue(make2DArray(rows,cols));
  aud=new p5.AudioIn();
  aud.start();
}
function draw(){
  colreff=Math.pow(aud.getLevel()*10,6);
  whites=255;
  blacks=0;
  if(colreff>50){
    array=setvalue(make2DArray(rows,cols));

  }
  frameRate(100);
  narray=array;
  render(narray);
  array=nextGen(narray);


}
function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
function make2DArray(row,col) {
  var arr=new Array(row);
  for (var i = 0; i <arr.length; i++) {
    arr[i]=new Array(col);
  }
  return arr;
}
function setvalue(arr){
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j <arr[i].length; j++) {
        arr[i][j]=floor(random(2));
        }
    }
    return arr;
}
function render(arr){
  noStroke();
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j <arr[i].length; j++) {
      if (arr[i][j]==1) {
        fill(whites);
      }
      else {
        fill(blacks);
      }
      rect(i*res,j*res,res,res);
    }
  }
}
function nextGen(arr) {
  var state;
  var alies;
  for (var i = 1; i < arr.length-1; i++) {
    for (var j = 1; j < arr[i].length-1; j++) {
      state=arr[i][j];
      alies=countAlies(arr,i,j);
      if((state==1)&&((alies<2)||(alies>3))){
        arr[i][j]=0;
      }
      else if ((state==0)&&(alies==3)) {
        arr[i][j]=1;
      }
      else {
        arr[i][j]=state;
      }
    }
  }
  return(arr);
}
function countAlies(arr,x,y) {
  var sum=0;
  for(var i=-1;i<2;i++){
    for (var j = -1; j <2; j++) {
      sum+=arr[x+i][y+j];
    }
  }
  sum=sum-arr[x][y];
  return(sum);
}
