import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css'
import { CChart } from '@coreui/react-chartjs';
import { Link } from 'react-router-dom';

function Dashboard(){
  let [products, setProducts] = useState([]);
  let [StockIn, setStockIn] = useState([]);
  let [Expenses, setExpenses] = useState([]);
  let [StockOut, setStockOut] = useState([]);
  let [Income, setIncome] = useState([]);
  let [HighSell, setHighSell] = useState([]);
  let [IncomeGraph, setIncomeGraph] = useState([]);
  let [ExpenceGraph, setExpenceGraph] = useState([]);
  let HighSellFive = []
  for(let i = 0; i < Object.keys(HighSell).length && i < 5; i++)
    HighSellFive.push(HighSell[i])
  let Profit = isNaN((parseInt(Income) - parseInt(Expenses)) / parseInt(Expenses) * 100) || parseInt(Expenses) === 0 ? 0 : parseInt((parseInt(Income) - parseInt(Expenses)) / parseInt(Expenses) * 100)

  useEffect(() => {
    fetch(`http://localhost:8000/products`, {
        method: 'GET',
    })
    .then((res) => res.json())
    .then((json) => {
      setProducts(json)
    })

    fetch(`http://localhost:8000/StockIn/get`, {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((json) => {
      let tempStockIn = 0
      let tempExpenses = 0
      let GraphIncome = []
      json.forEach(element => {
        tempStockIn += parseFloat(element.Quantity)
        tempExpenses += (parseFloat(element.BuyingPrice) * parseFloat(element.Quantity))
      });
      let date = new Date()
      for(let i = 1; i < 32; i++){
        let temp = json.filter((e) => {
          if(date.getMonth() < 10 && i < 10)
            return `${e.updatedAt.split('T')[0]}` === `${date.getFullYear()}-0${date.getMonth() + 1}-0${i}`
          else if(date.getMonth() < 10)
            return `${e.updatedAt.split('T')[0]}` === `${date.getFullYear()}-0${date.getMonth() + 1}-${i}`
          else if(i < 10)
            return `${e.updatedAt.split('T')[0]}` === `${date.getFullYear()}-${date.getMonth() + 1}-0${i}`
          else
            return `${e.updatedAt.split('T')[0]}` === `${date.getFullYear()}-${date.getMonth() + 1}-${i}`
      })
        GraphIncome.push(Object.keys(temp).length)
      }
      setIncomeGraph(GraphIncome)
      setStockIn(tempStockIn)
      setExpenses(tempExpenses)
    })

    fetch(`http://localhost:8000/StockOut/get`, {
        method: 'GET',
    })
    .then((res) => res.json())
    .then((json) => {
      let tempStockOut = 0
      let tempIncome = 0
      let tempHighSell = []
      let tempProductName = ''
      let tempCategory = ''
      let sum = 0
      let GraphExpence = []
      json.forEach(element => {
        tempStockOut += parseInt(element.Quantity)
        tempIncome += parseInt(element.SellingPrice)
      });
      json.sort((a, b) => {return a.ProductName.localeCompare(b.ProductName)})
      json.forEach((e) => {
        if(e.ProductName !== tempProductName){
          tempProductName !== '' ? tempHighSell.push({ProductName: `${tempProductName}`, Category: `${tempCategory}`, Quantity: `${sum}`}) : parseFloat(e.Quantity)
          tempProductName = e.ProductName
          tempCategory = e.Category
          sum = parseFloat(e.Quantity)
        }else{
          sum += parseFloat(e.Quantity)
        }
      })
      tempHighSell.push({ProductName: `${tempProductName}`, Category: `${tempCategory}`, Quantity: `${sum}`})
      tempHighSell.sort((a, b) => {return b.Quantity - a.Quantity})

      let date = new Date()
      for(let i = 1; i < 32; i++){
        let temp = json.filter((e) => {
          if(date.getMonth() < 10 && i < 10)
            return `${e.updatedAt.split('T')[0]}` === `${date.getFullYear()}-0${date.getMonth() + 1}-0${i}`
          else if(date.getMonth() < 10)
            return `${e.updatedAt.split('T')[0]}` === `${date.getFullYear()}-0${date.getMonth() + 1}-${i}`
          else if(i < 10)
            return `${e.updatedAt.split('T')[0]}` === `${date.getFullYear()}-${date.getMonth() + 1}-0${i}`
          else
            return `${e.updatedAt.split('T')[0]}` === `${date.getFullYear()}-${date.getMonth() + 1}-${i}`
      })
        GraphExpence.push(Object.keys(temp).length)
      }
      setExpenceGraph(GraphExpence)
      setStockOut(tempStockOut)
      setIncome(tempIncome)
      setHighSell(tempHighSell)

    })
  }, [])

    return (
      <div className='Dashboard'>
        <div className='Cards'>
          <Link to='/Products' className='Card'>
            <img src='https://cdn-user-icons.flaticon.com/96885/96885753/1679321351604.svg?token=exp=1679322252~hmac=60974dc39c6b4c238b4bf00fed2fac31' width='45' alt=''/>
            <div className='card-content'>
              <div style={{filter: 'opacity(90%)'}}>Total Products</div>
              <span style={{fontSize: '1.5em'}}>{Object.keys(products).length}</span>
            </div>
          </Link>
          <Link to='/StockIn' className='Card'>
            <img src='https://cdn-user-icons.flaticon.com/96885/96885753/1679413129154.svg?token=exp=1679414029~hmac=6e28e0d3e33ee2c1b4c69a1a5ecdc4e1' width='45' alt=''/>
            <div className='card-content'>
              <div style={{filter: 'opacity(90%)'}}>Total Purchase</div>
              <span style={{fontSize: '1.5em'}}>{StockIn}</span>
            </div>
          </Link>
          <Link to='/StockOut' className='Card'>
            <img src='https://cdn-user-icons.flaticon.com/96885/96885753/1679413799575.svg?token=exp=1679414700~hmac=1c532b14a821aeddbe8ae9eb39b1c545' width='45' alt=''/>
            <div className='card-content'>
              <div style={{filter: 'opacity(90%)'}}>Total Sales</div>
              <span style={{fontSize: '1.5em'}}>{StockOut}</span>
            </div>
          </Link>
          <Link to='/LowStock' className='Card'>
            <img src='https://cdn-user-icons.flaticon.com/96885/96885753/1679666288369.svg?token=exp=1679667189~hmac=78e5d0c2d0b359248d76ae7a8066255d' width='45' alt=''/>
            <div className='card-content'>
              <div style={{filter: 'opacity(90%)'}}>Low Stock</div>
              <span style={{fontSize: '1.5em'}}>{Object.keys(products.filter((e) => (e.inStock < 10))).length}</span>
            </div>
          </Link>
          <Link to='OutOfStock' className='Card'>
            <img src='https://cdn-user-icons.flaticon.com/96885/96885753/1679666097455.svg?token=exp=1679666999~hmac=5a88c2e187fcca00b313ef18d2c3e2e0' width='50' alt=''/>
            <div className='card-content'>
              <div style={{filter: 'opacity(90%)'}}>Out of Stock</div>
              <span style={{fontSize: '1.5em'}}>{Object.keys(products.filter((e) => (e.inStock < 1))).length}</span>
            </div>
          </Link>
          </div>
          <div className='highSellProfit'>
            <div style={{display: 'grid'}}>
              <div style={{background: 'white', borderRadius: '15px 15px 0 0', padding: '1rem 1rem 0 1rem'}}>
                <div style={{fontSize: '1.2em', paddingLeft: '0.5rem'}}>Highest Selling Product</div>
              </div>
              <div className='highSell'>
                {HighSellFive.map((e) => (
                    <div className='highSellCard'>
                      <div>{e.ProductName}</div>
                      <div>{e.Category}</div>
                      <div>{e.Quantity}pcs</div>
                    </div>
                  ))}
              </div>
            </div>
            <div className='profit' style={{background: `conic-gradient(#017256 ${Profit}%, white 0%)`}}>
              <div className='ProfitPercent'>
                {Profit}%
                <p style={{fontSize: '15px'}}>Profit</p>
              </div>
            </div>
          </div>
          <div className='GraphData'>
            <div className='Graph'>
            <CChart
              type="line" 
              data={{
                labels: [
                  "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11",
                  "Day 12", "Day 13", "Day 14", "Day 15", "Day 16", "Day 17", "Day 18", "Day 19", "Day 20", "Day 21", "Day 22",
                  "Day 23", "Day 24", "Day 25", "Day 26", "Day 27", "Day 28", "Day 29", "Day 30", "Day 31"
                ],
                datasets: [
                  {
                    label: "Income",
                    backgroundColor: "green",
                    borderColor: "green",
                    lineTension: 0.3,
                    pointBackgroundColor: "green",
                    pointBorderColor: "green",
                    pointRadius: 1,
                    data: IncomeGraph
                  },
                  {
                    label: "Expence",
                    backgroundColor: "red",
                    borderColor: "red",
                    lineTension: 0.3,
                    pointBackgroundColor: "red",
                    pointBorderColor: "red",
                    pointRadius: 1,
                    data: ExpenceGraph
                  },
                ],
              }
            }
            options = {
              {plugins: {
                legend: {
                  position: 'bottom'
                }
              }}
            }
            />
            </div>
            <div className='Data'>
              <div className='income'>
                <div>Income</div>
                <div>₹ {Income}</div>
                <img src='https://raw.githubusercontent.com/pichukov/PublicAssets/master/visualTypeFilledChart.png' width='190' alt=''/>
              </div>
              <div className='expenses'>
                <div>Expenses</div>
                <div>₹ {Expenses}</div>
                <img src='https://raw.githubusercontent.com/pichukov/PublicAssets/master/visualTypeCustomFilledChart.png' width='190' alt='' />
              </div>
            </div>
          </div>
      </div>
    );
}

export default Dashboard;
