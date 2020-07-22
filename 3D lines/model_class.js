//mat.js needs to be defined first
class model {
  constructor(dim,data){
    this.dim=dim
    this.data=data//3D coordinates, or some higher dimension coordinates
    Object.freeze(this.data)//MUST NOT be changed!
    this.rot = new Array(dim)
    this.rot_matrix=mat.eye(dim)

    for(let i=0;i<dim-1;++i){
      this.rot[i]=0
    }
  }
  update_rot(){
    temp = mat.eye(this.dim)
    this.rot_matrix

    for(let i=0;i<this.dim;++i){
      for(let j=0;j<this.dim;++j){
        this.rot_matrix[i][j]=0
      }
      this.rot_matrix[i][i]=1
    }

    for(let i=0;i<arguments.length;++i){
      this.rot[i]=arguments[i];
      mat.rot(temp,n-1,i,this.rot[i])//last dim is used for offsets, not rotation
      mat.vAB(this.rot_matrix,temp)
    }
  }
  draw(ctx,screenTransform,cam){
    //ScreenTransform
    //
    const depth = 0.01
    let temp = mat.AB(cam.transform,this.rot_matrix)

    ctx.beginPath()
    this.data.forEach((line)=>{
      for(let i=0;i<line.length;++i){/* adds one to i */

        let temp_line = []
        //line[i] = [x,y,z,1]


        for(let j=0;j<4;++j){
          temp_line[j]=line[i][j]

          temp_line[j]+=cam.p[j]
        }
        let p = mat.Ab(temp,temp_line)


        //depth
        //y = depth 
        
        if(p[1]>10){
          
          p[0]=p[0]/(p[1]*depth)//x = x/y
          p[2]=p[2]/(p[1]*depth)//z = z/y
          p = mat.Ab(screenTransform,p)

          if(i){
            ctx.lineTo(p[0],-p[1])
          }else{
            ctx.moveTo(p[0],-p[1])
          }
        }
      }
    })
    ctx.stroke();
      
    
    //x,y out...
  }
}