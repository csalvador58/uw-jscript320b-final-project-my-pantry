import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
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
import classes from '../css/RecipeCard.module.css'


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




export default function RecipeCard({food}) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const favoriteHandler = () => {
    
  }

  return (
    <Card className={classes['recipe-card-container']}>
      <CardHeader
      className={classes['no-wrap']}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="cuisine first letter">
            {food.recipe.cuisineType[0].slice(0,1).toUpperCase()}
          </Avatar>
        }
        title={food.recipe.label}
        subheader={food.recipe.source}
      />
      <CardMedia
        component="img"
        height="194"
        image={food.recipe.images.REGULAR.url}
        alt={food.recipe.label}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={favoriteHandler}>
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <p>Cuisine: {food.recipe.cuisineType[0]}</p>
            <p> Meal Type: {food.recipe.mealType[0]}</p>
            <p> Calories: {Math.round(food.recipe.calories)}</p>
            <p> Ingredients List: </p>
            {food.recipe.ingredientLines.map((ingredient) => {
                return <p>{ingredient}</p>
            })}
          
        </CardContent>
      </Collapse>
    </Card>
  );
}