//控制玩家移动
import  {
    render,
    renewMap
} from './ui.js'
import * as map from './map.js'
import {randomRain} from './rainbow.js'
//运动函数,传入走的方向,实现走一步
// console.log(map)
const UP = 'up';
const LEFT = 'left';
const RIGHT = 'right';
const DOWN = 'down';

let Location = renewMap();




function findPlayer() {
    let targetLocation = {};
    for (let i = 0; i < map.mapHeight; i++) {
        for (let j = 0; j < map.mapWidth; j++) {
            if (Location.map[i][j] === map.PLAYER) {
                //找到了玩家坐标
                targetLocation.line = i;
                targetLocation.col = j;
            }
        }
    }
    return targetLocation
}
window.findPlayer = findPlayer;

function findnNext(player, direction) {
    var nextInfo = {}
    switch (direction) {
        case UP:
            nextInfo.col = player.col;
            nextInfo.line = player.line - 1;
            break;
        case LEFT:
            nextInfo.col = player.col - 1;
            nextInfo.line = player.line;
            break;
        case RIGHT:
            nextInfo.col = player.col + 1;
            nextInfo.line = player.line;
            break;
        case DOWN:
            nextInfo.col = player.col;
            nextInfo.line = player.line + 1;
            break;



    }

    //通过map.map确定下一个是什么
    nextInfo.value = Location.map[nextInfo.line][nextInfo.col]
    return nextInfo
}
window.findnNext = findnNext;

function change(player, nextInfo) {
    var temp;
    temp = Location.map[player.line][player.col];
    Location.map[player.line][player.col] = Location.map[nextInfo.line][nextInfo.col];
    Location.map[nextInfo.line][nextInfo.col] = temp;

}

function move(direction) {
    //找到玩家当前的位置
    
    let player = findPlayer();
    // 判断下一个位置能不能走
    //找到下一个位置
    // console.log(Location.correctLocation)
    // console.log(player, direction)
    let nextInfo = findnNext(player, direction);
    // console.log(player, direction)
    //对下一个位置进行判断
    if (nextInfo.value == 0) {
        //进行位置交换
        change(player, nextInfo);
    } else if (nextInfo.value == 3) {
        //下一个位置是箱子,有两种可能,
        //如果箱子的后面不为空地那么箱子推不动
        //如果箱子的后面还是空的,那么箱子可以推动
        let nextNextInfo = findnNext(nextInfo, direction);
        if (nextNextInfo.value == 0) {
            change(nextInfo, nextNextInfo);
            change(player, nextInfo)
        } else {
            window.alert('臭猪,这个箱子推不动的')
        }


    } else {
        window.alert('臭猪!!你怎么撞墙了')
    }

    render();
    checkfinish();
}

// 每走一步都要检查是否完成游戏
window.randomRain= randomRain;
function checkfinish(){
    // 判断正确坐标里的每个值是否为箱子的值,如果是即为完成,否则没有完成
    if(Location.correctLocation.every(([line,col])=>{
        return Location.map[line][col] == 3;
    })){
        let ww =randomRain();
        ww += `
        你赢了!!臭屁猪 
        `
        
        setTimeout(function(){
            window.alert(ww);
            //进行下一关
            map.add();
            Location = renewMap()
            
            render();
            console.log(Location.correctLocation)
            bindEvent();


        },0)
    }else{
        // console.log('没完')
    }
}


// 注册事件
export function bindEvent(){
    // console.log('kk')
    window.onkeydown = function (e) {
        // console.log(e.key)
        switch (e.key) {
            case 'ArrowUp':
                move(UP);
                break;
            case 'ArrowLeft':
                move(LEFT);
                break;
            case 'ArrowDown':
                move(DOWN);
                break;
            case 'ArrowRight':
                move(RIGHT);
                break;
    
            default:
                break;
        }
        //ArrowUp,ArrowLeft,ArrowDown ArrowRight
    }
}

