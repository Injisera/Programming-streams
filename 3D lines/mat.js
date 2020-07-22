const mat = {
  eye:(size)=>{
    let out = new Array(size)
    for(let i=0;i<size;++i){
      out[i] = new Float32Array(size)
      out[i][i]=1
    }
    return out
  },
  Ab:(A,b)=>{//matrix times vector
    const m = A.length
    const n = b.length
    let out = new Float32Array(m)
    for(let i=0;i<m;++i){
      let sum = 0;
      for(let j=0;j<n;++j){
        sum+=A[i][j]*b[j]
      }
      out[i] = sum
    }
    return out;
  },
  Atb:(A,b)=>{//matrix transpose times vector
    const m = A.length
    const n = b.length
    let out = new Float32Array(m)
    for(let i=0;i<m;++i){
      let sum = 0;
      for(let j=0;j<n;++j){
        sum+=A[j][i]*b[j]
      }
      out[i] = sum
    }
    return out;
  },
  ab:(a,b)=>{//vector times vector, aka dot product
    const m = a.length
    let sum = 0;
    for(let i=0;i<m;++i){
      sum+=a[i]*b[i]
    }
    return sum;
  },
  AB:(A,B)=>{//matrix times matrix
    //m x n * n x o = m x o
    const m = A.length
    const n = B.length
    const o = B[0].length

    let out = new Array(m)
    for(let i=0;i<m;++i){
      out[i] = new Float32Array(o)
    }

    for(let i=0;i<m;++i){
      for(let j=0;j<o;++j){
        let sum = 0
        for(let k=0;k<n;++k){
          sum+=A[i][k]*B[k][j]
        }
        out[i][j]=sum
      }
    }
    return out
  },
  vAB:(A,B)=>{//void matrix times matrix
    //m x n * n x o = m x o
    const m = A.length
    const n = B.length
    const o = B[0].length

    let out = new Array(m)
    for(let i=0;i<m;++i){
      out[i] = new Float32Array(o)
    }

    for(let i=0;i<m;++i){
      for(let j=0;j<o;++j){
        let sum = 0
        for(let k=0;k<n;++k){
          sum+=A[i][k]*B[k][j]
        }
        out[i][j]=sum
      }
    }

    for(let i=0;i<m;++i){
      for(let j=0;j<n;++j){
        A[i][j]=out[i][j]//copy values over
      }
    }
  },
  AtB:(A,B)=>{//matrix transpose times matrix
    const m = A[0].length
    const n = B.length
    const o = B[0].length

    let out = new Array(m)
    for(let i=0;i<m;++i){
      out[i] = new Float32Array(o)
    }

    for(let i=0;i<m;++i){
      for(let j=0;j<o;++j){
        let sum = 0
        for(let k=0;k<n;++k){
          sum+=A[k][i]*B[k][j]
        }
        out[i][j]=sum
      }
    }
    return out
  },
  ABt:(A,B)=>{//matrix times matrix transpose

    const m = A.length
    const n = B[0].length
    const o = B.length

    let out = new Array(m)
    for(let i=0;i<m;++i){
      out[i] = new Float32Array(o)
    }

    for(let i=0;i<m;++i){
      for(let j=0;j<o;++j){
        let sum = 0
        for(let k=0;k<n;++k){
          sum+=A[i][k]*B[j][k]
        }
        out[i][j]=sum
      }
    }
    return out
  },
  AA:(A)=>{//matrix times matrix
    const m = A.length

    let out = new Array(m)
    for(let i=0;i<m;++i){
      out[i] = new Float32Array(m)
    }

    for(let i=0;i<m;++i){
      for(let j=0;j<m;++j){
        let sum = 0
        for(let k=0;k<m;++k){
          sum+=A[i][k]*A[k][j]
        }
        out[i][j]=sum
      }
    }
    return out
  },
  AtA:(A)=>{//matrix transpose times itself
    //m x n * n x o = m x o
    const m = A[0].length
    const n = A.length

    let out = new Array(m)
    for(let i=0;i<m;++i){
      out[i] = new Float32Array(m)
    }

    for(let i=0;i<m;++i){
      for(let j=0;j<m;++j){
        let sum = 0
        for(let k=0;k<n;++k){
          sum+=A[k][i]*A[k][j]
        }
        out[i][j]=sum
      }
    }
    return out
  },
  AAt:(A)=>{//matrix times itself transposed
    //m x n * n x o = m x o
    const m = A.length
    const n = A[0].length

    let out = new Array(m)
    for(let i=0;i<m;++i){
      out[i] = new Float32Array(m)
    }

    for(let i=0;i<m;++i){
      for(let j=0;j<m;++j){
        let sum = 0
        for(let k=0;k<n;++k){
          sum+=A[i][k]*A[j][k]
        }
        out[i][j]=sum
      }
    }
    return out
  },
  dinv:(A)=>{//dense inverse
    const m = A.length
    let B = new Array(m)
    for(let i=0;i<m;++i){
      B[i]=new Float32Array(2*m)
      for(let j=0;j<m;++j){
        B[i][j]=A[i][j]//copy
      }
      B[i][i+m]=1//identity matrix right hand side
    }

    const swish = function(C,col){
      let n = 0
      let row = 0
      for(let i=col;i<C.length;++i){
        let t = C[i][col]
        t*=t
        if(t>n){
          n=t
          row=i
        }
      };
      const temp = C[col]
      C[col] = C[row]
      C[row]=temp
    }

    for(let i=0;i<m;++i){
      swish(B,i,i);
      for(let j=i+1;j<m;++j){
        const f = B[j][i]/B[i][i]
        for(let k=i;k<m*2;++k){
          B[j][k]-=B[i][k]*f
        }
      }
    }

    for(let i=m-1;i>=0;--i){
      for(let j=0;j<i;++j){
        const f = B[j][i]/B[i][i]
        for(let k=i;k<m*2;++k){
          B[j][k]-=B[i][k]*f
        }
      }
    }

    for(let i=0;i<m;++i){
      const f=B[i][i]
      for(let j=0;j<m;++j){
        A[i][j]=B[i][j+m]/f
      }
    }
  },
  rot:(A,m,pos,fi)=>{
    //A should be identity matrix 
    //or an old rotation matrix that needs updating
    const s = Math.sin(fi)
    const c = Math.cos(fi)
    const a = pos%m
    const b = (pos+1)%m

    A[a][a]=c
    A[b][b]=c
    A[a][b]=-s
    A[b][a]=s
  },
  sinv:(A)=>{//sparse inverse
    //A should be a list of values in the sparse matrix
    return mat.dinv(A);//for now... lol
  }
}
