/* eslint-disable no-useless-escape */
import axios from 'axios';

export const validate = ( { name, password, confPassword } ) => {

  // const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])[A-Za-z\d!@#\$%\^&\*]{8,16}$/.test( password );
  const isPasswordValid = /^.{6,}$/.test( password );

  const inNameValid = /^.{4,}$/.test( name );

  if ( !isPasswordValid ) return `Password is not Valid from validate${ isPasswordValid }`;
  if ( confPassword ) {
    if ( confPassword !== password ) {
      return 'Confirm Password is not same as Password from validate';
    }
  }
  if ( !inNameValid ) return 'Username is not Valid from validate';
  return null;
};

export const login = async ( username, password ) => {
  const result = await axios.post( import.meta.env.VITE_APP_LOGIN, { username, password } );
  const Token = await result.headers[ 'authorization' ];
  const data = await result.data;
  if ( data?.status == 'success' ) {
    localStorage.setItem( 'Token', Token );
  }
  return data;
};

export const Signup = async ( username, password ) => {
  const result = await axios.post( import.meta.env.VITE_APP_SIGNUP, { username, password } );
  const Token = await result.headers[ 'authorization' ];
  const data = await result.data;
  if ( data?.status == 'success' ) {
    localStorage.setItem( 'Token', Token );
  }
  return data;
};

export const addBlog = async ( username, title, blog, description ) => {
  const result = await axios.post( import.meta.env.VITE_APP_ADDBLOG, { username, title, blog, description } );
  const data = await result.data;

  return data;
};

export const updateUserBlog = async ( blogId, username, title, blog, description ) => {
  const result = await axios.post( import.meta.env.VITE_APP_UPDATEBLOG, { blogId, username, title, blog, description } );
  const data = await result.data;
  return data;
};


export const deleteBlog = async ( blogId, username ) => {
  const result = await axios.post( import.meta.env.VITE_APP_DELETEBLOG, { blogId, username } );
  const data = await result.data;
  return data;
};