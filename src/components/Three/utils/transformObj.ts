

const arr = [
  {
    position:[ 0,0,150],
    type: 'mainframe',
    id:'173.42.50.1',
    state:1,
    nodes: ['172.31.50.2','172.31.50.3', '172.31.50.4' ]
  },
  {
    position:[0,-20,140],
    type: 'mainframe',
    id:'172.31.50.2',
    state:1,
    nodes: ['172.31.50.5', '172.31.50.6', '172.31.50.7']
  },
  {
    position:[10,10,140],
    type: 'mainframe',
    id:'172.31.50.3',
    state:1,
    nodes: ['173.42.50.1']
  },
  {
    position:[15,20,140],
    type: 'mainframe',
    id:'172.31.50.4',
    state:1,
    nodes: ['172.31.50.11']
  },
  {
    position:[15,25,140],
    type: 'mainframe',
    id:'172.31.50.11',
    state:1,
    nodes: ['172.31.50.4']
  },
  {
    position:[15,28,130],
    type: 'mainframe',
    id:'172.31.50.13',
    state:1,
    nodes: ['172.31.50.11']
  },
  {
    position:[0,10,130],
    type: 'mainframe',
    id:'172.31.50.5',
    state:1,
    nodes: []
  },
  {
    position:[10,20,130],
    type: 'mainframe',
    id:'172.31.50.6',
    state:1,
    nodes: []
  },
  {
    position:[20,20,130],
    type: 'mainframe',
    id:'172.31.50.7',
    state:1,
    nodes: []
  },
]


interface JsonObj{
  position:number[];
  id: string;
  state: number;
  type: string;
  nodes: string[];
}

interface LineArg{
  parent: number[];
  child: number[]
}

const transformObj = () => {
  let imgArr= arr
  let lineArr: LineArg[] = getLineArr(arr)
  console.log( getLineCoord({ startId: '173.42.50.1', endId: '172.31.50.13', array:arr  }) )
  return {imgArr, lineArr}
}

const getLineArr = (array:JsonObj[]) => {
  let arr:LineArg[] = []
  array.forEach(i => {
    if(i.nodes&&i.nodes.length>0){
      i.nodes.forEach(item => {
        let parent = i.position;
        let child = getPosition(item, array)
        let isRepeat = arr.find(i => (i.parent===parent&&i.child===child)||(i.child===parent&&i.parent===child) ) //去重
        if(child.length&&!isRepeat){
          arr.push({ parent, child })
        }
      } ) 
    }
  } )
  return  arr
}



const getPosition = (id: string, arr:JsonObj[]) => {
  let obj = arr.find(i => i.id===id)
  if(obj){
    return obj.position
  }
  return []
}



//生成两点之间的路线图

interface LineCoordType{
  startId: string;
  endId: string;
  array: JsonObj[];
  startCoordArr?: number[][];
  endCoordArr?: number[][];
}
const getLineCoord = (obj:LineCoordType) => {
  let { startId, endId, array, startCoordArr=[], endCoordArr=[] } = obj
  let startObj = array.find(i => i.id=== startId );
  let endObj = array.find(i => i.id===endId );
  let arr = [];
  if(startObj&&endObj&&endObj.nodes){
    if(startObj.nodes.includes(endId)){
      arr = [ ...startCoordArr, startObj.position, endObj.position, ...endCoordArr  ]
      return arr
    }
    else {
      let startIdArr = startObj.nodes 
      let endIdArr = endObj.nodes;
      if(startIdArr.length&&endIdArr.length&&startObj.position&&endObj.position){
        let arr:any= []
        for( let i=0; i<startIdArr.length; i++ ){
          for(let j = 0; j<endIdArr.length; j++){
            
            if(startId===endId){
              arr = [...startCoordArr, startObj.position, ...endCoordArr]
              break;
            }
            else {
              let arrs = array.filter( i => i.id!==startId&&i.id!==endId)
              arr= getLineCoord({ startId:startIdArr[i], endId: endIdArr[j], array:arrs, startCoordArr: [...startCoordArr, startObj.position], endCoordArr: [endObj.position, ...endCoordArr] })
            }
          }
        }
        return arr
      }
      return []
    }
  }
  else return []
}

const concatArr = (...arg:any) => {
  let copy = (data:any) =>JSON.parse(JSON.stringify(data))
  let arr:any[] = []
  arg.forEach((i:any) =>{ arr.push(copy(i)) })
  console.log(arr, arg);
  return arr
}


export default transformObj
