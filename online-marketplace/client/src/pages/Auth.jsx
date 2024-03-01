import { UserStoreContext, userStore } from '../store/userStore';
import React, { useContext, useState } from 'react';
import { Container, Card, Button, CardLink, Form as BootstrapForm } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { REGISTARTION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { login, registration } from '../http/userAPI';

import { observer } from 'mobx-react-lite';


const Auth = observer(() => {
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Incorrect email').required('Required'),
    password: Yup.string().required('Required').min(6),
    confirm_password: Yup.string()
      .label('Confirm password')
      .required('Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const { setIsAuth, setUser } = useContext(UserStoreContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(formData.email, formData.password);
      } else {
        data = await registration(formData.email, formData.password);
        console.log(data);
      }

      userStore.setIsAuth(true);
      userStore.setUser(data);
      navigate(SHOP_ROUTE);
    } catch (e) {
      console.log('Ошибка при выполнении запроса:', e);
      if (e.response && e.response.status === 401) {
        // Ошибка авторизации: токен истек или недействителен
        console.log('Токен пользователя истек или недействителен. Перенаправление на страницу входа...');
        // Ваш код для перенаправления на страницу входа
      } else {
        // Обработка других ошибок
        alert(e.response?.data?.message || "Произошла ошибка");
      }
    }
  };
  
    return (
      <Container
        className='d-flex justify-content-center align-items-center'
        style={{ height: window.innerHeight - 54 }}
      >
        <Formik
          initialValues={formData}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Card style={{ width: '600' }} className='p-5'>
              <h2 className='m-auto'>{isLogin ? 'LogIn' : 'Registration'}</h2>
              <Form as={BootstrapForm} className='d-flex flex-column'>
                <Field
                  name='email'
                  type='email'
                  placeholder='Email'
                  className='my-3 px-1 py-2 rounded border border-secondary'
                  value={formData.email}
                  onChange={handleChange}
                />
  
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
  
                {isLogin ? (
                  <div>
                    <Field
                      name='password'
                      type='password'
                      placeholder='Password'
                      className='my-3 w-100 px-1 py-2 rounded border border-secondary'
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && touched.password ? (
                      <div>{errors.password}</div>
                    ) : null}
                  </div>
                ) : (
                  <div>
                    <Field
                      name='password'
                      type='password'
                      placeholder='Password'
                      className='my-3 w-100 px-1 py-2 rounded border border-secondary'
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && touched.password ? (
                      <div>{errors.password}</div>
                    ) : null}
                    <Field
                      name='confirm_password'
                      type='password'
                      placeholder='Confirm the password'
                      className='my-3 w-100 px-1 py-2 rounded border border-secondary'
                      value={formData.confirm_password}
                      onChange={handleChange}
                    />
                    {errors.confirm_password && touched.confirm_password ? (
                      <div>{errors.confirm_password}</div>
                    ) : null}
                  </div>
                )}
  
                <Button
                  onClick={click}
                  type='submit'
                  variant={'outline-success'}
                  className='my-3'
                >
                  Submit
                </Button>
  
                {isLogin ? (
                  <CardLink className='text-center' href={REGISTARTION_ROUTE}>
                    Don't have an account?
                  </CardLink>
                ) : (
                  <CardLink className='text-center' href={LOGIN_ROUTE}>
                    Have an account?
                  </CardLink>
                )}
              </Form>
            </Card>
          )}
        </Formik>
      </Container>
    );
});

export default Auth;
  