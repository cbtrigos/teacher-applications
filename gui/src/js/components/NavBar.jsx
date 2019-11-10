import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components'
import {Tool, MenuButton, Right, Left} from './Styling.jsx'
import {logout, isLogin} from './utils'

// import coat_of_arms from "../Images/coat_of_arms.png"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
 
    const {title} = props.title
    console.log({title})
    return (
        <div className={classes.root}>
        <AppBar position="static">
        
            <Tool> 
            <Left>
            <Typography className={classes.title} variant="h6" noWrap>
                {title} hi
            </Typography>
            </Left>
            <Right>
            <Router>
            <a href="/"> <MenuButton>HOME</MenuButton> </a>
            <a href="/contact"> <MenuButton>CONTACT</MenuButton> </a>
            <a href="/faq"> <MenuButton>FAQ</MenuButton> </a>
            <a href="/login"> <MenuButton>LOGIN</MenuButton> </a> 
            {/* {isLogin() ? <MenuButton onclick={logout()}>LOGOUT</MenuButton> 
                        :<a href="/login"> <MenuButton>LOGIN</MenuButton> </a> 
          } */}
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
            </div>

            </Router>
            </Right>
            </Tool>
            

        </AppBar>
        </div>
    );
}


// const Tool = styled.section`
//     background: #817990;
//     color: white;
//     display: -webkit-flex;
//     justify-content: space-between;
//     width: 100%;
//     padding: 10px;
// `
// const Button = styled.button`
//     background: inherit;
//     border: none;
//     color: white;
//     font-size: 14px;
//     height: 100%;
//     &:hover {
//     background: #645581;
//         }
// `
// const Right = styled.div`
//     float: right;
//     display: flex;
//     `
// const Left = styled.div`
// float: left;
// width: 40;
// `