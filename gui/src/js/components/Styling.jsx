import styled from "styled-components";

// All of the styling for the registration sliding area :) 
export const H1 = styled.h1`
    text-align: center;
    width: 100%;
    color: #111;
    font-weight: lighter;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;`

export const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: -webkit-flex;
    flex-direction: column;
    padding-top: 5%;
    align-items: center;
    background: rgb(37,142,160);
    background: linear-gradient(0deg, rgba(37,142,160,1) 35%, rgba(129,121,144,1) 100%);`

export const FormWrapper= styled.div`
    width: 90%;
    min-width: 300px;
    max-width: 600px;
    flex-direction: column;
    padding: 20px 40px;
    border-radius: 8 px;
    box-shadow: 0px 10px 50px #555;
    background-color: #ffffff;
    margin-bottom: 15px;`

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`

export const Label = styled.h1`
    font-size: 1.2em;
    width: 100%;
    color: #111;
    font-weight: lighter;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    float:left
    padding: 1%;
    margin: 1%;
    ${props =>
        props.gender ?
        `font-size: 1em;
        font-weight: light;
        color: black;    `
        : ``};


    `

export const Input = styled.input`
    padding: 10px 10px;
    margin: 0 0 1.5% 0;
    width: 100%;
    border-radius: 5px;
    outline: none;
    border: 1px solid #cfcfcf;
    float: right;
    ::placeholder {
        font-size: 1em;
        font-weight: light;
        color: #999;
    }
    `

export const Button = styled.button`
    margin-right : 10px;`

export const New = styled.div`
    flex-wrap: break-word;
    width: 100%;
    `

export const ErrorMessage = styled.h1`
    color: red;
    font-size: 0.75em;`

export const CreateButton = styled.button`
    color: #fff;
    border: 2px solid #fff;
    margin-top: 1em;
    padding: 8px 8px;
    font-size: 1em;
    width: 100%;
    font-weight: lighter;
    display: block;
    letter-spacing: 1px;
    :& hover {
        color: #519e8a;
        background-color: #fff;
        border: 2px solid #519e8a;}
    :& small {
        color: #999;
        font-weight: lighter;}
        ${props =>
            props.disabled ?
            `
            background: lightgrey;
            `: `
            background: #519e8a;
            `};
        ` 
    

export const A_center = styled.a`
    width: 100%;
    text-align: center;
    display: block;`

export const A = styled.a`
    width: 100%;`

export const Error = styled(Label)`
    color: red;
    margin-top: 1em;
    text-align: center; 
    font-size: 1em;`

export const Buttons = styled.div`
    display: -webkit-flex;
    width: 100%;
    justify-content: center;

    ${props =>
        props.center ?
        `
        justify-content: center;
        `: `
        flex-direction: space-between;
        `}`

export const Right = styled.div`
    float: right;
    display: flex;`

export const Left = styled.div`
    float: left;
    min-width: 30%;
    width: 100%;`

export const Tool = styled.section`
    background: #817990;
    color: white;
    `
    
    
export const MenuButton=styled.button`
    background: inherit;
    border: none;
    color: white;
    font-size: 14px;
    height: 100%;
    &:hover {
    background: #645581;
        }
`

export const TextArea = styled.textarea`
width: 100%;`