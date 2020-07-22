//mat.js needs to be defined first
const wire = {
  cube:(s,x=0,y=0,z=0)=>{
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
        [x+s*0.25,y+s*0.25,z+s,1],//draw number 1 on top side
        [x+s*0.5,y,z+s,1],
        [x+s*0.5,y+s,z+s,1]
      ]

    ]
  },
  ground:(x=0,y=0,z=0)=>{
    let grid = []
    const fiScalar = 0.5
    const xScalar = 10
    const yScalar = 10
    const zScalar = 10

    for(let i=0;i<20;++i){
      let line = []
      for(let j=0;j<20;++j){
        const c = Math.sin(i*fiScalar)
        const s = Math.sin(j*fiScalar)
        line.push([(i+x)*xScalar,(j+y)*yScalar+y,(c+s+z)*zScalar,1])
      }
      grid.push(line)
    }
    return grid
  }
}