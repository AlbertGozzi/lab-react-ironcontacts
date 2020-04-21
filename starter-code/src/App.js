import React, { Component } from 'react';
import './App.css';
import contacts from './contacts.json';
import Table from './components/Table';

class App extends Component {
  state = {
    displayedCards: contacts.splice(0,5)
  }
  
  addRandomContact = () => {
    let displayedCardsCopy = [...this.state.displayedCards]

    // Add random
    let randomIndex = Math.floor(Math.random() * contacts.length);

    if (displayedCardsCopy.includes(contacts[randomIndex])) {
      this.addRandomContact();
    } else {
      displayedCardsCopy.push(contacts[randomIndex]);
    }

    // Update state
    this.setState({
      displayedCards: displayedCardsCopy
    });
  }

  sortName = () => {
    let displayedCardsCopy = [...this.state.displayedCards]

    // Sort by name
    displayedCardsCopy.sort((a, b) => a.name.localeCompare(b.name)); 

    // Update state
    this.setState({
      displayedCards: displayedCardsCopy
    });
  }

  sortPopularity = () => {
    let displayedCardsCopy = [...this.state.displayedCards]

    // Sort by popularity
    displayedCardsCopy.sort((a, b) => b.popularity - a.popularity); 

    // Update state
    this.setState({
      displayedCards: displayedCardsCopy
    });
  }

  deleteCard = (id) => {

    let displayedCardsCopy = [...this.state.displayedCards]

    // Delete card
    displayedCardsCopy = displayedCardsCopy.filter(element => element.id !== id); 

    // Update state
    this.setState({
      displayedCards: displayedCardsCopy
    });
  }

  displayCards = () => {
    let contactCards = [];

    [...this.state.displayedCards].forEach((contact) => {
      contactCards.push(
        <tr key={contact.id}>
          <td><img src={contact.pictureUrl} alt={contact.name}/></td>
          <td>{contact.name}</td>
          <td>{contact.popularity.toFixed(1)}</td>
          <td><button onClick={(e) => {this.deleteCard(contact.id)}}>Delete</button></td>
        </tr>
      );
    });

    return contactCards;
  }

  log = () => {
    console.log('Hello');
  }

  render() {
    return (
      <div className="App">
      
        <header className="App-header">
          <h1 className="App-title">IronContacts</h1>
        </header>

        <button onClick={this.addRandomContact}> Add Random Contact </button>
        <button onClick={this.sortName}> Sort by name </button>
        <button onClick={this.sortPopularity}> Sort by popularity </button>

        <Table displayCards={this.displayCards}></Table>

      </div>
    );
  }
}

export default App;
