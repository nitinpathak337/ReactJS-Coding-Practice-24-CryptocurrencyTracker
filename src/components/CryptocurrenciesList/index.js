// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CryptocurrencyItem from '../CryptocurrencyItem'

import './index.css'

class CryptocurrenciesList extends Component {
  state = {list: [], isLoading: true}

  componentDidMount() {
    this.getList()
  }

  getList = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const data = await response.json()
    // const updatedData = data.map(eachItem => ({
    //   id: eachItem.id,
    //   usdValue: eachItem.usd_value,
    //   currencyName: eachItem.currency_name,
    //   euroValue: eachItem.euro_value,
    //   currencyLogo: eachItem.currency_logo,
    // }))
    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      currencyName: eachItem.currency_name,
      usdValue: eachItem.usd_value,
      euroValue: eachItem.euro_value,
      currencyLogo: eachItem.currency_logo,
    }))
    this.setState({list: formattedData, isLoading: false})
  }

  displayList = () => {}

  render() {
    const {list, isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          <>
            <h1>Cryptocurrency Tracker</h1>
            <img
              src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
              alt="cryptocurrency"
            />
            <ul>
              <li>
                <h1>Coin Type</h1>
                <p>USD</p>
                <p>EURO</p>
              </li>
              {list.map(eachItem => (
                <CryptocurrencyItem key={eachItem.id} details={eachItem} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default CryptocurrenciesList
