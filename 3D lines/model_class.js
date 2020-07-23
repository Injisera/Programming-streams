//mat.js needs to be defined first
class model {
  constructor(width2,height2,dim,data){
    this.dim=dim
    this.width2=width2
    this.height2=height2
    
    this.data=data//3D coordinates, or some higher dimension coordinates
    this.temp = mat.eye(dim)//for rotations or some other garbage crap
    this.transform=mat.eye(dim)
    this.rot = new Array(dim-1)
    for(let i=0;i<dim-1;++i){
      this.rot[i]=0
    }
  }
  set pos(p){
    const offset = this.dim-1
    for(let i=0;i<p.length;++i){
      this.transform[i][offset] = p[i]
    }
  }

  set_pos(pos,val){
    this.transform[pos][this.dim-1]=val
  }
  add_pos(pos,val){
    this.transform[pos][this.dim-1]+=val
  }

  reset_rot(){
    for(let i=0;i<this.dim;++i){
      for(let j=0;j<this.dim;++j){
        this.transform[i][i]=0
      }
      this.transform[i][i]=1
    }
  }

  add_rot(pos,fi){//0 = z, 1 = x, 2 = y
    const m = this.dim-1;

    for(let i=0;i<m;++i){//reset entire rotation matrix
      for(let j=0;j<m;++j){
        this.temp[i][j]=0;
      }
      this.temp[i][i]=1;
    }
    
    mat.rot(this.temp,m,pos,fi)
    mat.vAB(this.transform,this.temp)
    //console.log(this.transform)
  }

  draw(ctx,transform){

    const total_transform = mat.AB(transform,this.transform)
    //               proj*view            model
    //const total_transform = mat.eye(4)

    const fisheye=0

    ctx.beginPath()
    this.data.forEach((line)=>{
      for(let i=0;i<line.length;++i){/* adds one to i */
        
        let p = mat.Ab(total_transform,line[i])

        //depth
        //y = depth 
        const near = 0
        if(p[1]>near){

          
          //fisheye lens
          if(fisheye){ 
            let temp = 0
            const scale = 400
            for(let i=0;i<3;++i){temp+=p[i]*p[i]}
            temp=scale/(Math.sqrt(temp)-near)
            for(let i=0;i<3;++i){p[i]*=temp}//spherical screen
            if(i){
              ctx.lineTo(p[0],p[2])
            }else{
              ctx.moveTo(p[0],p[2])
            }
          }else{
            p[0]=p[0]*200/p[1]//plane lens
            p[2]=p[2]*200/p[1]

            if(p[0]<this.width2 && p[0]>-this.width2 && p[2]<this.height2 && p[2]>-this.height2){//is the point inside the viewport?
              if(i){
                ctx.lineTo(p[0],p[2])
              }else{
                ctx.moveTo(p[0],p[2])
              }
            }else{
              ctx.stroke();
              ctx.beginPath()
            }
          }
        }else{
          ctx.stroke();
          ctx.beginPath()
        }
      }
    })
    ctx.stroke();
      
    
    //x,y out...
  }
}