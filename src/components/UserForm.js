import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import spinner from '../assets/spinner.svg'

const apiUrl = 'https://frontend-take-home.fetchrewards.com/form'

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    occupation: '',
    state: '',
  })
  const [apiData, setApiData] = useState([])
  const [loading, setLoading] = useState(true)
  const [banner, setBanner] = useState('')

  useEffect(() => {
    const getApiData = async () => {
      setLoading(true)
      try {
        await axios
          .get(apiUrl)
          .then((response) => {
            setApiData(response.data)
          })
          .catch((err) => {
            console.log(err)
          })
      } catch (error) {
        console.log(error.message)
      }
      setLoading(false)
    }
    getApiData()
  }, [])

  const { name, email, password, occupation, state } = formData

  const register = async ({ name, email, password, occupation, state }) => {
    const body = JSON.stringify({ name, email, password, occupation, state })
    const options = {
      headers: { 'content-type': 'application/json' },
    }
    try {
      await axios
        .post(apiUrl, body, options)
        .then((response) => {
          if (response.status === 200) {
            setFormData({
              name: '',
              email: '',
              password: '',
              occupation: '',
              state: '',
            })
            setBanner('User has been created')
          } else {
            setBanner('User could not be created')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error.message)
    }
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      occupation === '' ||
      state === ''
    ) {
      setBanner('Please fill in all fields')
    } else {
      register({ name, email, password, occupation, state })
    }
  }

  const occupationData = apiData.occupations
  const statesData = apiData.states

  return (
    <Fragment>
      {loading && (
        <div className='loading'>
          {' '}
          <img src={spinner} alt='Spinner' />{' '}
        </div>
      )}
      {!loading && (
        <div className='container'>
          <div className='register-screen'>
            <form onSubmit={onSubmit} className='register-form'>
              <div className='input-fields'>
                <input
                  className='input'
                  type='text'
                  placeholder='Name'
                  name='name'
                  value={name}
                  onChange={onChange}
                  autoComplete='new-password'
                />
              </div>
              <div className='input-fields'>
                <input
                  className='input'
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  value={email}
                  onChange={onChange}
                  autoComplete='new-password'
                />
              </div>
              <div className='input-fields'>
                <input
                  className='input'
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  autoComplete='new-password'
                />
              </div>
              <div className='input-fields'>
                <select
                  name='occupation'
                  onChange={onChange}
                  className='dropdown-input'
                >
                  <option className='starting-input' hidden>
                    Occupation
                  </option>
                  {occupationData.map((occupation) => {
                    return (
                      <option
                        key={occupation}
                        value={occupation}
                        name={occupation}
                      >
                        {occupation}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className='input-fields'>
                <select
                  name='state'
                  onChange={onChange}
                  className='dropdown-input'
                >
                  <option className='starting-input' hidden>
                    State
                  </option>
                  {statesData.map((state) => {
                    return (
                      <option
                        key={state.name}
                        value={state.name}
                        name={state.name}
                      >
                        {state.abbreviation}
                      </option>
                    )
                  })}
                </select>
              </div>
              <input type='submit' className='btn' value='Register' />
            </form>
            <p className='banner'>{banner}</p>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default UserForm
