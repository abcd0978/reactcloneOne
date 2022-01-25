import React, {useState} from 'react'
import moment from 'moment'
import { Formik } from 'formik';
import * as Yup from 'yup'
import {useDispatch} from 'react-redux'
import { registerUser } from '../../../_actions/user_action';
import {Form,Input,Button} from 'antd';

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

function RegisterPage(props) {
    const dispatch = useDispatch();
    return(
        <Formik
        initialValues={{
            email:'',
            lastName:'',
            name:'',
            password:'',
            confirmPassword:'',
        }}
        validationSchema={Yup.object().shape({
            name: Yup.string()
            .required('이름을 입력해주세요'),
            lastName: Yup.string()
            .required('성을 입력해주세요'),
            email: Yup.string()
            .email('이메일이 유효하지 않습니다.')
            .required('이메일을 입력해주세요'),
            password: Yup.string()
            .min(5, '비밀번호는 5글자 이상이여야 합니다.')
            .required('비밀번호를 입력해주세요'),
            confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], '비밀번호확인이 일치하지 않습니다.')
            .required('비밀번호확인을 입력해주세요')
            
        })}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              let dataToSubmit = {
                email: values.email,
                password: values.password,
                name: values.name,
                lastname: values.lastname,
                image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
                //이미지는 아이덴티콘으로 생성해서 보낸다.
              };
    
              dispatch(registerUser(dataToSubmit)).then(response => {
                if (response.payload.success) {
                  props.history.push("/login");
                } else {
                  alert(response.payload.err.errmsg)
                }
              })
    
              setSubmitting(false);
            }, 500);
          }}
          >
          {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app" style={{position:'absolute',top:'50%'
          ,left:'48%'
          ,transform: 'translate(-50%,-50%)'}}>
            <h2 style={{textAlign:'center'}}>Sign up</h2>

            <Form style={{ minWidth: '375px', maxWidth:'500px' }} {...formItemLayout} onSubmit={handleSubmit} >

              <Form.Item required label="Name">
                <Input
                  id="name"
                  placeholder="이름 입력"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback" style={{color:'red', position:'absolute'}}>{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item required label="Last Name">
                <Input
                  id="lastName"
                  placeholder="성(姓) 입력"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                  }
                />
                {errors.lastName && touched.lastName && (
                  <div className="input-feedback" style={{color:'red', position:'absolute'}}>{errors.lastName}</div>
                )}
              </Form.Item>

              <Form.Item required label="Email" hasFeedback validateStatus={ errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="이메일 입력"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback" style={{color:'red', position:'absolute'}}>{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback" style={{color:'red', position:'absolute'}}>{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="Confirm" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback" style={{color:'red', position:'absolute'}}>{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}    
        </Formik>
    )    
}

export default RegisterPage
