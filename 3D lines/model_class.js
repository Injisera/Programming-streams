//mat.js needs to be defined first
class model {
  constructor(dim,data,S){
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
  draw(ctx,T){

    let temp = mat.AB(T,this.rot_matrix)

    ctx.beginPath()
    this.data.forEach((line)=>{
      for(let i=0;i<line.length;++i){
        const p = mat.Ab(temp,line[i])
        if(i){
          ctx.lineTo(p[0],-p[1])
        }else{
          ctx.moveTo(p[0],-p[1])
        }
      }
    })
    ctx.stroke();
      
    
    //x,y out...
  }
}