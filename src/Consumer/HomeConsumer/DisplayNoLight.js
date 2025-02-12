import React, { useState, useEffect } from 'react'
import './Contact.css'

const DisplayNoLight = () => {
  const [contacts, setContacts] = useState([])
  const [message, setMessage] = useState('')

  // Fetch contacts from the PHP backend
  useEffect(() => {
    fetch('http://localhost:8080/nea-project/fetch-contacts.php') // Replace with your PHP file path
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message)
        } else {
          setContacts(data)
        }
      })
      .catch((error) => {
        setMessage('Error fetching data')
        console.error('Error:', error)
      })
  }, [])

  return (
    <div className='contact-container'>
      <h1>Contacts List</h1>
      {message && <p>{message}</p>}
      <table className="form-container">
        <thead>
          <tr>
            <th>ID</th>
            <th>Contact Name</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.contactName}</td>
                <td>{contact.location}</td>
                <td>{contact.phone}</td>
                <td>{contact.remarks}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No contacts found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DisplayNoLight
