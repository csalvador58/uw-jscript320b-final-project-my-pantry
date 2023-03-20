import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classes from '../css/RecipeCard.module.css';
import UserContext from '../store/UserContext';
import { v4 as uuidv4 } from 'uuid';
import FadeCard from './FadeCard';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function RecipeCard({ food }) {
  const appUser = useContext(UserContext);
  // const [fav, setFav] = useState({});
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const favoriteHandler = () => {
    let actionObject = {
      type: 'add',
      data: {
        uid: appUser.loginInfo,
        collection: 'recipe',
        pantryObj: {
          name: food.recipe.label,
          subheader: food.recipe.source,
          image: food.recipe.images.REGULAR.url,
          alt: food.recipe.label,
          cuisine: food.recipe.cuisineType[0],
          type: food.recipe.mealType[0],
          calories: Math.round(food.recipe.calories),
          ingredients: food.recipe.ingredientLines,
          source: food.recipe.source,
          url: food.recipe.url,
          edamam: food.recipe.shareAs,
          id: uuidv4(),
        },
      },
    };
    appUser.toggleFav(actionObject);
  };

  let favIcon = 'primary';
  const favoriteCheck = JSON.parse(
    localStorage.getItem('myPantry-fav-recipes')
  );
  // console.log(favoriteCheck.pantryObj.name)
  if (favoriteCheck) {
    favIcon =
      favoriteCheck.pantryObj.name === food.recipe.label
        ? 'secondary'
        : 'primary';
  }

  return (
    <FadeCard>
      <div className={classes['recipe-card-container']}>
        <CardHeader
          className={classes['no-wrap']}
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label='cuisine first letter'
            >
              {food.recipe.cuisineType[0].slice(0, 1).toUpperCase()}
            </Avatar>
          }
          title={food.recipe.label}
          subheader={food.recipe.source}
        />

        <CardMedia
          component='img'
          height='194'
          image={food.recipe.images.REGULAR.url}
          alt={food.recipe.label}
        />
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites' onClick={favoriteHandler}>
            <FavoriteIcon color={favIcon} />
          </IconButton>
          <a className={classes.source} href={food.recipe.url}>
            View Source
          </a>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent className={classes['recipe-content-container']}>
            <a className={classes.edamam} href={food.recipe.shareAs}>
              View Edamam Nutritional Details
            </a>
            <p>
              <span className={classes.bold}>Cuisine:</span>{' '}
              {food.recipe.cuisineType[0]}
            </p>
            <p>
              <span className={classes.bold}>Meal Type:</span>{' '}
              {food.recipe.mealType[0]}
            </p>
            <p>
              <span className={classes.bold}>Calories:</span>{' '}
              {Math.round(food.recipe.calories)}
            </p>
            <p>
              <span className={classes.bold}>Ingredients List:</span>{' '}
            </p>
            {food.recipe.ingredientLines.map((ingredient) => {
              return (
                <p className={classes['ingredients-list']} key={uuidv4()}>
                  {ingredient}
                </p>
              );
            })}
          </CardContent>
        </Collapse>
      </div>
    </FadeCard>
  );
}

export default RecipeCard;
