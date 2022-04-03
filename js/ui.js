//根据地图内容渲染页面

import * as map from "./map.js";
//定义元素宽高
console.log(map)
let Location = map.passmap();
// console.log(Location.map)
// map.map = map.passmap()[map];
// map.correctLocation = map.passmap()[correctLocation]
// console.log(map.passmap())
//获取页面元素
const container = document.getElementsByClassName('container')[0];

const WIDTH = 45;
const HEIGHT = 45;


 export function renewMap(){
    Location = map.passmap();
    return Location;
    
    
   
    // return Location
    // console.log(Location.correctLocation)
    // map.map = Location.map;
    // map.correctLocation = Location.correctLocation
}

//判断当前位置是否是正确位置
function isCorrect(line, col) {
    // const target = [line,col];
    return Location.correctLocation.find(function ([li, co]) {
        return line === li && col === co;
    })
}
// window.location = 

function addNewEle(ele) {

    const item = document.createElement('div');
    // 为元素添加类名
    item.className = 'item';
    item.classList.add(ele.className);
    // 为元素确定位置
    item.style.top = ele.line * HEIGHT + 'px';
    item.style.left = ele.col * WIDTH + 'px';
    container.appendChild(item)
}

window.addNewEle = addNewEle;

function renderOneEle(ele) {

    switch (ele.value) {
        //如果当前元素是空白 分为普通的空白,和正确位置的空白

        case map.SPACE:
            if (isCorrect(ele.line,ele.col)) {
                //进入此条分支,代表当前位置是正确的位置
                //向页面中添加一个元素,并且加上正确的class
                ele.className = 'correct'
                addNewEle(ele);
                return;
            } else {
                return;
            }

        case map.BOX:
            //进入此条分支
            //判断此时箱子是否在正确的位置上
            if (isCorrect(ele.line,ele.col)) {
                //进入此条分支,代表箱子位置是正确的位置
                ele.className = 'correctBox'
                addNewEle(ele);
                return;
            } else {
                ele.className = 'Box'
                addNewEle(ele);
                return;

            }
        case map.PLAYER:
            //玩家
            ele.className = 'player'
            addNewEle(ele);
            return;
        case map.WALL:
            ele.className = 'wall'
            addNewEle(ele);
            return;

    }
}

export function render() { // 循环数组
    //读取最新的地图数据
    renewMap ();
    container.innerHTML = '';
    for (let i = 0; i < map.mapHeight; i++) {
        for (let j = 0; j < map.mapWidth; j++) {
            let eleInfo = {
                line: i,
                col: j,
                value: Location.map[i][j]

            }
            renderOneEle(eleInfo)
        }
    }
}

// window.render = render()

//将Location作为默认输出
// export default Location;