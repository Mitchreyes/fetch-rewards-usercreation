import React, { Fragment } from 'react'
import fetchLogo from '../assets/logo.png'
import UserForm from './UserForm'

export default function Home() {
  return (
    <Fragment>
      <img className='logo' src={fetchLogo} alt='' />
      <div className='github'>
        <a href='https://github.com/Mitchreyes/fetch-rewards-usercreation'>
          <i className='fa fa-github-square'></i>
        </a>
      </div>
      <UserForm />
    </Fragment>
  )
}
