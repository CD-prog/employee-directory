import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'


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
    console.log(res.data.results)
    employeesFull.current = res.data.results;
    setEmployees(employeesFull.current)
  }
  const isLoading = employeesFull.current === null;
  const isEmpty = employees.length === 0;
  console.log(employeesFull)
  return (
    <div className="App">
      {isLoading ? <div>Loading...</div> :
        (
          <>
            <header>
              <h3>
                Employee Directory
              </h3>
            </header>
            
            <form>
              <input onChange={(evt) => setSearch(evt.currentTarget.value)} placeholder="Search Employees" type="text" name="name" value={search} />
            </form>
            
            {isEmpty ? <div>No Results...</div> : null}

            <div>
            {employees.map((employee) => <p key={employee.login.uuid}>{employee.name.first} {employee.name.last}</p>)}
            </div>
          </>)
      }
    </div>
  );
}

export default App;
