import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios'
import dayjs from 'dayjs'
// import Sort from './components/Sort'

function App() {
  const [search, setSearch] = useState('')
  const [employees, setEmployees] = useState([])
  const employeesFull = React.useRef(null)
  
  useEffect(() => {
    getEmployees()
  }, [])

  useEffect(() => {
    if (employeesFull.current) {
      console.log('Filtering...', employeesFull);
      setEmployees(employeesFull.current.filter(employee => {
        const name = `${employee.name.first} ${employee.name.last}`.toLowerCase();
        return name.indexOf(search) !== -1;
      }))
    }
  }, [search])

  const getEmployees = async () => {
    const res = await axios.get(`https://randomuser.me/api/?results=200&nat=us`)
    // console.log(res.data.results)
    employeesFull.current = res.data.results;
    setEmployees(employeesFull.current)
  }
  const isLoading = employeesFull.current === null;
  const isEmpty = employees.length === 0;
  // console.log(employeesFull)
  
  return (
    <div className="App">
      {isLoading ? <div>Loading...</div> :
        (
          <>
            <header>
              <h2>
                Employee Directory
              </h2>
            </header>

            <form>
              <input onChange={(evt) => setSearch(evt.currentTarget.value)} placeholder="Search Employees" type="text" name="name" value={search} />
            {isEmpty ? <div>No Results...</div> : null}
            </form>
            
            <br/>

            <button onClick= {()=>{
                const newData=[...employeesFull.current]
                newData.sort((a,b)=>{
                  const nameA = a.name.first+ '' + a.name.last;
                  const nameB = b.name.first+ '' + b.name.last;
                  return nameA.toLocaleString().localeCompare(nameB.toLocaleString());
                })
                setEmployees(newData)               
            }
          }
            >
              Sort Ascending
            </button >
            <button onClick= {()=>{
                const newData=[...employeesFull.current]
                newData.sort((a,b)=>{
                  const nameA = a.name.first+ '' + a.name.last;
                  const nameB = b.name.first+ '' + b.name.last;
                  return nameB.toLocaleString().localeCompare(nameA.toLocaleString());
                })
                setEmployees(newData)               
            }
          }>Sort Descending</button>
    
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Picture</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Cell</th>
                  <th scope="col">Email</th>
                  <th scope="col">DOB</th>
                </tr>
              </thead>
              {employees.map((employee) =>
                <tbody key={employee.login.uuid}>
                  <tr>
                    <th scope="row"><img alt={employee.picture.name} src={employee.picture.thumbnail} /></th>
                    <td>{employee.name.first}</td>
                    <td>{employee.name.last}</td>
                    <td>{employee.cell}</td>
                    <td>{employee.email}</td>
                    <td>{dayjs(employee.dob.date).format("MM-DD-YYYY")}</td>
                  </tr>
                </tbody>)}
            </table>

          </>)
      }
    </div>
  );
}

export default App;
