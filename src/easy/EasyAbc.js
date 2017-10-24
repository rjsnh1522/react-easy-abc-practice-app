import React, { Component } from 'react';

import alphabets from './alphabets.json';

import classNames from 'classnames';


class EasyAbc  extends Component{

	constructor(props){

		super(props);

		this.state = {
			alphabets:alphabets,
			currentPosition: 0,
			currentTick:0,
			random:false,
			sound:true
		};

		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.playSound = this.playSound.bind(this);
		this.switchRandom = this.switchRandom.bind(this);
		this.switchSound = this.switchSound.bind(this);
		this.manualPlaySound = this.manualPlaySound.bind(this);

	}

	componentDidMount(){
		let letterSound = document.querySelector(`audio[data-key="letter"]`);
		if(this.state.currentPosition === 0){
			letterSound.currentTime =0;
			letterSound.play();
		}
	}
	componentDidUpdate(){
		this.playSound();
	}


	switchSound(){
		this.setState({sound: !this.state.sound})

	}
	manualPlaySound(){
		let letterSound = document.querySelector(`audio[data-key="letter"]`);
		let wordSound = document.querySelector(`audio[data-key="word"]`);
			if(this.state.currentTick === 0){
				letterSound.currentTime = 0;
				letterSound.play();
			}
			else{
				letterSound.currentTime = 0;
				wordSound.currentTime = 0;
				wordSound.play();
			}

	}
	playSound(){
		let letterSound = document.querySelector(`audio[data-key="letter"]`);
		let wordSound = document.querySelector(`audio[data-key="word"]`);
		if(this.state.sound){
			if(this.state.currentTick === 0){
				letterSound.currentTime = 0;
				letterSound.play();
			}
			else{
				letterSound.currentTime = 0;
				wordSound.currentTime = 0;
				wordSound.play();
			}

		}

	}
	randomNumber(min,max){
		return Math.floor(Math.random() * (max - min +1)) + min;
	}

	switchRandom(){
		this.setState({random: !this.state.random})
	}

	next(){
		if(this.state.random){
			if(this.state.currentTick < 2){
				this.setState({
					currentTick: (this.state.currentTick+1)
				})
			}else{
				this.setState({currentPosition:this.randomNumber(0,25),currentTick:0})
			}
		}else{
			if(this.state.currentPosition === this.state.alphabets.length - 1){
				if(this.state.currentTick < 2){
					this.setState({
						currentTick: (this.state.currentTick+1)
					})
				}else{
					this.setState({currentPosition:0,currentTick:0})
				}
			} else{
				if(this.state.currentTick < 2){
					this.setState({
						currentTick: (this.state.currentTick+1)
					})
				}else{
					this.setState({
						currentPosition: (this.state.currentPosition+1),
						currentTick:0
					})
				}
			}
		}
	}

	prev(){
			if(this.state.currentPosition > 0){
				this.setState({
					currentPosition:(this.state.currentPosition - 1)
				})
			}else{
				this.setState({
					currentPosition:(this.state.alphabets.length - 1),
				})
			}
	}

	render(){
		return (
			<div className="game">
			<span className="random-label">
				Random Letter
			 </span>
			 <label className="switch">
				 <input type="checkbox"
					 className="random"
					 defaultValue= "false"
					 checked={this.state.random}
				 onClick={this.switchRandom}/>
				 <div className="slider round">

				 </div>
			 </label>

			 <span className="random-label">
 				sound
 			 </span>
 			 <label className="switch">
 				 <input type="checkbox"
					 className="sound"
 					 defaultValue= "false"
 					 checked={this.state.sound}
 				 		onClick={this.switchSound}/>
 				 <div className="slider round">

 				 </div>
 			 </label>

				<div className="option">
					<div className="fields" >
						<div className="field-block">
							{this.state.alphabets[this.state.currentPosition].letter}
						</div>
						<audio src={this.state.alphabets[this.state.currentPosition].letterSound}
							data-key="letter"/>
					</div>
					cp: {this.state.currentPosition} <br/>
					ct:{this.state.currentTick}
					<div className="buttons">
						<a className="button prev" onClick={this.prev}> Previous</a>
						<a className="button sound" onClick={this.manualPlaySound}> Play sound Again</a>
						<a className="button next" onClick={this.next}> Next</a>

					</div>
					<div className="fields" >
						<div className="field-block">
							<div className="left-field">
								<div  className="placeholder-span">
									click to view the image
									<img
									className="letter-image"
									src={this.state.alphabets[this.state.currentPosition].image}
									alt={this.state.alphabets[this.state.currentPosition].word}/>
									<audio src={this.state.alphabets[this.state.currentPosition].wordSound}
							data-key="word"/>
								</div>
							</div>
							<div className="right-field">
								<div className="placeholder-span">
									<div className="word">
										{this.state.alphabets[this.state.currentPosition].word.toUpperCase()}
									</div>
									<audio src={this.state.alphabets[this.state.currentPosition].wordSound}
							data-key="word2"/>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
			);
	}

}




export default EasyAbc;
