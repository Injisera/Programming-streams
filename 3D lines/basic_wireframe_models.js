//mat.js needs to be defined first
const wire = {
  cube:(s=10,x=-s/2,y=x,z=x)=>{
    //groups of lines to be drawn
    //lines will have x,y,z,1
    
    //origin = 0,0,0,1 //no shit lmao
    return [
      [
        [x,y,z,1],
        [x+s,y,z,1],
        [x+s,y+s,z,1],
        [x,y+s,z,1],
        [x,y+s,z,1],
        [x,y,z,1],
        [x,y,z+s,1],
        [x+s,y,z+s,1],
        [x+s,y+s,z+s,1],
        [x,y+s,z+s,1],
        [x,y,z+s,1]
      ],[
        [x+s,y,z,1],
        [x+s,y,z+s,1]
      ],[
        [x+s,y+s,z,1],
        [x+s,y+s,z+s,1]
      ],[
        [x,y+s,z,1],
        [x,y+s,z+s,1]
      ],[
        [x+s*0.2,y+s*0.7, z+s,1],//draw number 1 on top side
        [x+s*0.5, y+s,        z+s,1],
        [x+s*0.5, y+s*0.3,      z+s,1],
        [x+s*0.2, y+s*0.3,      z+s,1],
        [x+s*0.8, y+s*0.3,      z+s,1]
      ]
    ]
  },
  ground:(scalar=10,x=-25,y=-25,z=0)=>{
    let grid = []
    const fiScalar = 0.5

    for(let xx=0;xx<50;++xx){
      let line = []
      for(let yy=0;yy<50;++yy){
        const c = Math.sin(xx*fiScalar)
        const s = Math.sin(yy*fiScalar)
        line.push([(xx+x)*scalar,(yy+y)*scalar,(c+s+z)*scalar,1])
      }
      grid.push(line)
      line=[]
      for(let yy=0;yy<50;++yy){
        const c = Math.sin(yy*fiScalar)
        const s = Math.sin(xx*fiScalar)
        line.push([(yy+x)*scalar,(xx+y)*scalar,(c+s+z)*scalar,1])
      }
      grid.push(line)
    }
    return grid
  }
}