import React, { Component } from 'react';
import logo from './logo.svg';
import BlockGrid from './Components/BlockGrid/BlockGrid';
import './App.css';

class Game extends Component {
  constructor(props){
      super(props);
      let rows = [];
      for (var index = 0; index < 20; index++) {
          rows.push(new Array(30).fill('#e0e0e0'));
      }

      let bird = {
        height: 10,
        position: 2
      };

      let walls = [{
        height: 5,
        position: 6,
        upside: true
      },
      {
        height: 3,
        position: 11,
        upside: false
      },
      {
        height: 3,
        position: 28,
        upside: true
      },
      {
        height: 6,
        position: 17,
        upside: true
      }]

      rows[bird.height][bird.position] = 'yellow';

      this.state = {
        rows: rows,
        bird: bird,
        walls: walls,
        gameOver: false
      };

      this.timerID = setInterval(() => {
        let gridCopy = this.state.rows;
        let copyBird = this.state.bird;
        let copyWalls = this.state.walls.slice();

        if(copyBird.height >= 19 || copyBird.height < 0) {
          copyBird.height = 10;
          this.setState({
            gameOver: true
          });
        }else{
          if(!this.state.gameOver){
            copyBird.height += 1;
          }
        }

        for (var index = 0; index < 20; index++) {
          gridCopy[index] = new Array(30).fill('#e0e0e0');
        }
        
        for (var index = 0; index < copyWalls.length; index++) {
          if(!this.state.gameOver){
            copyWalls[index].position--;
          }
          if(copyWalls[index].position < 0){
            copyWalls[index].position = 29;
            copyWalls[index].height = Math.floor(Math.random() * 7) + 3;
          }
        }

        for (var i = 0; i < copyWalls.length; i++) {
          for (var j = 0; j < copyWalls[i].height; j++) {
            if(!copyWalls[i].upside){
              gridCopy[19 - j][copyWalls[i].position] = "blue";
            }else{
              gridCopy[j][copyWalls[i].position] = "blue";
            }
          }
        }

        for (var index = 0; index < 20; index++) {
            if(gridCopy[copyBird.height][copyBird.position] == 'blue'){
                copyBird.height = 10;
                this.setState({
                  gameOver: true
                });
            }
        }

        gridCopy[copyBird.height][copyBird.position] = 'yellow';
        this.setState ({
            rows: gridCopy,
            bird: copyBird
        });
      }, 200);
  }
  onClick(){
    let birdCopy = this.state.bird;
    if(!this.state.gameOver){
      birdCopy.height -= 3; 
    }
  }
  replyOnClick(){
    this.setState({
      gameOver: false
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Flying Bird Game</h1>
        </header>
        <p className="App-intro" onClick={this.onClick.bind(this)}>
          <BlockGrid rows={this.state.rows}/>
        </p>
        {this.state.gameOver && <button onClick={this.replyOnClick.bind(this)}>Play Again!</button>}
      </div>
    );
  }
}

export default Game;
