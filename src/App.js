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
        upside: Math.random() >= 0.5
      },
      {
        height: 3,
        position: 11,
        upside: Math.random() >= 0.5
      },
      {
        height: 3,
        position: 28,
        upside: Math.random() >= 0.5
      },
      {
        height: 10,
        position: 25,
        upside: Math.random() >= 0.5
      },
      {
        height: 7,
        position: 22,
        upside: Math.random() >= 0.5
      },
      {
        height: 6,
        position: 17,
        upside: Math.random() >= 0.5
      }]
  
      rows[bird.height][bird.position] = 'yellow';
  
      this.state = {
        rows: rows,
        bird: bird,
        walls: walls,
        gameOver: false,
        ready: false
      };
      this.animateHeader = this.animateHeader.bind(this);
      this.startApp = this.startApp.bind(this);
      this.animateHeader('Flying Bird Game', 150, this.startApp);
  }
  startApp(){
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
          copyWalls[index].upside = Math.random() >= 0.5;
          copyWalls[index].height = Math.floor(Math.random() * 7) + 3;
        }
      }

      for (var i = 0; i < copyWalls.length; i++) {
        for (var j = 0; j < copyWalls[i].height; j++) {
          if(!copyWalls[i].upside){
            gridCopy[19 - j][copyWalls[i].position] = "red";
          }else{
            gridCopy[j][copyWalls[i].position] = "red";
          }
        }
      }

      for (var index = 0; index < 20; index++) {
          if(gridCopy[copyBird.height][copyBird.position] == 'red'){
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
  animateHeader(sentence, animationTime = 150, startApp) {
    let i = 0;
    let head = '';
    let self = this;
    let interval = setInterval(function() {
        head += sentence[i];
        self.setState({
          header: head
        }); 
        i++;
        if (interval && i == sentence.length) {
            clearInterval(interval);
            self.startApp.call();
        }
    }, animationTime);
  }
  onClick(){
    let birdCopy = this.state.bird;
    if(!this.state.gameOver){
      birdCopy.height -= 2; 
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
          <h1 className="App-title">{this.state.header}</h1>
          <h6 className="right">Developed by Vaishnav</h6>
        </header>
        {this.state.gameOver && <section className="btnContainer">
        <button onClick={this.replyOnClick.bind(this)}>Play Again!
        </button></section>}
        <section className="App-intro" onClick={this.onClick.bind(this)}>
          <BlockGrid rows={this.state.rows}/>
        </section>
      </div>
    );
  }
}

export default Game;
