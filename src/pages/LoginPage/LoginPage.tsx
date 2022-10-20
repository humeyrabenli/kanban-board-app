import axios from 'axios'
import React, { FC } from 'react'
import { useNavigate } from 'react-router'
import LoginForm from '../../components/LoginForm'
import { LoginFormProps } from '../../components/LoginForm/LoginForm.types'
import { useLoginContext } from '../../contexts/LoginContext/LoginContext'
import { auth } from '../../services/http/patika/endpoints/auth'
import { login } from '../../services/http/patika/endpoints/auth/methods'

export type LoginPageProps = {
}
const LoginPage = (props:LoginPageProps) => {
  const navigate = useNavigate()
  const { login } = useLoginContext()
  const handleLogin: LoginFormProps['onLogin'] = (values) => {
    auth.login(values).then(({ data }) => {
      login(data.token, data.username)
      navigate('/')
    })
  }
  return <LoginForm onLogin={handleLogin} />
}

export default LoginPage
