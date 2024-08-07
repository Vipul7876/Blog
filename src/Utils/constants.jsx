/* eslint-disable no-useless-escape */
import axios from 'axios';

export const validate = ( name, password, confPassword, type ) => {
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/])[A-Za-z\d!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",<>\.\?\/]{8,16}$/.test( password );

  const inNameValid = /^.{4,}$/.test( name );
  if ( !inNameValid ) return 'Username is not Valid from validate';
  if ( !isPasswordValid ) return `Password is not Valid from validate${ isPasswordValid }`;
  switch ( type ) {
    case 'signup':
      if ( confPassword !== password ) {
        return 'Confirm Password is not same as Password from validate';
      }
      break;
    default:
      break;
  }
  return null;
};

export const login = async ( username, password ) => {
  try {
    const result = await axios.post( import.meta.env.VITE_APP_LOGIN, { username, password } );

    const Token = await result.headers[ 'authorization' ];
    const data = await result.data;
    if ( data?.status == 'success' ) {
      localStorage.setItem( 'Token', Token );
    }
    return data;
  } catch ( error ) {
    return 'Invalid Credentials';
  }

};

export const Signup = async ( username, password ) => {
  try {
    const result = await axios.post( import.meta.env.VITE_APP_SIGNUP, { username, password } );
    const Token = await result.headers[ 'authorization' ];
    const data = await result.data;
    if ( data?.status == 'success' ) {
      localStorage.setItem( 'Token', Token );
    }
    return data;
  } catch ( error ) {
    // return 'Invalid Credentials';
    return error;
  }

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

export const deleteUser = async ( username ) => {
  try {
    const result = await axios.post( import.meta.env.VITE_APP_DELETEUSER, { username } );
    const data = await result.data;
    return data;
  }
  catch ( error ) {
    console.log( `Can't delete the User` );
  }
};
