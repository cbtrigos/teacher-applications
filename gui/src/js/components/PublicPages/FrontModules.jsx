import React from "react";
import { Grid,  Typography } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import {Wrapper } from '../../constants/utils/Styling.jsx'
import styled from "styled-components"

const Coat_of_arms_of_Sierra_Leone= 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Coat_of_arms_of_Sierra_Leone.svg/1200px-Coat_of_arms_of_Sierra_Leone.svg.png'
const posts = [
    {
     title: "Reports & Data",
     excerpt: "Explore data on school directories, exams, learning impact indicators, and other educational data.",
     image: "https://i0.wp.com/www.thesierraleonetelegraph.com/wp-content/uploads/2018/08/Children-in-Sierra-Leone22-e1535633931366.png?fit=500%2C303&ssl=1",
     link: "http://educationdatahub.dsti.gov.sl/"
    },
   
    {
     title: "Laws & Governance",
     excerpt: "Find federal education legislation, regulations, guidance, and other policy documents.",
     image: Coat_of_arms_of_Sierra_Leone, 
     link: ""
    },
   
    {
     title: "Grants",
     excerpt: "Read about possible grants in various fields of education and areas in Sierra Leone.",
     image: "http://www.tget.org.uk/index/wp-content/uploads/2016/09/SL1.jpg",
     link: ""
    },
   
    {
     title: "Applications",
     excerpt: "Learn about the application process, documents necessary, and important dates.",
     image: "https://www.formstack.com/blog/wp-content/uploads/2019/10/legal-contract-generation.jpg",
     link: ""
    },
   
   ]

export default function Modules(props) {
    return (
      <Wrapper> 
        <Gri >
            {posts.map(post => (
             <Post key={post.title} > 

                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height='180'
                      image={post.image}
                      key= {post.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                      </Typography>
                      <Typography component="p">{post.excerpt}</Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href={post.link}>
                      Learn More >
                    </Button>
                  </CardActions>

              </Post>

            ))}
        </Gri>   
      </Wrapper>
      );
    }

const Gri = styled.div`
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    // margin: 10pt;
    justify-content: center;
    background-color: none;
`;

const Post = styled.section`
    background: lightgrey;
    margin: 3pt 3pt 0pt 3pt;
    // padding: white;
    min-width: 20%;
    max-width: 45%;
    width: 40%;

`
